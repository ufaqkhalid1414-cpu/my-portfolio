/**
 * FULL design sheet PDF — every section + every animation. No skips.
 * Usage: node scripts/generate-design-sheet-pdf.js
 */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outPublic = path.join(root, "public", "ufaq-portfolio-design-sheet.pdf");
const outDesktop = path.join(root, "..", "Ufaq-Portfolio-Design-Sheet.pdf");
const outDocs = path.join(root, "docs", "Ufaq-Portfolio-Design-Sheet.pdf");

const pages = [
  {
    title: "Cover — Full Code Review Design Sheet",
    lines: [
      "Portfolio: Ufaq Khalid",
      "Purpose: Complete section-by-section design + animation reference for code review.",
      "Nothing skipped: fonts, sizes, backgrounds, buttons, glows, AND animations for every area.",
      "",
      "Animation stack used on the site",
      "• GSAP 3 + ScrollTrigger + ScrollToPlugin (+ @gsap/react)",
      "• Framer Motion 13",
      "• React Three Fiber + drei + Three.js (Hero 3D only)",
      "• CSS keyframes / transitions (logo, pulse, trail, buttons, services accordion)",
      "",
      "Shared scroll reveal (useStaggerReveal)",
      "• Library: GSAP ScrollTrigger.batch",
      "• Trigger: when item top hits 80% of viewport",
      "• From: opacity 0, y +40px (mobile y capped at 24)",
      "• To: opacity 1, y 0 · duration 0.7s · stagger 0.1 · ease power3.out",
      "• Reverses when scrolling back up (unless once: true)",
      "• Respects prefers-reduced-motion",
      "",
      "Contents of this PDF",
      "1. Global fonts & tokens",
      "2. Navbar (width, weight, glow, Contact Me, hamburger + animations)",
      "3. Theme toggle",
      "4. Hero + 3D + animations",
      "5. About + animations",
      "6. Skills cards + animations",
      "7. Services + animations",
      "8. Work cards + animations",
      "9. Testimonials cards + animations",
      "10. FAQ + animations",
      "11. Contact + animations",
      "12. Footer + animations",
      "13. Scroll progress, cursor trail, headings, ornaments",
      "14. Work inner pages + architecture blueprint",
      "15. Quick animation map (cards & elsewhere)",
    ],
  },
  {
    title: "1. Global fonts & design tokens",
    lines: [
      "Fonts (layout.tsx via next/font)",
      "• Display / headings: Fraunces (weights 500, 600, 700) — CSS .font-display",
      "• Body / descriptions / UI: Manrope (400, 500, 600, 700) — body default",
      "",
      "Do headings share one size?",
      "NO — same Fraunces family, different sizes by role (see each section).",
      "",
      "Same font for headings and descriptions?",
      "NO — headings = Fraunces; descriptions = Manrope.",
      "",
      "Layout",
      "• .container-x max-width 1120px, centered",
      "• .section-pad: 5.5rem / 1.25rem → md 7rem / 1.5rem",
      "",
      "Dark tokens",
      "• Background #07090f · text #eef2f7 · muted #9aa3b5",
      "• Teal #2dd4bf · violet #a78bfa · amber #fbbf24",
      "",
      "Light tokens",
      "• Background #fffaf6 · text #13294b · muted #5b6b88",
      "• Soft violet / pink / amber accents; pastel page wash",
      "",
      "Global button hover (all share lift ~3px)",
      "• .btn-neon: outline CTA → stronger border + glow halo",
      "• .btn-soft: filled → scale 1.02 + teal/pink glow",
      "• .btn-contact-glow: Contact Me → teal (dark) or pink/violet (light) glow",
      "• .btn-whatsapp: gradient → scale 1.03 + brighter glow",
      "• .btn-copy-email: border shifts to teal / violet",
    ],
  },
  {
    title: "2. Navbar — same on every page",
    lines: [
      "Same width on every page?",
      "YES — one Navbar in root layout (Home + Work inner pages).",
      "",
      "Width / length",
      "• Pill max-width 800px centered; full width inside that cap",
      "• On scroll shrinks to max-width 720px (GSAP)",
      "• Header min-height 72px",
      "",
      "Weight (font-weight)",
      "• Nav links: Manrope ~400, 13px (14px xl)",
      "• Logo letter U: Fraunces weight 600, 0.95rem",
      "• Contact Me: weight 600",
      "",
      "Glow effects",
      "• Pill drop shadow (dark): 0 8px 40px rgba(0,0,0,0.35) + backdrop blur",
      "• Logo: breathing teal glow (CSS navLogoBreath, 3s loop)",
      "• Logo ring: spinning conic gradient (CSS navLogoSpin, 8s; hover 2.5s)",
      "• Logo letter text-shadow teal glow",
      "• Logo hover: scale 1.06 + stronger glow",
      "• Active link: teal status dot with soft glow",
      "",
      "Contact Me button",
      "• Pill, light fill, dark text, weight 600",
      "• Hover: translateY(-3px) + teal ring/glow (pink/violet in light)",
      "",
      "Three-line hamburger (mobile)",
      "• 40×40 circle; 3 bars 2px × 18px",
      "• Hover opacity 90%",
      "• Open animation (CSS): bars form X (rotate ±45°, middle fades)",
      "",
      "ANIMATIONS — Navbar",
      "• Library: GSAP + ScrollTrigger + CSS keyframes",
      "• Scroll shrink/expand: duration 0.4s, ease power3.out",
      "  shrink: maxWidth 720, blur 16px, tighter pad, Contact font 12px",
      "  expand: maxWidth 800, blur 24px, Contact font 14px",
      "• Logo breath + spin: CSS infinite loops",
      "• Mobile menu: mount/unmount (no motion library)",
    ],
  },
  {
    title: "3. Theme toggle",
    lines: [
      "Position: fixed top-right, 2.6rem circle, z-60",
      "Icons: sun (when dark) / moon (when light)",
      "Stores choice in localStorage key ufaq-theme",
      "",
      "ANIMATIONS — Theme toggle",
      "• Library: CSS only (no GSAP / Framer)",
      "• Hover: translateY(-2px) scale(1.04) + soft teal shadow, 0.25s",
      "• Theme colors on body transition 0.35s ease",
    ],
  },
  {
    title: "4. Hero (first section) — full detail + animations",
    lines: [
      "Background type",
      "• Base page bg + aurora-teal soft radial glows",
      "• Body code-texture overlay (subtle grid)",
      "• Optional 3D laptop scene on desktop (≥900px)",
      "",
      "Your name (Ufaq Khalid)",
      "• Font: Fraunces · weight 600 · H1",
      "• Size: clamp(3.5rem, 9vw, 8rem)",
      "",
      "Under name — role line",
      "• On-screen: “Software engineer & full-stack builder.”",
      "• Font: Fraunces italic · clamp(1.25rem, 3vw, 2rem)",
      "• Color: --hero-sub (soft muted)",
      "",
      "Supporting paragraph: Manrope ~18–20px muted",
      "CTAs: .btn-neon “View my work →” + .btn-soft “Let’s talk”",
      "Availability pill: CSS heroPulse 2.4s on status dot",
      "",
      "ANIMATIONS — Hero text (GSAP timeline on load)",
      "1. Availability pill fades/slides up 0.6s power3.out",
      "2. Name words mask-split: yPercent 110→0, 0.8s, stagger 0.08, expo.out",
      "3. Role, paragraph, CTAs, meta: fade + y 20→0, 0.7s, stagger 0.08",
      "4. Scroll cue ↓: GSAP yoyo float y:6, 1.6s sine.inOut infinite",
      "",
      "ANIMATIONS — Hero 3D (R3F + GSAP + ScrollTrigger)",
      "• Entrance: laptop scale/rotate/position 1.1s expo.out delay 0.35",
      "• Idle useFrame: elliptical drift, bob, sway rotation",
      "• Orbit icons rotate; pointer parallax",
      "• Scroll scrub 0.6: moves/scales/fades scene as you leave hero",
      "• Fallback GreenSphere: GSAP float + mouse parallax if WebGL fails",
    ],
  },
  {
    title: "5. About — full detail + animations",
    lines: [
      "Background: aurora-blend (teal + violet radials)",
      "Eyebrow: Manrope xs uppercase tracking 0.2em",
      "Title H2: Fraunces clamp(2.2rem → 3.75rem)",
      "Body / step text: Manrope 16–17px muted",
      "Step titles: Manrope semibold ~1.5–1.75rem",
      "Step numbers: Fraunces large clamp(2.5–4rem)",
      "Ornament: SectionOrnament accent blend (see page 13)",
      "",
      "ANIMATIONS — About (GSAP only)",
      "• Mobile (<900px): each step scroll-reveal y 32→0, opacity 0→1,",
      "  duration 0.7s power3.out, ScrollTrigger top 85%, reverses",
      "• Desktop (≥900px): scroll position sets active step",
      "  inactive opacity 0.3; active 1",
      "  active number color → accent + y fromTo 8→0",
      "  active title x fromTo 16→0",
      "  active dots: accent fill + glow, scale 1.15, ~0.4–0.5s",
      "• Dot click: native smooth scrollTo (no GSAP)",
    ],
  },
  {
    title: "6. Skills cards — full detail + animations",
    lines: [
      "Background: aurora-blend",
      "Section title: Fraunces H2 via SectionHeading (4xl → 5xl md)",
      "Card chrome: glass / surface, rounded-2xl, backdrop blur",
      "Titles: Manrope semibold; chips Manrope 11px uppercase pills",
      "Descriptions: Manrope sm muted",
      "",
      "ANIMATIONS — Skills (DO NOT SKIP)",
      "1) Enter view — GSAP useStaggerReveal",
      "   y 40, opacity 0→1, stagger 0.1, duration 0.7, power3.out",
      "",
      "2) Card hover stack — Framer Motion SPRING",
      "   type spring · stiffness 160 · damping 20",
      "   Rest poses: offset x and slight rotate (stacked fan look)",
      "   Hovered card: y -10, rotate 0, scale 1.02, stronger shadow",
      "   Other cards: opacity dimmed to 0.42",
      "   Trigger: mouse hover / keyboard focus",
      "",
      "ANSWER: Skills cards use Framer Motion spring hover + GSAP stagger enter.",
    ],
  },
  {
    title: "7. Services — full detail + animations",
    lines: [
      "Background: section-pad + aurora-blend",
      "Title: Fraunces H2 SectionHeading",
      "Row titles: Manrope weight 600 (not display font)",
      "Tags: chip pills; media aspect 16/10 rounded-2xl (local WebP art)",
      "Icon circle 48×48 soft surface",
      "",
      "ANIMATIONS — Services",
      "1) Enter view — GSAP useStaggerReveal (y 40, stagger 0.1)",
      "2) Accordion open/close — CSS only (no Framer height on rows)",
      "   Chevron rotates 180°, 400ms cubic-bezier(0.33,1,0.68,1)",
      "   Open chevron: accent border/bg + glow",
      "   Panel: grid-rows 0fr↔1fr + opacity, 500ms",
      "   Inner content: translate-y / opacity 400ms; image scale 0.96→1",
      "   Trigger: click to expand one service",
    ],
  },
  {
    title: "8. Work cards — full detail + animations",
    lines: [
      "Background: section-pad + aurora-violet",
      "Title: Fraunces H2 “Selected case studies”",
      "Subtitle + card text: Manrope",
      "Category: Manrope 0.68rem uppercase violet",
      "Card: dark #1c1c1c (light lilac tint), radius 20px",
      "Images: optimized WebP; gradient fade at bottom of media",
      "",
      "ANIMATIONS — Work cards (DO NOT SKIP)",
      "1) Enter view — GSAP useStaggerReveal (y 40, stagger 0.1)",
      "",
      "2) Hover 3D tilt — Framer Motion",
      "   perspective 900px · rotateX spring to 70° (tips backward)",
      "   spring: stiffness 160, damping 20, mass 0.45",
      "   media translateZ 18px; text block translateZ 28px",
      "   Only on fine pointer + not reduced-motion",
      "",
      "3) CSS on group-hover",
      "   Image scale 1.035 over 500ms ease-out",
      "   Border/shadow intensify 300ms",
      "   “Case study ↗” brightens",
      "",
      "ANSWER: Work cards = Framer Motion 3D tilt + GSAP stagger + CSS zoom.",
    ],
  },
  {
    title: "9. Testimonials cards — full detail + animations",
    lines: [
      "Background: section-pad + aurora-blend",
      "Title: Fraunces H2 “What people say”",
      "Cards: rounded-3xl surface, blur, shadow; horizontal snap scroll",
      "Quote mark: Fraunces text-5xl low opacity",
      "Quote body / names: Manrope",
      "",
      "ANIMATIONS — Testimonials (DO NOT SKIP)",
      "1) Enter view — GSAP timeline on section (top 75%)",
      "   From: opacity 0, y 48, scale 0.9",
      "   To: visible · 0.4s · ease back.out(1.5) · stagger by card index * 0.12",
      "   Reverses when scrolling away",
      "",
      "2) Idle float loop — GSAP after enter",
      "   y: -8 · 1.45s · sine.inOut · yoyo · repeat infinite · delay per card",
      "   Pauses while hovering / dragging the scroller",
      "",
      "3) CSS hover: translateY(-8px) approx (-translate-y-2) + teal border glow",
      "",
      "ANSWER: Testimonial cards = GSAP enter + GSAP float loop + CSS hover lift.",
    ],
  },
  {
    title: "10. FAQ — full detail + animations",
    lines: [
      "Background: aurora-blend + extra radials; teal→violet spine/rail",
      "Title: Fraunces H2 (amber accent in light theme)",
      "Questions: Manrope semibold; Answers: Manrope sm muted",
      "Open card: accent wash + glow; index badge fills accent",
      "",
      "ANIMATIONS — FAQ",
      "1) Enter view — GSAP useStaggerReveal (y 40, stagger 0.1)",
      "2) Open/close answer — Framer Motion AnimatePresence",
      "   height 0↔auto, opacity 0↔1, duration 0.28s",
      "3) CSS: chevron rotate 300ms; card bg/shadow 300ms",
      "   Trigger: click question row",
    ],
  },
  {
    title: "11. Contact — full detail + animations",
    lines: [
      "Background: aurora-teal (dark) / aurora-amber (light)",
      "Title: Fraunces H2",
      "Labels: Manrope xs uppercase; inputs Manrope on surface fields",
      "Links: contact accent color (teal dark / amber light)",
      "Form: glass-strong rounded-3xl panel",
      "Submit: .btn-whatsapp full gradient glow button",
      "",
      "ANIMATIONS — Contact",
      "• Enter view — GSAP useStaggerReveal on form fields",
      "  y 24, stagger 0.08, duration 0.7, power3.out",
      "• Button hover: CSS translateY(-3px) scale(1.03) + glow",
      "• Submit action: opens WhatsApp (no animation library)",
    ],
  },
  {
    title: "12. Footer — full detail + animations",
    lines: [
      "Atmosphere: top hairline + soft teal radial glow",
      "Giant watermark name: Fraunces min(22vw, 9rem), gradient-clipped text",
      "CTA line: Fraunces 3xl/4xl “Have an idea? Let’s build it.”",
      "Buttons: .btn-soft + .btn-copy-email",
      "Column labels / links / social: Manrope",
      "Social 40×40 circles; hover teal border + 0 0 18px glow",
      "Availability pill: CSS heroPulse (same as hero)",
      "",
      "ANIMATIONS — Footer",
      "1) Grid columns — GSAP useStaggerReveal once:true (y 40, stagger 0.1)",
      "2) Wordmark — GSAP fromTo y 40 / opacity 0.35 → resting,",
      "   0.9s expo.out, ScrollTrigger footer top 90%, plays once",
      "3) Glow orb follows mouse — GSAP quickTo x/y duration 0.6 power3.out",
      "4) Nav link hover — CSS translate-x + teal color + arrow fade",
    ],
  },
  {
    title: "13. Scroll progress · Cursor trail · Headings · Ornaments",
    lines: [
      "Scroll progress button (bottom-right)",
      "• Library: GSAP + ScrollTrigger + ScrollToPlugin",
      "• Appears after leaving hero: fade + scale 0.85→1, 0.45s",
      "• Ring stroke draws with page scroll (scrub: true)",
      "• Click: smooth scroll to top duration 1s power3.inOut",
      "",
      "Cursor trail (desktop fine pointer only)",
      "• Library: CSS trailFade 0.55s (React state, no GSAP)",
      "• Spawns project thumbs every 55ms while moving; keeps last 5",
      "• Size 64×96px-ish, slight random rotation; removed after 420ms",
      "",
      "SectionHeading (used by Skills, Services, Work, etc.)",
      "• Title: Fraunces text-4xl → md text-5xl",
      "• Eyebrow: Manrope xs uppercase",
      "• ANIMATION GSAP ScrollTrigger top 85%:",
      "  eyebrow fade/slide; title words mask-split stagger 0.06 expo.out;",
      "  subtitle fade/slide; reverses on scroll back",
      "",
      "SectionOrnament (wavy SVG under titles)",
      "• ANIMATION GSAP: stroke draws dashoffset, then end-dot scales in",
      "  duration ~0.9s + 0.35s; ScrollTrigger top 85%; reverses",
    ],
  },
  {
    title: "14. Work inner pages + Architecture blueprint",
    lines: [
      "Route: /projects/[slug] — same global Navbar (800→720 still applies)",
      "Page wash: aurora-violet",
      "Layout: sticky TOC aside + article",
      "",
      "Typography",
      "• Page title H1: Fraunces 4xl → 5xl",
      "• Meta category: Manrope xs uppercase violet",
      "• Summary + Problem/Approach/Outcome body: Manrope muted ~1.02rem",
      "• Section H2s: Fraunces 2xl → 3xl (smaller than hero H1)",
      "• Metrics values: Fraunces ~2xl",
      "• Stack chips: Manrope pills",
      "",
      "Architecture blueprint",
      "• Static SVG (NO animation library)",
      "• Dark #121212, teal #2DD4BF, cyan #67E8F9, white lines, flat vector",
      "• DSA Arena loop: Input → Data Processing → State Machine → Gameplay Engine Renderer",
      "• Other projects: same visual system, project-specific node labels",
      "",
      "ANIMATIONS — Inner pages",
      "• No GSAP / Framer section reveals on the case study page itself",
      "• Only CSS color transitions on TOC links / back link",
      "• Bottom CTA: “More case studies” (.btn-soft) — demo button removed",
    ],
  },
  {
    title: "15. Animation map — cards & everywhere (review checklist)",
    lines: [
      "WORK CARDS",
      "• Enter: GSAP stagger reveal",
      "• Hover: Framer Motion 3D rotateX tilt (spring) + CSS image zoom",
      "",
      "SKILLS CARDS",
      "• Enter: GSAP stagger reveal",
      "• Hover: Framer Motion spring (lift, scale, straighten, dim others)",
      "",
      "TESTIMONIAL CARDS",
      "• Enter: GSAP fade/scale with back.out",
      "• Idle: GSAP floating yoyo loop",
      "• Hover: CSS lift + teal glow; float pauses",
      "",
      "ELSEWHERE",
      "• Hero text: GSAP load timeline + word split",
      "• Hero 3D: R3F idle + GSAP entrance + ScrollTrigger scrub",
      "• Navbar: GSAP scroll shrink + CSS logo breath/spin",
      "• About: GSAP scroll stepper / mobile reveals",
      "• Services: GSAP enter + CSS accordion",
      "• FAQ: GSAP enter + Framer height accordion",
      "• Contact: GSAP field stagger",
      "• Footer: GSAP stagger + wordmark + mouse glow",
      "• Headings/ornaments: GSAP scroll draw/reveal",
      "• Scroll progress: GSAP scrub + scrollTo",
      "• Cursor trail: CSS fade only",
      "• Theme toggle: CSS hover only",
      "• Case study pages: no motion library (static + CSS)",
      "• Architecture diagram: static SVG",
      "",
      "End of full design sheet — for code review day.",
    ],
  },
];

