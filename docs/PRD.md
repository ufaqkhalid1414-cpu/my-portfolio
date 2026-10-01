# Product Requirements Document (PRD)
## Ufaq Khalid — Personal Portfolio Website

| Field | Value |
|--------|--------|
| **Product name** | Ufaq Portfolio (`ufaq-portfolio`) |
| **Owner** | Ufaq Khalid |
| **Version** | 1.0 (reflects shipped product) |
| **Status** | Shipped / under academic code review |
| **Primary deploy** | Vercel (GitHub repo `my-portfolio`) |
| **Live URL** | https://my-portfolio-ufaq-khalid.vercel.app |
| **Document type** | PRD (requirements + acceptance) — separate from Design Sheet |

---

## 1. Executive summary

Build and maintain a **personal portfolio website** that presents Ufaq Khalid as a **Software Engineer / Full-Stack Builder**. The site must convince professors (viva / coursework review) and employers that coursework and original builds are **clear, usable, and professionally presented** — with case studies, skills, services, and a working contact path.

This PRD describes **what the product must do**, for **whom**, with **what acceptance criteria**. Visual/token details live in the Design Sheet; this document owns product requirements.

---

## 2. Problem statement

Students often show raw projects without narrative (problem → approach → outcome). Reviewers and recruiters need:

1. Who the person is and how they work  
2. What they can build (skills / services)  
3. Proof (case studies with structure, not only screenshots)  
4. An easy way to contact them  

Without a coherent portfolio, demos feel scattered and hard to grade or hire against.

---

## 3. Goals

### 3.1 Primary goals
1. Present a coherent personal brand and role in the first viewport.  
2. Explain a clear build process (About).  
3. Show skill groups and service offerings.  
4. Ship **three** case studies with full narrative + architecture diagram.  
5. Provide social proof (testimonials) and FAQ.  
6. Enable contact via email, phone, and WhatsApp form.  
7. Support **dark** (default) and **light** themes with persisted preference.  
8. Deliver motion that feels premium but respects **reduced motion**.  
9. Deploy as a fast static Next.js site on Vercel.

### 3.2 Secondary goals
1. Desktop-only cursor trail and hero 3D as craft signals.  
2. Design + motion documentation for review day.  
3. Optimized project imagery (WebP / next/image).

### 3.3 Non-goals (out of scope)
- CMS, auth, blog, multi-language  
- Backend form/email API (WhatsApp deep-link is enough)  
- Live embedded demos / sandboxes per project  
- Analytics dashboard, A/B testing  
- E-commerce or client portal  
- Full SEO pack (OG images, sitemap) — optional future  

---

## 4. Users & personas

| Persona | Goal | Must-have support |
|---------|------|-------------------|
| **Professor / viva examiner** | Judge process maturity & clarity | About steps, case studies, architecture, stack, metrics |
| **Employer / recruiter** | Assess fit quickly | Hero, skills, work cards, contact |
| **Collaborator / client** | See services & reach out | Services, FAQ, WhatsApp/email |
| **Student seeking help** | Know if mentoring is offered | FAQ answer on university project help |
| **Peer developer** | Judge craft | Motion, theme, case study depth |

---

## 5. User journeys

1. **Viva reviewer:** Land → Hero → Work → open case study → Architecture + Problem/Approach/Outcome → Contact if needed.  
2. **Recruiter:** Land → Skills → Work → Contact / email.  
3. **Mobile visitor:** Same content; no hero 3D; hamburger nav; readable cards.  
4. **Return visitor (theme):** Preference restored from `localStorage` without flash.

---

## 6. Information architecture & routes

| Route | Requirement |
|-------|-------------|
| `/` | Homepage with all marketing sections in fixed order |
| `/projects/[slug]` | Case study detail for each project in content |
| `/projects/campus-admin-dbms` | Campus Admin DBMS |
| `/projects/dsa-arena` | DSA Arena |
| `/projects/ship-ready-se` | Ship-Ready SE Lab |
| Unknown slug | 404 (`notFound`) |

**Global chrome (every page):** Navbar, ThemeToggle, CursorTrail (when eligible), ScrollProgress, Footer, ThemeProvider, GsapRefresh.

