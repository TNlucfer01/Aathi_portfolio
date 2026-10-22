import { motion, AnimatePresence } from "framer-motion";

const BINDS = [
  { k: ["Super", "1–5"], d: "switch workspace" },
  { k: ["Super", "→ / ←"], d: "next / previous workspace" },
  { k: ["Super", "T"], d: "jump to terminal" },
  { k: ["Super", "/"], d: "toggle this help" },
  { k: ["Esc"], d: "close help" },
  { k: ["type in terminal"], d: "help · projects · skills · social · goto" },
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
          onClick={onClose}
        >
          <motion.div
            className="glass winborder rounded-xl max-w-md w-full p-6"
            initial={{ scale: 0.9, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="c-text text-lg">
                <span className="c-mauve"></span> keybinds
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
              On a laptop, <kbd>Super</kbd> is the Windows / ⌘ key. On touch, tap the workspace
              numbers in the top bar.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
