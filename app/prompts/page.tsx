import type { Metadata } from "next";
import { promptTemplate, promptGroups, promptGuides } from "@/data/prompts";
import { PageHeader, PageBody, JumpNav, Section, LinkCard, CardGrid, NextStep } from "@/components/ui";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Prompt starter pack: a template and 15 prompts for work",
  description:
    "A simple 8-part prompt template that works in ChatGPT, Claude, Gemini, and Copilot, plus 15 copy-ready prompts for common work tasks.",
};

const templateText = promptTemplate.map((p) => `${p.part}: ${p.example}`).join("\n");
const promptCount = promptGroups.reduce((n, g) => n + g.prompts.length, 0);

export default function PromptsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prompts"
        title="Better answers start with better asks."
        blurb={`One template and ${promptCount} starter prompts for the tasks people use AI for most: editing, summarizing, and researching. They work in ChatGPT, Claude, Gemini, and Copilot. Fill in the [brackets], then keep the ones that work.`}
      >
        <JumpNav
          items={[
            { id: "template", label: "The template" },
            ...promptGroups.map((g) => ({ id: g.label.toLowerCase().replace(/[^a-z]+/g, "-"), label: g.label })),
            { id: "guides", label: "Official guides" },
          ]}
        />
      </PageHeader>

      <PageBody>
        <Section
          id="template"
          title="The 8-part template"
          blurb="You rarely need all eight. Task and context alone fix most bad answers."
        >
          <div className="overflow-hidden rounded border border-dark-border">
            <div className="flex items-center justify-between border-b border-dark-border bg-panel px-5 py-3">
              <span className="eyebrow text-stone">Template</span>
              <CopyButton text={templateText} label="Copy example" />
            </div>
            <dl className="divide-y divide-dark-border">
              {promptTemplate.map((p, i) => (
                <div key={p.part} className="grid gap-1 px-5 py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <dt className="font-serif text-[17px] text-bone">
                    <span className="mr-2 text-amethyst">{i + 1}</span>
                    {p.part}
                  </dt>
                  <dd>
                    <p className="text-[14px] text-stone">{p.ask}</p>
                    <p className="mt-1 text-[14.5px] text-soft-white/85">{p.example}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {promptGroups.map((g) => (
          <Section
            key={g.label}
            id={g.label.toLowerCase().replace(/[^a-z]+/g, "-")}
            title={g.label}
            count={g.prompts.length}
          >
            <div className="grid gap-4 lg:grid-cols-2">
              {g.prompts.map((p) => (
                <article
                  key={p.id}
                  id={p.id}
                  className="flex scroll-mt-24 flex-col rounded border border-dark-border bg-panel"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-dark-border px-5 py-3.5">
                    <div>
                      <p className="text-[11px] tracking-[0.06em] text-stone">{p.task}</p>
                      <h3 className="font-serif text-[18px] tracking-[-0.01em] text-bone">{p.title}</h3>
                    </div>
                    <CopyButton text={p.prompt} />
                  </div>
                  <pre className="flex-1 whitespace-pre-wrap px-5 py-4 font-sans text-[13.5px] leading-relaxed text-soft-white/80">
                    {p.prompt}
                  </pre>
                </article>
              ))}
            </div>
          </Section>
        ))}

        <Section id="guides" title="Official prompting guides" blurb="Straight from the companies that make the models.">
          <CardGrid>
            {promptGuides.map((g) => (
              <LinkCard key={g.url} href={g.url} eyebrow={g.by} title={g.name} body={g.why} cta="Read →" />
            ))}
          </CardGrid>
        </Section>

        <NextStep href="/stacks" label="Find the tools for your role" />
      </PageBody>
    </>
  );
}
