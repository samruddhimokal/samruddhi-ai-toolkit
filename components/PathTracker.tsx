"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PathWeek } from "@/data/path";

const KEY = "start-path-progress";

function load(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

/** The 30-day path with tick-boxes. Progress is saved in this browser only. */
export function PathTracker({ weeks }: { weeks: PathWeek[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => setDone(load()), []);

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* storage blocked: ticks still work for this visit */
      }
      return next;
    });

  const allIds = weeks.flatMap((w) => [...w.steps.map((s) => s.id), w.project.id]);
  const total = allIds.length;
  const count = allIds.filter((id) => done[id]).length;
  const pct = Math.round((count / total) * 100);

  return (
    <>
      <div className="sticky top-0 z-10 -mx-6 border-b border-dark-border bg-obsidian/95 px-6 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-4 text-[12.5px]">
          <span className="text-stone">
            Your progress · <span className="text-bone">{count}</span> of {total} done
          </span>
          {count > 0 && (
            <button
              type="button"
              onClick={() => {
                setDone({});
                try {
                  localStorage.removeItem(KEY);
                } catch {}
              }}
              className="text-stone transition-colors hover:text-soft-white"
            >
              Reset
            </button>
          )}
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded bg-dark-border">
          <div
            className="h-full rounded bg-amethyst transition-[width] duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {weeks.map((w) => {
        const weekIds = [...w.steps.map((s) => s.id), w.project.id];
        const weekDone = weekIds.every((id) => done[id]);
        const minutes = w.steps.reduce((n, s) => n + s.minutes, 0);
        return (
          <section key={w.week} id={`week-${w.week}`} aria-labelledby={`week-${w.week}-h`} className="scroll-mt-32">
            <div className="flex items-baseline gap-4 border-b border-dark-border pb-4">
              <span className={`font-serif text-[22px] ${weekDone ? "text-dusk" : "text-amethyst"}`}>
                {weekDone ? "✓" : `0${w.week}`}
              </span>
              <div className="flex-1">
                <p className="eyebrow text-stone">
                  {w.label} · about {minutes} min + weekend project
                </p>
                <h2
                  id={`week-${w.week}-h`}
                  className="mt-1 font-serif text-[26px] tracking-[-0.015em] text-bone md:text-[32px]"
                >
                  {w.theme}
                </h2>
                <p className="mt-1.5 max-w-xl text-[14px] text-stone">{w.goal}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {w.outcomes.map((o) => (
                <p key={o} className="rounded border border-dark-border px-4 py-3 text-[13.5px] leading-snug text-soft-white/80">
                  <span className="mr-1.5 text-dusk">→</span>
                  {o}
                </p>
              ))}
            </div>

            <ol className="mt-4 divide-y divide-dark-border">
              {w.steps.map((s) => (
                <li key={s.id} className="flex items-start gap-4 py-4">
                  <Check checked={!!done[s.id]} onClick={() => toggle(s.id)} label={`${s.days} done`} />
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="w-24 shrink-0 eyebrow tracking-[0.14em] text-dusk">
                      {s.days}
                      <span className="ml-2 normal-case tracking-normal text-stone">{s.minutes}m</span>
                    </span>
                    <span
                      className={`flex-1 text-[15px] leading-relaxed transition-colors ${
                        done[s.id] ? "text-stone line-through decoration-stone/50" : "text-soft-white/85"
                      }`}
                    >
                      {s.do}
                    </span>
                    {s.href && <StepLink href={s.href} label={s.linkLabel} />}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.6fr_1fr]">
              <div className="flex gap-4 rounded border border-dark-border border-l-2 border-l-amethyst bg-panel p-6">
                <Check checked={!!done[w.project.id]} onClick={() => toggle(w.project.id)} label="Project done" />
                <div>
                  <p className="eyebrow text-dusk">Weekend project · {w.project.title}</p>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-bone">{w.project.brief}</p>
                  <p className="mt-3 text-[13.5px] text-stone">
                    <span className="text-soft-white/80">Done when:</span> {w.project.doneWhen}
                  </p>
                </div>
              </div>
              <div className="rounded border border-dark-border p-6">
                <p className="eyebrow text-stone">The trap this week</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-soft-white/80">{w.trap}</p>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

function Check({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onClick}
      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-[12px] transition-all duration-300 ${
        checked ? "scale-110 border-amethyst bg-amethyst text-bone" : "border-stone/60 text-transparent hover:border-dusk"
      }`}
    >
      ✓
    </button>
  );
}

function StepLink({ href, label }: { href: string; label?: string }) {
  const cls = "shrink-0 text-[12px] font-medium tracking-[0.06em] text-stone transition-colors hover:text-amethyst";
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label} →
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label} →
    </Link>
  );
}
