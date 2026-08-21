import type { Tool } from "@/lib/types";
import { ArrowUpRight, StarIcon } from "./icons";

function prettyDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const domain = prettyDomain(tool.url);

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
      style={{ transitionDelay: `${Math.min(index, 8) * 40}ms` }}
      className={`group relative flex h-full flex-col justify-between rounded border border-dark-border bg-panel p-5 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-amethyst/60 hover:bg-panel-hover ${
        tool.favorite ? "border-l-2 border-l-amethyst" : ""
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[19px] leading-tight tracking-[-0.01em] text-soft-white transition-colors duration-300 group-hover:text-bone">
            {tool.name}
          </h3>
          <ArrowUpRight className="mt-1 shrink-0 text-stone transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amethyst" />
        </div>
        <p className="mt-2 text-[14px] leading-snug text-stone transition-colors duration-300 group-hover:text-soft-white/80">
          {tool.blurb}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="text-[11px] lowercase tracking-[0.06em] text-stone/70">
          {domain}
        </span>
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
    </a>
  );
}
