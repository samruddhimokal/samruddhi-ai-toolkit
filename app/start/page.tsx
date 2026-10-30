import type { Metadata } from "next";
import Link from "next/link";
import { pathWeeks } from "@/data/path";
import { PageHeader, PageBody, JumpNav, NextStep } from "@/components/ui";

export const metadata: Metadata = {
  title: "Start here: learn AI in 30 days",
  description:
    "A free 30-day path to learn AI for work. Four weeks, 30 to 45 minutes a day, one real project each week.",
};

export default function StartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start here"
        title="Learn AI in 30 days."
        blurb="Four weeks. 30 to 45 minutes on weekdays, a little more at the weekend. Each week ends with something real you can use at work, and each Monday starts with a short quiz on the week before, because testing yourself is what makes it stick."
      >
        <JumpNav items={pathWeeks.map((w) => ({ id: `week-${w.week}`, label: `Week ${w.week}` }))} />
      </PageHeader>

      <PageBody>
        {pathWeeks.map((w) => (
          <section
            key={w.week}
            id={`week-${w.week}`}
            aria-labelledby={`week-${w.week}-h`}
            className="scroll-mt-24"
          >
            <div className="flex items-baseline gap-4 border-b border-dark-border pb-4">
              <span className="font-serif text-[22px] text-amethyst">0{w.week}</span>
              <div>
                <h2
                  id={`week-${w.week}-h`}
                  className="font-serif text-[26px] tracking-[-0.015em] text-bone md:text-[32px]"
                >
                  {w.theme}
                </h2>
                <p className="mt-1.5 max-w-xl text-[14px] text-stone">{w.goal}</p>
              </div>
            </div>

            <ol className="mt-6 divide-y divide-dark-border">
              {w.steps.map((s) => (
                <li key={s.days} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="w-16 shrink-0 eyebrow tracking-[0.14em] text-dusk">{s.days}</span>
                  <span className="flex-1 text-[15px] leading-relaxed text-soft-white/85">{s.do}</span>
                  {s.href &&
                    (s.href.startsWith("http") ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-[12px] font-medium tracking-[0.06em] text-stone transition-colors hover:text-amethyst"
                      >
                        {s.linkLabel} →
                      </a>
                    ) : (
                      <Link
                        href={s.href}
                        className="shrink-0 text-[12px] font-medium tracking-[0.06em] text-stone transition-colors hover:text-amethyst"
                      >
                        {s.linkLabel} →
                      </Link>
                    ))}
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded border border-dark-border border-l-2 border-l-amethyst bg-panel p-6">
              <p className="eyebrow text-dusk">Weekend project</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-bone">{w.project}</p>
            </div>
          </section>
        ))}

        <NextStep href="/learn" label="Go deeper with free courses" />
      </PageBody>
    </>
  );
}
