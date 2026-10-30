import type { Metadata } from "next";
import { glossaryGroups, glossaryRefs } from "@/data/glossary";
import { PageHeader, PageBody, NextStep } from "@/components/ui";
import { GlossaryList } from "@/components/GlossaryList";

const termCount = glossaryGroups.reduce((n, g) => n + g.terms.length, 0);

export const metadata: Metadata = {
  title: "AI glossary: terms explained in plain English",
  description: `${termCount} AI terms explained simply: tokens, context windows, RAG, agents, MCP, hallucinations, and more.`,
};

export default function GlossaryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Glossary"
        title="AI terms, in plain English."
        blurb={`${termCount} terms you will hear every week, explained in a sentence or two.`}
      >
        <p className="mt-4 text-[13.5px] text-stone">
          Want the formal versions? See the{" "}
          {glossaryRefs.map((r, i) => (
            <span key={r.url}>
              {i > 0 && " and the "}
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-dusk underline-offset-4 hover:underline">
                {r.name}
              </a>
            </span>
          ))}
          .
        </p>
      </PageHeader>
      <PageBody>
        <GlossaryList />
        <NextStep href="/start" label="Put it into practice: the 30-day path" />
      </PageBody>
    </>
  );
}
