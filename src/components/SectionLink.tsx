"use client";

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { scrollToSection } from "@/lib/scrollToSection";

type Props = {
  /** Section id without # — e.g. "work" */
  section: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick" | "children">;

/** In-page section link that lands on the heading under the sticky nav. */
export function SectionLink({
  section,
  children,
  className = "",
  ...rest
}: Props) {
  // This component renders a link that smooth-scrolls to a section instead of doing a full page jump.
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    // This click handler scrolls to the target section and updates the URL hash in place.
    e.preventDefault();
    scrollToSection(section);
    if (typeof history !== "undefined") {
      history.replaceState(null, "", section === "home" ? "/#home" : `/#${section}`);
    }
  }

  return (
    <a
      href={section === "home" ? "/#home" : `/#${section}`}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}
