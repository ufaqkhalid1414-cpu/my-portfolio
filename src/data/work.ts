/* LOCKED COPY. Do not rewrite, paraphrase, or regenerate unless the user explicitly asks. */

export type WorkVisual = {
  src: string
  label: string
  size: 'wide' | 'primary' | 'support' | 'behind'
}

export type CaseStudy = {
  slug: 'smart-campus' | 'certification-system' | 'shadow-warrior'
  title: string
  tagline: string
  preview: string
  challenge: string
  approach: string
  outcome: string
  cover?: string
  thumbnail: 'image' | 'timeline'
  visuals: WorkVisual[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'smart-campus',
    title: 'Smart Campus',
    tagline:
      'A student management system built to replace scattered spreadsheets with one real-time source of truth.',
    preview: 'A DBMS that unifies students, attendance, grades, and department reports.',
    challenge:
      'Academic departments often track students, faculty, courses, attendance, and grades across disconnected spreadsheets and paper records — making it slow to spot at-risk students or get an accurate picture of department performance.',
    approach:
      'Designed a relational database covering Students, Faculty, Departments, Courses, Semesters, Enrollment, Grades, Attendance, and Notifications, with clear foreign-key relationships so every record stays consistent. Built a role-based frontend (Admin, Faculty, Student views) on top of it, covering Dashboard, Student/Faculty/Department/Course Management, Attendance, Grades, Reports, and Analytics.',
    outcome:
      'A single-dashboard system giving administrators a live view of at-risk students (attendance/GPA thresholds), department-level performance comparisons, and centralized records that replace manual tracking across separate files.',
    cover: '/images/smart-campus/login.png?v=6',
    thumbnail: 'image',
    visuals: [
      { src: '/images/smart-campus/login.png?v=6', label: 'Login', size: 'wide' },
      { src: '/images/smart-campus/student-dashboard.png?v=6', label: 'Student Dashboard', size: 'wide' },
      { src: '/images/smart-campus/dashboard.png?v=10', label: 'Admin Dashboard', size: 'wide' },
      { src: '/images/smart-campus/course-management.png?v=6', label: 'Course Management', size: 'wide' },
      { src: '/images/smart-campus/students.png?v=6', label: 'Student Management', size: 'wide' },
      { src: '/images/smart-campus/faculty.png?v=6', label: 'Faculty Management', size: 'wide' },
      { src: '/images/smart-campus/departments.png?v=6', label: 'Department Management', size: 'wide' },
      { src: '/images/smart-campus/grades.png?v=7', label: 'Grade Management', size: 'wide' },
      { src: '/images/smart-campus/er-diagram.png', label: 'Behind the design: ER diagram', size: 'behind' },
    ],
  },
  {
    slug: 'certification-system',
    title: 'Online Training & Certification System',
    tagline:
      'A full-cycle web platform for course delivery, assessment, and certification — planned and specified end-to-end before a line of code was written.',
    preview: 'An SRS-led architecture for enrollment, assessment, and certification.',
    challenge:
      'Learners need a single platform to enroll in courses, access learning material, take proctored-style assessments, and receive verifiable certification — while administrators need to manage all of it without manual overhead.',
    approach:
      "This project's strength is the engineering process behind it: full requirement analysis, system design, a Work Breakdown Structure, Gantt-chart scheduling, and critical-path planning before development, followed by modular build-out — User Module → Course Module → Quiz Module → Certificate Module → Testing → Deployment. Core system functions specified: registration/authentication, course management, enrollment, learning material access, assessment management, online certification exams, automated certificate generation, and reporting.",
    outcome:
      'A fully specified, buildable system architecture with defined user roles (Administrator, Student), operating environment, and security constraints — the kind of planning discipline that precedes real production software.',
    cover: undefined,
    thumbnail: 'timeline',
    visuals: [],
  },
  {
    slug: 'shadow-warrior',
    title: 'Shadow Warrior',
    tagline:
      'A 2D boss-battle game built in Unity to apply data structures and algorithms to real-time interactive systems.',
    preview: 'A Unity combat game used as a live DSA exercise, not a theory worksheet.',
    challenge:
      'Translate DSA concepts — state management, collision detection, and enemy behavior logic — into a working, responsive game rather than a theoretical exercise.',
    approach:
      'Built in Unity (C#) using a component-based architecture — separate Player, Enemy, and Manager scripts, each handling one responsibility. Boss and enemy behavior runs on a finite state machine (Patrol → Chase → Attack → Staggered), with distance-based decision-making driving melee, ranged, and AOE attack choices. Health, lives, and score are tracked through an event-driven trigger system (OnTriggerEnter2D for hits and pickups), with Unity\'s physics engine (Rigidbody2D) handling movement and collision.',
    outcome:
      'A playable combat system with working health/lives tracking, score system, and boss encounters — demonstrating DSA concepts applied in a real-time, interactive context rather than just algorithm exercises.',
    cover: '/images/shadow-warrior/combat.png',
    thumbnail: 'image',
    visuals: [
      { src: '/images/shadow-warrior/combat.png', label: 'Combat scene', size: 'primary' },
      { src: '/images/shadow-warrior/boss-encounter.png', label: 'Boss encounter', size: 'primary' },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug)
}

export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((project) => project.slug === slug)
  if (index < 0) return undefined
  return caseStudies[(index + 1) % caseStudies.length]
}

export function getPreviousCaseStudy(slug: string) {
  const index = caseStudies.findIndex((project) => project.slug === slug)
  if (index < 0) return undefined
  return caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
}
