import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, FolderGit2, Cpu, Mail, SquareTerminal } from "lucide-react";
import Waybar from "./components/Waybar";
import Window from "./components/Window";
import Neofetch from "./components/Neofetch";
import Terminal from "./components/Terminal";
import ProjectsPane from "./components/ProjectsPane";
import SkillsPane from "./components/SkillsPane";
import ContactPane from "./components/ContactPane";
import HelpOverlay from "./components/HelpOverlay";
import { useShell } from "./vm/useShell";
import { THEME_NAMES, applyTheme, applyOpacity, loadPrefs, savePrefs } from "./theme";
import { projects, GH } from "./data/projects";

const WORKSPACES = [
  { id: "home", label: "home" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
  { id: "term", label: "terminal" },
];

const SAFE_URL = (u) => u.startsWith(GH) || u.startsWith("https://github.com/") || u.startsWith("https://linkedin.com/") || u.startsWith("mailto:");

const slide = {
  initial: (d) => ({ opacity: 0, x: d * 48 }),
  animate: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d * -48 }),
};

export default function App() {
  const prefs = loadPrefs();
  const [[active, dir], setNav] = useState([0, 1]);
  const [help, setHelp] = useState(false);
  const [theme, setTheme] = useState(THEME_NAMES.includes(prefs.theme) ? prefs.theme : "mocha");
  const [alpha, setAlpha] = useState(Number.isFinite(prefs.alpha) ? prefs.alpha : 58);
  const [selected, setSelected] = useState(projects[0].id);

  const go = useCallback((i) => setNav(([a]) => [i, i >= a ? 1 : -1]), []);

  // theme + transparency are applied to CSS variables and remembered per viewer
  useEffect(() => { applyTheme(theme); }, [theme]);
  useEffect(() => { applyOpacity(alpha); }, [alpha]);
  useEffect(() => { savePrefs({ theme, alpha }); }, [theme, alpha]);

  const shell = useShell({
    getTheme: () => theme,
    getOpacity: () => alpha,
    onAction: (a) => {
      if (a.type === "goto") go(a.index);
      else if (a.type === "theme") setTheme(a.name);
      else if (a.type === "opacity") setAlpha(a.value);
      else if (a.type === "open" && SAFE_URL(a.url)) {
        if (a.url.startsWith("mailto:")) window.location.href = a.url;
        else window.open(a.url, "_blank", "noopener,noreferrer");
      }
    },
  });

  const openProject = useCallback((id) => { setSelected(id); go(1); }, [go]);
  const openInTerminal = useCallback((p) => {
    shell.run(`cd ~/${p.group}/${p.repo}`);
    shell.run("ls");
    go(4);
  }, [shell, go]);
  const cycleTheme = () => setTheme((t) => THEME_NAMES[(THEME_NAMES.indexOf(t) + 1) % THEME_NAMES.length]);

  // keybinds: Alt (or Meta/Super where the OS lets the page see it) + 1-5 / arrows / T / /
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") return setHelp(false);
      if (!(e.altKey || e.metaKey)) return;
      const digit = /^Digit([1-5])$/.exec(e.code);
      if (digit) { e.preventDefault(); go(Number(digit[1]) - 1); }
      else if (e.code === "ArrowRight") { e.preventDefault(); setNav(([a]) => [(a + 1) % WORKSPACES.length, 1]); }
      else if (e.code === "ArrowLeft") { e.preventDefault(); setNav(([a]) => [(a - 1 + WORKSPACES.length) % WORKSPACES.length, -1]); }
      else if (e.code === "KeyT") { e.preventDefault(); go(4); }
      else if (e.code === "Slash") { e.preventDefault(); setHelp((h) => !h); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="h-[100dvh] w-screen flex flex-col overflow-hidden relative">
      <div className="wallpaper" aria-hidden="true">
        <i className="blob b1" /><i className="blob b2" /><i className="blob b3" /><i className="blob b4" />
      </div>

      <div className="relative z-20 flex flex-col h-full min-h-0">
        <Waybar workspaces={WORKSPACES} active={active} onSelect={go} onHelp={() => setHelp((h) => !h)} theme={theme} onCycleTheme={cycleTheme} />

        <main className="flex-1 min-h-0 p-[var(--gap)] overflow-hidden">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={active}
              custom={dir}
              variants={slide}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full min-h-0"
            >
              {active === 0 && <HomeWorkspace session={shell} />}
              {active === 1 && (
                <Window title="~/projects — file manager" icon={<FolderGit2 size={14} />} tag={`${projects.length} repos`} className="h-full">
                  <ProjectsPane selected={selected} onSelect={setSelected} onOpenInTerminal={openInTerminal} />
                </Window>
              )}
              {active === 2 && (
                <Window title="~/skills" icon={<Cpu size={14} />} tag="evidence-based" className="h-full">
                  <SkillsPane onOpenProject={openProject} />
                </Window>
              )}
              {active === 3 && (
                <Window title="contact.sh" icon={<Mail size={14} />} tag="say hi" className="h-full">
                  <ContactPane />
                </Window>
              )}
              {active === 4 && (
                <Window title="aathi-sh — simulated session" icon={<SquareTerminal size={14} />} tag="interactive" className="h-full">
                  <Terminal session={shell} autoFocus />
                </Window>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer
          className="glass shrink-0 text-[11px] sm:text-xs c-sub px-4 h-8 mx-[var(--gap)] mb-[var(--gap)] rounded-full flex items-center gap-3"
          style={{ border: "1px solid color-mix(in srgb, var(--surface1) 70%, transparent)" }}
        >
          <span className="hidden sm:inline"><kbd>Alt</kbd>+<kbd>1-5</kbd> workspaces</span>
          <button onClick={() => setHelp(true)} className="underline decoration-dotted hover:text-[var(--text)]">keybinds</button>
          <span className="ml-auto truncate">© {new Date().getFullYear()} Aathi Senthil</span>
        </footer>
      </div>

      <HelpOverlay open={help} onClose={() => setHelp(false)} />
    </div>
  );
}

/* Workspace 1: two tiled windows. Hover a window to focus it (focus-follows-mouse). */
function HomeWorkspace({ session }) {
  const [focus, setFocus] = useState("about");
  return (
    <div className="grid h-full min-h-0 gap-[var(--gap)] grid-cols-1 grid-rows-[minmax(0,5fr)_minmax(0,4fr)] lg:grid-rows-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <Window title="neofetch" icon={<Home size={14} />} tag="about" active={focus === "about"} onFocus={() => setFocus("about")}>
        <Neofetch />
      </Window>
      <Window title="aathi-sh — try me" icon={<SquareTerminal size={14} />} tag="interactive" active={focus === "term"} onFocus={() => setFocus("term")}>
        <Terminal session={session} focused={focus === "term"} />
      </Window>
    </div>
  );
}
