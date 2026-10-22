import { motion } from "framer-motion";

/**
 * A Hyprland-style window: translucent glass, rounded, with a slim title row.
 * The focused window gets the rotating gradient border (see .win-active in CSS).
 * Pass onFocus to get focus-follows-mouse behaviour like a real tiling WM.
 */
export default function Window({ title, icon, tag, active = true, className = "", bodyClassName = "", onFocus, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      className={`win ${active ? "win-active" : ""} min-h-0 ${className}`}
      onMouseEnter={onFocus}
      onFocusCapture={onFocus}
    >
      {active && <span className="ring" aria-hidden="true"><i className="ring-spin" /></span>}
      <div className="glass h-full min-h-0 flex flex-col overflow-hidden" style={{ borderRadius: "inherit" }}>
        <header
          className="glass-head flex items-center gap-2 px-3.5 h-9 shrink-0 select-none"
          style={{ borderBottom: "1px solid color-mix(in srgb, var(--surface1) 55%, transparent)" }}
        >
          {icon && <span className="c-accent flex items-center">{icon}</span>}
          <span className="text-xs sm:text-[13px] c-sub truncate">{title}</span>
          {tag && (
            <span
              className="ml-auto text-[10px] px-2 py-0.5 rounded-full shrink-0"
              style={{ background: "color-mix(in srgb, var(--surface0) 80%, transparent)", color: "var(--accent)" }}
            >
              {tag}
            </span>
          )}
        </header>
        <div className={`flex-1 min-h-0 overflow-auto ${bodyClassName}`}>{children}</div>
      </div>
    </motion.section>
  );
}
