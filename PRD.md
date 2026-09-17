# Product Requirements Document

**Product:** Ufaq Khalid — Personal Portfolio Website  
**Owner:** Ufaq Khalid  
**Document type:** PRD (v1, updated in place — not a second PRD)  
**Status:** Implemented (current product); public Vercel URL when deployed  
**Last updated:** 17 September 2026

---

## 1. Overview

This is **Ufaq Khalid’s personal portfolio website**: a multi-page Next.js site that presents who she is, the three strongest academic projects, and how to reach her.

A first-time visitor should immediately understand that she is a **3rd year BSCS student** who builds **practical, functional web-based systems**, and that she is **open to real project work** and growing as a developer.

### Positioning

- **Who:** 3rd year BSCS student at University of Central Punjab (Gujranwala Campus), based in Gujranwala, Pakistan.
- **What she builds:** Practical web-based systems (and related academic work: DBMS apps, DSA-based game logic, requirement engineering).
- **Primary ask:** Project opportunities and junior developer work — **not internships**.

### Outcome priorities

| Priority | Outcome |
| --- | --- |
| 1 | Junior developer / job opportunities |
| 2 | Small freelance / “launch” clients and real-world project work |
| 3 | University project collaborators |
| Out of focus | Internship recruiting as a primary narrative |

The **#1 visitor** is a small business owner or someone with a web/software project who needs it built. Within ~30 seconds they should be able to answer: *“Can this person actually build what I need?”*

**Professors / academic reviewers** are a first-class secondary audience: they need a **public URL** (not `localhost`) they can open on any device.

---

## 2. Goals

Over the next **3–6 months**, the site should:

1. **Showcase the three strongest academic projects** so a visitor understands what Ufaq can build without extra explanation.
2. **Make contact effortless** (email, phone, WhatsApp, and a simple form) when someone has a project or opportunity.
3. **Help start small freelance / real-world project opportunities**, not internships.
4. **Build credibility as a developer** despite no formal work experience yet.

**Must-win:** A visitor understands the three projects and skills, and can contact Ufaq in one click.

---

## 3. Target Audience

### Primary

**Small business owner or project owner** who needs a web/software system built.

They will look for:

- Real project examples
- Clear skills
- An easy way to get in touch

### Secondary

- Fellow students or developers reviewing the work
- University professors / academic reviewers evaluating project quality
- Formal recruiters (not the main focus; the site should still look credible if they visit)

### Not the main audience

Internship-focused recruiters and internship-first messaging.

---

## 4. Site Content

**Shipped IA:** multi-page App Router site (not a single scrolling page). English only.

| Route | Role |
| --- | --- |
| `/` | Home: headline, quiet 3D object, selected work, how I work |
| `/work` | All three case studies as cards |
| `/work/[slug]` | Full case study (challenge, approach, visuals, outcome) |
| `/about` | Bio, values, tools, talk — **no photo** |
| `/contact` | Form + direct email, phone, GitHub, WhatsApp |

### 4.1 Navbar

| Item | Requirement |
| --- | --- |
| Left | Name / wordmark: **Ufaq Khalid** (script) |
| Links (order) | Home · Work · About · Contact |
| Right | **Let’s Talk** → `/contact` |
| Behavior | Sticky on scroll |
| Theme | Ink / cream editorial — **no** theme toggle |
| Social | **No** social icons in the navbar (footer + Contact / About) |

No Resume control in the current build (no PDF yet). Do **not** add a broken download link.

### 4.2 Home

**Headline (locked):** I build systems that hold up under pressure.  
**Supporting line:** Systems that stay coherent when more than one person has to rely on them.

**3D:** One pyramid (`Hero3D`) with project textures. Motion is **slow and quiet** (not a second 3D scene). Honors `prefers-reduced-motion`.

**Selected work:** Three equal-height cards → case study routes.

**How I work:** Data first · Specify, then build · Concepts in use.

### 4.3 About

No headshot. Empty photo slots are **not** allowed.

**Header:** Title **About** plus fact row: Study, CGPA, Campus, Based (from `src/data/site.ts`).

**Blocks:**

