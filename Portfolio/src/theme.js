// Palettes for the `theme` command. Variable names follow Catppuccin; the other
// palettes map their own colours onto the same slots so every component restyles.

const mk = (o) => ({ ...o });

export const THEMES = {
  mocha: mk({
    base: "#1e1e2e", mantle: "#181825", crust: "#11111b", surface0: "#313244", surface1: "#45475a",
    surface2: "#585b70", overlay0: "#6c7086", text: "#cdd6f4", subtext: "#a6adc8", blue: "#89b4fa",
    lavender: "#b4befe", sapphire: "#74c7ec", sky: "#89dceb", teal: "#94e2d5", green: "#a6e3a1",
    yellow: "#f9e2af", peach: "#fab387", red: "#f38ba8", mauve: "#cba6f7", pink: "#f5c2e7", accent: "#cba6f7",
  }),
  tokyo: mk({
    base: "#1a1b26", mantle: "#16161e", crust: "#0f0f14", surface0: "#292e42", surface1: "#3b4261",
    surface2: "#545c7e", overlay0: "#565f89", text: "#c0caf5", subtext: "#a9b1d6", blue: "#7aa2f7",
    lavender: "#bb9af7", sapphire: "#2ac3de", sky: "#7dcfff", teal: "#73daca", green: "#9ece6a",
    yellow: "#e0af68", peach: "#ff9e64", red: "#f7768e", mauve: "#bb9af7", pink: "#ff7eb6", accent: "#7aa2f7",
  }),
  gruvbox: mk({
    base: "#282828", mantle: "#1d2021", crust: "#141617", surface0: "#3c3836", surface1: "#504945",
    surface2: "#665c54", overlay0: "#7c6f64", text: "#ebdbb2", subtext: "#bdae93", blue: "#83a598",
    lavender: "#d3869b", sapphire: "#83a598", sky: "#8ec07c", teal: "#8ec07c", green: "#b8bb26",
    yellow: "#fabd2f", peach: "#fe8019", red: "#fb4934", mauve: "#d3869b", pink: "#d3869b", accent: "#fe8019",
  }),
  nord: mk({
    base: "#2e3440", mantle: "#272c36", crust: "#20242d", surface0: "#3b4252", surface1: "#434c5e",
    surface2: "#4c566a", overlay0: "#6b7794", text: "#eceff4", subtext: "#d8dee9", blue: "#81a1c1",
    lavender: "#b48ead", sapphire: "#88c0d0", sky: "#8fbcbb", teal: "#8fbcbb", green: "#a3be8c",
    yellow: "#ebcb8b", peach: "#d08770", red: "#bf616a", mauve: "#b48ead", pink: "#b48ead", accent: "#88c0d0",
  }),
  rosepine: mk({
    base: "#191724", mantle: "#16141f", crust: "#0f0d17", surface0: "#26233a", surface1: "#403d52",
    surface2: "#524f67", overlay0: "#6e6a86", text: "#e0def4", subtext: "#908caa", blue: "#9ccfd8",
    lavender: "#c4a7e7", sapphire: "#31748f", sky: "#9ccfd8", teal: "#9ccfd8", green: "#9ccfd8",
    yellow: "#f6c177", peach: "#f6c177", red: "#eb6f92", mauve: "#c4a7e7", pink: "#ebbcba", accent: "#eb6f92",
  }),
};

export const THEME_NAMES = Object.keys(THEMES);

export function applyTheme(name) {
  const t = THEMES[name];
  if (!t) return false;
  const root = document.documentElement;
  for (const [k, v] of Object.entries(t)) root.style.setProperty(`--${k}`, v);
  root.style.setProperty("color-scheme", "dark");
  return true;
}

export function applyOpacity(pct) {
  document.documentElement.style.setProperty("--win-alpha", `${pct}%`);
}

// per-viewer convenience only — always wrapped, the site works without it
export function loadPrefs() {
  try {
    const raw = localStorage.getItem("aathi-desktop-prefs");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
export function savePrefs(p) {
  try {
    localStorage.setItem("aathi-desktop-prefs", JSON.stringify(p));
  } catch {
    /* private mode etc. — ignore */
  }
}