**Home section order (required):**  
Hero (`#home`) → About (`#about`) → Skills (`#skills`) → Services (`#services`) → Work (`#work`) → Testimonials (`#testimonials`) → FAQ (`#faq`) → Contact (`#contact`) → Footer.

**Nav links required:** Home, About, Skills, Services, Work, Testimonials, FAQ. Contact reachable via CTA / `#contact` / footer (may omit from primary pill to reduce clutter).

---

## 7. Functional requirements

### 7.1 Branding & Hero
- Display name **Ufaq Khalid** as dominant H1 (display font).  
- Role line under name (display italic).  
- Supporting hero sentence from content.  
- Availability status (“Available for select projects — 2026”).  
- Primary CTA → Work; secondary CTA → Contact.  
- Desktop (≥900px): optional 3D scene or safe fallback; **no 3D on small screens**.

### 7.2 About (“How I build”)
- Four numbered process steps from content.  
- Desktop: scroll-linked active step + dot navigation.  
- Mobile: stacked readable steps with scroll reveal.

### 7.3 Skills
- Four skill groups with title, description, item chips.  
- Overlapping / stacked card presentation with hover emphasis.  
- Keyboard focusable cards.

### 7.4 Services
- Four services in accordion: title, description, tags, preview image.  
- Only one expanded at a time (or mutually clear open state).  
- Images from local project art (not stock Unsplash).

### 7.5 Work (case collection)
- Exactly three project cards from content.  
- Each shows category, title, summary, stack chips, “Case study” affordance.  
- Click/tap navigates to `/projects/{slug}`.  
- Desktop fine-pointer: 3D tilt hover; disabled for touch / reduced motion.

### 7.6 Case study inner pages
Each case study **must** include:
- Category, year, title, summary  
- Role, context, year meta  
- Hero image with meaningful alt text  
- Metrics strip  
- **Architecture** blueprint (node flowchart + data loop)  
- Problem, Approach, Outcome (full paragraphs)  
- Highlights list  
- Stack chips  
- Navigation back to `/#work`  
- **No** “Ask for a demo” button (removed by requirement)

### 7.7 Testimonials
- At least four static quotes with name + role.  
- Horizontal browse / drag on small screens.

### 7.8 FAQ
- At least five Q&A items including willingness to help students.  
- Accordion expand/collapse with accessible expanded state.

### 7.9 Contact
- Show email, phone, WhatsApp as actionable links.  
- Form collects name/message (and related fields as implemented) and opens WhatsApp with prefilled text.  
- No server-side mail required for v1.

### 7.10 Footer
- Brand wordmark, CTA, copy-email, nav shortcuts, social, availability, local time (Asia/Karachi).

### 7.11 Theme
- Dark default; light available.  
- Persist `ufaq-theme` in `localStorage`.  
- Prevent theme flash with early inline script.  
- Architecture blueprint may remain dark (accepted exception).

### 7.12 Motion & accessibility
- Honor `prefers-reduced-motion`: no trail, no tilt, no ornamental loops; content still fully readable.  
- Focus-visible styles on interactive controls.  
- Decorative motion must not be the only carrier of meaning.

### 7.13 Performance / media
- Project images served as WebP (with next/image AVIF/WebP).  
- Separate small thumbs for cursor trail.  
- First work card / case hero may use `priority`.

---

## 8. Content requirements

Single source of truth: `src/data/content.ts`.

Must define:
- `site` (name, role, contact, nav, github)  
- `aboutSteps` (4)  
- `skillGroups` (4)  
- `services` (4)  
- `projects` (3) with full case-study fields + architecture nodes  
- `testimonials` (4)  
- `faqs` (5)  

**Projects required:**
1. Campus Admin DBMS — PHP/MySQL campus admin  
2. DSA Arena — Unity/C# game/algorithms  
3. Ship-Ready SE Lab — SDLC delivery pipeline  

---

## 9. Non-functional requirements

