# Product Requirements Document

**Product:** Ufaq Khalid — Personal Portfolio Website  
**Owner:** Ufaq Khalid  
**Document type:** PRD (v1)  
**Status:** Implemented (current product)  
**Last updated:** 15 September 2026

---

## 1. Overview

This is **Ufaq Khalid’s personal portfolio website**: a fast, single-page site that presents who she is, what she can build, and how to reach her.

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

Single-page site with in-page sections. English only.

### 4.1 Navbar

| Item | Requirement |
| --- | --- |
| Left | Name / wordmark: **Ufaq Khalid** |
| Links (order) | Home · About · Skills · Projects · Contact |
| Right | **Resume** control |
| Behavior | Sticky on scroll |
| Theme | Dark theme only — **no** theme toggle |
| Social | **No** social icons in the navbar (footer only) |

**Resume control (v1):** Do **not** use a broken download link. Show a **“Resume coming soon”** state until a PDF is provided.

### 4.2 Hero

**Headline:** I’m Ufaq Khalid.  
**Supporting line:** 3rd year BSCS student building practical, functional web-based systems.

**Buttons:**

- Primary: **View Projects** (smooth-scroll to Projects)
- Secondary: **Download Resume** — same “coming soon” behavior until the PDF exists

**Must-have facts (visible in hero, not as a photo):**

- 3rd year BSCS student
- University of Central Punjab (Gujranwala Campus)
- CGPA **3.45**
- Based in Gujranwala, Pakistan
- Open to project work

**Photo:** **None.** No headshot in the hero or anywhere else.

### 4.3 About

Short, simple, professional, easy to read — no fancy or complicated wording.

**Story:**

- 3rd year BSCS student at University of Central Punjab, Gujranwala
- Enjoys building practical web-based systems and learning through real projects
- Education (CGPA 3.45, 3rd year) mentioned **briefly in copy**, plus University / CGPA / Focus stat cards

**Skills:** Not inside About — dedicated Skills section.

### 4.4 Skills

Grouped tags/pills, **glassmorphism**, **no icons**.

| Group | Items |
| --- | --- |
| Languages / Programming | C++, JavaScript |
| Web (Front-End) | HTML, CSS |
| Databases | MySQL |
| Tools | XAMPP, Visual Studio |
| Other | Requirement Engineering (SRS documentation, Use Case & Sequence Diagrams) |

This is the full current skill set; nothing extra to list or hide.

### 4.5 Projects

Simple list of **3** projects. **No filters.** **No separate project pages.** Clicking a card **expands more detail on the same page**.

Each card:

- Title
- Short description (2–3 sentences)
- Placeholder / generic image if no real screenshot yet
- Tech stack tags **except** for the documentation-only project

**No GitHub or live demo links** in v1 (academic projects).

#### Project 1 — Smart Campus Attendance & Performance Analytics System

A web-based DBMS platform for universities to manage attendance, track performance, and generate reports.

**Stack tags:** MySQL, PHP, HTML, CSS, JavaScript

#### Project 2 — Dark Veil Odyssey

A game project built in Visual Studio applying data structures and algorithms (DSA) for game logic and interactivity.

**Stack tags:** Visual Studio, DSA (and related implementation details as available)

#### Project 3 — Online Training & Certification System

A complete Software Requirement Specification (SRS) including Use Case and Sequence diagrams for a web-based training platform.

**Important:** Documentation-only — **no code and no live demo**. The card must state this clearly and **must not** show coded-project tech tags (PHP/HTML/etc.). Use documentation labels (e.g. SRS, Use Cases, Sequence Diagrams) only.

### 4.6 Contact

**Heading:** Let’s Work on a Project

**On-page details (always visible):**

- Email: [ufaqkhalid1414@gmail.com](mailto:ufaqkhalid1414@gmail.com)
- Phone: 0322-6037970 (`tel:+923226037970`)
- **WhatsApp:** button/link using the same number so visitors can message directly (`https://wa.me/923226037970`)

**Form fields:** Name, Email, Message  
**v1 submission:** Working **`mailto:`** (pre-filled) until Formspree is configured.  
**Later:** Formspree forwarding to the email above — no data storage.

**Success copy after submit (when a real form backend exists):**

> Thank you for reaching out! I really appreciate you taking the time to connect. I'll review your message and get back to you as soon as I can.

**TBD (placeholders only):** LinkedIn URL, GitHub profile URL.

### 4.7 Footer

Minimal:

- Name: Ufaq Khalid
- Tagline: **BSCS Student & Web Developer** (or equivalent)
- Email again
- Copyright: **© 2026**
- Social: GitHub / LinkedIn **TBD** (omit or disable until URLs exist)

**Not in footer:** Back-to-top, repeated full nav.

---

## 5. Functional Requirements

### Required

| ID | Requirement |
| --- | --- |
| FR-1 | Fully **responsive** layout: mobile, tablet, and desktop |
| FR-2 | **Smooth scroll** between sections (nav + hero CTAs) via `scrollIntoView` (`scrollToHash` utility). Offset uses `scroll-margin-top` only — do **not** also set `html` `scroll-padding-top`, which stacked and overshot the heading |
| FR-3 | **Mobile hamburger** menu for navigation |
| FR-4 | Resume control that never 404s; PDF download when file exists, otherwise “coming soon” |
| FR-5 | Contact form **basic validation** (name, email format, non-empty message) |
| FR-6 | Email, phone, and **WhatsApp** actions work from Contact |
| FR-7 | Project cards **expand in place** for extra detail |
| FR-8 | Single static portfolio — **no** accounts, login, blog, or admin |

### Nice-to-have

| ID | Requirement |
| --- | --- |
| NFR-UX-1 | Sticky nav **highlights the current section** while scrolling |
| NFR-UX-2 | Light **fade-in** as sections enter the viewport |
| NFR-UX-3 | Shared **`.card-hover`** glow (soft accent `box-shadow` only, 200ms ease) on About stats, Skills categories, Projects cards, Contact info pills, and Education card — no extra scale or border-color change on those boxes |

---

## 6. Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| Performance | Fast and lightweight; no heavy unnecessary images or effects |
| Accessibility (v1) | Readable **contrast** (body copy is a brighter muted gray, e.g. `#c8cad6` on `#0d1117`); **keyboard-navigable** nav and form. Advanced screen-reader work is not required now |
| SEO | Page title and meta description, e.g. **Ufaq Khalid — BSCS Student & Web Developer Portfolio** |
| Browsers | Latest **Chrome, Edge, Firefox**. No support for very old browsers |
| Language | English only |
| Hosting | Deploy on **Vercel**, connected to the GitHub repo, when the site is ready |
| Contact privacy | No stored form database. v1: `mailto:`. Later: **Formspree** forwards to email |
| Analytics | **Not required** in v1 |

---

## 7. Visual / Design System

| Token | Direction |
| --- | --- |
| Theme | Dark only |
| Background | Deep navy-black **`#0d1117`**; alternate sections use a slightly lighter shade (**`#10151c`**) so the page is not one flat block |
| Cards | **`#161b22`**, 1px low-opacity borders |
| Accent | **`#6b9eff`** — reserved for **links, primary buttons, active nav, icons, and thin accent borders**. Do not use it as decorative fill on labels/eyebrows |
| Text | Headings near-white (`#f0f3f6`); body **muted gray** (`#c8cad6`) for contrast on navy |
| Surfaces | Card surfaces with subtle borders and a shared hover glow (see `.card-hover`) |
| Type | **Inter** for body; **Space Grotesk** for headings (`h1`/`h2`/`h3`). Font CSS variables must be defined where Next.js `next/font` classes apply (on `body`, not only `:root`), or headings silently fall back to Times New Roman |
| Layout | Single page, centered content, reasonable **max-width** (not edge-to-edge on large screens) |
| Photo | None |
| Vibe | Minimal, techy, clean — professional but not corporate-stiff |

**Do not use:** neon colors, excessive motion, cluttered/busy layouts.

Styling approach: global CSS (`src/index.css`) with design tokens as CSS variables. Hover on cards is **`.card-hover`** (`box-shadow: 0 0 20px` at 30% accent opacity, `200ms ease`).

---

## 8. Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| App | **Next.js** (App Router) | `src/app/layout.tsx` + `src/app/page.tsx`; not Vite or a static HTML/CSS/JS site |
| UI | **React** | Single-page portfolio sections on `/` |
| Language | **TypeScript** | |
| CSS | Global CSS + CSS variables | `src/index.css` (not Tailwind) |
| Fonts | **`next/font`** | Inter + Space Grotesk |
| Motion | **Framer Motion** + CSS | Section/hero entrance; card hover is CSS-only |
| In-page nav | **`scrollToHash`** | `src/lib/scrollToHash.ts` — `scrollIntoView({ block: 'start' })` so `scroll-margin-top` is honored |
| Contact (later) | **Formspree** | After account + form ID exist |
| Hosting | **Vercel** | Linked to GitHub |

