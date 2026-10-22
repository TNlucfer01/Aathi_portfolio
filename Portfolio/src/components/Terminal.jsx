import { useEffect, useRef, useState } from "react";
import { profile } from "../data/system";
import { projects } from "../data/projects";

const PROMPT = (
  <>
    <span className="c-green">{profile.user}@{profile.host}</span>
    <span className="c-sub"> ~ </span>
    <span className="c-mauve"> </span>
  </>
);

const HELP = [
  "available commands:",
  "  help            show this message",
  "  about           who is aathi",
  "  projects        list featured projects",
  "  skills          what i work with",
  "  neofetch        system info",
  "  social          links to find me",
  "  goto <ws>       jump to a workspace (projects|skills|contact)",
  "  clear           clear the screen",
  "  sudo rm -rf /   don't.",
];

export default function Terminal({ onGoto, big = false }) {
  const [lines, setLines] = useState([
    { t: "out", c: "c-sub", v: `Welcome to aathi-os ${profile.wm} session. Type 'help' to begin.` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hi, setHi] = useState(-1);
  const endRef = useRef(null);
  const inRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const push = (arr) => setLines((p) => [...p, ...arr]);

  const run = (raw) => {
    const cmd = raw.trim();
    const echo = { t: "in", v: cmd };
    if (!cmd) return setLines((p) => [...p, echo]);
    setHistory((h) => [cmd, ...h]);
    const [name, ...args] = cmd.split(/\s+/);
    let out = [];
    switch (name.toLowerCase()) {
      case "help":
        out = HELP.map((v) => ({ t: "out", c: "c-sub", v }));
        break;
      case "about":
        out = [
          { t: "out", c: "c-text", v: `${profile.name} — ${profile.title}, ${profile.location}.` },
          { t: "out", c: "c-sub", v: "Linux-first developer: Arch, Hyprland, Neovim. Builds full-stack web, AI/LLM tools and C systems software." },
        ];
        break;
      case "projects":
        out = projects
          .filter((p) => p.featured)
          .map((p) => ({ t: "out", c: "c-text", v: `  ${p.file.padEnd(22)} ${p.name}` }));
        out.unshift({ t: "out", c: "c-green", v: "featured projects (see workspace 2 for all):" });
        break;
      case "skills":
        out = [
          { t: "out", c: "c-green", v: "systems: Linux · C · Bash · Neovim" },
          { t: "out", c: "c-blue", v: "web:     React · Django · Node · Spring Boot · Tailwind" },
          { t: "out", c: "c-mauve", v: "ai:      PyTorch · RAG · LLM tooling · Ollama" },
        ];
        break;
      case "neofetch":
        out = [{ t: "out", c: "c-blue", v: `${profile.user}@${profile.host} · ${profile.distro} · ${profile.wm} · ${profile.editor}` }];
        break;
      case "social":
        out = [
          { t: "out", c: "c-text", v: "github:   github.com/TNlucfer01" },
          { t: "out", c: "c-text", v: "linkedin: linkedin.com/in/aathisenthil" },
          { t: "out", c: "c-text", v: `email:    ${profile.email}` },
        ];
        break;
      case "goto": {
        const map = { projects: 1, skills: 2, contact: 3 };
        const w = map[(args[0] || "").toLowerCase()];
        if (w != null) {
          out = [{ t: "out", c: "c-green", v: `switching to ${args[0]}...` }];
          onGoto?.(w);
        } else {
          out = [{ t: "out", c: "c-red", v: "usage: goto projects|skills|contact" }];
        }
        break;
      }
      case "clear":
        setLines([]);
        return;
      case "sudo":
        out = [{ t: "out", c: "c-red", v: "nice try. this incident will be reported. 🙂" }];
        break;
      case "ls":
        out = [{ t: "out", c: "c-blue", v: "about.txt  projects/  skills/  contact/  resume.pdf" }];
        break;
      case "whoami":
        out = [{ t: "out", c: "c-text", v: profile.user }];
        break;
      default:
        out = [{ t: "out", c: "c-red", v: `command not found: ${name} — try 'help'` }];
    }
    push([echo, ...out]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHi(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((i) => {
        const n = Math.min(i + 1, history.length - 1);
        if (history[n] != null) setInput(history[n]);
        return n;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((i) => {
        const n = Math.max(i - 1, -1);
        setInput(n === -1 ? "" : history[n] || "");
        return n;
      });
    }
  };

  return (
    <div
      className={`p-3 sm:p-4 text-xs sm:text-sm font-mono ${big ? "min-h-full" : ""}`}
      onClick={() => inRef.current?.focus()}
    >
      {lines.map((l, i) =>
        l.t === "in" ? (
          <p key={i} className="whitespace-pre-wrap break-words">
            {PROMPT}
            <span className="c-text">{l.v}</span>
          </p>
        ) : (
          <p key={i} className={`whitespace-pre-wrap break-words ${l.c || "c-sub"}`}>
            {l.v}
          </p>
        )
      )}
      <div className="flex items-center flex-wrap">
        {PROMPT}
        <input
          ref={inRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal input"
          className="flex-1 min-w-[6ch] bg-transparent outline-none c-text caret-transparent"
        />
        <span className="cursor-blink" aria-hidden="true" />
      </div>
      <div ref={endRef} />
    </div>
  );
}