| Area | Requirement |
|------|-------------|
| **Framework** | Next.js App Router (v16.x), React 19 |
| **Styling** | Tailwind 4 + CSS variables for theme |
| **Motion** | GSAP + ScrollTrigger; Framer Motion where specified; R3F for hero 3D |
| **Fonts** | Fraunces (display), Manrope (body) |
| **Build** | `next build` must succeed; case slugs statically generated |
| **Hosting** | Static-friendly deploy on Vercel from GitHub |
| **Privacy** | No required tracking cookies for core UX |
| **Browser** | Modern Chromium/Firefox/Safari; graceful degradation without WebGL |

---

## 10. Motion requirements (product-level)

| Area | Library | Required behavior |
|------|---------|-------------------|
| Work cards | Framer + GSAP | Enter stagger; hover 3D tilt on fine pointer |
| Skills cards | Framer + GSAP | Enter stagger; spring hover lift/scale/dim |
| Testimonials | GSAP | Enter + idle float; CSS hover lift |
| Hero text | GSAP | Load timeline + word mask |
| Hero 3D | R3F + GSAP | Entrance, idle, scroll scrub; off on mobile |
| Navbar | GSAP + CSS | Shrink on scroll; logo breath/spin |
| About | GSAP | Desktop active step / mobile reveal |
| Services | GSAP + CSS | Enter + CSS accordion |
| FAQ | GSAP + Framer | Enter + height accordion |
| Contact / Footer | GSAP | Stagger / wordmark / mouse glow |
| Case study page | CSS only | No motion library required |
| Architecture SVG | None | Static blueprint |

---

## 11. Design requirements (summary)

- Dark glass aesthetic; light mode warm paper + navy text.  
- Accents: teal / violet / amber by section & theme.  
- Navbar pill max-width **800px** (720 scrolled) — **same on all pages**.  
- Headings: Fraunces; body: Manrope — **sizes differ by role** (not one global H1 size).  
- Full visual token listing: see Design Sheet PDF.

---

## 12. Success metrics / acceptance criteria

### Code review / viva — must pass
- [ ] All homepage sections present in correct order  
- [ ] All three case studies open and render full narrative + architecture  
- [ ] Theme toggle works both ways and persists after reload  
- [ ] Contact WhatsApp / mailto / tel work  
- [ ] Mobile usable (nav, no hero 3D clutter)  
- [ ] Reduced-motion path does not break content  
- [ ] Production build succeeds  
- [ ] Deployed URL loads publicly for reviewer  

### Quality bar
- [ ] Case study copy is paragraph-level (not one-liners only)  
- [ ] Images load (WebP under `public/project-art`)  
- [ ] No “Ask for a demo” on inner pages  
- [ ] Design Sheet / docs available for review if requested  

---

## 13. Known gaps & follow-ups (honest backlog)

| Item | Status |
|------|--------|
| `site.github` still placeholder `https://github.com/` | Gap — should be real profile/repo |
| Per-page SEO / Open Graph / sitemap | Not in v1 |
| Architecture diagram not light-theme adaptive | Accepted exception |
| Unused `GlassShards`, `marqueeItems` | Cleanup backlog |
| GitHub repo visibility may be private | Use Vercel public URL for professors |
| Server-side contact email | Out of scope v1 |

---

## 14. Delivery & documentation deliverables

| Deliverable | Purpose |
|-------------|---------|
| Live Vercel site | Primary link for professors |
| GitHub repo | Source (public when owner enables) |
| Design Sheet PDF | Fonts, sizes, glows, **animations per section** |
| This PRD | Product requirements & acceptance |
| `docs/PORTFOLIO-DOCUMENTATION.md` | Living motion/design notes |

---

## 15. Risks

1. Missing image assets in deploy → broken work/services visuals.  
2. Heavy 3D on low-end desktop → must pause when off-screen / respect reduced motion.  
3. Private GitHub → reviewers blocked if only repo link is shared (mitigate: share Vercel).  
4. Placeholder GitHub URL → broken social trust.

---

## 16. Sign-off

| Role | Name | Date |
|------|------|------|
| Product owner | Ufaq Khalid | ________ |
| Reviewer (prof / mentor) | ________ | ________ |

**Definition of done:** Acceptance checklist in §12 completed; PRD + Design Sheet available; live URL verified.
