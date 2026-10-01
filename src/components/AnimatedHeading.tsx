"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Global switch for all AnimatedHeading instances.
 * - "mask-reveal" | "fade-up" | "underline-draw" → active variant
 * - "off" → no animation (plain text)
 */
export const ANIMATED_HEADING_VARIANT:
  | "mask-reveal"
  | "fade-up"
  | "underline-draw"
  | "off" = "mask-reveal";

export type AnimatedHeadingVariant = Exclude<
  typeof ANIMATED_HEADING_VARIANT,
  "off"
>;

type Props = {
  children: ReactNode;
  /** Override the global default for this instance only */
  variant?: AnimatedHeadingVariant | "off";
  /** For underline-draw: which word gets the underline (default: last word) */
  underlineWord?: string;
  className?: string;
};

function textFromChildren(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return textFromChildren(child.props.children);
      }
      return "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedHeading({
  children,
  variant,
  underlineWord,
  className = "",
}: Props) {
  const resolved = variant ?? ANIMATED_HEADING_VARIANT;
  const fullText = useMemo(() => textFromChildren(children), [children]);
  const words = useMemo(
    () => fullText.split(/\s+/).filter(Boolean),
    [fullText]
  );
  const rootRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const uid = useId();

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (resolved === "off" || reduceMotion) {
      setVisible(true);
      return;
    }
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [resolved, reduceMotion]);

  if (resolved === "off") {
    return <>{children}</>;
  }

  const showNow = visible || reduceMotion;
  const stateClass = showNow ? "is-visible" : "";

  if (resolved === "underline-draw") {
    let underlineIndex = words.length - 1;
    if (underlineWord?.trim()) {
      const idx = words.findIndex((w) => w === underlineWord.trim());
      if (idx >= 0) underlineIndex = idx;
    }

    return (
      <span
        ref={rootRef}
        className={`ah-root ah-underline-draw ${stateClass} ${className}`.trim()}
        aria-label={fullText}
      >
        <span aria-hidden="true">
          {words.map((word, i) => (
            <span key={`${uid}-u-${i}`}>
              {i === underlineIndex ? (
                <span className="ah-underline-word">
                  {word}
                  <span className="ah-underline" />
                </span>
              ) : (
                word
              )}
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
      </span>
    );
  }

  if (resolved === "fade-up") {
    return (
      <span
        ref={rootRef}
        className={`ah-root ah-fade-up ${stateClass} ${className}`.trim()}
        aria-label={fullText}
      >
        <span aria-hidden="true" className="ah-fade-up-inner">
          {fullText}
        </span>
      </span>
    );
  }

  /* mask-reveal (default) */
  return (
    <span
      ref={rootRef}
      className={`ah-root ah-mask-reveal ${stateClass} ${className}`.trim()}
      aria-label={fullText}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${uid}-m-${i}`}>
            <span className="ah-word-mask">
              <span
                className="ah-word-inner"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
