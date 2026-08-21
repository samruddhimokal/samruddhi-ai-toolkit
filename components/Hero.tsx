import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { StarIcon } from "./icons";

export function Hero() {
  const toolCount = tools.length;
  const categoryCount = categories.length;
  const favoriteCount = tools.filter((t) => t.favorite).length;

  return (
    <header className="border-b border-light-border">
      <div className="mx-auto max-w-shell px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <p className="eyebrow text-dusk">Samruddhi Mokal · Pace Labz</p>

        <h1 className="mt-6 font-serif text-obsidian font-normal leading-[1.08] tracking-[-0.02em] text-[38px] sm:text-[52px] md:text-[64px] max-w-4xl">
          The AI toolkit I train{" "}
          <em className="italic text-amethyst">orchestrators</em>{" "}
          with.
        </h1>

        <p className="mt-7 max-w-2xl text-[17px] leading-[1.7] text-stone">
          Every tool here earns its place. These are the ones I actually use to
          build real systems, and the ones I put in front of the teams I train.
          Not a list I scraped. A list I run.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="eyebrow text-obsidian">3x Founder</span>
          <span className="hidden sm:inline h-3 w-px bg-light-border" aria-hidden="true" />
          <span className="eyebrow text-obsidian">Best AI Trainer Award 2025</span>
          <span className="hidden sm:inline h-3 w-px bg-light-border" aria-hidden="true" />
          <span className="eyebrow text-obsidian">Featured in CEO Times &amp; Leaders Magazine</span>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-stone">
          <span className="font-serif text-obsidian text-[22px]">
            {toolCount} tools
          </span>
          <span className="text-light-border" aria-hidden="true">
            /
          </span>
          <span className="font-serif text-obsidian text-[22px]">
            {categoryCount} categories
          </span>
          <span className="ml-auto flex items-center gap-2 text-[13px]">
            <span className="inline-flex items-center gap-1 text-amethyst">
              <StarIcon />
              <span className="eyebrow text-amethyst tracking-[0.12em]">I use this</span>
            </span>
            <span className="text-stone/80">
              marks the {favoriteCount} I personally rely on
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
