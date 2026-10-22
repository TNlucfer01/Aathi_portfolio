import { motion } from "framer-motion";

/**
 * A tiling-WM style window: title bar with traffic-light dots,
 * a class/title label, and a body. `active` gives it the accent border/glow.
 */
export default function Window({
  title = "window",
  icon = "",
  active = true,
  className = "",
  bodyClassName = "",
  children,
  tag,
}) {
  return (
    <motion.section
      layout
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className={`glass rounded-xl overflow-hidden flex flex-col min-h-0 ${
        active ? "winborder" : "winborder-dim"
      } ${className}`}
    >
      <header
        className="flex items-center gap-2 px-3 py-2 select-none shrink-0"
        style={{ background: "var(--mantle)", borderBottom: "1px solid var(--surface0)" }}
      >
        <span className="flex gap-1.5 mr-1">
          <span className="w-3 h-3 rounded-full" style={{ background: "var(--red)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "var(--yellow)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "var(--green)" }} />
        </span>
        <span className="text-xs sm:text-sm c-sub truncate">
          {icon && <span className="mr-1.5">{icon}</span>}
          {title}
        </span>
        {tag && (
          <span
            className="ml-auto text-[10px] px-2 py-0.5 rounded-full shrink-0"
            style={{ background: "var(--surface0)", color: "var(--accent)" }}
          >
            {tag}
          </span>
        )}
      </header>
      <div className={`flex-1 min-h-0 overflow-auto ${bodyClassName}`}>{children}</div>
    </motion.section>
  );
}
