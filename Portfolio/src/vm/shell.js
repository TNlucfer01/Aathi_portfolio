// A small, safe, simulated shell. It only manipulates the in-memory filesystem in
// fs.js — nothing here executes real commands or touches the network.
import repos from "../data/repos.json";
import { projects, community, GH } from "../data/projects";
import { profile, socials } from "../data/system";
import { THEME_NAMES } from "../theme";
import { HOME, normalize, getNode, parentOf, isWritable, prettyPath, wrap } from "./fs";

/* line = string | [[text, className], ...] */
const T = (text, cls) => (cls ? [[text, cls]] : text);
export const toText = (l) => (typeof l === "string" ? l : l.map((s) => s[0]).join(""));
const err = (msg) => ({ out: [T(msg, "c-red")], code: 1 });
const ok = (out = []) => ({ out, code: 0 });

const WS = ["home", "projects", "skills", "contact", "terminal"];

/* ---------- tokenizer / parser ---------- */
function tokenize(line, env) {
  const toks = [];
  let cur = "", has = false, q = null, i = 0;
  const push = () => { if (has) { toks.push({ t: cur }); cur = ""; has = false; } };
  const expandVar = () => {
    const m = line.slice(i).match(/^\$([A-Za-z_][A-Za-z0-9_]*)/);
    if (!m) return false;
    cur += env[m[1]] ?? ""; has = true; i += m[0].length; return true;
  };
  while (i < line.length) {
    const ch = line[i];
    if (q) {
      if (ch === q) { q = null; i++; }
      else if (ch === "$" && q === '"' && expandVar()) { /* expanded */ }
      else { cur += ch; i++; }
      continue;
    }
    if (ch === "'" || ch === '"') { q = ch; has = true; i++; continue; }
    if (ch === " " || ch === "\t") { push(); i++; continue; }
    if (ch === "|") { push(); toks.push({ op: "|" }); i++; continue; }
    if (ch === ">") { push(); const dbl = line[i + 1] === ">"; toks.push({ op: dbl ? ">>" : ">" }); i += dbl ? 2 : 1; continue; }
    if (ch === "\\" && i + 1 < line.length) { cur += line[i + 1]; has = true; i += 2; continue; }
    if (ch === "$" && expandVar()) continue;
    if (ch === "~" && !has && (i + 1 === line.length || line[i + 1] === "/" || line[i + 1] === " ")) {
      cur += env.HOME; has = true; i++; continue;
    }
    cur += ch; has = true; i++;
  }
  if (q) return { error: "unterminated quote" };
  push();
  return { toks };
}

function parse(line, env) {
  const { toks, error } = tokenize(line, env);
  if (error) return { error };
  const stages = [{ argv: [] }];
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i], st = stages[stages.length - 1];
    if (t.op === "|") stages.push({ argv: [] });
    else if (t.op === ">" || t.op === ">>") {
      const target = toks[i + 1];
      if (!target || target.op) return { error: `syntax error near '${t.op}'` };
      st.redirect = { op: t.op, target: target.t }; i++;
    } else st.argv.push(t.t);
  }
  if (stages.some((s) => !s.argv.length)) return { error: "syntax error: empty command in pipeline" };
  return { stages };
}

/* ---------- helpers ---------- */
function flagsOf(argv, valued = []) {
  const flags = new Set(), vals = {}, rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") { rest.push(...argv.slice(i + 1)); break; }
    if (/^-\d+$/.test(a)) { vals.n = a.slice(1); continue; }
    if (a.startsWith("--") && a.length > 2) { flags.add(a.slice(2)); continue; }
    if (a.startsWith("-") && a.length > 1) {
      for (const ch of a.slice(1)) {
        if (valued.includes(ch)) { vals[ch] = argv[++i]; break; }
        flags.add(ch);
      }
    } else rest.push(a);
  }
  return { flags, vals, rest };
}

const globToRe = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$");

function expandGlobs(argv, S) {
  const out = [];
  for (const a of argv) {
    if (!/[*?]/.test(a)) { out.push(a); continue; }
    const slash = a.lastIndexOf("/");
    const dirPart = slash >= 0 ? a.slice(0, slash + 1) : "";
    const node = getNode(S.fs, normalize(S.cwd, dirPart || "."));
    if (!node || node.t !== "d") { out.push(a); continue; }
    const re = globToRe(a.slice(slash + 1));
    const hits = Object.keys(node.c).filter((n) => re.test(n) && (!n.startsWith(".") || a.slice(slash + 1).startsWith("."))).sort();
    out.push(...(hits.length ? hits.map((h) => dirPart + h) : [a]));
  }
  return out;
}

