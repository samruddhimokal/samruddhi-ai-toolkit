"use client";

import { useEffect, useRef } from "react";
import type { Tool } from "@/lib/types";
import { categories } from "@/data/categories";
import { toolDetails } from "@/data/toolDetails";
import {
  ArrowUpRight,
  CloseIcon,
  StarIcon,
  CheckIcon,
  MinusIcon,
} from "./icons";

function prettyDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ToolModal({
  tool,
  onClose,
}: {
  tool: Tool | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!tool) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(id);
    };
  }, [tool, onClose]);

  if (!tool) return null;

  const detail = toolDetails[tool.name];
  const categoryName =
    categories.find((c) => c.id === tool.category)?.label ?? "";
  const domain = prettyDomain(tool.url);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${tool.name} details`}
    >
      {/* Strong scrim so nothing behind competes for attention */}
      <div
        className="scrim-in absolute inset-0 bg-obsidian/92"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Elevated, fully opaque panel with fixed header + footer */}
      <div className="dialog-in relative flex max-h-[86vh] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-white/12 bg-[color:var(--elevated)]">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-dark-border px-6 py-5 sm:px-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="eyebrow tracking-[0.16em] text-dusk">
                {categoryName}
              </span>
              {tool.favorite && (
                <span className="inline-flex items-center gap-1 text-amethyst">
                  <StarIcon />
                  <span className="eyebrow tracking-[0.12em] text-amethyst">
                    I use this
                  </span>
                </span>
              )}
              {tool.added && (
                <span className="eyebrow tracking-[0.12em] text-dusk">Added</span>
              )}
            </div>
            <h2 className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.015em] text-bone sm:text-[30px]">
              {tool.name}
            </h2>
          </div>

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded border border-dark-border p-2 text-stone transition-colors hover:border-stone/50 hover:text-bone"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <p className="text-[15.5px] leading-relaxed text-soft-white">
            {detail?.description ?? tool.blurb}
          </p>

          {(detail?.bestFor || detail?.pricing) && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {detail?.bestFor && (
                <div className="rounded border border-dark-border bg-obsidian p-4">
                  <p className="eyebrow mb-1.5 text-stone">Best for</p>
                  <p className="text-[14px] leading-snug text-soft-white">
                    {detail.bestFor}
                  </p>
                </div>
              )}
              {detail?.pricing && (
                <div className="rounded border border-dark-border bg-obsidian p-4">
                  <p className="eyebrow mb-1.5 text-stone">Pricing</p>
                  <p className="text-[14px] leading-snug text-soft-white">
                    {detail.pricing}
                  </p>
                  <p className="mt-2 text-[11px] leading-snug text-stone/70">
                    Indicative. Check the site for current plans.
                  </p>
                </div>
              )}
            </div>
          )}

          {(detail?.pros?.length || detail?.cons?.length) && (
            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              {detail?.pros?.length ? (
                <div>
                  <p className="eyebrow mb-3 text-soft-white/80">Strengths</p>
                  <ul className="space-y-2.5">
                    {detail.pros.map((p, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[14px] leading-snug text-soft-white"
                      >
                        <CheckIcon className="mt-0.5 shrink-0 text-amethyst" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {detail?.cons?.length ? (
                <div>
                  <p className="eyebrow mb-3 text-soft-white/80">Watch-outs</p>
                  <ul className="space-y-2.5">
                    {detail.cons.map((c, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[14px] leading-snug text-stone"
                      >
                        <MinusIcon className="mt-0.5 shrink-0 text-stone" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}

          {detail?.take && (
            <div className="mt-7 rounded border-l-2 border-amethyst bg-panel px-4 py-4">
              <p className="eyebrow mb-1.5 text-dusk">The take</p>
              <p className="font-serif text-[16px] leading-snug text-bone">
                {detail.take}
              </p>
            </div>
          )}
        </div>

        {/* Fixed footer */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-dark-border px-6 py-4 sm:px-8">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded bg-bone px-5 py-2.5 text-[14px] text-obsidian transition-opacity hover:opacity-90"
          >
            Visit {tool.name}
            <ArrowUpRight className="text-amethyst transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <span className="text-[12px] lowercase tracking-[0.06em] text-stone">
            {domain}
          </span>
        </div>
      </div>
    </div>
  );
}
