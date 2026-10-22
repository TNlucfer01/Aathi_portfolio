// About, skills and contact data. Everything here is either stated by Aathi or
// derivable from his repos — skills link back to the projects that show them.

export const profile = {
  user: "aathi",
  host: "portfolio", // the shell below is a simulated session, not a real machine
  name: "Aathi Senthil",
  title: "Linux & Full-Stack Developer",
  wm: "Hyprland",
  editor: "Neovim",
  location: "India",
  status: "final-year engineering student",
  github: "TNlucfer01",
  email: "aathi.programmer@gmail.com",
};

export const about = [
  "I'm a final-year engineering student and a Linux-first developer — my daily",
  "setup is Hyprland and Neovim. I build full-stack web apps, AI/LLM tools and",
  "systems software in C.",
  "",
  "The projects here run from a campus AI assistant with retrieval and SQL",
  "tools, to a college attendance platform, to a LAN file-sharing app packaged",
  "as an AppImage. I like problems with real users: attendance, document",
  "search, plant disease, file transfer.",
  "",
  "Poke around: this desktop is a toy Linux session. Try `ls`, `cd projects`,",
  "`tree`, `theme nord`, or `hyprctl workspaces`.",
];

// cat: grouping. repos: project ids from projects.js that demonstrate the skill.
export const skills = [
  { name: "Linux / Hyprland", cat: "systems", repos: [], note: "my daily-driver environment" },
  { name: "C", cat: "systems", repos: ["tictactoe", "oslab", "learning"] },
  { name: "Bash / shell", cat: "systems", repos: ["oslab"] },
  { name: "Neovim (Lua)", cat: "systems", repos: ["nvim"] },
  { name: "SDL2 / Wayland", cat: "systems", repos: ["tictactoe"] },
  { name: "AppImage / .deb packaging", cat: "systems", repos: ["htshare", "tictactoe"] },

  { name: "Python", cat: "languages", repos: ["vir", "plant", "rag", "fakenews", "neetcode"] },
  { name: "JavaScript / TypeScript", cat: "languages", repos: ["donbosco", "smartcampus", "vir"] },
  { name: "Java", cat: "languages", repos: ["htshare", "attendanceweb"] },
  { name: "Kotlin", cat: "languages", repos: ["plant"] },
  { name: "Lua", cat: "languages", repos: ["nvim"] },

  { name: "React", cat: "web", repos: ["donbosco", "smartcampus", "intern"] },
  { name: "Django", cat: "web", repos: ["tes"] },
  { name: "Node / Express", cat: "web", repos: ["donbosco", "intern"] },
  { name: "Spring Boot", cat: "web", repos: ["attendanceweb"] },
  { name: "Tailwind CSS", cat: "web", repos: ["tes", "donbosco", "smartcampus"] },
  { name: "FastAPI", cat: "web", repos: ["vir"] },
  { name: "JWT auth", cat: "web", repos: ["donbosco", "attendanceweb"] },

  { name: "RAG / vector search", cat: "ai", repos: ["vir", "rag"] },
  { name: "LLM tool-calling", cat: "ai", repos: ["vir"] },
  { name: "Local LLMs (Ollama)", cat: "ai", repos: ["plant", "rag"] },
  { name: "PyTorch / CNNs", cat: "ai", repos: ["plant"] },
  { name: "scikit-learn / NLP", cat: "ai", repos: ["fakenews"] },
  { name: "LangChain / LangGraph", cat: "ai", repos: ["agentic"] },

  { name: "MySQL / MariaDB", cat: "data", repos: ["donbosco", "attendanceweb"] },
  { name: "SQLite", cat: "data", repos: ["vir", "tes"] },
  { name: "Qdrant", cat: "data", repos: ["vir"] },
  { name: "Redis", cat: "data", repos: ["tes"] },

  { name: "Git / GitHub", cat: "tools", repos: ["vir", "donbosco", "tes"] },
  { name: "Maven", cat: "tools", repos: ["htshare", "attendanceweb"] },
  { name: "Robot Framework", cat: "tools", repos: ["tes"] },
  { name: "Swagger / OpenAPI", cat: "tools", repos: ["donbosco"] },
];

export const CATS = [
  { cat: "systems", label: "systems & linux", color: "green" },
  { cat: "languages", label: "languages", color: "peach" },
  { cat: "web", label: "web", color: "blue" },
  { cat: "ai", label: "ai / ml", color: "mauve" },
  { cat: "data", label: "data", color: "teal" },
  { cat: "tools", label: "tools", color: "yellow" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/TNlucfer01", handle: "TNlucfer01" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aathisenthil", handle: "aathisenthil" },
  { label: "Email", href: "mailto:aathi.programmer@gmail.com", handle: "aathi.programmer@gmail.com" },
];