- **Bio** — locked copy (three paragraphs)
- **What I Care About** — locked copy
- **Languages & Tools** — HTML, CSS, JavaScript, PHP, MySQL, C++, Unity (C#)
- **Talk** — email + WhatsApp (same number as Contact)

### 4.4 Work / case studies

Three projects. **Separate pages** (not expand-in-place). **No filters.**

Each case study: Challenge, Approach, The Work (visuals or process timeline), Outcome, prev/next.

**No GitHub or live demo links** on project cards (academic work).

#### Project 1 — Smart Campus

A DBMS / student management system (attendance, performance, department records).

**Stack (in copy):** relational design, role-based frontend (Admin, Faculty, Student).

**Visuals (17 Sept 2026):** Real screenshots, not placeholders.

- Login (full page, chrome/taskbar cropped)
- Student dashboard: stats, performance summary, quick links stacked as **one page**; no leftover duplicate headings; no Smart Campus left nav
- Admin dashboard: stats, system summary, attendance trend, at-risk pie, **quick actions**, notifications — **equal-width column**, no leftover left-nav sliver
- Module shots with **full sidebar** where it belongs (faculty, departments, students, courses)
- Grade management: faculty-style grades table; black header recolored **blue** with sharp white labels
- Removed from the gallery: attendance module, performance analytics, incomplete bar-chart / department-performance slices
- Screenshots sit **inset** (cream margin, centered) so they are not edge-to-edge zoomed
- Cover on Work index: login

#### Project 2 — Online Training & Certification System

SRS-led architecture. Strength is process: WBS, Gantt, critical path, modular sequence.

**Visuals:** Compact process timeline on the work card; full timeline + WBS on the case study. Documentation-only — **no coded-stack tags**.

#### Project 3 — Shadow Warrior

Unity (C#) combat / DSA. FSM, triggers, Rigidbody2D. Combat + boss screenshots.

### 4.5 Contact

**On-page details (always visible):**

- Email: [ufaqkhalid1414@gmail.com](mailto:ufaqkhalid1414@gmail.com)
- Phone: 0322-6037970 (`tel:+923226037970`)
- GitHub: https://github.com/ufaqkhalid1414-cpu
- **WhatsApp:** `https://wa.me/923226037970` (free `wa.me` link — **no paid API**)

**Form fields:** Name, Email, Subject, Message  

**Submission (free, no backend product):**

- **Send email** → `mailto:` draft
- **Send on WhatsApp** → opens WhatsApp with the typed message; visitor taps Send

**On-site confirmation (not a WhatsApp/Gmail auto-reply):** After send, the form is replaced by a short thank-you: message received, reply within a day. Optional phone-side **WhatsApp Business away message** is out of the website (free app setting, not an API).

**Paid contact products are out of scope:** WhatsApp Business API, Formspree unless later requested.

### 4.6 Footer

- Name: Ufaq Khalid
- Tagline: Third-year BSCS student in Gujranwala. Databases, specification, and systems that stay coherent.
- Email, GitHub, WhatsApp
- Copyright: **© 2026**

**Not in footer:** Back-to-top, repeated full nav.

### 4.7 Motion and chrome (17 Sept 2026)

- **Reveal:** One fade + 14px rise, ~0.6s, once per block, `prefers-reduced-motion` skips it
- **Hover:** Buttons and work cards lift slightly with a light shadow (no scale-pop)
- **Favicon:** `UK` on ink with accent bar (`src/app/icon.svg`)
- **Link preview:** `/og.png` + Open Graph / Twitter metadata (used when the public URL is shared)
- **3D:** Existing pyramid only; slower rotation, softer light

---

## 5. Functional Requirements

### Required

| ID | Requirement |
| --- | --- |
| FR-1 | Fully **responsive** layout: mobile, tablet, and desktop |
| FR-2 | App Router routes for Home, Work, About, Contact, case studies |
| FR-3 | **Mobile hamburger** menu for navigation |
| FR-4 | Contact form **validation**; email needs all fields; WhatsApp needs name + message |
| FR-5 | Email, phone, GitHub, and **WhatsApp** actions work from Contact (and Talk on About) |
| FR-6 | Case study pages with locked copy and real visuals where provided |
| FR-7 | No accounts, login, blog, or admin |
| FR-8 | No photo / headshot anywhere |
| FR-9 | No paid third-party messaging APIs |

### Nice-to-have (shipped)

| ID | Requirement |
| --- | --- |
| NFR-UX-1 | Scroll **reveal** on major blocks |
| NFR-UX-2 | Card / button hover lift + shadow |
| NFR-UX-3 | Quiet hero 3D; reduced-motion safe |

---

## 6. Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| Performance | Fast; screenshots compressed as PNG; no extra 3D scenes |
| Accessibility (v1) | Keyboard-navigable nav and form; `:focus-visible`; reduced-motion |
| SEO | Title, description, Open Graph image |
| Browsers | Latest **Chrome, Edge, Firefox**. No support for very old browsers |
| Language | English only |
| Hosting | **Vercel** (free), GitHub repo `ufaqkhalid1414-cpu/my-portfolio` |
| Contact privacy | No stored form database. `mailto:` + `wa.me` only |
| Analytics | **Not required** |
| Cost | **No paid APIs or paid hosting add-ons** |

---

## 7. Visual / Design System

| Token | Direction |
| --- | --- |
| Theme | Ink field + cream sheets (not flat navy glassmorphism) |
| Ink | `#0d0d0d` |
| Cream | `#f4f1ea` / cream-deep `#e8e3d6` |
| Accent | `#e8622c` — buttons and links |
| Type | **Outfit** body, **Oswald** display, **Great Vibes** wordmark (`next/font`) |
| Layout | Centered, max-width ~1400px; screenshots inset in cream frames |
| Photo | None |
| Vibe | Calm, editorial, senior-student — not hype, not extra 3D |

**Do not use:** neon, particle fields, extra WebGL scenes, cluttered layouts.

Styling: **Tailwind CSS v4** (`src/app/globals.css` tokens).

---

## 8. Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| App | **Next.js** (App Router) | `src/app/` routes |
| UI | **React** | |
| Language | **TypeScript** | |
| CSS | **Tailwind v4** | Design tokens in `globals.css` |
| Fonts | **`next/font`** | Outfit, Oswald, Great Vibes |
| Motion | **Framer Motion** | `Reveal`, timeline, reduced-motion |
| 3D | **React Three Fiber** + Three | One hero pyramid |
| Contact | `mailto:` + `wa.me` | No Formspree, no WhatsApp API |
| Hosting | **Vercel** | Free; public URL for sharing |

No backend, CMS, or auth. Dev: `npm run dev` → **http://localhost:3000**.

---

## 9. Outstanding Content Needed

### Still optional (not blockers for a professor link)

| Item | Status |
| --- | --- |
| Resume PDF | Not in the UI — skip until a file exists |
| Visitor photo | **Do not add** |
| Formspree / paid mail | **Do not add** |
| WhatsApp Business away message | Phone setting, optional, free |
| Custom domain | Optional later; `*.vercel.app` is enough |

### Explicitly not needed

- Headshot / photo assets
- Paid WhatsApp or email APIs

### Already known / shipped

- Name, routes, locked case-study copy
- Education: BSCS, **3rd year**, UCP Gujranwala, CGPA 3.45
- Tools list
- All 3 project treatments
- Email, phone, WhatsApp, GitHub profile
- Smart Campus screenshot set (17 Sept)

---

## 10. Success Metrics

**Timeframe:** first 3–6 months. **No visit analytics.**

### Success looks like

- A visitor understands the **3 projects** without asking extra questions
- Contact is **one click away** (email, phone, WhatsApp — no digging)
- A professor can open a **public URL** without Ufaq’s laptop
- The site looks **clean on mobile and desktop**
- At least **one real inquiry or small project opportunity**

### Failure looks like

- Only `localhost` exists when someone needs to review the work
- Broken or unfinished appearance on mobile
- Visitors cannot tell what the projects actually are
- People cannot figure out how to contact Ufaq easily

---

## 11. Out of Scope

Do **not** build:

- Blog, CMS, extra marketing pages
- Accounts, login, admin, dashboards
- Light/dark **theme toggle**
- Internship-first positioning
- GitHub / live demo links on project cards
- Project filters / search
- Headshot / photo
- Analytics / visit tracking
- Paid email/WhatsApp automation
- Multilingual support
- Testimonials, client logos, or a services pricing page
- Extra 3D scenes or heavy motion
- Back-to-top and repeated footer nav

**WhatsApp via `wa.me` is in scope** (free). **WhatsApp Business API is out of scope.**

---

## Appendix A — Resolved decisions

| Topic | Decision |
| --- | --- |
| Internships | Not a focus; skip internship messaging |
| Photo | **No photo** anywhere (About has no portrait slot) |
| WhatsApp | Include via free `wa.me`; no paid API |
| Contact backend | `mailto:` + `wa.me`; on-site thank-you only |
| Tech | Next.js App Router + React + TypeScript + Tailwind v4 |
| Projects | 3 case studies, **own routes**, real screenshots where we have them |
| SRS project | Documentation / process; timeline on the card |
| Academic year | **3rd year BSCS student** |
| Game name | **Shadow Warrior** (not Dark Veil Odyssey) |
| Public URL | Vercel free hosting when Ufaq asks to publish |

## Appendix B — Public contact (approved to publish)

- **Email:** ufaqkhalid1414@gmail.com  
- **Phone:** 0322-6037970  
- **WhatsApp:** https://wa.me/923226037970  
- **GitHub:** https://github.com/ufaqkhalid1414-cpu  
- **Location:** Gujranwala, Pakistan  

---

## 12. Changelog

### 17 September 2026

- **IA:** Multi-page site (Home, Work, About, Contact, `/work/[slug]`). Navbar is Home · Work · About · Contact + Let’s Talk.
- **Design:** Ink/cream editorial (Oswald / Outfit / Great Vibes). No glassmorphism single-pager.
- **Smart Campus visuals:** Login; stacked student dashboard; stacked admin dashboard with equal-width System Summary, Attendance Trend, At-Risk, Quick Actions, notifications; module screens with full sidebars; Grade Management (blue header, sharp labels). Attendance / analytics / incomplete bar charts removed. Screenshots inset, not full-bleed zoom.
- **About:** No photo. Fact row + Talk (email + WhatsApp).
- **Contact:** Subject field; Send email + Send on WhatsApp; on-site thank-you (reply within a day). No paid APIs.
- **Footer / GitHub:** Profile URL set.
- **Motion:** Quiet scroll reveals; button/card hover lift + shadow; slower 3D.
- **Share chrome:** Favicon (UK), `/og.png` Open Graph.
- **Hosting:** Public Vercel URL (free) for professors and other visitors — this is the site address, not a button on the pages.

### 15 September 2026

- **Stack:** Portfolio runs on **Next.js** (App Router), not Vite and not plain HTML/CSS/JS.
- **Hover / type / nav / contrast / 3rd year copy:** See git history of the first implementation pass.
