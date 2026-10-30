import Link from "next/link";
import { ArrowUpRight } from "./icons";

// Shared building blocks for the guide pages.

export function PageHeader({
  eyebrow,
  title,
  blurb,
  children,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-dark-border">
      <div className="mx-auto max-w-shell px-6 pb-12 pt-16 md:pb-16 md:pt-20">
        <p className="eyebrow text-dusk">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-serif text-[38px] font-normal leading-[1.08] tracking-[-0.02em] text-bone sm:text-[52px]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-stone">{blurb}</p>
        {children}
      </div>
    </header>
  );
}

/** Anchor chips that jump to sections on the same page (shareable via #hash). */
export function JumpNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className="rounded border border-dark-border px-3 py-1.5 text-[13px] text-soft-white/80 transition-colors hover:border-amethyst/60 hover:text-bone"
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}

export function Section({
  id,
  title,
  blurb,
  count,
  children,
}: {
  id: string;
  title: string;
  blurb?: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <div className="flex items-baseline justify-between gap-4 border-b border-dark-border pb-4">
        <div>
          <h2
            id={`${id}-h`}
            className="font-serif text-[26px] tracking-[-0.015em] text-bone md:text-[32px]"
          >
            {title}
          </h2>
          {blurb && <p className="mt-1.5 max-w-xl text-[14px] text-stone">{blurb}</p>}
        </div>
        {count !== undefined && (
          <span className="shrink-0 eyebrow tracking-[0.14em] text-dusk">{count}</span>
        )}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function PageBody({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-shell space-y-20 px-6 py-14 md:py-20">{children}</main>;
}

/** External link card in the directory's card style. */
export function LinkCard({
  href,
  eyebrow,
  title,
  body,
  meta,
  note,
  cta = "Open →",
}: {
  href: string;
  eyebrow?: string;
  title: string;
  body: string;
  meta?: string;
  note?: string;
  cta?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex h-full flex-col justify-between rounded border border-dark-border bg-panel p-6 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-amethyst/60 hover:bg-panel-hover"
    >
      <div>
        {eyebrow && <p className="text-[11px] tracking-[0.06em] text-stone">{eyebrow}</p>}
        <p className="mt-2 font-serif text-[19px] leading-tight tracking-[-0.01em] text-bone">
          {title}
        </p>
        <p className="mt-2.5 text-[14px] leading-relaxed text-soft-white/70">{body}</p>
        {note && <p className="mt-2 text-[12.5px] leading-snug text-dusk/90">{note}</p>}
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-[11px] lowercase tracking-[0.06em] text-stone">{meta}</span>
        <span className="shrink-0 text-[11px] font-medium tracking-[0.06em] text-stone transition-colors group-hover:text-amethyst">
          {cta}
        </span>
      </div>
    </a>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

/** "Next step" link at the bottom of a guide page. */
export function NextStep({ href, label }: { href: string; label: string }) {
  return (
    <div className="border-t border-dark-border pt-10">
      <p className="eyebrow text-stone">Next</p>
      <Link
        href={href}
        className="group mt-3 inline-flex items-center gap-2 font-serif text-[26px] tracking-[-0.015em] text-bone transition-colors hover:text-amethyst"
      >
        {label}
        <ArrowUpRight className="text-stone transition-colors group-hover:text-amethyst" />
      </Link>
    </div>
  );
}