function readText(S, p) {
  const abs = normalize(S.cwd, p);
  const n = getNode(S.fs, abs);
  if (!n) return { error: `${p}: No such file or directory` };
  if (n.t === "d") return { error: `${p}: Is a directory` };
  if (n.v == null) return { stub: n.url, error: null, text: `(file contents are not bundled in this simulated session)\nview it on GitHub: ${n.url}` };
  return { text: n.v };
}

function writeFile(S, p, text, append) {
  const abs = normalize(S.cwd, p);
  const { dir, name } = parentOf(abs);
  const pd = getNode(S.fs, dir);
  if (!pd || pd.t !== "d") return `${p}: No such file or directory`;
  if (!isWritable(abs)) return `${p}: Read-only file system`;
  const ex = pd.c[name];
  if (ex && ex.t === "d") return `${p}: Is a directory`;
  pd.c[name] = { t: "f", v: (append && ex ? ex.v ?? "" : "") + text };
  return null;
}

function walk(node, base, fn) {
  fn(base, node);
  if (node.t === "d") for (const k of Object.keys(node.c).sort()) walk(node.c[k], base === "/" ? "/" + k : base + "/" + k, fn);
}

function repoCtx(S) {
  const m = S.cwd.match(/^\/home\/aathi\/(?:projects|labs)\/([^/]+)/);
  const p = m && projects.find((x) => x.repo === m[1]);
  return p ? { p, r: repos[p.id], root: m[0] } : null;
}

function lev(a, b) {
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
}

/* ---------- commands ---------- */
const C = {};
const def = (name, usage, desc, fn) => { C[name] = { usage, desc, fn }; };
const alias = (name, to, pre = []) => { C[name] = { ...C[to], hidden: true, fn: (x) => C[to].fn({ ...x, argv: [...pre, ...x.argv] }) }; };

def("help", "help [command]", "list commands, or show one", (x) => {
  if (x.argv[0]) return C.man.fn(x);
  const groups = [
    ["look around", ["ls", "cd", "pwd", "cat", "tree", "find", "grep", "head", "tail", "wc", "sort", "open"]],
    ["edit the sandbox", ["echo", "touch", "mkdir", "cp", "mv", "rm", "reset"]],
    ["this desktop", ["theme", "opacity", "hyprctl", "goto", "neofetch", "clear", "history"]],
    ["system-ish", ["whoami", "hostname", "uname", "date", "uptime", "id", "env", "ps", "top", "free", "df", "git", "man", "which"]],
    ["for fun", ["cowsay", "fortune", "sl", "sudo"]],
  ];
  const out = [T("Pipes (|), redirects (>, >>), quotes, $VARS, globs and Tab completion all work.", "c-sub"), ""];
  for (const [g, cmds] of groups) {
    out.push(T(g, "c-mauve"));
    for (let i = 0; i < cmds.length; i += 4)
      out.push("  " + cmds.slice(i, i + 4).map((c) => c.padEnd(11)).join(""));
  }
  out.push("", T("`man <command>` for details. Everything is simulated — nothing real is executed.", "c-sub"));
  return ok(out);
});

def("man", "man <command>", "show usage for a command", (x) => {
  const c = C[x.argv[0]];
  if (!x.argv[0]) return err("What manual page do you want? e.g. `man ls`");
  if (!c) return err(`No manual entry for ${x.argv[0]}`);
  return ok([T("NAME", "c-mauve"), `    ${x.argv[0]} - ${c.desc}`, T("SYNOPSIS", "c-mauve"), `    ${c.usage}`]);
});

def("pwd", "pwd", "print working directory", (x) => ok([x.S.cwd]));
def("whoami", "whoami", "print the current user", () => ok([profile.user]));
def("hostname", "hostname", "show the hostname", () => ok([profile.host]));
def("id", "id", "print user identity", () => ok(["uid=1000(aathi) gid=1000(aathi) groups=1000(aathi),998(wheel)"]));
def("date", "date", "print the date and time", () => ok([new Date().toString()]));
def("uname", "uname [-a]", "print system information", (x) =>
  ok([x.argv.includes("-a") ? "Linux portfolio 6.12.0-simulated #1 SMP PREEMPT x86_64 GNU/Linux" : "Linux"]));
