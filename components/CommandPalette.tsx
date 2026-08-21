"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import type { CategoryId, Tool } from "@/lib/types";
import { SearchIcon, ReturnIcon, StarIcon } from "./icons";

const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? "";

export function CommandPalette({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (tool: Tool) => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const base = query
      ? tools.filter(
          (t) =>
            t.name.toLowerCase().includes(query) ||
            t.blurb.toLowerCase().includes(query) ||
            categoryLabel(t.category).toLowerCase().includes(query)
        )
      : tools.filter((t) => t.favorite);
    return base.slice(0, 40);
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      // Focus after the element paints
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const t = results[active];
        if (t) onSelect(t);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose, onSelect]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
    >
      <div
        className="scrim-in absolute inset-0 bg-obsidian/92"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="dialog-in relative w-full max-w-xl overflow-hidden rounded-lg border border-white/12 bg-[color:var(--elevated)]">
        <div className="flex items-center gap-3 border-b border-dark-border px-4">
          <SearchIcon className="h-[18px] w-[18px] shrink-0 text-stone" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search every tool…"
            aria-label="Search every tool"
            className="w-full bg-transparent py-4 text-[15px] text-bone placeholder:text-stone focus:outline-none"
          />
          <kbd>esc</kbd>
        </div>

        <ul ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-[14px] text-stone">
              No tool matches “{q}”.
            </li>
          )}
          {results.map((t, idx) => (
            <li key={t.name} data-idx={idx}>
              <button
                type="button"
                onMouseEnter={() => setActive(idx)}
                onClick={() => onSelect(t)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${
                  idx === active ? "bg-panel-hover" : ""
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    idx === active ? "bg-amethyst" : "bg-dark-border"
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-serif text-[16px] text-bone">
                      {t.name}
                    </span>
                    {t.favorite && <StarIcon className="shrink-0 text-amethyst" />}
                  </span>
                  <span className="block truncate text-[12px] text-stone">
                    {categoryLabel(t.category)} · {t.blurb}
                  </span>
                </span>
                {idx === active && (
                  <span className="flex shrink-0 items-center gap-1 text-stone">
                    <ReturnIcon />
                    <span className="text-[11px]">open</span>
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-dark-border px-4 py-2.5 text-[11px] text-stone">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd>↑</kbd>
              <kbd>↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd>↵</kbd> open
            </span>
          </span>
          <span>{results.length} shown</span>
        </div>
      </div>
    </div>
  );
}
