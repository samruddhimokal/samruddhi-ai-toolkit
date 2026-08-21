"use client";

import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { SearchIcon, CloseIcon, ArrowUpRight } from "./icons";

const ROTATING = ["build", "sell", "ship", "create", "automate", "research"];

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
      <div className="mx-auto max-w-shell px-6 pt-24 pb-14 md:pt-28">
        {/* Byline */}
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="eyebrow text-dusk">A personal guide by</span>
          <a
            href="https://www.linkedin.com/in/samruddhi-mokal/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-serif text-[19px] tracking-[-0.01em] text-soft-white transition-colors hover:text-amethyst"
          >
            Samruddhi Mokal
            <ArrowUpRight className="h-3.5 w-3.5 text-stone transition-colors group-hover:text-amethyst" />
          </a>
        </div>

        {/* Headline spans the full width */}
        <h1 className="mt-6 max-w-4xl font-serif text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-bone sm:text-[56px] md:text-[68px]">
          The AI tools I actually
          <br className="hidden sm:block" /> use to{" "}
          <span className="whitespace-nowrap">
            <RotatingWord />.
          </span>
        </h1>

        {/* Two columns: pitch + search  |  at a glance */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="max-w-xl text-[16px] leading-relaxed text-stone">
              The tools behind everything I build and teach. Collected over years,
              tested on real work, and the ones I hand my clients. Not a list I
              scraped.
            </p>

            {/* Search */}
            <div className="mt-8 max-w-xl">
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
          </div>

          {/* At a glance */}
          <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:border-l lg:border-dark-border lg:pl-12">
            <p className="eyebrow text-stone">Inside the toolkit</p>
            <div className="mt-6 space-y-5">
              <StatRow value={toolCount} label="tools, hand-picked" />
              <StatRow value={categoryCount} label="categories" />
              <StatRow value={favoriteCount} label="favorites" accent />
            </div>
            <p className="mt-8 max-w-xs text-[14.5px] leading-relaxed text-stone">
              Every tool here I have used or vetted. Open any card for what it is
              good for, its pricing, and my honest take.
            </p>
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

function StatRow({
  value,
  label,
  accent = false,
}: {
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className={`w-[2.4ch] font-serif text-[38px] leading-none tracking-[-0.02em] ${
          accent ? "text-amethyst" : "text-bone"
        }`}
      >
        <Counter value={value} />
      </span>
      <span className="text-[14px] text-stone">{label}</span>
    </div>
  );
}
