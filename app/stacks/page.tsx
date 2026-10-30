import type { Metadata } from "next";
import { coreStack, roleStacks, type StackLayer } from "@/data/stacks";
import { tools } from "@/data/tools";
import { PageHeader, PageBody, JumpNav, Section, NextStep } from "@/components/ui";

export const metadata: Metadata = {
  title: "AI stacks by role: founder, sales, marketing, ops, HR, finance",
  description:
    "Which AI tools to start with for your job. A core stack for everyone, then the extra layer for each role.",
};

const urlFor = (name: string) => tools.find((t) => t.name === name)?.url ?? "/";

function Layers({ layers }: { layers: StackLayer[] }) {
  return (
    <dl className="divide-y divide-dark-border border-y border-dark-border">
      {layers.map((l) => (
        <div key={l.job} className="grid gap-2 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
          <dt className="text-[14.5px] text-soft-white/85">{l.job}</dt>
          <dd className="flex flex-wrap gap-2">
            {l.tools.map((name) => (
              <a
                key={name}
                href={urlFor(name)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-dark-border px-2.5 py-1 text-[13px] text-bone transition-colors hover:border-amethyst/60 hover:text-amethyst"
              >
                {name}
              </a>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function StacksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stacks by role"
        title="Which tools to start with for your job."
        blurb="Start with the core stack. Then add your role's layer, one tool at a time. Tools are examples, not requirements: the job each one does matters more than the brand."
      >
        <JumpNav
          items={[{ id: "core", label: "Everyone" }, ...roleStacks.map((r) => ({ id: r.id, label: r.label }))]}
        />
      </PageHeader>
      <PageBody>
        <Section id="core" title="The core stack" blurb="What everyone needs, whatever the role.">
          <Layers layers={coreStack} />
        </Section>
        {roleStacks.map((r) => (
          <Section key={r.id} id={r.id} title={r.label} blurb={r.blurb}>
            <Layers layers={r.layers} />
            <div className="mt-6 rounded border border-dark-border border-l-2 border-l-amethyst bg-panel p-5">
              <p className="eyebrow text-dusk">Your first win</p>
              <p className="mt-2 text-[15px] leading-relaxed text-bone">{r.firstWin}</p>
            </div>
          </Section>
        ))}
        <NextStep href="/glossary" label="Learn the language" />
      </PageBody>
    </>
  );
}
