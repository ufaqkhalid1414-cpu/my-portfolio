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
