/* =========================================================================
   SINGLE SOURCE OF TRUTH. Both the landing page (site.js) and the terminal
   (terminal.js) render from this one object. Edit here, both update.
   Anything marked TODO is a placeholder only you can fill.
   ========================================================================= */
const DATA = {
  name: "TJ Weldy",
  role: "Data Architect / Data Engineer",
  roleSub: "who ships the code — not just the diagrams",
  location: "Manchester, NH",
  availability:
    "Open to Greater Boston (hybrid preferred, on-site for the right offer) " +
    "and remote — and open to relocation, including Canada / Toronto.",

  tagline:
    "I design data systems and build them end to end — from SQL and " +
    "orchestration up through the Linux and hardware the data actually runs on.",

  // 2–3 sentences. The elevator pitch.
  summary: [
    "Data architect and engineer with a systems mindset: I design the platform",
    "and then build it, comfortable end to end from SQL and orchestration down to",
    "the Linux, GPU, and hardware layers the data runs on. I gravitate to the",
    "problems where the abstraction leaks and you have to actually understand the",
    "machine underneath.",
  ],

  contact: {
    email:    "tweldy@gmail.com",
    github:   "https://github.com/tweldy",
    linkedin: "https://www.linkedin.com/in/tj-weldy-7862501/",
    website:  "https://tjweldy.github.io",
  },

  // Newest first. TODO: replace with your real history + quantified bullets.
  experience: [
    {
      company: "TODO: Current Company",
      title:   "Data Architect",
      dates:   "TODO – Present",
      location:"Remote / NH",
      bullets: [
        "TODO: impact bullet — quantify it ('Built X that cut Y from N hours to M min').",
        "TODO: something you designed AND implemented (proof you write the code).",
        "TODO: reliability / cost / throughput improvement, with a number.",
      ],
    },
    {
      company: "TODO: Previous Company",
      title:   "TODO: Title",
      dates:   "TODO – TODO",
      location:"TODO",
      bullets: ["TODO: achievement with a number in it.", "TODO: another."],
    },
  ],

  // Grouped; keys become section headers. Kept honest to demonstrated work —
  // TODO: add your professional stack (cloud, orchestration, warehouse, etc.).
  skills: {
    "Data & Databases": [
      "PostgreSQL (internals, extensions, PL/pgSQL)", "SQL", "Data modeling",
      "Pipelines & orchestration", "Data governance / access control",
    ],
    "Languages": ["Python", "Rust", "SQL", "Bash"],
    "Systems & Infra": [
      "Linux / systemd", "On-prem GPU & local LLM inference", "ZFS",
      "Backups (restic → Cloudflare R2)", "Git / GitHub Actions CI",
    ],
    "Low-level & Hardware": [
      "USB HID protocols", "Sensor / display / LED integration",
      "Reverse engineering",
    ],
  },

  // The heart of the "I actually build things" argument.
  projects: [
    {
      name: "pg_access_layer",
      tagline: "A PostgreSQL extension for governed, read-only access layers.",
      description:
        "PL/pgSQL + PGXS extension that generates and version-tracks read-only " +
        "view layers over source schemas. JSON-schema column contracts, full " +
        "view history (valid_from/valid_to), clean create/drop lifecycle via " +
        "event triggers. Consumers get exactly the columns they're granted; the " +
        "base tables stay sealed.",
      tech: ["PostgreSQL", "PL/pgSQL", "PGXS", "Event triggers", "GitHub Actions"],
      links: { GitHub: "https://github.com/tweldy/pg_access_layer" },
      highlights: [
        "Live on GitHub (PostgreSQL License)",
        "CI matrix green on PG 16 / 17 / 18",
        "Modular sql/ build via DATA_built",
      ],
    },
    {
      name: "mystic-light",
      tagline: "Rust control for MSI Mystic Light RGB over raw USB HID.",
      description:
        "A Rust crate that drives MSI Mystic Light JARGB fan LEDs by speaking " +
        "the raw HID protocol directly — reverse-engineered the report format " +
        "for per-channel color and effect control, no vendor SDK.",
      tech: ["Rust", "USB HID", "Reverse engineering"],
      links: {}, // TODO: publish + link the repo/crate
      highlights: [
        "Talks the HID protocol directly",
        "Per-channel JARGB color control",
      ],
    },
    {
      name: "Gigi",
      tagline: "An autonomous AI on my own hardware — full stack, SQL to silicon.",
      description:
        "A persistent, self-directed AI system I built and run on-prem: JSONL/DB " +
        "state and memory, a Python cognitive loop, local LLM inference on a " +
        "dedicated GPU, plus real-world senses and outputs — cameras, mics, " +
        "displays, LED and fan control. Reliability engineered in: encrypted " +
        "offsite backups, watchdogs, graceful power-loss handling.",
      tech: [
        "Python", "Local LLMs (Ollama)", "Linux / systemd", "CUDA GPU",
        "Hardware I/O", "restic / Cloudflare R2",
      ],
      links: {}, // engineering shown publicly; her data kept private
      note: "Engineering shown publicly; her data kept private.",
      highlights: [
        "On-prem GPU LLM inference",
        "State, memory & backups engineered for continuity",
        "Hardware I/O: vision, audio, displays, LEDs",
      ],
    },
  ],

  resumePdf: "resume.pdf",

  education: [
    // TODO: { school, credential, dates }
  ],
};

if (typeof window !== "undefined") window.DATA = DATA;
