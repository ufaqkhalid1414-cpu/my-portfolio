"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

type Demo = {
  id: string;
  category: string;
  name: string;
  hint: string;
  render: (replayKey: number) => ReactNode;
};

function useInViewOnce(threshold = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, on };
}

function MaskedWordReveal({ replayKey }: { replayKey: number }) {
  const words = ["Build", "with", "clarity"];
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(false);
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, [replayKey]);
  return (
    <p key={replayKey} className={`lab-demo-text lab-mask-reveal ${on ? "is-on" : ""}`}>
      {words.map((w, i) => (
        <span key={w}>
          <span className="lab-mask">
            <span className="lab-mask-inner" style={{ transitionDelay: `${i * 70}ms` }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}

function TextSwapRotator({ replayKey }: { replayKey: number }) {
  const words = ["systems", "products", "experiences", "interfaces"];
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 1600);
    return () => clearInterval(t);
  }, [replayKey]);
  return (
    <p className="lab-demo-text">
      Crafting{" "}
      <span className="lab-rotator" key={`${replayKey}-${i}`}>
        {words[i]}
      </span>
    </p>
  );
}

function FontWeightMorph({ replayKey }: { replayKey: number }) {
  return (
    <p key={replayKey} className="lab-demo-text lab-weight-morph is-on">
      Soft → Strong
    </p>
  );
}

function KineticType({ replayKey }: { replayKey: number }) {
  const letters = "KINETIC".split("");
  return (
    <p key={replayKey} className="lab-demo-text lab-kinetic is-on">
      {letters.map((ch, i) => (
        <span key={`${ch}-${i}`} style={{ animationDelay: `${i * 60}ms` }}>
          {ch}
        </span>
      ))}
    </p>
  );
}

function ImageRevealHover() {
  return (
    <div className="lab-img-reveal">
      <div className="lab-img-reveal-media" />
      <span className="lab-img-reveal-label">Hover me</span>
    </div>
  );
}

function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <button
      ref={ref}
      type="button"
      className="lab-magnetic"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      Magnetic
    </button>
  );
}

function SplitColorCover() {
  return (
    <a href="#lab" className="lab-split-cover" onClick={(e) => e.preventDefault()}>
      <span className="lab-split-cover-text">Slide Cover</span>
      <span className="lab-split-cover-fill" aria-hidden />
    </a>
  );
}

function UnderlineDrawIn({ replayKey }: { replayKey: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(false);
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, [replayKey]);
  return (
    <p key={replayKey} className={`lab-demo-text lab-underline-demo ${on ? "is-on" : ""}`}>
      Underline{" "}
      <span className="lab-underline-word">
        Draw-In
        <span className="lab-underline" />
      </span>
    </p>
  );
}

function GradientScrollFill() {
  const { ref, on } = useInViewOnce(0.4);
  return (
    <p
      ref={ref}
      className={`lab-demo-text lab-gradient-fill ${on ? "is-on" : ""}`}
    >
      Gradient Fill
    </p>
  );
}

function TextParallax() {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${mid * -0.12}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <p ref={ref} className="lab-demo-text lab-parallax">
      Parallax Text
    </p>
  );
}

function InfiniteMarquee() {
  return (
    <div className="lab-marquee" aria-hidden>
      <div className="lab-marquee-track">
        <span>Ship clean systems · </span>
        <span>Ship clean systems · </span>
        <span>Ship clean systems · </span>
        <span>Ship clean systems · </span>
      </div>
    </div>
  );
}

