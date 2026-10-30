"use client";

import { useMemo, useState } from "react";
import { glossaryGroups } from "@/data/glossary";
import { SearchIcon } from "./icons";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function GlossaryList() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const groups = useMemo(
    () =>
      glossaryGroups
        .map((g) => ({
          ...g,
          terms: g.terms.filter(
            (t) =>
              !query ||
              t.term.toLowerCase().includes(query) ||
              t.definition.toLowerCase().includes(query)
          ),
        }))
        .filter((g) => g.terms.length > 0),
    [query]
  );

  return (
    <div>
      <label className="group relative block max-w-xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone group-focus-within:text-amethyst">
          <SearchIcon className="h-[18px] w-[18px]" />
        </span>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms, e.g. token or RAG"
          aria-label="Search the glossary"
          className="w-full rounded border border-dark-border bg-panel py-3.5 pl-12 pr-4 text-[15px] text-bone placeholder:text-stone focus:border-amethyst"
        />
      </label>

      {groups.length === 0 && <p className="mt-10 text-stone">No term matches that search.</p>}

      <div className="mt-12 space-y-14">
        {groups.map((g) => (
          <section key={g.label} aria-label={g.label}>
            <p className="eyebrow border-b border-dark-border pb-3 text-dusk">{g.label}</p>
            <dl className="divide-y divide-dark-border">
              {g.terms.map((t) => (
                <div
                  key={t.term}
                  id={slug(t.term)}
                  className="grid scroll-mt-24 gap-1 py-5 md:grid-cols-[260px_1fr] md:gap-8"
                >
                  <dt className="font-serif text-[18px] tracking-[-0.01em] text-bone">{t.term}</dt>
                  <dd>
                    <p className="text-[15px] leading-relaxed text-soft-white/85">{t.definition}</p>
                    {t.example && (
                      <p className="mt-1.5 text-[13.5px] text-stone">
                        <span className="text-dusk">Example. </span>
                        {t.example}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