def("uptime", "uptime", "how long this session has run", (x) => {
  const s = Math.floor((Date.now() - x.S.startedAt) / 1000);
  return ok([` up ${Math.floor(s / 60)} min ${s % 60} s,  1 user,  load average: 0.00, 0.01, 0.00`]);
});
def("env", "env", "print environment variables", (x) => ok(Object.entries(x.S.env).map(([k, v]) => `${k}=${v}`)));
def("history", "history", "show command history", (x) => ok(x.S.history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`)));
def("clear", "clear", "clear the screen", () => ({ out: [], action: { type: "clear" } }));
def("which", "which <command>", "locate a command", (x) =>
  x.argv[0] && C[x.argv[0]] ? ok([`/usr/bin/${x.argv[0]}`]) : err(`which: no ${x.argv[0] || "command"} in ($PATH)`));

def("echo", "echo [text...]", "print text (use > file to write)", (x) => ok([x.argv.join(" ")]));

def("cd", "cd [dir]", "change directory (cd - goes back)", (x) => {
  const t = x.argv[0] === "-" ? x.S.oldcwd : normalize(x.S.cwd, x.argv[0]);
  const n = getNode(x.S.fs, t);
  if (!n) return err(`cd: ${x.argv[0]}: No such file or directory`);
  if (n.t !== "d") return err(`cd: ${x.argv[0]}: Not a directory`);
  return { out: x.argv[0] === "-" ? [prettyPath(t)] : [], cwd: t, code: 0 };
});

def("ls", "ls [-alh1] [path...]", "list directory contents", (x) => {
  const { flags, rest } = flagsOf(x.argv);
  const paths = rest.length ? rest : ["."];
  const out = [];
  paths.forEach((p, pi) => {
    const n = getNode(x.S.fs, normalize(x.S.cwd, p));
    if (!n) return out.push(T(`ls: cannot access '${p}': No such file or directory`, "c-red"));
    if (n.t === "f") return out.push(p);
    if (paths.length > 1) { if (pi) out.push(""); out.push(`${p}:`); }
    let names = Object.keys(n.c).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    names = flags.has("a") ? [".", "..", ...names] : names.filter((s) => !s.startsWith("."));
    const nodeOf = (s) => (s === "." || s === ".." ? { t: "d" } : n.c[s]);
    if (flags.has("l")) {
      for (const s of names) {
        const c = nodeOf(s), isD = c.t === "d";
        const size = isD ? 4096 : (c.v ? c.v.length : 0);
        out.push([[`${isD ? "d" : "-"}rw${isD ? "x" : "-"}r-${isD ? "x" : "-"}r-${isD ? "x" : "-"} 1 aathi aathi ${String(size).padStart(6)} Oct 22 `, "c-sub"], [s + (isD ? "/" : ""), isD ? "c-blue" : ""]]);
      }
    } else if (names.length) {
      const segs = [];
      names.forEach((s, i) => {
        const isD = nodeOf(s).t === "d";
        segs.push([s + (isD ? "/" : ""), isD ? "c-blue" : s.startsWith(".") ? "c-sub" : ""]);
        if (i < names.length - 1) segs.push([flags.has("1") ? "\n" : "   ", ""]);
      });
      out.push(segs);
    }
  });
  return ok(out);
});

def("cat", "cat [file...]", "print files (or stdin)", (x) => {
  if (!x.argv.length) return x.stdin ? ok(x.stdin) : ok([]);
  const out = [];
  for (const p of x.argv) {
    const r = readText(x.S, p);
    if (r.error) out.push(T(`cat: ${r.error}`, "c-red"));
    else out.push(...r.text.replace(/\n$/, "").split("\n").map((l) => (r.stub ? T(l, "c-sub") : l)));
  }
  return ok(out);
});

const headTail = (isHead) => (x) => {
  const { vals, rest } = flagsOf(x.argv, ["n"]);
  const n = parseInt(vals.n ?? 10, 10) || 10;
  let lines;
  if (rest.length) {
    const r = readText(x.S, rest[0]);
    if (r.error) return err(`${isHead ? "head" : "tail"}: ${r.error}`);
    lines = r.text.replace(/\n$/, "").split("\n");
  } else lines = x.stdin || [];
  return ok(isHead ? lines.slice(0, n) : lines.slice(-n));
};
def("head", "head [-n N] [file]", "first lines of a file", headTail(true));
def("tail", "tail [-n N] [file]", "last lines of a file", headTail(false));

def("wc", "wc [-lwc] [file]", "count lines, words, bytes", (x) => {
  const { flags, rest } = flagsOf(x.argv);
  let text;
  if (rest.length) { const r = readText(x.S, rest[0]); if (r.error) return err(`wc: ${r.error}`); text = r.text; }
  else text = (x.stdin || []).join("\n") + (x.stdin?.length ? "\n" : "");
  const l = (text.match(/\n/g) || []).length, w = (text.trim() ? text.trim().split(/\s+/).length : 0), c = text.length;
  const all = !flags.has("l") && !flags.has("w") && !flags.has("c");
  return ok([[flags.has("l") || all ? l : null, flags.has("w") || all ? w : null, flags.has("c") || all ? c : null].filter((v) => v !== null).join(" ") + (rest[0] ? ` ${rest[0]}` : "")]);
});

def("sort", "sort [-r] [file]", "sort lines", (x) => {
  const { flags, rest } = flagsOf(x.argv);
  let lines = x.stdin || [];
  if (rest.length) { const r = readText(x.S, rest[0]); if (r.error) return err(`sort: ${r.error}`); lines = r.text.replace(/\n$/, "").split("\n"); }
  const s = [...lines].sort((a, b) => a.localeCompare(b));
  return ok(flags.has("r") ? s.reverse() : s);
});

def("grep", "grep [-inr] pattern [file...]", "search for text", (x) => {
  const { flags, rest } = flagsOf(x.argv);
  if (!rest.length) return err("usage: grep [-inr] pattern [file...]");
  const [pat, ...files] = rest;
  let re;
  try { re = new RegExp(pat, flags.has("i") ? "i" : ""); } catch { return err(`grep: invalid pattern: ${pat}`); }
  const out = [];
  const scan = (text, label, multi) =>
    text.replace(/\n$/, "").split("\n").forEach((l, i) => {
      if (re.test(l)) out.push((multi ? `${label}:` : "") + (flags.has("n") ? `${i + 1}:` : "") + l);
    });
  if (!files.length && !flags.has("r")) { (x.stdin || []).forEach((l, i) => re.test(l) && out.push((flags.has("n") ? `${i + 1}:` : "") + l)); return { out, code: out.length ? 0 : 1 }; }
  const targets = files.length ? files : ["."];
  const multi = targets.length > 1 || flags.has("r");
  for (const p of targets) {
    const abs = normalize(x.S.cwd, p), n = getNode(x.S.fs, abs);
    if (!n) { out.push(T(`grep: ${p}: No such file or directory`, "c-red")); continue; }
    if (n.t === "f") { if (n.v != null) scan(n.v, p, multi); continue; }
    if (!flags.has("r")) { out.push(T(`grep: ${p}: Is a directory`, "c-red")); continue; }
    walk(n, abs, (path, node) => { if (node.t === "f" && node.v != null) scan(node.v, prettyPath(path), true); });
  }
  return { out: out.slice(0, 200), code: out.length ? 0 : 1 };
});

def("find", "find [path] -name pattern", "find files by name", (x) => {
  const ni = x.argv.indexOf("-name");
  const re = ni >= 0 && x.argv[ni + 1] ? globToRe(x.argv[ni + 1]) : null;
  const start = x.argv[0] && !x.argv[0].startsWith("-") ? x.argv[0] : ".";
  const abs = normalize(x.S.cwd, start), n = getNode(x.S.fs, abs);
  if (!n) return err(`find: '${start}': No such file or directory`);
  const out = [];
  walk(n, abs, (path, node) => {
    if (out.length >= 100) return;
    const base = path.split("/").pop();
    if (!re || re.test(base)) {
      const rel = start === "." ? "." + path.slice(abs === "/" ? 0 : abs.length) : start + path.slice(abs.length);
      out.push([[rel === "" ? "." : rel, node.t === "d" ? "c-blue" : ""]]);
    }
  });
  return ok(out);
});

def("tree", "tree [-aL N] [path]", "show a directory tree", (x) => {
  const { flags, vals, rest } = flagsOf(x.argv, ["L"]);
  const depth = parseInt(vals.L ?? vals.n ?? 3, 10) || 3;
  const abs = normalize(x.S.cwd, rest[0] || "."), root = getNode(x.S.fs, abs);
  if (!root) return err(`${rest[0]} [error opening dir]`);
  const out = [[[rest[0] || ".", "c-blue"]]];
  let dirs = 0, files = 0;
  const rec = (n, prefix, lvl) => {
    if (lvl >= depth || n.t !== "d") return;
    let names = Object.keys(n.c).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    if (!flags.has("a")) names = names.filter((s) => !s.startsWith("."));
    names.forEach((s, i) => {
      if (out.length > 260) return;
      const last = i === names.length - 1, c = n.c[s], isD = c.t === "d";
      isD ? dirs++ : files++;
      out.push([[prefix + (last ? "└── " : "├── "), "c-sub"], [s, isD ? "c-blue" : ""]]);
      rec(c, prefix + (last ? "    " : "│   "), lvl + 1);
    });
  };
  rec(root, "", 0);
  if (out.length > 260) out.push(T("… (truncated)", "c-sub"));
  out.push("", `${dirs} directories, ${files} files`);
  return ok(out);
});

def("mkdir", "mkdir [-p] dir...", "make directories", (x) => {
  const { flags, rest } = flagsOf(x.argv);
  if (!rest.length) return err("mkdir: missing operand");
  for (const p of rest) {
    const abs = normalize(x.S.cwd, p);
    if (!isWritable(abs)) return err(`mkdir: cannot create directory '${p}': Read-only file system`);
    const parts = abs.split("/").filter(Boolean);
    let n = x.S.fs;
    for (let i = 0; i < parts.length; i++) {
      const last = i === parts.length - 1;
      if (!n.c[parts[i]]) {
        if (!last && !flags.has("p")) return err(`mkdir: cannot create directory '${p}': No such file or directory`);
        n.c[parts[i]] = { t: "d", c: {} };
      } else if (last && !flags.has("p")) return err(`mkdir: cannot create directory '${p}': File exists`);
      n = n.c[parts[i]];
    }
  }
  return ok();
});

def("touch", "touch file...", "create empty files", (x) => {
  if (!x.argv.length) return err("touch: missing file operand");
  for (const p of x.argv) {
    if (getNode(x.S.fs, normalize(x.S.cwd, p))) continue;
    const e = writeFile(x.S, p, "", false);
    if (e) return err(`touch: cannot touch '${e.replace(/^(.*?): /, "$1': ")}`);
  }
  return ok();
});

