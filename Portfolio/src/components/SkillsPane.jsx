import { motion } from "framer-motion";
import { skills } from "../data/system";

const GROUPS = [
  { cat: "systems", label: "systems / linux", color: "var(--green)" },
  { cat: "lang", label: "languages", color: "var(--peach)" },
  { cat: "web", label: "web", color: "var(--blue)" },
  { cat: "ai", label: "ai / ml", color: "var(--mauve)" },
  { cat: "data", label: "data", color: "var(--teal)" },
  { cat: "tools", label: "tools", color: "var(--yellow)" },
];

function Bar({ s, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs sm:text-sm mb-1">
        <span className="c-text">{s.name}</span>
        <span className="c-sub">{s.level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface0)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${s.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function SkillsPane() {
  return (
    <div className="p-4 sm:p-6">
      <p className="c-sub text-sm mb-5">
        <span className="c-mauve">$</span> ls -l ~/.skills
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2">
        {GROUPS.map((g) => {
          const items = skills.filter((s) => s.cat === g.cat);
          if (!items.length) return null;
          return (
            <div key={g.cat} className="mb-4">
              <h3 className="text-sm mb-3" style={{ color: g.color }}>
                 {g.label}
              </h3>
              {items.map((s) => (
                <Bar key={s.name} s={s} color={g.color} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
