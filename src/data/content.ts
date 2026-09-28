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
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    icon: "web" as const,
  },
  {
    id: "02",
    title: "Database Systems",
    description:
      "Structured schemas, admin flows, attendance and access panels — dashboards that keep academic and product data clear.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    tags: ["MySQL", "SQL", "PHP", "Admin UI"],
    icon: "db" as const,
  },
  {
    id: "03",
    title: "Interactive Games",
    description:
      "Gameplay loops and algorithm-driven interactions — from arena combat concepts to learning-focused DSA experiences.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    tags: ["Unity", "C#", "DSA", "Gameplay"],
    icon: "game" as const,
  },
  {
    id: "04",
    title: "Software Engineering",
    description:
      "From analysis to ship: clear process, documented decisions, and products that feel considered end to end.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    tags: ["SDLC", "Design", "Build", "Ship"],
    icon: "se" as const,
  },
];

export const projects = [
  {
    slug: "campus-admin-dbms",
    title: "Campus Admin DBMS",
    category: "Database System",
    image: "/project-art/project-dbms-admin-dashboard.png",
    problem:
      "Faculty and students needed one place for attendance, course status, alerts, and clear access control.",
    approach:
      "Built a glass-dark admin workspace with sidebar navigation, live charts, faculty/student access panels, and attendance insights.",
    result:
      "A scannable dashboard where totals, active courses, alerts, and role access read at a glance.",
    stack: ["HTML", "CSS", "PHP", "MySQL"],
  },
  {
    slug: "dsa-arena",
    title: "DSA Arena",
    category: "Game / Algorithms",
    image: "/project-art/project-dsa-game-scene.png",
    problem:
      "Algorithm practice felt dry — players needed a fight-driven reason to choose paths and solve under pressure.",
    approach:
      "Designed a combat arena where route/path choices map to DSA ideas, starring original fighters versus a molten monster boss.",
    result:
      "A memorable game scene that makes pathfinding and decision trees feel visceral instead of abstract.",
    stack: ["Unity", "C#", "DSA", "Godot (optional)"],
  },
  {
    slug: "ship-ready-se",
    title: "Ship-Ready SE Lab",
    category: "Software Engineering",
    image: "/project-art/project-se-architecture-glass.png",
    problem:
      "Coursework needed a visible pipeline from idea to release — not scattered notes and half-finished builds.",
    approach:
      "Modeled an Analyze → Design → Build → Test → Ship board with glass depth and clear stage ownership.",
    result:
      "A coherent engineering story that shows process maturity alongside implementation skill.",
    stack: ["SDLC", "UML", "Documentation", "Web"],
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
