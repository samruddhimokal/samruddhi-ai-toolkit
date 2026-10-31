"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const guidePages = [
  { href: "/", label: "Tools" },
  { href: "/start", label: "Start here" },
  { href: "/learn", label: "Learn" },
  { href: "/follow", label: "Who to follow" },
  { href: "/stay-current", label: "Stay current" },
  { href: "/prompts", label: "Prompts" },
  { href: "/build-your-ai-team", label: "Build Your AI Team" },
  { href: "/stacks", label: "Stacks by role" },
  { href: "/glossary", label: "Glossary" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <div className="border-b border-dark-border bg-obsidian">
      <div className="mx-auto flex h-12 max-w-shell items-center gap-6 px-6">
        <Link
          href="/"
          className="shrink-0 font-serif text-[16px] tracking-[-0.01em] text-bone"
        >
          The AI Toolkit
        </Link>
        <nav
          aria-label="Guide"
          className="no-scrollbar -mr-6 flex flex-1 items-center gap-5 overflow-x-auto pr-6 md:justify-end"
        >
          {guidePages.map((p) => {
            const active = p.href === "/" ? pathname === "/" : pathname.startsWith(p.href);
            return (
              <Link
                key={p.href}
                href={p.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap text-[12.5px] transition-colors ${
                  active ? "text-bone" : "text-stone hover:text-soft-white"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
          <Link
            href="/subscribe"
            className="shrink-0 whitespace-nowrap rounded border border-amethyst/60 px-2.5 py-1 text-[12px] text-dusk transition-colors hover:border-amethyst hover:text-bone"
          >
            Subscribe
          </Link>
        </nav>
      </div>
    </div>
  );
}
