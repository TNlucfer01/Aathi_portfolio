// A tiny in-memory Linux filesystem for the simulated shell. Nothing here touches
// a real machine. Project directories mirror the REAL repo trees (repos.json).
import repos from "../data/repos.json";
import { projects, community, GH } from "../data/projects";
import { about, skills, CATS, profile, socials } from "../data/system";

export const HOME = "/home/aathi";

const d = (c = {}) => ({ t: "d", c });
const f = (v, extra) => ({ t: "f", v, ...extra });

export function wrap(text, width = 76) {
  const out = [];
  for (const para of text.split("\n")) {
    let line = "";
    for (const w of para.split(/\s+/)) {
      if ((line + " " + w).trim().length > width) { out.push(line); line = w; }
      else line = (line ? line + " " : "") + w;
    }
    out.push(line);
  }
  return out.join("\n");
}

function treeToNode(entries, repo, prefix = "") {
  const c = {};
  for (const e of entries) {
    if (e.more) continue;
    const path = prefix + e.n;
    c[e.n] = e.d
      ? treeToNode(e.c || [], repo, path + "/")
      : f(null, { url: `${GH}${repo}/blob/HEAD/${path}` });
  }
  return d(c);
}

function readme(p, r) {
  const span = r ? `${r.first} → ${r.last}` : "";
  return [
    `# ${p.name}`, "", wrap(p.blurb), "", wrap(p.details), "",
    `stack:    ${p.stack.join(", ")}`,
    `repo:     ${GH}${p.repo}`,
    r ? `commits:  ${r.mine} of ${r.commits} are mine (${span})` : "",
    "",
    "tip: `git log`, `tree -L 2`, or `open .` to jump to this repo on GitHub.",
  ].filter((x, i, a) => !(x === "" && a[i - 1] === "")).join("\n") + "\n";
}

export function buildFs() {
  const projDir = {}, labDir = {};
  for (const p of projects) {
    const r = repos[p.id];
    const node = r ? treeToNode(r.tree, p.repo) : d();
    node.c["README.generated.md"] = f(readme(p, r));
    (p.group === "labs" ? labDir : projDir)[p.repo] = node;
  }

  const communityDir = {};
  for (const c of community)
    communityDir[c.repo + ".txt"] = f(`${c.repo}  [${c.kind}]\n\n${wrap(c.blurb)}\n\n${GH}${c.repo}\n`);

  const skillsDir = {};
  for (const cat of CATS) {
    const rows = skills.filter((s) => s.cat === cat.cat).map((s) => {
      const used = s.repos.map((id) => projects.find((p) => p.id === id)?.repo).filter(Boolean);
      return `${s.name.padEnd(26)} ${used.length ? used.join(", ") : s.note || ""}`;
    });
    skillsDir[cat.cat + ".txt"] = f(`# ${cat.label}\n# skill, then the repos that show it\n\n${rows.join("\n")}\n`);
  }

  const contactDir = {
    "links.txt": f(socials.map((s) => `${s.label.padEnd(10)} ${s.href}`).join("\n") + "\n"),
    "email.txt": f(`${profile.email}\n`),
  };

  const hyprConf = `# Illustrative sample, trimmed — not my actual rc file.
general {
    gaps_in = 5
    gaps_out = 10
    border_size = 2
    col.active_border = rgba(cba6f7ee) rgba(89b4faee) 45deg
    layout = dwindle
}
decoration {
    rounding = 12
    blur { enabled = true; size = 8; passes = 2 }
}
animations { enabled = true }
bind = SUPER, 1, workspace, 1
bind = SUPER, 2, workspace, 2
bind = SUPER, 3, workspace, 3
`;

  return d({
    home: d({
      aathi: d({
        "about.txt": f(about.join("\n") + "\n"),
        "README.md": f(
          `# Welcome to my simulated session\n\nEverything here runs in your browser; no real commands are executed.\n\n` +
          `explore:\n  ls, cd, cat, tree, find, grep   look around\n  git log                          inside any project dir\n` +
          `  open <project>                   opens the repo on GitHub\n  theme / opacity                  restyle the desktop\n` +
          `  hyprctl workspaces               switch workspaces\n  help                             every command\n`),
        ".bashrc": f("# nothing to see here... or is there?\n# look in ~/.secret\n"),
        ".config": d({ hypr: d({ "hyprland.conf": f(hyprConf) }) }),
        ".secret": d({ "flag.txt": f("FLAG{you_actually_read_the_dotfiles}\nHire me. :)\n") }),
        projects: d(projDir),
        labs: d(labDir),
        community: d(communityDir),
        skills: d(skillsDir),
        contact: d(contactDir),
      }),
    }),
    etc: d({
      hostname: f(`${profile.host}\n`),
      "os-release": f('NAME="Portfolio Linux"\nPRETTY_NAME="Portfolio Linux (simulated session)"\nID=portfolio\n'),
      motd: f("Welcome. This is a toy Linux session running in your browser.\n"),
    }),
    tmp: d(),
    var: d({ log: d({ "portfolio.log": f("[ok] desktop started\n[ok] projects mounted from github.com/TNlucfer01\n") }) }),
  });
}

/* ---------- path helpers ---------- */
export function normalize(cwd, p, home = HOME) {
  if (!p || p === "~") return home;
  if (p.startsWith("~/")) p = home + p.slice(1);
  const parts = (p.startsWith("/") ? p : `${cwd}/${p}`).split("/");
  const out = [];
  for (const s of parts) {
    if (!s || s === ".") continue;
    if (s === "..") out.pop();
    else out.push(s);
  }
  return "/" + out.join("/");
}
export function getNode(fs, path) {
  let n = fs;
  for (const s of path.split("/").filter(Boolean)) {
    if (!n || n.t !== "d" || !n.c[s]) return null;
    n = n.c[s];
  }
  return n;
}
export function parentOf(path) {
  const parts = path.split("/").filter(Boolean);
  const name = parts.pop();
  return { dir: "/" + parts.join("/"), name };
}
export const isWritable = (path) => path === HOME || path.startsWith(HOME + "/") || path === "/tmp" || path.startsWith("/tmp/");
export const prettyPath = (p) => (p === HOME ? "~" : p.startsWith(HOME + "/") ? "~" + p.slice(HOME.length) : p);