def("rm", "rm [-rf] path...", "remove files (sandbox only)", (x) => {
  const { flags, rest } = flagsOf(x.argv);
  if (!rest.length) return err("rm: missing operand");
  for (const p of rest) {
    const abs = normalize(x.S.cwd, p);
    if (abs === "/" || abs === HOME) return err(`rm: it is dangerous to operate recursively on '${p}' (nice try)`);
    const { dir, name } = parentOf(abs), pd = getNode(x.S.fs, dir), n = pd?.c?.[name];
    if (!n) { if (!flags.has("f")) return err(`rm: cannot remove '${p}': No such file or directory`); continue; }
    if (!isWritable(abs)) return err(`rm: cannot remove '${p}': Read-only file system`);
    if (n.t === "d" && !flags.has("r")) return err(`rm: cannot remove '${p}': Is a directory`);
    delete pd.c[name];
  }
  return ok();
});

const clone = (n) => (n.t === "d" ? { t: "d", c: Object.fromEntries(Object.entries(n.c).map(([k, v]) => [k, clone(v)])) } : { ...n });
const cpmv = (isMv) => (x) => {
  const { flags, rest } = flagsOf(x.argv);
  if (rest.length < 2) return err(`${isMv ? "mv" : "cp"}: missing destination file operand`);
  const [src, dst] = rest, sa = normalize(x.S.cwd, src), sn = getNode(x.S.fs, sa);
  if (!sn) return err(`${isMv ? "mv" : "cp"}: cannot stat '${src}': No such file or directory`);
  if (sn.t === "d" && !isMv && !flags.has("r")) return err(`cp: -r not specified; omitting directory '${src}'`);
  let da = normalize(x.S.cwd, dst);
  const dn = getNode(x.S.fs, da);
  if (dn && dn.t === "d") da = da + "/" + sa.split("/").pop();
  const { dir, name } = parentOf(da), pd = getNode(x.S.fs, dir);
  if (!pd || pd.t !== "d") return err(`${isMv ? "mv" : "cp"}: cannot create '${dst}': No such file or directory`);
  if (!isWritable(da) || (isMv && !isWritable(sa))) return err(`${isMv ? "mv" : "cp"}: cannot write '${dst}': Read-only file system`);
  pd.c[name] = clone(sn);
  if (isMv) { const p = parentOf(sa); delete getNode(x.S.fs, p.dir).c[p.name]; }
  return ok();
};
def("cp", "cp [-r] src dst", "copy files", cpmv(false));
def("mv", "mv src dst", "move or rename", cpmv(true));

