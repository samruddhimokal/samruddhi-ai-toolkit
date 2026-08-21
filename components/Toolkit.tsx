"use client";

import { useMemo, useState } from "react";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/lib/types";
import { ToolCard } from "./ToolCard";
import { SearchIcon, CloseIcon, StarIcon } from "./icons";

const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? "";

export function Toolkit() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryId | "all">("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      if (favoritesOnly && !t.favorite) return false;
      if (active !== "all" && t.category !== active) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.blurb.toLowerCase().includes(q) ||
        categoryLabel(t.category).toLowerCase().includes(q)
      );
    });
  }, [q, active, favoritesOnly]);

  // Preserve category order, drop empty sections.
  const grouped = useMemo(() => {
    return categories
      .map((c) => ({ category: c, items: filtered.filter((t) => t.category === c.id) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const resetAll = () => {
    setQuery("");
    setActive("all");
    setFavoritesOnly(false);
  };

  return (
    <div>
      {/* ── Sticky nav ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-obsidian border-b border-dark-border">
        <div className="mx-auto max-w-shell px-6 h-16 flex items-center gap-4">
          <a href="#top" className="font-serif text-[19px] tracking-[-0.01em] shrink-0">
            <span className="text-bone">Pace</span>
            <span className="text-amethyst"> Labz</span>
          </a>

          <label className="relative flex-1 max-w-md ml-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${tools.length} tools`}
              aria-label="Search tools"
              className="w-full bg-transparent border border-dark-border rounded pl-9 pr-9 py-2 text-[14px] text-soft-white placeholder:text-stone focus:border-amethyst transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone hover:text-soft-white transition-colors"
              >
                <CloseIcon />
              </button>
            )}
          </label>

          <span className="ml-auto hidden sm:block eyebrow text-dusk tracking-[0.14em]">
            {filtered.length} shown
          </span>
        </div>

        {/* ── Category chips ───────────────────────────────────────── */}
        <div className="border-t border-dark-border/60">
          <div className="mx-auto max-w-shell px-6">
            <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
              <button
                onClick={() => setFavoritesOnly((v) => !v)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[12px] transition-colors ${
                  favoritesOnly
                    ? "border-amethyst text-amethyst"
                    : "border-dark-border text-stone hover:text-soft-white"
                }`}
              >
                <StarIcon />
                I use this
              </button>

              <span className="shrink-0 h-4 w-px bg-dark-border" aria-hidden="true" />

              <Chip
                label="All"
                activeState={active === "all"}
                onClick={() => setActive("all")}
              />
              {categories.map((c) => (
                <Chip
                  key={c.id}
                  label={c.label}
                  activeState={active === c.id}
                  onClick={() => setActive(c.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-shell px-6 py-16">
        {grouped.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-obsidian text-[28px]">Nothing here yet.</p>
            <p className="mt-3 text-stone">No tool matches that filter.</p>
            <button
              onClick={resetAll}
              className="mt-6 inline-flex items-center gap-2 text-amethyst eyebrow tracking-[0.14em]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {grouped.map(({ category, items }) => (
              <section key={category.id} id={category.id} aria-labelledby={`${category.id}-h`}>
                <div className="flex items-baseline justify-between gap-4 border-b border-light-border pb-4">
                  <div>
                    <h2
                      id={`${category.id}-h`}
                      className="font-serif text-obsidian text-[26px] md:text-[30px] tracking-[-0.015em]"
                    >
                      {category.label}
                    </h2>
                    <p className="mt-1.5 text-[14px] text-stone max-w-xl">{category.blurb}</p>
                  </div>
                  <span className="shrink-0 eyebrow text-dusk tracking-[0.14em]">
                    {items.length}
                  </span>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Chip({
  label,
  activeState,
  onClick,
}: {
  label: string;
  activeState: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded border px-3 py-1.5 text-[12px] transition-colors ${
        activeState
          ? "border-bone bg-bone text-obsidian"
          : "border-dark-border text-stone hover:text-soft-white"
      }`}
    >
      {label}
    </button>
  );
}