function StaggeredReveal({ replayKey }: { replayKey: number }) {
  const items = ["Listen", "Design", "Build", "Ship"];
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(false);
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, [replayKey]);
  return (
    <ul key={replayKey} className={`lab-stagger ${on ? "is-on" : ""}`}>
      {items.map((item, i) => (
        <li key={item} style={{ transitionDelay: `${i * 90}ms` }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

const DEMOS: Demo[] = [
  {
    id: "mask-reveal",
    category: "Typography",
    name: "Masked Word Reveal",
    hint: "Words slide up through a mask",
    render: (k) => <MaskedWordReveal replayKey={k} />,
  },
  {
    id: "text-swap",
    category: "Typography",
    name: "Text-Swap Word Rotator",
    hint: "One word swaps in a loop",
    render: (k) => <TextSwapRotator replayKey={k} />,
  },
  {
    id: "weight-morph",
    category: "Typography",
    name: "Font-Weight Morphing",
    hint: "Weight softens then thickens",
    render: (k) => <FontWeightMorph replayKey={k} />,
  },
  {
    id: "kinetic",
    category: "Typography",
    name: "Typographic Kinetic Type",
    hint: "Letters bounce in sequence",
    render: (k) => <KineticType replayKey={k} />,
  },
  {
    id: "img-reveal",
    category: "Interactive",
    name: "Image Reveal on Hover",
    hint: "Hover the card",
    render: () => <ImageRevealHover />,
  },
  {
    id: "magnetic",
    category: "Interactive",
    name: "Magnetic Text Button",
    hint: "Move your cursor near it",
    render: () => <MagneticButton />,
  },
  {
    id: "split-cover",
    category: "Interactive",
    name: "Split-Color Slide Cover",
    hint: "Hover the link",
    render: () => <SplitColorCover />,
  },
  {
    id: "underline",
    category: "Interactive",
    name: "Underline Draw-In",
    hint: "Accent line draws under a word",
    render: (k) => <UnderlineDrawIn replayKey={k} />,
  },
  {
    id: "gradient-fill",
    category: "Scroll",
    name: "Gradient Scroll Fill",
    hint: "Fills when it enters view",
    render: () => <GradientScrollFill />,
  },
  {
    id: "parallax",
    category: "Scroll",
    name: "Text Parallax",
    hint: "Scroll the page to feel it",
    render: () => <TextParallax />,
  },
  {
    id: "marquee",
    category: "Scroll",
    name: "Infinite Text Marquee",
    hint: "Continuous sideways scroll",
    render: () => <InfiniteMarquee />,
  },
  {
    id: "stagger",
    category: "Scroll",
    name: "Staggered Section Reveal",
    hint: "Items appear one after another",
    render: (k) => <StaggeredReveal replayKey={k} />,
  },
];

function DemoCard({ demo }: { demo: Demo }) {
  const [replayKey, setReplayKey] = useState(0);
  const replay = useCallback(() => setReplayKey((k) => k + 1), []);

  return (
    <article className="lab-card" id={demo.id}>
      <div className="lab-card-stage">{demo.render(replayKey)}</div>
      <div className="lab-card-meta">
        <p className="lab-card-cat">{demo.category}</p>
        <h2 className="lab-card-name">{demo.name}</h2>
        <p className="lab-card-hint">{demo.hint}</p>
        <button type="button" className="lab-replay" onClick={replay}>
          Replay
        </button>
      </div>
    </article>
  );
}

export default function AnimationLabPage() {
  const categories = ["All", "Typography", "Interactive", "Scroll"];
  const [filter, setFilter] = useState("All");
  const list =
    filter === "All" ? DEMOS : DEMOS.filter((d) => d.category === filter);

  return (
    <main className="lab-page">
      <header className="lab-header">
        <p className="lab-kicker">Animation lab</p>
        <h1 className="lab-title">Feel each text effect</h1>
        <p className="lab-sub">
          One slide per animation. Name underneath. Replay any card. This page
          does not change your portfolio — it is only for choosing.
        </p>
        <div className="lab-filters" role="tablist" aria-label="Filter demos">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              className={`lab-filter ${filter === c ? "is-active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <a href="/" className="lab-back">
          ← Back to portfolio
        </a>
      </header>

      <div className="lab-grid">
        {list.map((demo) => (
          <DemoCard key={demo.id} demo={demo} />
        ))}
      </div>
    </main>
  );
}