function writePdf(file) {
  const doc = new PDFDocument({ size: "A4", margin: 48 });
  const stream = fs.createWriteStream(file);
  doc.pipe(stream);

  for (let i = 0; i < pages.length; i++) {
    if (i > 0) doc.addPage();
    const page = pages[i];
    doc.fontSize(13).fillColor("#0d9488").text(page.title, { align: "left" });
    doc.moveDown(0.45);
    doc.fontSize(9).fillColor("#222");
    for (const line of page.lines) {
      if (!line) {
        doc.moveDown(0.22);
        continue;
      }
      doc.text(line, { lineGap: 1.35, width: doc.page.width - 96 });
    }
    doc
      .fontSize(7.5)
      .fillColor("#999")
      .text(
        `Ufaq Portfolio — Full Design Sheet  ·  ${i + 1}/${pages.length}`,
        48,
        doc.page.height - 34,
        { width: doc.page.width - 96 }
      );
  }

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

(async () => {
  fs.mkdirSync(path.dirname(outPublic), { recursive: true });
  fs.mkdirSync(path.dirname(outDocs), { recursive: true });
  await writePdf(outPublic);
  await writePdf(outDocs);
  try {
    await writePdf(outDesktop);
  } catch (e) {
    console.warn("Desktop copy skipped:", e.message);
  }
  console.log("Wrote:", outPublic);
  console.log("Wrote:", outDocs);
  console.log("Wrote:", outDesktop);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
