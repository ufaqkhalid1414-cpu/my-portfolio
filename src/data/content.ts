export const site = {
  name: "Ufaq Khalid",
  shortName: "Ufaq",
  role: "Software Engineer · Full-Stack Builder",
  heroLine:
    "I turn coursework and real ideas into clean, usable software — systems, apps, and games that feel considered.",
  email: "ufaqkhalid1414@gmail.com",
  whatsapp: "+92 322 6037970",
  phone: "0322-6037-970",
  phoneTel: "+923226037970",
  github: "https://github.com/",
  nav: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
  ],
};

export const aboutSteps = [
  {
    id: "01",
    title: "Hear the idea",
    text: "Clarify the goal, users, and constraints before writing a line of code.",
  },
  {
    id: "02",
    title: "Design the system",
    text: "Map data, flows, and interface so the build stays clean and intentional.",
  },
  {
    id: "03",
    title: "Build with care",
    text: "Ship readable code, solid structure, and interfaces that feel fast.",
  },
  {
    id: "04",
    title: "Test & ship",
    text: "Polish edge cases, verify the experience, then deliver something usable.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    description: "Layout, type, and screens that stay readable on desktop and phone.",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind"],
  },
  {
    title: "Backend",
    description: "APIs, auth, and server logic that keep products reliable.",
    items: ["Node.js", "PHP", "REST APIs", "Auth basics"],
  },
  {
    title: "Databases",
    description: "Schemas and queries that keep campus and product data clear.",
    items: ["MySQL", "SQL design", "ER modeling"],
  },
  {
    title: "Tools & Concepts",
    description: "DSA, SDLC, and game loops — craft beyond a single stack.",
    items: ["Git", "DSA", "OOP", "SDLC", "Unity / C#", "Godot (optional)"],
  },
];

export const services = [
  {
    id: "01",
    title: "Web Applications",
    description:
      "Fast, usable sites and web apps — HTML, CSS, JavaScript, PHP — from layout through screens people can actually walk through.",
    image: "/project-art/project-se-architecture-glass.webp",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    icon: "web" as const,
  },
  {
    id: "02",
    title: "Database Systems",
    description:
      "Structured schemas, admin flows, attendance and access panels — dashboards that keep academic and product data clear.",
    image: "/project-art/project-dbms-admin-dashboard.webp",
    tags: ["MySQL", "SQL", "PHP", "Admin UI"],
    icon: "db" as const,
  },
  {
    id: "03",
    title: "Interactive Games",
    description:
      "Gameplay loops and algorithm-driven interactions — from arena combat concepts to learning-focused DSA experiences.",
    image: "/project-art/project-dsa-game-scene.webp",
    tags: ["Unity", "C#", "DSA", "Gameplay"],
    icon: "game" as const,
  },
  {
    id: "04",
    title: "Software Engineering",
    description:
      "From analysis to ship: clear process, documented decisions, and products that feel considered end to end.",
    image: "/project-art/project-se-architecture-glass.webp",
    tags: ["SDLC", "Design", "Build", "Ship"],
    icon: "se" as const,
  },
];

