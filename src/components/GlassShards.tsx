"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function GlassShards() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / 40);
      my.set((e.clientY - cy) / 40);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="relative h-[320px] sm:h-[380px] md:h-[440px] w-full max-w-lg mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.22),transparent_62%)] blur-2xl"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        className="absolute left-[12%] top-[18%] h-40 w-28 rounded-3xl glass-strong shadow-[0_0_40px_rgba(45,212,191,0.2)]"
        style={{ x: sx, y: sy }}
        animate={{ rotate: [-18, -14, -18], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] top-[10%] h-48 w-32 rounded-3xl border border-white/20 bg-gradient-to-br from-[rgba(167,139,250,0.25)] to-[rgba(255,255,255,0.04)] backdrop-blur-xl shadow-[0_0_50px_rgba(167,139,250,0.25)]"
        style={{ x: sx, y: sy }}
        animate={{ rotate: [14, 10, 14], y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[28%] bottom-[8%] h-36 w-44 rounded-[2rem] border border-teal-300/30 bg-gradient-to-tr from-[rgba(45,212,191,0.2)] via-transparent to-[rgba(255,255,255,0.06)] backdrop-blur-2xl"
        style={{ x: sx, y: sy }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[12%] bottom-[14%] h-16 w-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        className="absolute left-[8%] top-[48%] h-10 w-10 rounded-full border border-[var(--violet)]/30 bg-[var(--violet-soft)]"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        className="absolute right-[22%] bottom-[22%] h-24 w-24 rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_30%,#fff,rgba(45,212,191,0.5)_40%,rgba(15,23,42,0.2)_75%)] shadow-[0_0_40px_rgba(45,212,191,0.45)]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-[18%] top-[42%] font-mono text-[10px] sm:text-xs text-teal-200/40 leading-relaxed select-none pointer-events-none">
        {`const craft = async (idea) => {\n  return await ship(polish(idea));\n};`}
      </div>
    </div>
  );
}
