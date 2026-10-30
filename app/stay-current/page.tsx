import type { Metadata } from "next";
import { newsletters, podcasts, type Source } from "@/data/news";
import { PageHeader, PageBody, JumpNav, Section, LinkCard, CardGrid, NextStep } from "@/components/ui";

export const metadata: Metadata = {
  title: "Stay current: the best AI newsletters and podcasts",
  description: "12 AI newsletters and 12 AI podcasts, sorted from beginner-friendly to technical. All free.",
};

function Shelf({ items, cta }: { items: Source[]; cta: string }) {
  return (
    <CardGrid>
      {items.map((s) => (
        <LinkCard
          key={s.name}
          href={s.url}
          eyebrow={`${s.by} · ${s.depth}`}
          title={s.name}
          body={s.why}
          note={s.note}
          meta={s.cadence}
          cta={cta}
        />
      ))}
    </CardGrid>
  );
}

export default function StayCurrentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stay current"
        title="Keep up without drowning."
        blurb="Pick one daily newsletter for headlines and one weekly read for depth. Add one podcast for your commute. That is enough. Sorted from beginner-friendly to technical, and all free to read or listen."
      >
        <JumpNav
          items={[
            { id: "newsletters", label: "Newsletters" },
            { id: "podcasts", label: "Podcasts" },
          ]}
        />
      </PageHeader>
      <PageBody>
        <Section id="newsletters" title="Newsletters" count={newsletters.length}>
          <Shelf items={newsletters} cta="Subscribe →" />
        </Section>
        <Section id="podcasts" title="Podcasts" count={podcasts.length}>
          <Shelf items={podcasts} cta="Listen →" />
        </Section>
        <NextStep href="/prompts" label="Get better answers with prompts" />
      </PageBody>
    </>
  );
}