def("reset", "reset", "restore the sandbox filesystem", () => ({ out: [T("filesystem restored.", "c-green")], action: { type: "reset" } }));

def("open", "open <project|file|github|linkedin|email|.>", "open a repo or link in a new tab", (x) => {
  const t = x.argv[0];
  if (!t) return err("usage: open <project-dir | file | github | linkedin | email | .>");
  const links = { github: socials[0].href, linkedin: socials[1].href, email: socials[2].href };
  if (links[t.toLowerCase()]) return { out: [T(`opening ${t}…`, "c-green")], action: { type: "open", url: links[t.toLowerCase()] } };
  const rc = repoCtx(x.S);
  const byName = projects.find((p) => p.repo.toLowerCase() === t.toLowerCase() || p.id === t.toLowerCase());
  const com = community.find((c) => c.repo.toLowerCase() === t.toLowerCase());
  if (byName || com) return { out: [T(`opening ${(byName || com).repo}…`, "c-green")], action: { type: "open", url: GH + (byName || com).repo } };
  const abs = normalize(x.S.cwd, t), n = getNode(x.S.fs, abs);
  if (n && n.t === "f" && n.url) return { out: [T("opening file on GitHub…", "c-green")], action: { type: "open", url: n.url } };
  if (n && n.t === "d" && (t === "." || abs.match(/^\/home\/aathi\/(projects|labs)\/[^/]+$/))) {
    const r = abs.match(/^\/home\/aathi\/(?:projects|labs)\/([^/]+)/);
    if (r) return { out: [T(`opening ${r[1]}…`, "c-green")], action: { type: "open", url: GH + r[1] } };
  }
  if (rc && n) return { out: [T("opening repo on GitHub…", "c-green")], action: { type: "open", url: GH + rc.p.repo } };
  return err(`open: don't know how to open '${t}' (try a project name, 'github' or 'linkedin')`);
});

