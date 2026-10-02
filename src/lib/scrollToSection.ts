/** Shared nav → section scroll. Lands on the section title, not empty padding. */

export const NAV_SCROLL_OFFSET = 92;

export function getSectionScrollTop(id: string): number | null {
  // This helper calculates the scroll position so a section title lands neatly below the sticky navbar.
  if (typeof window === "undefined") return null;
  if (id === "home") return 0;

  const section = document.getElementById(id);
  if (!section) return null;

  // Prefer the main section heading so we don't stop in empty top padding
  const heading =
    section.querySelector<HTMLElement>("h2") ??
    section.querySelector<HTMLElement>("[data-scroll-target]") ??
    section;

  return Math.max(
    0,
    heading.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET
  );
}

/**
 * Smooth-scroll to a section. Corrects once after settle so the title
 * ends up cleanly under the sticky nav (light + dark).
 */
export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = "smooth"
): boolean {
  // This function smooth-scrolls to a section and fixes the final position after the motion settles.
  if (typeof window === "undefined") return false;

  if (id === "home") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const top = getSectionScrollTop(id);
  if (top == null) return false;

  const html = document.documentElement;
  const prevBehavior = html.style.scrollBehavior;
  // Avoid CSS `scroll-behavior: smooth` stacking with JS smooth scroll
  html.style.scrollBehavior = "auto";

  window.scrollTo({ top, behavior });

  const settle = () => {
    // This helper makes a final correction so the section heading is aligned after scrolling ends.
    const corrected = getSectionScrollTop(id);
    if (corrected != null && Math.abs(window.scrollY - corrected) > 3) {
      window.scrollTo({ top: corrected, behavior: "auto" });
    }
    html.style.scrollBehavior = prevBehavior;
  };

  if (behavior === "smooth") {
    const onEnd = () => {
      // This handler runs the final position correction when the smooth scroll completes.
      window.removeEventListener("scrollend", onEnd);
      settle();
    };
    window.addEventListener("scrollend", onEnd, { once: true });
    window.setTimeout(() => {
      window.removeEventListener("scrollend", onEnd);
      settle();
    }, 800);
  } else {
    settle();
  }

  return true;
}
