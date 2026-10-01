"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projects } from "@/data/content";

type TrailItem = {
  id: number;
  x: number;
  y: number;
  src: string;
  rot: number;
};

const TRAIL_SRCS = projects.map((p) => p.imageThumb ?? p.image);

export function CursorTrail() {
  const [items, setItems] = useState<TrailItem[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(mq.matches && !reduce.matches);
    sync();
    mq.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let id = 0;
    let last = 0;
    let idx = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      id += 1;
      const next: TrailItem = {
        id,
        x: e.clientX,
        y: e.clientY,
        src: TRAIL_SRCS[idx % TRAIL_SRCS.length],
        rot: (Math.random() - 0.5) * 24,
      };
      idx += 1;
      setItems((prev) => [...prev.slice(-5), next]);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  useEffect(() => {
    if (!items.length) return;
    const t = window.setTimeout(() => {
      setItems((prev) => prev.slice(1));
    }, 420);
    return () => window.clearTimeout(t);
  }, [items]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute h-16 w-24 overflow-hidden rounded-xl border border-white/20 shadow-lg"
          style={{
            left: item.x,
            top: item.y,
            opacity: 0.8,
            transform: `translate(-50%, -50%) rotate(${item.rot}deg)`,
            animation: "trailFade 0.55s ease forwards",
          }}
        >
          <Image src={item.src} alt="" fill className="object-cover" sizes="96px" />
        </div>
      ))}
    </div>
  );
}
