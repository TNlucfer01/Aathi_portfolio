import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Waybar from "./components/Waybar";
import Window from "./components/Window";
import Neofetch from "./components/Neofetch";
import Terminal from "./components/Terminal";
import ProjectsPane from "./components/ProjectsPane";
import SkillsPane from "./components/SkillsPane";
import ContactPane from "./components/ContactPane";
import HelpOverlay from "./components/HelpOverlay";

const WORKSPACES = [
  { id: "home", label: "home", icon: "" },
  { id: "projects", label: "projects", icon: "" },
  { id: "skills", label: "skills", icon: "" },
  { id: "contact", label: "contact", icon: "" },
  { id: "term", label: "terminal", icon: "" },
];

export default function App() {
  const [active, setActive] = useState(0);
  const [help, setHelp] = useState(false);
  const gotoTerm = useCallback(() => setActive(4), []);
  const gotoRef = useRef(setActive);

  // global keybinds: Super+1..5, Super+arrows, Super+T, Super+/
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") return setHelp(false);
      const mod = e.metaKey || e.altKey; // Super maps to Meta; Alt as fallback
      if (!mod) return;
      if (e.key >= "1" && e.key <= "5") {
        e.preventDefault();
        setActive(Number(e.key) - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => (a + 1) % WORKSPACES.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => (a - 1 + WORKSPACES.length) % WORKSPACES.length);
      } else if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        setActive(4);
      } else if (e.key === "/") {
        e.preventDefault();
        setHelp((h) => !h);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="h-[100dvh] w-screen flex flex-col overflow-hidden relative">
      <div className="wallpaper" aria-hidden="true" />

      <div className="relative z-20 flex flex-col h-full">
        <Waybar
          workspaces={WORKSPACES}
          active={active}
          onSelect={setActive}
          onHelp={() => setHelp((h) => !h)}
        />

        <main className="flex-1 min-h-0 p-2 sm:p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.18 }}
              className="h-full min-h-0"
            >
              {active === 0 && <HomeWorkspace onGoto={setActive} />}
              {active === 1 && (
                <Window title="thunar — ~/projects" icon="" tag="file manager" className="h-full">
                  <ProjectsPane />
                </Window>
              )}
              {active === 2 && (
                <Window title="btop — skills" icon="" tag="read-only" className="h-full">
                  <SkillsPane />
                </Window>
              )}
              {active === 3 && (
                <Window title="contact.sh" icon="" tag="reach out" className="h-full">
                  <ContactPane />
                </Window>
              )}
              {active === 4 && (
                <Window title={`kitty — ${"zsh"}`} icon="" tag="interactive" className="h-full" bodyClassName="">
                  <Terminal onGoto={setActive} big />
                </Window>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* hint bar */}
        <footer
          className="shrink-0 text-[11px] sm:text-xs c-sub px-3 py-1.5 flex items-center gap-3 glass"
          style={{ borderTop: "1px solid var(--surface0)" }}
        >
          <span className="hidden sm:inline">
            <kbd>Super</kbd>+<kbd>1-5</kbd> workspaces
          </span>
          <span className="hidden md:inline">
            <kbd>Super</kbd>+<kbd>T</kbd> terminal
          </span>
          <button onClick={() => setHelp(true)} className="underline decoration-dotted">
            keybinds
          </button>
          <span className="ml-auto truncate">
            © {new Date().getFullYear()} Aathi Senthil · built with React on Hyprland vibes
          </span>
        </footer>
      </div>

      <HelpOverlay open={help} onClose={() => setHelp(false)} />
    </div>
  );
}

/* Workspace 1: neofetch + welcome terminal, tiled side by side */
function HomeWorkspace({ onGoto }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 h-full min-h-0">
      <Window title="neofetch" icon="" tag="about" active className="min-h-0">
        <Neofetch />
      </Window>
      <Window title="kitty — zsh" icon="" tag="try me" active={false} className="min-h-0">
        <Terminal onGoto={onGoto} />
      </Window>
    </div>
  );
}
