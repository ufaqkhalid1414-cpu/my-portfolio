export const profile = {
  name: 'Ufaq Khalid',
  role: 'Aspiring Software / Web Developer',
  tagline:
    'Third-year BSCS student who builds clean, functional web-based systems',
  intro:
    'I design and implement practical web applications with a focus on clarity, data integrity, and usable interfaces. Currently completing my BSCS degree while building systems that connect databases, analytics, and real user workflows.',
  email: 'ufaqkhalid1414@gmail.com',
  phone: '0322-6037970',
  phoneHref: 'tel:+923226037970',
  location: 'Gujranwala, Pakistan',
  about: [
    'I am a third-year BSCS student at the University of Central Punjab (UCP), Gujranwala Campus, with a CGPA of 3.45/4.00.',
    'I am passionate about web development and software engineering — from requirement modeling to building working systems with HTML, CSS, JavaScript, PHP, and MySQL.',
    'I enjoy turning academic concepts such as databases, data structures, and requirement engineering into products that people can actually use.',
  ],
  education: {
    degree: 'Bachelor of Science in Computer Science (BSCS)',
    status: 'In Progress',
    school: 'University of Central Punjab',
    campus: 'Gujranwala Campus',
    cgpa: '3.45 / 4.00',
  },
} as const

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const

export const skillGroups = [
  {
    title: 'Front-End',
    items: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Programming',
    items: ['C++', 'Data Structures'],
  },
  {
    title: 'Back-End / Database',
    items: ['MySQL'],
  },
  {
    title: 'Tools',
    items: ['XAMPP', 'Visual Studio'],
  },
  {
    title: 'Requirement Engineering',
    items: ['SRS', 'Use Case Diagrams', 'Sequence Diagrams'],
  },
] as const

export const projects = [
  {
    title: 'Smart Campus Attendance & Performance Analytics System',
    description:
      'A web-based DBMS platform for universities to manage attendance, track academic performance, and generate analytics. Includes role-based login (Admin / Teacher / Student), attendance tracking, CGPA calculation, performance trend charts, and low-attendance email alerts.',
    tags: ['MySQL', 'PHP', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Dark Veil Odyssey',
    description:
      'A game project built in Visual Studio that applies core data structures and algorithms to manage game logic, state, and interactivity.',
    tags: ['C++', 'DSA', 'Visual Studio'],
  },
  {
    title: 'Online Training & Certification System',
    description:
      'A complete Software Requirement Specification (SRS) for a web-based training and certification platform, covering functional and non-functional requirements, Use Case diagrams, and Sequence diagrams.',
    tags: ['SRS', 'Use Cases', 'Sequence Diagrams'],
  },
] as const
