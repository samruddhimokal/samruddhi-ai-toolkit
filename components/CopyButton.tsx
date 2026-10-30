"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked: the text is still selectable */
        }
      }}
      className={`shrink-0 rounded border px-2.5 py-1 text-[11.5px] tracking-[0.04em] transition-colors ${
        copied
          ? "border-amethyst text-amethyst"
          : "border-dark-border text-stone hover:border-amethyst/60 hover:text-bone"
      }`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
