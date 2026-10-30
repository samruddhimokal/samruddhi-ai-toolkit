"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import type { CategoryId, Tool } from "@/lib/types";
import { Hero } from "./Hero";
import { ToolCard } from "./ToolCard";
import { CommandPalette } from "./CommandPalette";
import { ToolModal } from "./ToolModal";
import { StarIcon } from "./icons";

const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? "";

export function Directory() {
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [activeId, setActiveId] = useState<string>(categories[0].id);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const openTool = useCallback((t: Tool) => {
    setPaletteOpen(false);
    setSelectedTool(t);
  }, []);

  const searchRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const favoriteCount = useMemo(() => tools.filter((t) => t.favorite).length, []);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    return tools.filter((t) => {
      if (favoritesOnly && !t.favorite) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.blurb.toLowerCase().includes(q) ||
        categoryLabel(t.category).toLowerCase().includes(q)
      );
    });
  }, [q, favoritesOnly]);

  const grouped = useMemo(
    () =>
      categories
        .map((c) => ({ category: c, items: filtered.filter((t) => t.category === c.id) }))
        .filter((g) => g.items.length > 0),
    [filtered]
  );
  const presentIds = useMemo(() => new Set(grouped.map((g) => g.category.id)), [grouped]);

  const resetAll = () => {
    setQuery("");
    setFavoritesOnly(false);
  };

  // ── Global shortcuts: ⌘K / "/" open palette ─────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen(true);
      } else if (e.key === "/" && !typing && !paletteOpen) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  // ── Scroll reveal ──────────────────────────────────────────────
  useEffect(() => {
    const els = contentRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els || els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [grouped]);

  // ── Scrollspy: highlight the section in view ───────────────────
  useEffect(() => {
    const sections = contentRef.current?.querySelectorAll<HTMLElement>("section[id]");
    if (!sections || sections.length === 0) return;
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const firstVisible = Array.from(sections).find((s) => visible.get(s.id));
        if (firstVisible) setActiveId(firstVisible.id);
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [grouped]);

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div id="top">
      <Hero
        query={query}
        setQuery={setQuery}
        searchRef={searchRef}
        toolCount={tools.length}
        categoryCount={categories.length}
        favoriteCount={favoriteCount}
      />

      {/* ── Sticky top bar ──────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-dark-border bg-obsidian">
        <div className="mx-auto flex h-14 max-w-shell items-center gap-4 px-6">
          <a
            href="#top"
            className="eyebrow tracking-[0.14em] text-stone transition-colors hover:text-soft-white"
          >
            The AI Toolkit
          </a>

          <nav className="ml-auto hidden items-center gap-5 sm:flex" aria-label="Sections">
            <a href="#learn" className="text-[12px] text-stone transition-colors hover:text-soft-white">
              Learn
            </a>
            <a href="#follow" className="text-[12px] text-stone transition-colors hover:text-soft-white">
              Who to follow
            </a>
            <a href="#templates" className="text-[12px] text-stone transition-colors hover:text-soft-white">
              n8n templates
            </a>
          </nav>

          <button
            onClick={() => setFavoritesOnly((v) => !v)}
            aria-pressed={favoritesOnly}
            className={`ml-auto inline-flex shrink-0 items-center gap-1.5 rounded border sm:ml-0 px-3 py-1.5 text-[12px] transition-colors ${
              favoritesOnly
                ? "border-amethyst text-amethyst"
                : "border-dark-border text-stone hover:text-soft-white"
            }`}
          >
            <StarIcon />
            <span className="hidden sm:inline">I use this</span>
          </button>

          <span className="hidden shrink-0 eyebrow tracking-[0.14em] text-dusk md:inline">
            {filtered.length} shown
          </span>
        </div>

        {/* Mobile category rail */}
        <div className="border-t border-dark-border/60 lg:hidden">
          <div className="no-scrollbar mx-auto flex max-w-shell items-center gap-2 overflow-x-auto px-6 py-2.5">
            {grouped.map((g) => (
              <button
                key={g.category.id}
                onClick={() => jumpTo(g.category.id)}
                className={`shrink-0 whitespace-nowrap rounded border px-3 py-1 text-[12px] transition-colors ${
                  activeId === g.category.id
                    ? "border-bone bg-bone text-obsidian"
                    : "border-dark-border text-stone"
                }`}
              >
                {g.category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body: sidebar + content ─────────────────────────────── */}
      <div className="mx-auto flex max-w-shell gap-10 px-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-[76px] max-h-[calc(100vh-100px)] overflow-y-auto py-10 no-scrollbar">
            <p className="eyebrow mb-4 text-stone">Categories</p>
            <ul className="space-y-0.5">
              {categories.map((c) => {
                const present = presentIds.has(c.id);
                const isActive = activeId === c.id && present;
                return (
                  <li key={c.id}>
                    <button
                      disabled={!present}
                      onClick={() => jumpTo(c.id)}
                      className={`group flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[13px] transition-colors ${
                        isActive
                          ? "text-bone"
                          : present
                            ? "text-stone hover:text-soft-white"
                            : "cursor-default text-stone/30"
                      }`}
                    >
                      <span
                        className={`h-3 w-px transition-colors ${
                          isActive ? "bg-amethyst" : "bg-transparent"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="flex-1 truncate">{c.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main ref={contentRef} className="min-w-0 flex-1 py-12 md:py-16">
          {grouped.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-serif text-[30px] text-bone">Nothing here yet.</p>
              <p className="mt-3 text-stone">No tool matches that filter.</p>
              <button
                onClick={resetAll}
                className="mt-6 eyebrow tracking-[0.14em] text-amethyst"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-20">
              {grouped.map(({ category, items }) => (
                <section
                  key={category.id}
                  id={category.id}
                  aria-labelledby={`${category.id}-h`}
                  className="scroll-mt-32"
                >
                  <div
                    data-reveal
                    className="flex items-baseline justify-between gap-4 border-b border-dark-border pb-4"
                  >
                    <div>
                      <h2
                        id={`${category.id}-h`}
                        className="font-serif text-[26px] tracking-[-0.015em] text-bone md:text-[32px]"
                      >
                        {category.label}
                      </h2>
                      <p className="mt-1.5 max-w-xl text-[14px] text-stone">
                        {category.blurb}
                      </p>
                    </div>
                    <span className="shrink-0 eyebrow tracking-[0.14em] text-dusk">
                      {items.length}
                    </span>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((tool, i) => (
                      <ToolCard key={tool.name} tool={tool} index={i} onOpen={openTool} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={openTool}
      />
      <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}
