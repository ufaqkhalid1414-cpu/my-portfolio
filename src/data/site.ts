export const site = {
  name: 'Ufaq Khalid',
  firstName: 'Ufaq',
  email: 'ufaqkhalid1414@gmail.com',
  phone: '0322-6037970',
  phoneHref: 'tel:+923226037970',
  location: 'Gujranwala, Pakistan',
  education: {
    degree: 'BSCS',
    school: 'University of Central Punjab',
    campus: 'Gujranwala Campus',
    status: '3rd year',
    cgpa: '3.45 / 4.00',
  },
  github: {
    href: 'https://github.com/ufaqkhalid1414-cpu',
    label: 'GitHub',
  },
  whatsapp: {
    href: 'https://wa.me/923226037970',
    label: 'WhatsApp',
  },
  cta: "Let's Talk",
} as const

export function whatsappHref(message?: string) {
  if (!message) return site.whatsapp.href
  return `${site.whatsapp.href}?text=${encodeURIComponent(message)}`
}

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export const headlineOptions = [
  'I build systems that hold up under pressure',
  'I turn messy records into systems people can trust',
  'I specify carefully, then I build',
] as const

export const howIWork = [
  {
    title: 'Data first',
    body: 'If the records are inconsistent, the interface does not matter. I start with the schema and the relationships.',
  },
  {
    title: 'Specify, then build',
    body: 'Roles, modules, and constraints get written down before the first screen is drawn.',
  },
  {
    title: 'Concepts in use',
    body: 'Course ideas (databases, DSA, requirement engineering) show up in working systems, not only in assignments.',
  },
] as const

export const services = [
  {
    title: 'Database systems',
    body: 'Relational schemas, roles, and records that stay consistent. The Smart Campus work is the proof: students, attendance, grades, and department views in one place.',
  },
  {
    title: 'Specification',
    body: 'Requirements, modules, and a build order written down before product screens. The training and certification project is an SRS-led architecture, not a slide-only plan.',
  },
  {
    title: 'Web interfaces',
    body: 'Login, dashboards, and management screens on top of those records. I can walk through the actual pages, not a mock-only deck.',
  },
  {
    title: 'Applied DSA',
    body: 'Data structures in a live loop: state machines, collision, and combat rules in Unity. Shadow Warrior is the course concept running, not a worksheet.',
  },
] as const

export const projectNotes = [
  {
    quote:
      'A single-dashboard system giving administrators a live view of at-risk students (attendance/GPA thresholds), department-level performance comparisons, and centralized records that replace manual tracking across separate files.',
    source: 'Smart Campus case study',
    href: '/work/smart-campus',
  },
  {
    quote:
      'A fully specified, buildable system architecture with defined user roles (Administrator, Student), operating environment, and security constraints. That is the planning that precedes production software.',
    source: 'Certification system case study',
    href: '/work/certification-system',
  },
  {
    quote:
      'A playable combat system with working health/lives tracking, score system, and boss encounters. DSA concepts applied in a real-time loop, not only algorithm exercises.',
    source: 'Shadow Warrior case study',
    href: '/work/shadow-warrior',
  },
] as const

export const faqs = [
  {
    question: 'What do you actually offer?',
    answer:
      'Database systems, written specifications, web screens on those systems, and applied DSA in a playable game. Those four match the three case studies on this site. I do not list services I have not done.',
  },
  {
    question: 'Are you a company or an agency?',
    answer:
      'No. I am a third-year BSCS student at the University of Central Punjab, Gujranwala Campus. This is a student portfolio.',
  },
  {
    question: 'Why are there no client names in Testimonials?',
    answer:
      'I have not shipped paid work for an outside client, so I will not invent reviews. That section uses claims from my own case studies. I can walk through each one.',
  },
  {
    question: 'Where is the 3D character?',
    answer:
      'On the home page, in the hero, next to the headline. It is modeled in the browser with Three.js. It is not a purchased asset.',
  },
  {
    question: 'How do I contact you?',
    answer:
      'Use the form on this page or on Contact. Email opens a draft to ufaqkhalid1414@gmail.com. WhatsApp opens a chat with the same message. I reply within a day if I cannot pick up immediately.',
  },
] as const
