"use client";

import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { SearchIcon, CloseIcon, ArrowUpRight } from "./icons";

const ROTATING = ["build", "sell", "ship", "create", "automate", "research"];

const PRESS = [
  {
    label: "Best Practical AI Training 2025",
    href: "https://evergreenawards.com/awards/pace-labz-best-practical-ai-training-for-business-leaders-in-the-u-s-of-2025",
  },
  {
    label: "CEO Times",
    href: "https://ceotimes.com/why-brilliant-professionals-are-getting-left-behind-by-ai-and-one-founders-mission-to-change-that/",
  },
  {
    label: "Leadr Magazine",
    href: "https://leadrmagazine.com/empowering-professionals-with-ai-how-samruddhi-mokal-is-turning-overwhelming-technology-into-business-power/",
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Counter({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduced]);

  return <>{n}</>;
}

function RotatingWord() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2100);
    return () => clearInterval(id);
  }, [reduced]);
  return (
    <span className="relative inline-block text-amethyst italic">
      <span key={i} className="word-rotate">
        {ROTATING[i]}
      </span>
    </span>
  );
}

interface HeroProps {
  query: string;
  setQuery: (v: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  toolCount: number;
  categoryCount: number;
  favoriteCount: number;
}

export function Hero({
  query,
  setQuery,
  searchRef,
  toolCount,
  categoryCount,
  favoriteCount,
}: HeroProps) {
  const localRef = useRef<HTMLInputElement>(null);
  const marqueeItems = [...categories, ...categories];

  return (
    <header className="relative overflow-hidden border-b border-dark-border">
      <div className="mx-auto max-w-shell px-6 pt-24 pb-14 md:pt-32">
        <p className="eyebrow text-dusk">A personal guide by Samruddhi Mokal</p>

        <h1 className="mt-6 max-w-4xl font-serif text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-bone sm:text-[56px] md:text-[72px]">
          The AI tools I actually
          <br className="hidden sm:block" /> use to{" "}
          <span className="whitespace-nowrap">
            <RotatingWord />.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-stone">
          The tools behind everything I build and teach. Collected over years,
          tested on real work, and the ones I hand my clients. Not a list I
          scraped.
        </p>

        {/* Search */}
        <div className="mt-10 max-w-2xl">
          <label className="group relative block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone transition-colors group-focus-within:text-amethyst">
              <SearchIcon className="h-[18px] w-[18px]" />
            </span>
            <input
              ref={(el) => {
                localRef.current = el;
                if (searchRef) searchRef.current = el;
              }}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${toolCount} tools, or press /`}
              aria-label="Search tools"
              className="w-full rounded border border-dark-border bg-panel py-4 pl-12 pr-12 text-[16px] text-bone placeholder:text-stone focus:border-amethyst focus:bg-panel-hover"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone hover:text-bone"
              >
                <CloseIcon />
              </button>
            )}
          </label>
        </div>

        {/* Animated stats */}
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
          <Stat value={toolCount} label="tools" />
          <span className="h-8 w-px bg-dark-border" aria-hidden="true" />
          <Stat value={categoryCount} label="categories" />
          <span className="h-8 w-px bg-dark-border" aria-hidden="true" />
          <Stat value={favoriteCount} label="I use daily" accent />
        </div>

        {/* Press / recognition */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <span className="eyebrow text-stone">Featured in</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {PRESS.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[14px] text-soft-white/85 transition-colors hover:text-bone"
              >
                {p.label}
                <ArrowUpRight className="h-3.5 w-3.5 text-stone transition-colors group-hover:text-amethyst" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Category marquee */}
      <div className="marquee-mask relative border-t border-dark-border py-4">
        <div className="marquee-track">
          {marqueeItems.map((c, idx) => (
            <span
              key={`${c.id}-${idx}`}
              className="mx-5 whitespace-nowrap text-[13px] tracking-wide text-stone"
            >
              {c.label}
              <span className="ml-5 text-amethyst/50" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

function Stat({
  value,
  label,
  accent = false,
}: {
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`font-serif text-[34px] leading-none tracking-[-0.02em] ${
          accent ? "text-amethyst" : "text-bone"
        }`}
      >
        <Counter value={value} />
      </span>
      <span className="text-[13px] text-stone">{label}</span>
    </div>
  );
}
