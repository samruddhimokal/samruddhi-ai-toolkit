import type { Tool } from "@/lib/types";
import { ArrowUpRight, StarIcon } from "./icons";

function prettyDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ToolCard({ tool }: { tool: Tool }) {
  const domain = prettyDomain(tool.url);

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col justify-between h-full bg-bone border border-light-border rounded p-5 transition-colors duration-200 hover:border-obsidian ${
        tool.favorite ? "border-l-2 border-l-amethyst" : ""
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-obsidian text-[19px] leading-tight tracking-[-0.01em]">
            {tool.name}
          </h3>
          <ArrowUpRight className="shrink-0 mt-1 text-light-border transition-colors duration-200 group-hover:text-amethyst" />
        </div>
        <p className="mt-2 text-[14px] leading-snug text-stone">{tool.blurb}</p>
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className="eyebrow text-stone/70 tracking-[0.08em] normal-case lowercase">
          {domain}
        </span>
        {tool.favorite && (
          <span className="inline-flex items-center gap-1 text-amethyst">
            <StarIcon />
            <span className="eyebrow text-amethyst tracking-[0.12em]">I use this</span>
          </span>
        )}
        {tool.added && (
          <span className="eyebrow text-dusk tracking-[0.12em]">Added</span>
        )}
      </div>
    </a>
  );
}
