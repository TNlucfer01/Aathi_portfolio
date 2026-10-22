import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, contributions } from "../data/projects";

export default function ProjectsPane() {
  const [sel, setSel] = useState(projects[0].id);
  const active = projects.find((p) => p.id === sel) || projects[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,15rem)_1fr] h-full min-h-0">
      {/* file list (left) */}
      <div
        className="overflow-auto p-2 text-xs sm:text-sm md:border-r"
        style={{ borderColor: "var(--surface0)", background: "var(--mantle)" }}
      >
        <p className="c-sub px-2 py-1">~/projects</p>
        {projects.map((p) => {
          const on = p.id === sel;
          return (
            <button
              key={p.id}
              onClick={() => setSel(p.id)}
              className="w-full text-left px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors"
              style={{
                background: on ? "color-mix(in srgb, var(--accent) 20%, transparent)" : "transparent",
                color: on ? "var(--text)" : "var(--subtext)",
              }}
            >
              <span style={{ color: on ? "var(--accent)" : "var(--overlay0)" }}>
                {p.featured ? "" : ""}
              </span>
              <span className="truncate">{p.file}</span>
            </button>
          );
        })}

        <p className="c-sub px-2 py-1 mt-3">~/contributions</p>
        {contributions.map((c) => (
          <a
            key={c.name}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-2 py-1.5 rounded-md c-sub hover:text-[var(--teal)] truncate"
            title={c.blurb}
          >
             {c.name}
          </a>
        ))}
      </div>

      {/* preview (right) */}
      <div className="overflow-auto p-4 sm:p-6 min-h-0">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h2 className="text-lg sm:text-2xl c-text">{active.name}</h2>
              <span className="text-xs c-sub">{active.year} · {active.role}</span>
            </div>
            <p className="c-sub text-sm mb-4">
              <span className="c-mauve">$</span> cat {active.file}
            </p>

            <p className="c-text text-sm sm:text-base leading-relaxed mb-4">{active.blurb}</p>
            <p className="c-sub text-sm leading-relaxed mb-5">{active.details}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {active.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "var(--surface0)", color: "var(--sky)" }}
                >
                  {s}
                </span>
              ))}
            </div>

            <a
              href={active.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150"
              style={{ background: "var(--surface0)", color: "var(--text)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--glow)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
               View on GitHub <span className="c-sub">↗</span>
            </a>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
