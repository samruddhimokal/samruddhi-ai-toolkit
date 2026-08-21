import type { Tool } from "@/lib/types";
import { toolDetails } from "@/data/toolDetails";
import { StarIcon } from "./icons";

function prettyDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ToolCard({
  tool,
  index = 0,
  onOpen,
}: {
  tool: Tool;
  index?: number;
  onOpen: (tool: Tool) => void;
}) {
  const domain = prettyDomain(tool.url);
  const pricing = toolDetails[tool.name]?.pricing;

  return (
    <button
      type="button"
      onClick={() => onOpen(tool)}
      data-reveal
      style={{ transitionDelay: `${Math.min(index, 8) * 40}ms` }}
      className={`group relative flex h-full flex-col justify-between rounded border border-dark-border bg-panel p-6 text-left transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-amethyst/60 hover:bg-panel-hover ${
        tool.favorite ? "border-l-2 border-l-amethyst" : ""
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[20px] leading-tight tracking-[-0.01em] text-bone">
            {tool.name}
          </h3>
          {tool.favorite && (
            <StarIcon className="mt-1 shrink-0 text-amethyst" />
          )}
        </div>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-soft-white/70">
          {tool.blurb}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <span className="truncate text-[11px] lowercase tracking-[0.06em] text-stone">
            {domain}
          </span>
          {tool.added && (
            <span className="eyebrow tracking-[0.12em] text-dusk">Added</span>
          )}
        </div>
        <span className="shrink-0 whitespace-nowrap text-[11px] font-medium tracking-[0.06em] text-stone transition-colors duration-300 group-hover:text-amethyst">
          Details →
        </span>
      </div>
    </button>
  );
}