No extra product features that would require a backend, CMS, or auth. Dev: `npm run dev` → **http://localhost:3000**.

---

## 9. Outstanding Content Needed

### Still TBD (blockers for a “complete” live site)

| Item | v1 workaround |
| --- | --- |
| Resume PDF | “Resume coming soon” — no broken link |
| LinkedIn URL | Omit or placeholder in footer |
| Public GitHub profile URL | Omit or placeholder in footer |
| Real screenshots for 3 projects | Generic / placeholder visuals |
| Formspree form ID | Working `mailto:` until set up |

### Explicitly not needed

- Headshot / photo assets — **do not add a photo section**

### Already known / ready to implement

- Name, role, tagline, bio direction
- Education: BSCS, **3rd year**, UCP Gujranwala, CGPA 3.45
- Skills list and grouping
- All 3 project titles, descriptions, and stack/documentation treatment
- Email and phone (and WhatsApp from the same number)
- Design direction (colors, type, glassmorphism)

---

## 10. Success Metrics

**Timeframe:** first 3–6 months. **No visit analytics** in v1.

### Success looks like

- A visitor understands the **3 projects and skills** without asking extra questions
- Contact is **one click away** (email, phone, WhatsApp visible — no digging)
- The site looks **clean and professional on mobile and desktop**
- At least **one real inquiry or small project opportunity** from someone who found the site

### Failure looks like

- Broken or unfinished appearance on mobile
- Visitors cannot tell what the projects actually are
- People cannot figure out how to contact Ufaq easily

---

## 11. Out of Scope (v1)

Do **not** build in this version:

- Blog, CMS, extra marketing pages
- Accounts, login, admin, dashboards
- Light/dark **theme toggle**
- Internship-first positioning or dedicated internship funnel
- GitHub / live demo links on project cards
- Separate project detail routes
- Project filters / search
- Headshot / photo
- Analytics / visit tracking
- Email automation beyond Formspree (later) or `mailto:` (now)
- Multilingual support
- Testimonials, client logos, or a services pricing page
- Advanced accessibility / screen-reader certification work
- Back-to-top control and repeated footer nav
- Extra animation libraries or heavy motion

**WhatsApp is in scope** (added after the first contact pass): a visible WhatsApp action using 0322-6037970.

---

## Appendix A — Resolved decisions (interview)

| Topic | Decision |
| --- | --- |
| Internships | Not a focus; skip internship messaging |
| Photo in hero | Originally requested; **final decision: no photo** |
| WhatsApp | Originally deferred; **final decision: include** |
| Contact backend | `mailto:` now; Formspree when ID exists |
| Tech | **Next.js** (App Router) + React + TypeScript + global CSS. Original interview said Vite/Tailwind; **shipped stack is Next.js**. |
| Projects | 3 cards, expand in place, placeholders OK |
| SRS project | Documentation-only; call that out; no coded-stack tags |
| Academic year | **3rd year BSCS student** (not final-year) |

## Appendix B — Public contact (approved to publish)

- **Email:** ufaqkhalid1414@gmail.com  
- **Phone:** 0322-6037970  
- **WhatsApp:** https://wa.me/923226037970  
- **Location:** Gujranwala, Pakistan  

---

## 12. Changelog

### 15 September 2026

- **Stack:** Portfolio runs on **Next.js** (App Router), not Vite and not plain HTML/CSS/JS.
- **Hover:** Shared **`.card-hover`** / `GlassCard` hover — identical soft accent glow on About stats (University, CGPA, Focus), Skills category cards, Projects cards, Contact info boxes (email, phone, location), and Education.
- **Typography:** Display font (Space Grotesk) was falling back to Times New Roman because `--font-space` from `next/font` is set on `body`, while `--display` was computed on `:root` (where that variable does not exist). `--sans` / `--display` now resolve on `body`.
- **Navigation:** Nav/hero anchors (Home, Projects, Skills, Contact; About and Education section ids as well) overshot because `html { scroll-padding-top }` stacked with section `scroll-margin-top` and section padding. Offset is now `nav-offset − section padding`; scrolling uses **`scrollToHash`** + `scrollIntoView`.
- **Contrast / accent:** Brighter body text; accent blue limited to links, primary buttons, active nav, icons, and small borders — not decorative eyebrows/status labels.
- **Copy:** Student standing is **3rd year BSCS** (not final-year / Semester 4).
