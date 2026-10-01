# Ufaq Khalid — Portfolio Documentation

Living design & motion notes. Update this file whenever the UI or animations change.  
PDF export: `public/ufaq-portfolio-documentation.pdf` (run `node scripts/generate-docs-pdf.js`).

**Stack:** Next.js App Router · Tailwind · GSAP + ScrollTrigger · Framer Motion · R3F/Three (hero)  
**Fonts:** Fraunces (display / headings) · Manrope (body)  
**Theme:** glass-dark · accents teal / violet / amber

---

## Global (all pages)

- Floating pill **Navbar** (same on home + project pages)
- **Theme toggle** (fixed top-right): dark ↔ light; preference saved in `localStorage`
- **Cursor image trail** (desktop, reduced-motion off)
- **Scroll progress** circle (bottom-right, ring scrubbed to page scroll)
- **GsapRefresh** after fonts/images
- **ScrollToHash** on home for `/#section` from inner pages
- Reduced motion: final states, no fancy motion

### Animations & hover effects (global)
- Theme toggle: soft lift + teal glow; sun/moon icon swap
- Light theme: soft white + lilac + pink + yellow fixed gradient background; navy (`#13294b`) body/nav text; section ornaments unchanged
- Nav shrink-on-scroll (padding / blur / border)
- Logo U: teal glow in dark; violet/lilac glow in light
- Status pill dot: teal in dark; violet in light
- Outline CTAs (`btn-neon` / View my work): teal in dark; navy-lilac in light
- Soft CTAs: white in dark; lilac/pink in light
- Hamburger: 3-line → X
- Back-to-top: fade in + SVG progress ring scrub
- Cursor trail: fading image stamps follow pointer

---

## Page: Home — Navbar

Floating pill, max-width 800px. Links: `/#home` … `/#faq`, Contact → `/#contact`. Logo → `/#home`.

### Animations & hover effects
- Logo: radial fill, rotating conic gradient ring, box-shadow breath, hover scale 1.06 + faster ring
- Links: color transition (white in dark / navy in light); active teal dot scale/opacity
- Contact Me (`btn-contact-glow`): white in dark; lilac/pink in light; lift + glow
- Mobile menu: expand panel; hamburger morph

---

## Page: Home — Hero (`#home`)

Status pill · Fraunces name · italic Manrope/Fraunces subline · body copy · two CTAs · meta row · 3D IT scene (or green sphere fallback).

### Animations & hover effects
- Status pill: green pulse dot (`heroPulse`)
- Entrance: pill fade/rise → split-text word mask (yPercent) → subline/para/CTAs/meta stagger
- CTAs: `btn-neon` outline teal; `btn-soft` white (dark) / lilac-pink (light)
- Scroll cue: bobbing ↓
- 3D: desktop only (≥900px); skipped on phone — no floating objects above the heading
- Fallback sphere: desktop only; slow float + mouse parallax
- Reduced motion / no WebGL: static / sphere fallback (desktop)

---

## Page: Home — How I build (`#about`)

Sticky left editorial + numbered process list (01–04). No cards. Curved section ornament.

### Animations & hover effects
- Section ornament: stroke-dash draw + end glow dot
- Desktop: ScrollTrigger active step (opacity 1 / 0.3, teal numeral, title x:16→0)
- Dot rail: active fill + glow; click scrolls to step
- Mobile: stacked reveal y/opacity only
- Last step: extra bottom padding so 04 can activate

---

## Page: Home — My Skills (`#skills`)

Equal-width white-glass cards, readable scatter (straight → up-right → up-left → up-right).

### Animations & hover effects
- GSAP stagger reveal on wrappers
- Hover: lift, straighten rotate, bring to front; siblings dim
- Framer spring for pose / hover

---

## Page: Home — My Services (`#services`)

Accordion list with left icons, tags, preview image.

### Animations & hover effects
- GSAP stagger reveal on rows
- Toggle: chevron rotate 180°; open circle teal ring + glow
- Panel: grid-rows height ease; content fade/rise; image scale 0.96→1

---

## Page: Home — Selected projects (`#work`)

Three tilt cards (DBMS, DSA, SE) → `/projects/[slug]`.

### Animations & hover effects
- GSAP stagger reveal on card wrappers
- Hover: **rotateX 70° backward only** (top tips away); spring flat on leave
- Media zoom on hover; rim / shadow deepen
- Light theme only: light glass card, navy title, bright lilac glowing tag borders (dark cards unchanged)
- No behind-card stain / fake depth slab
- No center scan line
- Desktop fine-pointer only; reduced motion = flat

---

## Page: Home — What people say (`#testimonials`)

Horizontal drag/swipe cards.

### Animations & hover effects
- Enter: sequential pop (scale/y/opacity, `back.out`, stagger)
- Then faster sine float (yoyo); pause on hover/drag
- Card hover: slight lift + teal border glow
- Overflow-x clip on section

---

## Page: Home — Quick answers (`#faq`)

Numbered accordion (01–05).

### Animations & hover effects
- GSAP stagger reveal on items
- Open: expand answer (Framer height/opacity); badge teal; chevron rotates 180°
- Left accent bar / gradient rail

---

## Page: Home — Contact (`#contact`)

Copy + phone/email/WhatsApp · glass form → WhatsApp submit.

### Animations & hover effects
- Section heading: split-text + ornament (teal in dark / amber in light)
- Contact links + focus rings: teal on dark, amber on light
- Form fields: GSAP stagger y/opacity
- Submit: `btn-whatsapp` glow/hover

---

## Page: Home — Footer

CTA band · brand + status pill · PKT time · Navigate / Contact / Social · wordmark.

### Animations & hover effects
- Columns: GSAP stagger reveal once (never reverse-hide — fixes missing footer on project pages)
- Wordmark: clipped watermark strip (no extra bottom empty space); theme-aware tint
- On `/projects/*` navigations: force footer visible + ScrollTrigger refresh
- Nav links: `/#…` so they work from project pages; arrow slide-in + x shift
- Social icon buttons: border glow on hover
- Copy email: temporary “Copied ✓”
- Soft top gradient (no hard rule)
- Same Footer on home + project case studies (root layout)

---

## Page: Project case study (`/projects/[slug]`)

Overview image · Problem / Approach / Result / Stack · links. Sticky “On this page” TOC.  
No “← Back to work” — use navbar (`/#…`).

### Animations & hover effects
- Same global navbar / trail / back-to-top
- TOC links: color hover
- CTAs: `btn-neon` / `btn-soft` same as hero
- Work stays active in scroll-spy on this route

---

## Shared section headings

Used on Skills, Services, Work, Testimonials, FAQ, Contact (and ornament on About).

### Animations & hover effects
- Eyebrow fade/rise
- Title: SplitText words masked yPercent reveal
- Optional subtitle fade
- `SectionOrnament`: path draw + glowing end dot
- `toggleActions: play none none reverse`

---

_Last updated: keep in sync with code via `.cursor/rules/update-portfolio-docs.mdc`._
