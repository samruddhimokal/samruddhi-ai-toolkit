import type { Metadata } from "next";
import { platforms } from "@/data/follow";
import { PageHeader, PageBody, JumpNav, Section, NextStep } from "@/components/ui";

export const metadata: Metadata = {
  title: "Who to follow for AI: LinkedIn, X, YouTube, Instagram, Reddit",
  description:
    "Verified AI educators, researchers, and communities to follow on LinkedIn, X, YouTube, Instagram, and Reddit.",
};

export default function FollowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who to follow"
        title="The people worth your feed."
        blurb="Pick the platform you already use. Every account here was checked against an official source: the person's own website, their YouTube channel, or their newsletter. Notes flag anyone who sells their own tool or course."
      >
        <JumpNav items={platforms.map((p) => ({ id: p.id, label: p.label }))} />
      </PageHeader>

      <PageBody>
        {platforms.map((p) => (
          <Section key={p.id} id={p.id} title={p.label} blurb={p.blurb}>
            <p className="mb-8 max-w-2xl rounded border border-dark-border bg-panel px-4 py-3 text-[13.5px] text-soft-white/75">
              <span className="text-dusk">Tip. </span>
              {p.tip}
            </p>
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {p.groups.map((g) => (
                <div key={g.label}>
                  <p className="eyebrow mb-4 text-stone">{g.label}</p>
                  <ul className="divide-y divide-dark-border border-y border-dark-border">
                    {g.accounts.map((a) => (
                      <li key={a.url}>
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block py-3.5"
                        >
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="font-serif text-[17px] text-bone transition-colors group-hover:text-amethyst">
                              {a.name}
                            </span>
                            <span className="shrink-0 text-[11px] tracking-[0.04em] text-stone">
                              {a.size ? `${a.size} subs` : a.handle}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-[13.5px] leading-snug text-stone">{a.why}</span>
                          {a.note && (
                            <span className="mt-1 block text-[12px] leading-snug text-dusk/90">{a.note}</span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        ))}

        <NextStep href="/stay-current" label="Newsletters and podcasts" />
      </PageBody>
    </>
  );
}
