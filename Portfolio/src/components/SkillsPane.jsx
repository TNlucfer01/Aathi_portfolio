import { useState } from "react";
import { skills, CATS } from "../data/system";
import { byId } from "../data/projects";

// Skills are shown as evidence, not self-scored bars: pick one to see the repos that use it.
export default function SkillsPane({ onOpenProject }) {
  const [sel, setSel] = useState(null);
  const cur = skills.find((s) => s.name === sel);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 min-h-0 overflow-auto p-4 sm:p-6">
        <p className="c-sub text-sm mb-1">
          <span className="c-mauve">$</span> ls ~/skills
        </p>
        <p className="c-dim text-xs mb-5">No self-rated percentages — pick a skill to see the projects that actually use it.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
          {CATS.map((g) => (
            <section key={g.cat} aria-label={g.label}>
              <h3 className="text-sm mb-2.5" style={{ color: `var(--${g.color})` }}>{g.label}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.filter((s) => s.cat === g.cat).map((s) => {
                  const on = s.name === sel;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setSel(on ? null : s.name)}
                      aria-pressed={on}
                      className="text-xs sm:text-[13px] px-3 py-1.5 rounded-full transition-all"
                      style={{
                        background: on ? `var(--${g.color})` : "color-mix(in srgb, var(--surface0) 85%, transparent)",
                        color: on ? "var(--crust)" : "var(--text)",
                        boxShadow: on ? "none" : `inset 0 0 0 1px color-mix(in srgb, var(--${g.color}) 35%, transparent)`,
                        fontWeight: on ? 700 : 400,
                      }}
                    >
                      {s.name}
                      {s.repos.length > 0 && <span className="ml-1.5 opacity-70">{s.repos.length}</span>}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* detail strip */}
      <div
        className="glass-inset shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm min-h-[3.5rem]"
        style={{ borderTop: "1px solid color-mix(in srgb, var(--surface1) 55%, transparent)" }}
        aria-live="polite"
      >
        {!cur && <span className="c-dim">select a skill ↑</span>}
        {cur && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="c-text font-bold">{cur.name}</span>
            {cur.repos.length === 0 && <span className="c-sub">{cur.note}</span>}
            {cur.repos.map((id) => (
              <button
                key={id}
                onClick={() => onOpenProject(id)}
                className="px-2.5 py-1 rounded-full c-sky hover:brightness-125 transition"
                style={{ background: "color-mix(in srgb, var(--surface0) 85%, transparent)" }}
              >
                {byId[id].repo} →
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
