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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-[8vh]"
      role="dialog"
      aria-modal="true"
      aria-label={`${tool.name} details`}
    >
      <div className="fixed inset-0 bg-obsidian/85" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg rounded-lg border border-dark-border bg-panel">
        {/* Close */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 text-stone transition-colors hover:text-bone"
        >
          <CloseIcon />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 pr-8">
            <span className="eyebrow tracking-[0.16em] text-dusk">{categoryName}</span>
            {tool.favorite && (
              <span className="inline-flex items-center gap-1 text-amethyst">
                <StarIcon />
                <span className="eyebrow tracking-[0.12em] text-amethyst">I use this</span>
              </span>
            )}
            {tool.added && (
              <span className="eyebrow tracking-[0.12em] text-dusk">Added</span>
            )}
          </div>

          <h2 className="mt-3 font-serif text-[30px] leading-tight tracking-[-0.015em] text-bone">
            {tool.name}
          </h2>

          <p className="mt-3 text-[15px] leading-relaxed text-soft-white/85">
            {detail?.description ?? tool.blurb}
          </p>

          {/* Best for + pricing */}
          {(detail?.bestFor || detail?.pricing) && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {detail?.bestFor && (
                <div className="rounded border border-dark-border p-4">
                  <p className="eyebrow mb-1.5 text-stone">Best for</p>
                  <p className="text-[14px] text-soft-white">{detail.bestFor}</p>
                </div>
              )}
              {detail?.pricing && (
                <div className="rounded border border-dark-border p-4">
                  <p className="eyebrow mb-1.5 text-stone">Pricing</p>
                  <p className="text-[14px] text-soft-white">{detail.pricing}</p>
                </div>
              )}
            </div>
          )}

          {/* Pros / Cons */}
          {(detail?.pros?.length || detail?.cons?.length) && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {detail?.pros?.length ? (
                <div>
                  <p className="eyebrow mb-3 text-soft-white/80">Strengths</p>
                  <ul className="space-y-2">
                    {detail.pros.map((p, i) => (
                      <li key={i} className="flex gap-2 text-[14px] leading-snug text-soft-white/85">
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
                  <ul className="space-y-2">
                    {detail.cons.map((c, i) => (
                      <li key={i} className="flex gap-2 text-[14px] leading-snug text-stone">
                        <MinusIcon className="mt-0.5 shrink-0 text-stone" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}

          {/* The take */}
          {detail?.take && (
            <div className="mt-6 border-l-2 border-amethyst pl-4">
              <p className="eyebrow mb-1 text-dusk">The take</p>
              <p className="font-serif text-[16px] leading-snug text-bone">{detail.take}</p>
            </div>
          )}

          {/* Visit */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dark-border pt-6">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded bg-bone px-5 py-2.5 text-[14px] text-obsidian transition-opacity hover:opacity-90"
            >
              Visit {tool.name}
              <ArrowUpRight className="text-amethyst transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <span className="text-[12px] lowercase tracking-[0.06em] text-stone">{domain}</span>
          </div>

          {detail?.pricing && (
            <p className="mt-4 text-[11px] text-stone/70">
              Pricing is indicative. Check the site for current plans.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