def("git", "git log [--oneline] | status | remote -v | branch", "inspect a project's history (read-only)", (x) => {
  const rc = repoCtx(x.S), sub = x.argv[0];
  if (!sub) return ok(["usage: git <log|status|remote|branch>"]);
  if (!rc) return err("fatal: not a git repository (or any of the parent directories): .git — try `cd ~/projects/Vir_RAG_assistant`");
  if (sub === "log") {
    const one = x.argv.includes("--oneline");
    const out = rc.r.log.flatMap((c) => one
      ? [[[c.h + " ", "c-yellow"], [c.s, ""]]]
      : [[[`commit ${c.h}`, "c-yellow"]], `Date:   ${c.d}`, "", `    ${c.s}`, ""]);
    out.push(T(`(showing my ${rc.r.log.length} most recent of ${rc.r.mine} commits here)`, "c-sub"));
    return ok(out);
  }
  if (sub === "status") return ok(["On branch main", "nothing to commit, working tree clean"]);
  if (sub === "branch") return ok([[["* main", "c-green"]]]);
  if (sub === "remote") return ok([`origin\t${GH}${rc.p.repo} (fetch)`, `origin\t${GH}${rc.p.repo} (push)`]);
  if (sub === "clone" || sub === "push" || sub === "pull" || sub === "fetch") return err("git: network access is disabled in this sandbox");
  return err(`git: '${sub}' is not supported here (try log, status, remote, branch)`);
});

def("theme", "theme [name]", "switch the desktop colour theme", (x) => {
  const n = x.argv[0];
  if (!n) return ok([T("themes:", "c-mauve"), ...THEME_NAMES.map((t) => `  ${t}${t === x.api.getTheme() ? "  ◂ current" : ""}`), T("usage: theme <name>", "c-sub")]);
  if (!THEME_NAMES.includes(n)) return err(`theme: unknown theme '${n}' — try: ${THEME_NAMES.join(", ")}`);
  return { out: [T(`theme → ${n}`, "c-green")], action: { type: "theme", name: n } };
});

def("opacity", "opacity <15-100>", "set window transparency (lower = more see-through)", (x) => {
  const v = parseInt(x.argv[0], 10);
  if (Number.isNaN(v)) return ok([`current: ${x.api.getOpacity()}%`, T("usage: opacity <15-100>", "c-sub")]);
  const c = Math.max(15, Math.min(100, v));
  return { out: [T(`window opacity → ${c}%`, "c-green")], action: { type: "opacity", value: c } };
});

def("goto", "goto <home|projects|skills|contact|terminal>", "jump to a workspace", (x) => {
  const i = WS.indexOf((x.argv[0] || "").toLowerCase());
  if (i < 0) return err(`usage: goto ${WS.join("|")}`);
  return { out: [T(`→ workspace ${i + 1}: ${WS[i]}`, "c-green")], action: { type: "goto", index: i } };
});

def("hyprctl", "hyprctl workspaces | dispatch workspace N | activewindow | version", "control this desktop", (x) => {
  const [sub, a, b] = x.argv;
  if (sub === "workspaces") return ok(WS.flatMap((w, i) => [[[`workspace ID ${i + 1} `, "c-mauve"], [`(${w})`, ""]]]));
  if (sub === "dispatch" && a === "workspace") {
    const i = parseInt(b, 10) - 1;
    if (!(i >= 0 && i < WS.length)) return err(`hyprctl: no such workspace '${b}' (1-${WS.length})`);
    return { out: [T("ok", "c-green")], action: { type: "goto", index: i } };
  }
  if (sub === "activewindow") return ok(["Window (simulated)", "    class: portfolio-terminal", "    title: aathi-sh"]);
  if (sub === "version") return ok(["hyprctl (simulated) — the real Hyprland isn't running in your browser, but this is its spirit."]);
  return err("usage: hyprctl workspaces | dispatch workspace N | activewindow | version");
});

