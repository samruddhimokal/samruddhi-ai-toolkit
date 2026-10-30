import Link from "next/link";
import { N8N_CREATOR_URL, courseGroups } from "@/data/learn";
import { glossaryGroups } from "@/data/glossary";
import { newsletters, podcasts } from "@/data/news";
import { promptGroups } from "@/data/prompts";

import { ArrowUpRight } from "./icons";

const count = (groups: { length: number }[]) => groups.reduce((n, g) => n + g.length, 0);

const pages = [
  { href: "/start", title: "Start here", body: "A 30-day path. Four weeks, one real project each." },
  { href: "/learn", title: "Learn", body: `The best talks and ${count(courseGroups.map((g) => g.courses))} free YouTube courses, from beginner to builder.` },
  { href: "/follow", title: "Who to follow", body: "LinkedIn, X, YouTube, Instagram, and Reddit, verified." },
  { href: "/stay-current", title: "Stay current", body: `${newsletters.length} newsletters and ${podcasts.length} podcasts, sorted by depth.` },
  { href: "/prompts", title: "Prompts", body: `A simple template and ${count(promptGroups.map((g) => g.prompts))} starter prompts you can copy.` },
  { href: "/stacks", title: "Stacks by role", body: "Which tools to start with for your job." },
  { href: "/glossary", title: "Glossary", body: `${count(glossaryGroups.map((g) => g.terms))} AI terms in plain English.` },
];

export function HomeGuide() {
  return (
    <div className="border-t border-dark-border">
      <div className="mx-auto max-w-shell space-y-20 px-6 py-20 md:py-28">
        <section id="guide" aria-labelledby="guide-h" className="scroll-mt-24">
          <p className="eyebrow text-dusk">Beyond the tools</p>
          <h2
            id="guide-h"
            className="mt-3 font-serif text-[30px] tracking-[-0.015em] text-bone md:text-[40px]"
          >
            Learn AI, step by step.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex flex-col justify-between rounded border border-dark-border bg-panel p-6 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-amethyst/60 hover:bg-panel-hover"
              >
                <p className="font-serif text-[20px] tracking-[-0.01em] text-bone">{p.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-soft-white/70">{p.body}</p>
                <span className="mt-6 text-[11px] font-medium tracking-[0.06em] text-stone transition-colors group-hover:text-amethyst">
                  Open →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="templates" aria-label="n8n templates" className="scroll-mt-24">
          <a
            href={N8N_CREATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-6 rounded border border-dark-border border-l-2 border-l-amethyst bg-panel p-8 transition-colors hover:border-amethyst/60 hover:bg-panel-hover md:flex-row md:items-center md:justify-between md:p-10"
          >
            <div>
              <p className="eyebrow text-dusk">Build with my templates</p>
              <p className="mt-3 max-w-2xl font-serif text-[26px] leading-tight tracking-[-0.015em] text-bone md:text-[32px]">
                My n8n automations. Import, plug in your keys, run.
              </p>
              <p className="mt-2 max-w-xl text-[14.5px] text-stone">
                Free workflows on the official n8n creator hub.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-soft-white transition-colors group-hover:text-amethyst">
              View on n8n
              <ArrowUpRight className="text-stone transition-colors group-hover:text-amethyst" />
            </span>
          </a>
        </section>
      </div>
    </div>
  );
}
