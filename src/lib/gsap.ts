"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin, SplitText };

/** Word-split with mask; falls back to a lightweight helper if SplitText fails. */
export function splitWordsMasked(el: HTMLElement) {
  try {
    return SplitText.create(el, { type: "words", mask: "words" });
  } catch {
    return splitWordsFallback(el);
  }
}

function splitWordsFallback(el: HTMLElement) {
  const text = el.textContent ?? "";
  const words = text.trim().split(/\s+/);
  el.textContent = "";
  const wordEls: HTMLElement[] = [];
  words.forEach((word, i) => {
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "clip";
    mask.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.textContent = word;
    mask.appendChild(inner);
    el.appendChild(mask);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    wordEls.push(inner);
  });
  return {
    words: wordEls,
    revert() {
      el.textContent = text;
    },
  };
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
