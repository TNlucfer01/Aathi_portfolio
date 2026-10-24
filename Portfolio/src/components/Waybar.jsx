import { useEffect, useState } from "react";
import { Home, FolderGit2, Cpu, Mail, SquareTerminal, Palette, Keyboard } from "lucide-react";

const ICONS = { home: Home, projects: FolderGit2, skills: Cpu, contact: Mail, term: SquareTerminal };

export default function Waybar({ workspaces, active, onSelect, onHelp, theme, onCycleTheme }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "short", day: "2-digit", month: "short" });

  return (
    <header
      className="glass relative z-30 shrink-0 flex items-center gap-1.5 px-2 h-11 mx-[var(--gap)] mt-[var(--gap)] rounded-full text-xs sm:text-sm overflow-hidden"
      style={{ border: "1px solid color-mix(in srgb, var(--surface1) 70%, transparent)" }}
    >
      <span className="hidden sm:flex items-center gap-2 pl-2 pr-3 c-accent font-bold tracking-tight">
        <SquareTerminal size={16} aria-hidden="true" /> aathi
      </span>

      <nav className="flex items-center gap-1" aria-label="Workspaces">
        {workspaces.map((ws, i) => {
          const on = i === active, Icon = ICONS[ws.id];
          return (
            <button
              key={ws.id}
              onClick={() => onSelect(i)}
              title={`Alt + ${i + 1} — ${ws.label}`}
              aria-label={`Workspace ${i + 1}: ${ws.label}`}
              aria-current={on ? "page" : undefined}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: on ? "var(--accent)" : "transparent",
                color: on ? "var(--crust)" : "var(--subtext)",
                fontWeight: on ? 700 : 400,
              }}
            >
              <Icon size={14} aria-hidden="true" />
              <span className={on ? "hidden sm:inline" : "hidden md:inline"}>{on ? ws.label : i + 1}</span>
            </button>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          onClick={onHelp}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full c-sub hover:text-[var(--text)] transition-colors"
          title="Keybinds (Alt + /)"
          aria-label="Show keybinds"
        >
          <Keyboard size={14} aria-hidden="true" />
          <span className="hidden lg:inline">keys</span>
        </button>
        <button
          onClick={onCycleTheme}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors"
          style={{ background: "color-mix(in srgb, var(--surface0) 80%, transparent)", color: "var(--text)" }}
          title="Click to cycle themes (or type `theme` in the terminal)"
          aria-label={`Theme: ${theme}. Click to change.`}
        >
          <Palette size={14} className="c-accent" aria-hidden="true" />
          <span className="hidden sm:inline">{theme}</span>
        </button>
        <span
          className="px-3 py-1.5 rounded-full whitespace-nowrap"
          style={{ background: "color-mix(in srgb, var(--surface0) 80%, transparent)", color: "var(--text)" }}
        >
          <span className="hidden sm:inline">{date} · </span>{time}
        </span>
      </div>
    </header>
  );
}
