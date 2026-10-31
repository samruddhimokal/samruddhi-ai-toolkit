import type { Metadata } from "next";
import { pathWeeks, pathSetup } from "@/data/path";
import { PageHeader, PageBody, JumpNav, NextStep } from "@/components/ui";
import { PathTracker } from "@/components/PathTracker";

export const metadata: Metadata = {
  title: "Start here: learn AI in 30 days",
  description:
    "A free 30-day path to learn AI for work. Four weeks plus a final stretch, 15 to 45 minutes a day, one real project each week, and a tracker for your progress.",
};

const totalHours = Math.round(
  pathWeeks.reduce((n, w) => n + w.steps.reduce((m, s) => m + s.minutes, 0) + 75, 0) / 60
);

export default function StartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start here"
        title="Learn AI in 30 days."
        blurb={`About ${totalHours} hours across a month. 15 to 45 minutes on weekdays, one project each weekend that you can use at work. Each week opens with a short quiz on the week before, because testing yourself is what makes it stick. Tick things off as you go; your progress saves in this browser.`}
      >
        <JumpNav
          items={[
            { id: "before", label: "Before you start" },
            ...pathWeeks.map((w) => ({ id: `week-${w.week}`, label: w.label })),
          ]}
        />
      </PageHeader>

      <PageBody>
        <section id="before" aria-labelledby="before-h" className="scroll-mt-24">
          <h2 id="before-h" className="font-serif text-[26px] tracking-[-0.015em] text-bone md:text-[32px]">
            Before you start: Day 0
          </h2>
          <p className="mt-1.5 max-w-xl text-[14px] text-stone">Fifteen minutes of setup that decides whether you finish.</p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {pathSetup.map((s, i) => (
              <li key={s} className="flex gap-4 rounded border border-dark-border bg-panel p-5">
                <span className="font-serif text-[18px] text-amethyst">{i + 1}</span>
                <span className="text-[14.5px] leading-relaxed text-soft-white/85">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <PathTracker weeks={pathWeeks} />

        <NextStep href="/learn" label="Go deeper with free courses" />
      </PageBody>
    </>
  );
}
