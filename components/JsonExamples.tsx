"use client";

import { useState } from "react";
import type { JsonExample } from "@/data/prompts";
import { CopyButton } from "./CopyButton";

const filters = ["All", "Image", "Video"] as const;

/** JSON templates with an Image / Video filter. Keys are tinted so the structure reads at a glance. */
export function JsonExamples({ examples }: { examples: JsonExample[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = examples.filter((e) => filter === "All" || e.kind === filter);

  return (
    <div>
      <div role="tablist" aria-label="Filter templates" className="mb-5 flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded border px-3 py-1.5 text-[13px] transition-colors ${
              filter === f
                ? "border-amethyst bg-amethyst/15 text-bone"
                : "border-dark-border text-stone hover:border-amethyst/60 hover:text-soft-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {shown.map((e) => (
          <article key={e.id} id={e.id} className="flex scroll-mt-24 flex-col rounded border border-dark-border bg-panel">
            <div className="flex items-start justify-between gap-3 border-b border-dark-border px-5 py-3.5">
              <div>
                <p className="text-[11px] tracking-[0.06em] text-stone">
                  <span className={e.kind === "Video" ? "text-dusk" : ""}>{e.kind}</span> · {e.tools}
                </p>
                <h4 className="font-serif text-[18px] tracking-[-0.01em] text-bone">{e.title}</h4>
                <p className="mt-1 text-[13px] leading-snug text-dusk/90">{e.why}</p>
              </div>
              <CopyButton text={e.json} />
            </div>
            <pre className="max-h-[460px] flex-1 overflow-y-auto whitespace-pre-wrap break-words px-5 py-4 font-mono text-[12px] leading-relaxed text-soft-white/80">
              <Highlighted json={e.json} />
            </pre>
          </article>
        ))}
      </div>
    </div>
  );
}

function Highlighted({ json }: { json: string }) {
  // Tint "keys": so the fields stand out from the values.
  const parts = json.split(/("[a-z_]+")(?=:)/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-dusk">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}
