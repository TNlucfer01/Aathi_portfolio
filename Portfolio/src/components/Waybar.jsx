import { useEffect, useState } from "react";
import { profile } from "../data/system";

const ICONS = { battery: "", net: "", vol: "", cpu: "" };

export default function Waybar({ workspaces, active, onSelect, onHelp }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "short", day: "2-digit", month: "short" });

  return (
    <header
      className="glass shrink-0 flex items-center gap-2 px-2 sm:px-3 h-11 text-xs sm:text-sm z-30"
      style={{ borderBottom: "1px solid var(--surface0)" }}
    >
      {/* distro logo */}
      <span className="px-2 py-1 rounded-md hidden sm:inline" style={{ color: "var(--blue)" }}>

      </span>

      {/* workspaces */}
      <nav className="flex items-center gap-1" aria-label="Workspaces">
        {workspaces.map((ws, i) => {
          const on = i === active;
          return (
            <button
              key={ws.id}
              onClick={() => onSelect(i)}
              title={`Super + ${i + 1} — ${ws.label}`}
              className="px-2 sm:px-2.5 py-1 rounded-md transition-all duration-150"
              style={{
                background: on ? "color-mix(in srgb, var(--accent) 22%, transparent)" : "transparent",
                color: on ? "var(--accent)" : "var(--overlay0)",
                boxShadow: on ? "inset 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent)" : "none",
              }}
            >
              <span className="hidden sm:inline">{ws.icon} </span>
              {i + 1}
            </button>
          );
        })}
      </nav>

      {/* active window title */}
      <span className="mx-2 c-sub truncate hidden md:block">
        {workspaces[active].icon} {workspaces[active].label}
      </span>

      {/* right cluster */}
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          onClick={onHelp}
          className="px-2 py-1 rounded-md transition-colors"
          style={{ color: "var(--subtext)" }}
          title="Keybinds (Super + /)"
        >
          <span className="hidden sm:inline">keybinds </span>?
        </button>
        <span className="hidden lg:flex items-center gap-3 c-sub">
          <span>{ICONS.cpu} {profile.wm}</span>
          <span>{ICONS.net} up</span>
          <span>{ICONS.battery} 98%</span>
        </span>
        <span
          className="px-2.5 py-1 rounded-md"
          style={{ background: "var(--surface0)", color: "var(--text)" }}
        >
          {date} · {time}
        </span>
      </div>
    </header>
  );
}
