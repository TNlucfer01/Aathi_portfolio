import { motion, AnimatePresence } from "framer-motion";

const BINDS = [
  { k: ["Alt", "1–5"], d: "switch workspace" },
  { k: ["Alt", "→ / ←"], d: "next / previous workspace" },
  { k: ["Alt", "T"], d: "jump to the terminal" },
  { k: ["Alt", "/"], d: "toggle this help" },
  { k: ["Esc"], d: "close help" },
  { k: ["Tab"], d: "complete commands and paths in the terminal" },
  { k: ["↑", "↓"], d: "command history" },
  { k: ["Ctrl", "L"], d: "clear the terminal" },
];

export default function HelpOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "color-mix(in srgb, var(--crust) 70%, transparent)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="glass win win-active max-w-md w-full p-6"
            initial={{ scale: 0.9, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="c-text text-lg">
                keybinds
              </h2>
              <button onClick={onClose} className="c-sub hover:text-[var(--red)]" aria-label="close">
                ✕
              </button>
            </div>
            <ul className="space-y-3">
              {BINDS.map((b, i) => (
                <li key={i} className="flex items-center justify-between gap-4">
                  <span className="flex gap-1 flex-wrap">
                    {b.k.map((key, j) => (
                      <kbd key={j}>{key}</kbd>
                    ))}
                  </span>
                  <span className="c-sub text-sm text-right">{b.d}</span>
                </li>
              ))}
            </ul>
            <p className="c-sub text-xs mt-5">
              Hover a window to focus it, like a tiling WM. On touch, tap the workspace icons in the top bar. Try <kbd>theme nord</kbd> or <kbd>opacity 30</kbd> in the terminal.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