const TUX = ["    .--.    ", "   |o_o |   ", "   |:_/ |   ", "  //   \\ \\  ", " (|     | ) ", "/'\\_   _/`\\ ", "\\___)=(___/ "];
def("neofetch", "neofetch", "system information", (x) => {
  const own = Object.values(repos).flatMap((r) => r.log.map((l) => ({ ...l, repo: r.repo }))).sort((a, b) => b.d.localeCompare(a.d))[0];
  const s = Math.floor((Date.now() - x.S.startedAt) / 1000);
  const info = [
    [[`${profile.user}@${profile.host}`, "c-green"]],
    [["-----------------", "c-sub"]],
    [["role     ", "c-mauve"], [profile.title, ""]],
    [["wm       ", "c-mauve"], [`${profile.wm} (the real one, on my machine)`, ""]],
    [["editor   ", "c-mauve"], [profile.editor, ""]],
    [["shell    ", "c-mauve"], ["aathi-sh (simulated)", ""]],
    [["theme    ", "c-mauve"], [x.api.getTheme(), ""]],
    [["repos    ", "c-mauve"], [`${projects.filter((p) => p.group === "projects").length} projects, ${projects.filter((p) => p.group === "labs").length} labs, ${community.length} forks/collabs`, ""]],
    [["latest   ", "c-mauve"], [`${own.d} · ${own.repo}`, ""]],
    [["session  ", "c-mauve"], [`${Math.floor(s / 60)}m ${s % 60}s`, ""]],
  ];
  const out = [];
  for (let i = 0; i < Math.max(TUX.length, info.length); i++)
    out.push([[(TUX[i] || " ".repeat(12)) + "  ", "c-blue"], ...(info[i] || [])]);
  return ok(out);
});
alias("fastfetch", "neofetch");

def("cowsay", "cowsay [text]", "a talking cow", (x) => {
  const txt = x.argv.join(" ") || (x.stdin || []).join(" ") || "moo. hire aathi.";
  const lines = wrap(txt, 38).split("\n"), w = Math.max(...lines.map((l) => l.length));
  const out = [" " + "_".repeat(w + 2), ...lines.map((l) => `| ${l.padEnd(w)} |`), " " + "-".repeat(w + 2),
    "        \\   ^__^", "         \\  (oo)\\_______", "            (__)\\       )\\/\\", "                ||----w |", "                ||     ||"];
  return ok(out);
});

const FORTUNES = [
  "It works on my machine. — every developer, eventually",
  "There are two hard things: cache invalidation, naming things, and off-by-one errors.",
  "Premature optimisation is the root of all evil — but measure first.",
  "Linux is only free if your time has no value. Mine is well spent, though.",
  "A good commit message is a gift to your future self.",
  "In Unix, everything is a file. In my portfolio, everything is a project.",
  "sudo make me a sandwich.",
];
def("fortune", "fortune", "a random quote", () => ok([FORTUNES[Math.floor(Math.random() * FORTUNES.length)]]));

def("sl", "sl", "you meant ls, didn't you", () =>
  ok(["      ====        ________                ___________", "  _D _|  |_______/        \\__I_I_____===__|_________|", "   |(_)---  |   H\\________/ |   |        =|___ ___|", "   /     |  |   H  |  |     |   |         ||_| |_||", "  |      |  |   H  |__--------------------| [___] |", "  | ________|___H__/__|_____/[][]~\\_______|       |", "  |/ |   |-----------I_____I [][] []  D   |=======|__", "", "(choo choo — it's `ls`, with a typo)"].map((l) => T(l, "c-yellow"))));

def("ps", "ps", "list processes (simulated)", () =>
  ok(["  PID TTY          TIME CMD", "    1 ?        00:00:01 Hyprland", "   42 ?        00:00:00 waybar", "  101 pts/0    00:00:00 aathi-sh", "  202 pts/0    00:00:00 ps"]));
def("top", "top", "process snapshot (simulated)", () =>
  ok([T("top - simulated snapshot (nothing here measures your real machine)", "c-sub"), "  PID USER     %CPU %MEM COMMAND", "    1 aathi     1.2  0.8 Hyprland", "   42 aathi     0.4  0.3 waybar", "  101 aathi     0.1  0.2 aathi-sh", "  777 aathi     3.9  4.1 nvim"]));
