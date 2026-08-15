/* =========================================================================
   SINGLE SOURCE OF TRUTH. Both the landing page (site.js) and the terminal
   (terminal.js) render from this one object. Edit here, both update.

   Content drawn from resume-leader-v3-mod.md (2026-07-26). Deliberately
   omitted from this public file: phone number. The resume carries it; a
   scraped public page should not.
   ========================================================================= */
const DATA = {
  name: "TJ Weldy",
  role: "Data Architect / Lead Data Engineer",
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
    "Data architect and lead engineer with 20+ years across software, database,",
    "and data-platform engineering. I design from first principles and stay in",
    "the editor — database internals, application code, architecture, and 3am",
    "incident response are all the same job to me. I've built two original CDC",
    "architectures and a real-time telemetry platform sustaining 30,000 inserts",
    "per second. I gravitate to the problems where the abstraction leaks and you",
    "have to actually understand the machine underneath.",
  ],

  contact: {
    email:    "tweldy@gmail.com",
    github:   "https://github.com/tweldy",
    linkedin: "https://www.linkedin.com/in/tj-weldy-7862501/",
    website:  "https://tweldy.github.io",
  },

  // Newest first.
  experience: [
    {
      company: "HighRadius (following acquisition of Ascend Software)",
      title:   "Architect / Lead Data Engineer",
      dates:   "2025 – Present",
      location:"Remote / NH",
      bullets: [
        "Lead two DBAs and give hands-on technical direction to a cross-functional dev team — scoping epics to engineers' experience, and making direct fixes across C#, Go, TypeScript, Python, and database code.",
        "Designed and built a metadata-driven, self-healing CDC pipeline from PostgreSQL and SQL Server into MotherDuck. A trigger and code-generation framework emits Airflow DAGs moving data through raw, time-variant staging, and current-record marts.",
        "Made that pipeline survive schema drift by rebuilding triggers automatically after DDL changes, preserving complete history across a 1.5B+ row change log for as-of-date analysis.",
        "Diagnosed a fleet-wide PostgreSQL connection pileup — hundreds of sessions stalled on unread results — traced it to application paths ignoring RETURNING results, and built a ruleset to find every occurrence across the codebase.",
        "Built a dbt-duckdb Python model with adaptive size-based batching to process a 5.7 TB backlog inside MotherDuck's 22 GB per-query memory ceiling, where the prior single-statement approach exhausted memory in seconds.",
        "Identified ~$80,000/yr in RDS rightsizing across a 13-instance SQL Server fleet via 30-day CloudWatch analysis, plus a Reserved Instance coverage gap in the PostgreSQL environment.",
        "Led database evidence collection and audit-facing presentation for SOC 2 Type II, including automated evidence acquisition and query-level compliance mapping.",
      ],
    },
    {
      company: "Ascend Software",
      title:   "Data Engineer, promoted from SDET",
      dates:   "2019 – 2025",
      location:"Remote",
      bullets: [
        "Designed a changeset-based SQL Server audit and CDC platform storing compressed JSON differences rather than full-row snapshots, cutting storage substantially. Encoded parent-child relationships allow retrieving a record's changes, its dependents', or a user's complete cross-table history.",
        "Shipped it as a user-facing audit trail: what each user changed, when, and how the data changed.",
        "Built trigger-based CDC and ETL tooling that eliminated the need for licensed third-party change-capture products.",
        "Created end-to-end data-integrity tooling spanning a PostgreSQL processing database, SQL Server customer databases, and the Workday API — dynamically generating financial documents, exercising production workflows, and validating results at each stage.",
        "Built migration tooling for SQL Server-to-PostgreSQL moves and transfers across security boundaries using AWS RDS and DMS.",
        "Migrated CI/CD from TeamCity to GitHub Actions and AWS CodeDeploy, trained developers, and wrote the documentation.",
      ],
    },
    {
      company: "Family Medical Leave",
      title:   "Career break",
      dates:   "2018 – 2019",
      location:"",
      bullets: [
        "Full-time care for a family member during a serious illness.",
      ],
    },
    {
      company: "eBay Mobile",
      title:   "Software Engineer",
      dates:   "2012 – 2018",
      location:"",
      bullets: [
        "Architected eBay Mobile's real-time error and performance telemetry platform on an appliance-class Oracle system — a 100-queue ingestion layer with modulo-sharded load distribution feeding a purpose-built dimensional model, sustaining 30,000 inserts per second.",
        "Delivered device-to-database latency under 30 seconds and device-to-alert under one minute, while serving multi-hour analytical aggregations in 10–20 seconds.",
        "Built anomaly detection in Java, Scala, and Elasticsearch ML that caught degrading response times at the individual service-instance level and predicted failures before they became outages.",
        "Designed domain-aware alerting that told regional mobile-carrier disruptions apart from failures inside eBay infrastructure. The platform became reliable enough that eBay's NOC detected incidents through it before its existing monitoring alerted.",
        "Enabled precise incident triage during revenue-impacting degradations, protecting millions in gross merchandise volume on multiple occasions.",
        "Integrated Hadoop, Kafka, and Cassandra data into operational reporting and eBay's central data warehouse.",
      ],
    },
    {
      company: "Corillian · Earth Class Mail · WebMD · Press Ganey",
      title:   "Earlier QA & Build Engineering Roles",
      dates:   "Prior to 2012",
      location:"",
      bullets: [
        "Progressive roles in software quality, test automation, build engineering, CI/CD, and ETL validation across Teradata and SQL Server environments — where the data-correctness and failure-analysis instinct behind everything since got established.",
      ],
    },
  ],

  // Grouped; keys become section headers.
  skills: {
    "Data Platforms & Pipelines": [
      "PostgreSQL", "SQL Server", "Oracle 8i–19c", "DuckDB / MotherDuck",
      "dbt", "Airflow", "Kafka", "CDC", "ETL / ELT",
      "Dimensional modeling", "Data warehousing",
    ],
    "Database Engineering": [
      "Schema & data-model design", "Indexing", "Execution-plan analysis",
      "Stored-procedure optimization", "Trigger & snapshot CDC",
      "Autovacuum tuning", "PostgreSQL major-version upgrades",
      "Capacity & performance engineering",
    ],
    "Cloud & Infrastructure": [
      "AWS RDS", "Aurora PostgreSQL", "EKS", "S3", "SQS", "IAM",
      "Parameter Store", "CloudWatch", "Kubernetes", "Docker",
      "Linux / systemd", "Production operations",
    ],
    "Languages": [
      "SQL", "PL/pgSQL", "T-SQL", "Python", "C# / .NET", "Go", "Rust", "Bash",
      "Java & Scala (earlier)", "TypeScript / JavaScript (maintenance)",
    ],
    "AI & Machine Learning": [
      "Elasticsearch ML anomaly detection", "Self-hosted LLM inference (Ollama)",
      "GPU / CPU model tiering", "Agent & tool integration",
    ],
    "Delivery & Operations": [
      "GitHub Actions", "Git", "24/7 database incident response",
      "SOC 2 Type II evidence automation", "pg_stat_statements",
      "Grafana", "Alloy",
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
        "for per-channel color and effect control, no vendor SDK. Ships with " +
        "mysticd, a socket daemon that owns the HID device so multiple clients " +
        "can drive the lighting without fighting over it.",
      tech: ["Rust", "USB HID", "Daemon / IPC", "Reverse engineering"],
      links: {}, // TODO: push tweldy/mystic-light, then link it here
      highlights: [
        "Talks the HID protocol directly",
        "Per-channel JARGB color control",
        "mysticd daemon arbitrates device access",
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
        "Multi-model tiering across GPU and CPU (Qwen2.5 14B/32B/72B)",
        "systemd-managed agent: liveness heartbeats, graceful shutdown",
        "Hardware I/O: vision, audio, displays, LEDs",
      ],
    },
  ],

  resumePdf: "resume.pdf",

  // NOTE: terminal.js renders these as `detail — school (dates)`.
  // The key is `detail`, not `credential`.
  education: [
    {
      school: "Boston University",
      detail: "M.S. Computer Information Systems — Database Management & Business Intelligence",
      dates:  "2012",
    },
    {
      school: "Reed College",
      detail: "B.A. Economics",
      dates:  "",
    },
  ],
};

if (typeof window !== "undefined") window.DATA = DATA;
