import { AnimatePresence, motion } from "framer-motion";
import { Folder, FolderGit2, GitBranch, ExternalLink, SquareTerminal, Users } from "lucide-react";
import { projects, community, byId, GH } from "../data/projects";
import { shots } from "../data/shots";
import repos from "../data/repos.json";

const MIX_COLORS = ["green", "blue", "peach", "mauve"];

// flatten the real repo tree (depth 2, capped) into printable rows
function treeRows(entries, prefix = "", depth = 0, out = []) {
  entries.forEach((e, i) => {
    if (out.length >= 22) return;
    const last = i === entries.length - 1;
    out.push({ pre: prefix + (last ? "└── " : "├── "), name: e.n, dir: !!e.d, more: !!e.more });
    if (e.d && depth < 1) treeRows(e.c || [], prefix + (last ? "    " : "│   "), depth + 1, out);
  });
  return out;
}

const span = (r) => (r.first && r.last ? `${r.first.slice(0, 7)} → ${r.last.slice(0, 7)}` : "");

function ListItem({ p, on, onSelect }) {
  const Icon = on ? FolderGit2 : Folder;
  return (
    <button
      onClick={() => onSelect(p.id)}
      aria-current={on ? "true" : undefined}
      className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
      style={{
        background: on ? "color-mix(in srgb, var(--accent) 22%, transparent)" : "transparent",
        color: on ? "var(--text)" : "var(--subtext)",
      }}
    >
      <Icon size={14} className="shrink-0" style={{ color: on ? "var(--accent)" : "var(--overlay0)" }} aria-hidden="true" />
      <span className="truncate">{p.repo}</span>
    </button>
  );
}

export default function ProjectsPane({ selected, onSelect, onOpenInTerminal }) {
  const p = byId[selected] || projects[0];
  const r = repos[p.id];
  const shot = shots[p.id];
  const rows = r ? treeRows(r.tree) : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[15.5rem_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] md:grid-rows-1 h-full min-h-0">
      {/* file list */}
      <nav
        aria-label="Projects"
        className="glass-inset overflow-auto p-2 text-xs sm:text-sm max-h-40 md:max-h-none md:border-r"
        style={{ borderColor: "color-mix(in srgb, var(--surface1) 55%, transparent)" }}
      >
        <p className="c-dim px-2 py-1 text-[11px] tracking-wide">~/projects</p>
        {projects.filter((x) => x.group === "projects").map((x) => <ListItem key={x.id} p={x} on={x.id === p.id} onSelect={onSelect} />)}
        <p className="c-dim px-2 py-1 mt-3 text-[11px] tracking-wide">~/labs</p>
        {projects.filter((x) => x.group === "labs").map((x) => <ListItem key={x.id} p={x} on={x.id === p.id} onSelect={onSelect} />)}
        <p className="c-dim px-2 py-1 mt-3 text-[11px] tracking-wide">~/community</p>
        {community.map((c) => (
          <a
            key={c.repo}
            href={GH + c.repo}
            target="_blank"
            rel="noopener noreferrer"
            title={c.blurb}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg c-sub hover:text-[var(--teal)] transition-colors"
          >
            <Users size={14} className="shrink-0 c-dim" aria-hidden="true" />
            <span className="truncate">{c.repo}</span>
          </a>
        ))}
      </nav>

      {/* detail */}
      <div className="overflow-auto min-h-0 p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="max-w-4xl"
          >
            <h2 className="text-lg sm:text-2xl c-text leading-tight">{p.name}</h2>
            <p className="c-dim text-xs mt-1">
              <span className="c-mauve">$</span> cd ~/{p.group}/{p.repo}
            </p>

            {r && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full" style={{ background: "color-mix(in srgb, var(--surface0) 85%, transparent)" }}>
                  <GitBranch size={12} className="inline -mt-0.5 mr-1 c-accent" aria-hidden="true" />
                  {r.mine === r.commits ? `${r.commits} commits, all mine` : `${r.mine} of ${r.commits} commits are mine`}
                </span>
                <span className="px-2.5 py-1 rounded-full c-sub" style={{ background: "color-mix(in srgb, var(--surface0) 85%, transparent)" }}>{span(r)}</span>
                {p.team && <span className="px-2.5 py-1 rounded-full c-peach" style={{ background: "color-mix(in srgb, var(--surface0) 85%, transparent)" }}>team project</span>}
              </div>
            )}

            {r?.mix?.length > 0 && (
              <div className="mt-3" aria-label={`Language mix: ${r.mix.map((m) => `${m.lang} ${m.pct}%`).join(", ")}`}>
                <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
                  {r.mix.map((m, i) => <span key={m.lang} style={{ width: `${m.pct}%`, background: `var(--${MIX_COLORS[i]})` }} />)}
                </div>
                <p className="mt-1.5 text-[11px] c-sub flex flex-wrap gap-x-3">
                  {r.mix.map((m, i) => <span key={m.lang}><span style={{ color: `var(--${MIX_COLORS[i]})` }}>●</span> {m.lang} {m.pct}%</span>)}
                  <span className="c-dim">· share of source files</span>
                </p>
              </div>
            )}

            <p className="c-text text-sm sm:text-base leading-relaxed mt-5">{p.blurb}</p>
            <p className="c-sub text-sm leading-relaxed mt-3">{p.details}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {p.stack.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "color-mix(in srgb, var(--surface0) 85%, transparent)", color: "var(--sky)" }}>{s}</span>
              ))}
            </div>

            {shot && (
              <figure className="mt-6">
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid color-mix(in srgb, var(--surface1) 70%, transparent)", background: "var(--crust)" }}>
                  <img src={shot.src} alt={shot.alt} loading="lazy" className="w-full h-auto block" />
                </div>
                <figcaption className="text-[11px] c-dim mt-2">{shot.caption}</figcaption>
              </figure>
            )}

            <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
              {r?.log?.length > 0 && (
                <section aria-label="Recent commits" className="rounded-xl p-3.5 text-xs glass-inset" style={{ border: "1px solid color-mix(in srgb, var(--surface1) 55%, transparent)" }}>
                  <p className="mb-2"><span className="c-mauve">$</span> git log --oneline</p>
                  {r.log.map((c) => (
                    <p key={c.h} className="truncate"><span className="c-yellow">{c.h}</span> <span className="c-dim">{c.d}</span> <span className="c-text">{c.s}</span></p>
                  ))}
                </section>
              )}
              {rows.length > 0 && (
                <section aria-label="Repository file tree" className="rounded-xl p-3.5 text-xs glass-inset overflow-hidden" style={{ border: "1px solid color-mix(in srgb, var(--surface1) 55%, transparent)" }}>
                  <p className="mb-2"><span className="c-mauve">$</span> tree -L 2</p>
                  <div className="whitespace-pre overflow-x-auto">
                    {rows.map((x, i) => (
                      <div key={i}><span className="c-dim">{x.pre}</span><span className={x.dir ? "c-blue" : x.more ? "c-dim" : "c-text"}>{x.name}{x.dir ? "/" : ""}</span></div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={GH + p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:brightness-125"
                style={{ background: "var(--accent)", color: "var(--crust)", fontWeight: 700 }}
              >
                <ExternalLink size={15} aria-hidden="true" /> View on GitHub
              </a>
              <button
                onClick={() => onOpenInTerminal(p)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:brightness-125"
                style={{ background: "color-mix(in srgb, var(--surface0) 90%, transparent)", color: "var(--text)" }}
              >
                <SquareTerminal size={15} className="c-accent" aria-hidden="true" /> Explore in terminal
              </button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
