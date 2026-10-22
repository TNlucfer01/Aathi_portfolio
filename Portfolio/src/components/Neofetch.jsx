import { profile, about } from "../data/system";
import { projects, community } from "../data/projects";
import repos from "../data/repos.json";

const TUX = ["    .--.    ", "   |o_o |   ", "   |:_/ |   ", "  //   \\ \\  ", " (|     | ) ", "/'\\_   _/`\\ ", "\\___)=(___/ "];

// real: the most recent commit of mine across every repo, from repos.json
const latest = Object.values(repos)
  .flatMap((r) => r.log.map((l) => ({ ...l, repo: r.repo })))
  .sort((a, b) => b.d.localeCompare(a.d))[0];

// about[] is hard-wrapped for the terminal's `cat`; here it reflows to any width
const paragraphs = about.join("\n").split("\n\n").map((p) => p.replace(/\n/g, " "));

function Row({ k, v }) {
  return (
    <div className="flex gap-2">
      <span className="c-mauve w-20 shrink-0">{k}</span>
      <span className="c-text min-w-0 break-words">{v}</span>
    </div>
  );
}

export default function Neofetch() {
  const nProj = projects.filter((p) => p.group === "projects").length;
  const nLab = projects.filter((p) => p.group === "labs").length;
  return (
    <div className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <pre className="c-blue text-[11px] sm:text-xs leading-[1.15] shrink-0 select-none" aria-hidden="true">
          {TUX.join("\n")}
        </pre>
        <div className="min-w-0">
          <p>
            <span className="c-green font-bold">{profile.user}</span>
            <span className="c-sub">@</span>
            <span className="c-green font-bold">{profile.host}</span>
          </p>
          <p className="c-dim mb-1.5">{"─".repeat(17)}</p>
          <Row k="name" v={profile.name} />
          <Row k="role" v={profile.title} />
          <Row k="wm" v={profile.wm} />
          <Row k="editor" v={profile.editor} />
          <Row k="from" v={profile.location} />
          <Row k="status" v={profile.status} />
          <Row k="repos" v={`${nProj} projects · ${nLab} labs · ${community.length} forks & collabs`} />
          <Row k="latest" v={`${latest.d} · ${latest.repo}`} />
          <div className="flex gap-1 mt-3" aria-hidden="true">
            {["red", "peach", "yellow", "green", "teal", "blue", "mauve", "pink"].map((c) => (
              <span key={c} className="w-4 h-4 rounded-sm" style={{ background: `var(--${c})` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4" style={{ borderTop: "1px solid color-mix(in srgb, var(--surface1) 60%, transparent)" }}>
        <p className="mb-2">
          <span className="c-mauve">$</span> <span className="c-green">cat</span> about.txt
        </p>
        <div className="c-text space-y-3">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  );
}