alias("htop", "top");
def("free", "free [-h]", "memory usage (simulated)", () =>
  ok(["               total        used        free", "Mem:           15Gi       4.1Gi       9.8Gi", "Swap:         2.0Gi          0B       2.0Gi"]));
def("df", "df [-h]", "disk usage (simulated)", () =>
  ok(["Filesystem      Size  Used Avail Use% Mounted on", "/dev/sda2       234G   88G  135G  40% /", "/dev/sda1       512M  120M  392M  24% /boot"]));

const noNet = (n) => () => err(`${n}: network access is disabled — everything stays in your browser`);
def("ping", "ping <host>", "disabled in the sandbox", noNet("ping"));
def("curl", "curl <url>", "disabled in the sandbox", noNet("curl"));
def("wget", "wget <url>", "disabled in the sandbox", noNet("wget"));

const ed = (n) => () => ok([T(`${n}: this simulated session has no editor — use \`cat\` to read and \`echo "text" > file\` to write.`, "c-yellow"), n === "vim" || n === "vi" ? T("(and no, you still can't quit vim from here — that's :q!, but I'd miss you.)", "c-sub") : ""]);
for (const e of ["vim", "vi", "nvim", "nano", "emacs"]) def(e, `${e} <file>`, "editor (not available here)", ed(e));

def("sudo", "sudo <command>", "nice try", () => err("aathi is not in the sudoers file. This incident will be reported. (…to nobody; it's a toy.)"));
def("exit", "exit", "leave the session", () => ok([T("logout: you can't leave a portfolio — try `goto contact` instead.", "c-yellow")]));
alias("logout", "exit");
alias("ll", "ls", ["-l"]);
alias("la", "ls", ["-a"]);

export const COMMAND_NAMES = Object.keys(C);

/* ---------- execution ---------- */
export function runLine(S, line, api) {
  const parsed = parse(line, S.env);
  if (parsed.error) return { out: [T(`aathi-sh: ${parsed.error}`, "c-red")], actions: [] };
  let stdin = null, out = [], code = 0;
  const actions = [];
  for (const st of parsed.stages) {
    const name = st.argv[0];
    const cmd = C[name];
    let res;
    if (!cmd) {
      const near = COMMAND_NAMES.filter((c) => !C[c].hidden && lev(c, name) <= 2).sort((a, b) => lev(a, name) - lev(b, name))[0];
      res = { out: [T(`aathi-sh: ${name}: command not found${near ? ` — did you mean '${near}'?` : " — try `help`"}`, "c-red")], code: 127 };
    } else {
      const argv = name === "grep" || name === "find" ? st.argv.slice(1) : expandGlobs(st.argv.slice(1), S);
      res = cmd.fn({ argv, stdin, S, api }) || ok();
    }
    if (res.cwd) { S.oldcwd = S.cwd; S.cwd = res.cwd; }
    if (res.action) actions.push(res.action);
    code = res.code ?? 0;
    if (st.redirect) {
      const e = writeFile(S, st.redirect.target, res.out.map(toText).join("\n") + (res.out.length ? "\n" : ""), st.redirect.op === ">>");
      out = e ? [T(`aathi-sh: ${e}`, "c-red")] : [];
    } else out = res.out;
    stdin = out.map(toText);
  }
  S.lastCode = code;
  return { out, actions };
}

/* ---------- tab completion ---------- */
export function complete(S, input) {
  const m = input.match(/^(.*?)(\S*)$/s);
  const head = m[1], tok = m[2];
  const isCmd = !/\S/.test(head) || /[|]\s*$/.test(head);
  let cands;
  if (isCmd) cands = COMMAND_NAMES.filter((c) => !C[c].hidden && c.startsWith(tok));
  else {
    const slash = tok.lastIndexOf("/");
    const dirPart = slash >= 0 ? tok.slice(0, slash + 1) : "", base = slash >= 0 ? tok.slice(slash + 1) : tok;
    const node = getNode(S.fs, normalize(S.cwd, dirPart || "."));
    cands = node && node.t === "d"
      ? Object.keys(node.c).filter((n) => n.startsWith(base) && (!n.startsWith(".") || base.startsWith("."))).sort().map((n) => dirPart + n + (node.c[n].t === "d" ? "/" : ""))
      : [];
  }
  if (!cands.length) return { line: input, options: [] };
  let common = cands[0];
  for (const c of cands) while (!c.startsWith(common)) common = common.slice(0, -1);
  const single = cands.length === 1;
  return { line: head + (single && isCmd ? common + " " : common), options: single ? [] : cands };
}
