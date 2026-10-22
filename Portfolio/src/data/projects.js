// Projects curated from github.com/TNlucfer01
// Each entry renders as a "file" in the tiling file-manager window.

export const projects = [
  {
    id: "vir",
    name: "Vir — AI Campus Assistant",
    file: "vir_assistant.py",
    year: "2026",
    role: "Core contributor",
    blurb:
      "Autonomous hybrid AI campus assistant with RAG, agentic tool-calling, hardened NL-to-SQL, and an indoor topological navigation engine.",
    details:
      "Groq LLM agent loop plans and chains tools: semantic search over academic regulations (Qdrant + Jina embeddings v3), natural-language-to-SQL over student/marks/attendance data with a 3-layer security lockdown, and Dijkstra pathfinding over a multi-floor campus graph. FastAPI backend, Streamlit chat UI with token streaming, tenacity retries, and persistent multi-turn session memory.",
    stack: ["Python", "FastAPI", "Streamlit", "Qdrant", "Groq", "SQLite", "RAG"],
    link: "https://github.com/TNlucfer01/Vir_RAG_assistant",
    featured: true,
  },
  {
    id: "donbosco",
    name: "Donbosco Attendance System",
    file: "donbosco_web.jsx",
    year: "2026",
    role: "Lead developer",
    blurb:
      "Full college attendance platform: role-based access, OD/leave workflows, attendance correction, timetable and semester management.",
    details:
      "React + Vite frontend with an Express 5 / MySQL backend, JWT auth, Swagger-documented REST API, and a fully designed database schema. 50+ commits covering CRUD for students, staff and subjects, leave processing, and principal/staff dashboards.",
    stack: ["React", "Express", "MySQL", "Tailwind", "JWT", "Swagger"],
    link: "https://github.com/TNlucfer01/DonboscoAWEB",
    featured: true,
  },
  {
    id: "tes",
    name: "tes — Django E-Commerce",
    file: "tes_store.py",
    year: "2026",
    role: "Solo developer",
    blurb:
      "Premium Django 6 e-commerce platform with full product discovery, cart, checkout and order-tracking flows.",
    details:
      "Built with Django 6, Tailwind CSS and DaisyUI. Glassmorphism UI, Jazzmin-enhanced admin, styled auth and profile management, order list/detail views with status indicators, and a mobile-first responsive layout. 80+ commits.",
    stack: ["Django", "Python", "Tailwind", "DaisyUI", "SQLite"],
    link: "https://github.com/TNlucfer01/Django_mps",
    featured: true,
  },
  {
    id: "plant",
    name: "Plant Disease Detection",
    file: "plant_guard.py",
    year: "2026",
    role: "Solo developer",
    blurb:
      "End-to-end CNN→LLM pipeline: MobileNetV2 detects the disease, a local Ollama model writes the treatment advice.",
    details:
      "Transfer-learning MobileNetV2 over 38 disease classes with confidence thresholding, feeding a local Ollama LLM for privacy-first treatment recommendations. Streamlit UI with batch processing, analysis history and downloadable reports, plus a companion Android (Kotlin) app and an ONNX export for on-device inference.",
    stack: ["PyTorch", "MobileNetV2", "Ollama", "Streamlit", "Kotlin", "ONNX"],
    link: "https://github.com/TNlucfer01/plant-disease",
    featured: true,
  },
  {
    id: "htshare",
    name: "HtShare — LAN File Share",
    file: "htshare.java",
    year: "2025",
    role: "Solo developer",
    blurb:
      "Minimalist JavaFX desktop app for sharing files over the local network with QR-code pairing and HTTPS.",
    details:
      "Direct HTTP/HTTPS file server with self-signed TLS 1.2+ certs, QR-code mobile pairing, dark/light themes, dynamic port discovery, live transfer stats and auto-shutdown. Packaged as a Linux AppImage and listed on appimage.github.io.",
    stack: ["Java", "JavaFX", "Undertow", "Maven", "AppImage"],
    link: "https://github.com/TNlucfer01/HtShare",
    featured: true,
  },
  {
    id: "attendanceweb",
    name: "AttendanceWeb (Spring Boot)",
    file: "attendance_api.java",
    year: "2026",
    role: "Solo developer",
    blurb:
      "Java 17 / Spring Boot attendance API with role-based access, JWT auth and automated reporting.",
    details:
      "Spring Boot 3.2 backend over MariaDB with Spring Security + JWT, Spring Data JPA/Hibernate, and Maven build. Leave workflows, timetable management and auto-created schema.",
    stack: ["Java", "Spring Boot", "MariaDB", "JPA", "JWT"],
    link: "https://github.com/TNlucfer01/AttendanceWeb",
    featured: false,
  },
  {
    id: "fakenews",
    name: "Fake News Detection",
    file: "fake_news.ipynb",
    year: "2025",
    role: "Solo developer",
    blurb:
      "NLP classifier that flags fake news articles using scikit-learn and classic text-processing techniques.",
    details:
      "Natural-language-processing pipeline with TF-IDF features and scikit-learn models, trained on a labelled news dataset, served through a simple web UI.",
    stack: ["Python", "scikit-learn", "NLP", "Pandas"],
    link: "https://github.com/TNlucfer01/fake_news_detection",
    featured: false,
  },
  {
    id: "tictactoe",
    name: "Tic-Tac-Toe in C (SDL2)",
    file: "tictactoe.c",
    year: "2025",
    role: "Solo developer",
    blurb:
      "Two-player Tic-Tac-Toe written in C with SDL2 graphics and native Wayland support on Linux.",
    details:
      "Lightweight SDL2/SDL2_ttf game running on Wayland, with a build script, Debian .deb packaging for Linux and an Inno Setup installer for Windows.",
    stack: ["C", "SDL2", "Wayland", "Make", "dpkg"],
    link: "https://github.com/TNlucfer01/Tic_tac_toe",
    featured: false,
  },
  {
    id: "rag",
    name: "Local RAG with Ollama",
    file: "local_rag.py",
    year: "2026",
    role: "Solo developer",
    blurb:
      "Fully local retrieval-augmented-generation chatbot: scrape, chunk, embed, and chat — no cloud required.",
    details:
      "Three-stage pipeline — Wikipedia scraping, chunking + embedding ingestion into a vector store, and a Streamlit chatbot — running entirely on local Ollama models.",
    stack: ["Python", "Ollama", "LangChain", "Streamlit", "Embeddings"],
    link: "https://github.com/TNlucfer01/RAG",
    featured: false,
  },
  {
    id: "agentic",
    name: "Agentic Workflow (LangGraph)",
    file: "agentic_flow.py",
    year: "2026",
    role: "Solo developer",
    blurb:
      "Multi-agent orchestration built on LangGraph, chaining reasoning steps over documents.",
    details:
      "Experiment in multi-agent orchestration with LangGraph, coordinating tool-using agents over a document corpus.",
    stack: ["Python", "LangGraph", "LLM"],
    link: "https://github.com/TNlucfer01/AGentic_workflow",
    featured: false,
  },
  {
    id: "smartcampus",
    name: "Smart Campus",
    file: "smart_campus.jsx",
    year: "2025",
    role: "Solo developer",
    blurb:
      "React application aimed at improving the college education environment.",
    details:
      "React + Tailwind single-page app exploring campus-facing tools and a dark-mode UI.",
    stack: ["React", "Tailwind", "JavaScript"],
    link: "https://github.com/TNlucfer01/smart-campus",
    featured: false,
  },
  {
    id: "nvim",
    name: "Neovim Config",
    file: "init.lua",
    year: "2026",
    role: "Daily driver",
    blurb:
      "My personal Neovim setup — Lua-configured, LazyVim-based, tuned for C, Python and web work.",
    details:
      "A ricing-friendly Neovim configuration in Lua with LSP, Java (jdt.ls) support and lazy-loaded plugins. Part of my Linux-first development environment.",
    stack: ["Lua", "Neovim", "LazyVim"],
    link: "https://github.com/TNlucfer01/nvim_config",
    featured: false,
  },
];

// Open-source contributions to other people's repos.
export const contributions = [
  {
    name: "Flutter South India",
    blurb: "Added attendance templates and fixed a hydration mismatch.",
    link: "https://github.com/TNlucfer01/Flutter-South-India",
  },
  {
    name: "MindBridge",
    blurb: "Team project — contributed decks and feature questions.",
    link: "https://github.com/TNlucfer01/mindbridge",
  },
  {
    name: "Keerthi Irrigation System",
    blurb: "Contributed fixes and assets to an irrigation web project.",
    link: "https://github.com/TNlucfer01/keerthi-irrigation-system",
  },
  {
    name: "appimage.github.io",
    blurb: "Listed HtShare in the public AppImage catalogue.",
    link: "https://github.com/TNlucfer01/appimage.github.io",
  },
  {
    name: "tamilnadu.lol",
    blurb: "Small feature contribution to a community site.",
    link: "https://github.com/TNlucfer01/tamilnadu.lol",
  },
];