export const projects = [
  {
    slug: "campus-admin-dbms",
    title: "Campus Admin DBMS",
    category: "Database System",
    year: "2025",
    role: "Full-stack developer",
    context: "University course project · campus operations",
    summary:
      "A role-aware campus admin dashboard that puts attendance, course health, alerts, and access control in one scannable workspace.",
    image: "/project-art/project-dbms-admin-dashboard.webp",
    imageThumb: "/project-art/thumbs/project-dbms-admin-dashboard.webp",
    imageAlt:
      "Campus Admin DBMS dark dashboard with attendance charts, course totals, and faculty access panels",
    problem:
      "Campus staff were bouncing between spreadsheets, paper registers, and half-connected screens. Attendance, course status, alerts, and who could see what lived in different places — so demos looked messy and day-to-day decisions were slow.",
    approach:
      "I modeled the data first (students, faculty, courses, attendance records, alerts), then built a glass-dark admin shell with a persistent sidebar, KPI strip, and focused panels for faculty/student access. Charts surface attendance trends; role rules keep each view honest about what that user should act on.",
    result:
      "Reviewers could read the system in seconds: totals, active courses, open alerts, and role access without hunting. The build became a clear viva demo and a reusable pattern for academic admin UIs.",
    highlights: [
      "ER-informed schema for attendance, courses, and alerts",
      "Role-based faculty and student access panels",
      "KPI strip + charts for attendance at a glance",
      "Glass-dark layout tuned for dense but calm scanning",
    ],
    metrics: [
      { label: "Core modules", value: "4" },
      { label: "Role views", value: "2+" },
      { label: "Stack", value: "PHP · MySQL" },
    ],
    stack: ["HTML", "CSS", "PHP", "MySQL"],
    architecture: {
      title: "Admin data loop",
      caption: "Request in → process → authorize → render dashboards.",
      nodes: [
        { id: "input", label: "Input", sub: "Forms · Events" },
        { id: "process", label: "Data Processing", sub: "PHP · MySQL" },
        { id: "state", label: "Access Control", sub: "Roles · Rules" },
        { id: "render", label: "Dashboard UI", sub: "Charts · Panels" },
      ],
    },
  },
  {
    slug: "dsa-arena",
    title: "DSA Arena",
    category: "Game · Algorithms",
    year: "2025",
    role: "Gameplay & systems designer",
    context: "Interactive learning prototype · Unity / C#",
    summary:
      "A combat arena that turns path choices into algorithm practice — so decision trees and routing feel earned under pressure, not recited from slides.",
    image: "/project-art/project-dsa-game-scene.webp",
    imageThumb: "/project-art/thumbs/project-dsa-game-scene.webp",
    imageAlt:
      "DSA Arena cinematic fight scene with original fighters facing a molten boss in a volcanic arena",
    problem:
      "Algorithm drills usually feel abstract: dry graphs, no stakes, no reason to care which path you pick. Learners memorize patterns for exams, then forget how those choices feel when time and pressure matter.",
    approach:
      "I framed DSA as combat routing. Players face original fighters against a molten boss; each route and fork maps to a concrete idea (path selection, branching decisions, pressure under a clear goal). Primary build target is Unity with C#; Godot stays optional if a lighter prototype is needed.",
    result:
      "The scene sells the concept immediately — pathfinding and decision logic read as gameplay, not homework. It became a memorable portfolio piece for teaching DSA through interaction instead of another slide deck.",
    highlights: [
      "Combat loop keyed to path and decision choices",
      "Boss encounter as a high-stakes decision beat",
      "Unity / C# as the primary implementation path",
      "Art direction that carries the learning metaphor",
    ],
    metrics: [
      { label: "Core loop", value: "Fight · Choose · Learn" },
      { label: "Focus", value: "Paths · Trees" },
      { label: "Engine", value: "Unity · C#" },
    ],
    stack: ["Unity", "C#", "DSA", "Gameplay"],
    architecture: {
      title: "Game design system",
      caption: "Input → process → state → render — the core gameplay data loop.",
      nodes: [
        { id: "input", label: "Input", sub: "Player Actions" },
        { id: "process", label: "Data Processing", sub: "Node" },
        { id: "state", label: "State Machine", sub: "Combat Logic" },
        { id: "render", label: "Gameplay Engine", sub: "Renderer" },
      ],
    },
  },
  {
    slug: "ship-ready-se",
    title: "Ship-Ready SE Lab",
    category: "Software Engineering",
    year: "2025",
    role: "Process & product lead",
    context: "Software engineering coursework · end-to-end delivery",
    summary:
      "A visible Analyze → Design → Build → Test → Ship pipeline that turns scattered coursework into a coherent engineering story you can present and extend.",
    image: "/project-art/project-se-architecture-glass.webp",
    imageThumb: "/project-art/thumbs/project-se-architecture-glass.webp",
    imageAlt:
      "Ship-Ready SE Lab glass board showing Analyze, Design, Build, Test, and Ship stages",
    problem:
      "SE coursework often fragments: notes in one place, diagrams in another, code elsewhere, and no single board that proves how an idea becomes a release. Reviewers see fragments instead of maturity.",
    approach:
      "I treated delivery as a product surface. Each stage — Analyze, Design, Build, Test, Ship — owns a clear job, artifact, and exit condition. The glass board visual makes ownership obvious; documentation and UML sit beside implementation so process is evidence, not decoration.",
    result:
      "The project reads as intentional engineering: scope, design decisions, build discipline, and a shippable narrative in one frame. Useful for viva, team alignment, and as a template for later products.",
    highlights: [
      "Five-stage pipeline with clear ownership per phase",
      "UML and docs treated as first-class deliverables",
      "Visual board that explains process without a long speech",
      "Reusable pattern for course and client delivery",
    ],
    metrics: [
      { label: "Stages", value: "5" },
      { label: "Artifacts", value: "Docs · UML" },
      { label: "Outcome", value: "Ship-ready" },
    ],
    stack: ["SDLC", "UML", "Documentation", "Web"],
    architecture: {
      title: "Delivery pipeline",
      caption: "Idea in → design → build → ship — a closed engineering loop.",
      nodes: [
        { id: "input", label: "Analyze", sub: "Scope · Needs" },
        { id: "process", label: "Design", sub: "UML · Specs" },
        { id: "state", label: "Build · Test", sub: "Validate" },
        { id: "render", label: "Ship", sub: "Release" },
      ],
    },
  },
];

export const testimonials = [
  {
    quote:
      "Ufaq delivered a clean admin flow and explained every decision. The dashboard felt intentional, not rushed.",
    name: "Ayesha Rahman",
    role: "Project Collaborator",
  },
  {
    quote:
      "Clear communication, solid structure, and a UI that actually made attendance tracking easier to demo.",
    name: "Omar Hassan",
    role: "Faculty Reviewer",
  },
  {
    quote:
      "The game concept was memorable — combat that still taught path logic. Rare balance of fun and craft.",
    name: "Zainab Malik",
    role: "Peer Developer",
  },
  {
    quote:
      "From process board to shipped screens, everything stayed organized. Easy to present and easy to extend.",
    name: "Bilal Ahmed",
    role: "Team Lead (Course Project)",
  },
];

export const faqs = [
  {
    q: "What kind of work do you take on?",
    a: "Web apps, database systems, interactive prototypes, and software engineering projects — especially when clarity and polish matter.",
  },
  {
    q: "Are you open to freelance or collaboration?",
    a: "Yes. Share the goal, timeline, and constraints — I’ll tell you honestly what fits and how I’d approach it.",
  },
  {
    q: "What stack do you prefer?",
    a: "Modern web with React/Next when it fits, plus PHP/MySQL for academic and admin systems. For games I work primarily in Unity and C#, with Godot as an optional tool when a project calls for it.",
  },
  {
    q: "How fast can we start?",
    a: "Usually within a few days after we align on scope. Reach out via the form, email, or WhatsApp.",
  },
  {
    q: "Would you be willing to help students with their university projects?",
    a: "Yes, absolutely. I'm happy to guide students with their university projects, from choosing an idea and planning the structure to database design, coding, and preparing a clear demo. Send me the requirements and your deadline, and I'll let you know how I can help.",
  },
];

export const marqueeItems = [
  "CLEAN CODE",
  "MODERN UI",
  "FAST PERFORMANCE",
  "USER FOCUSED",
  "FULL STACK",
  "SHIP READY",
];
