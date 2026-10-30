import type { Metadata } from "next";
import { videoTracks, courseGroups } from "@/data/learn";
import { PageHeader, PageBody, JumpNav, Section, LinkCard, CardGrid, NextStep } from "@/components/ui";

export const metadata: Metadata = {
  title: "Learn AI: the best videos and free YouTube courses",
  description:
    "The talks that explain how AI and LLMs work, plus 20 free courses on YouTube from Anthropic, OpenAI, Google, Microsoft, Stanford, MIT, and more.",
};

const courseCount = courseGroups.reduce((n, g) => n + g.courses.length, 0);

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Understand how AI works. For free."
        blurb={`Start with the talks, then pick a course. All ${courseCount} courses are free on YouTube, from the official channels. No sign-up, no paywall.`}
      >
        <JumpNav
          items={[
            { id: "videos", label: "Watch first" },
            ...courseGroups.map((g) => ({ id: g.id, label: g.label })),
          ]}
        />
      </PageHeader>

      <PageBody>
        <Section
          id="videos"
          title="Watch these first"
          blurb="Single talks, in the order I would watch them."
        >
          <div className="space-y-14">
            {videoTracks.map((track, ti) => (
              <div key={track.id} id={track.id} className="scroll-mt-24">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[18px] text-amethyst">0{ti + 1}</span>
                  <h3 className="font-serif text-[22px] tracking-[-0.01em] text-bone">{track.label}</h3>
                  <span className="hidden text-[13px] text-stone sm:inline">{track.blurb}</span>
                </div>
                <div className="mt-5">
                  <CardGrid>
                    {track.videos.map((v) => (
                      <LinkCard
                        key={v.url}
                        href={v.url}
                        eyebrow={v.by}
                        title={v.title}
                        body={v.why}
                        meta={v.length}
                        cta="Watch →"
                      />
                    ))}
                  </CardGrid>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {courseGroups.map((g) => (
          <Section key={g.id} id={g.id} title={g.label} blurb={g.blurb} count={g.courses.length}>
            <CardGrid>
              {g.courses.map((c) => (
                <LinkCard
                  key={c.url}
                  href={c.url}
                  eyebrow={`${c.by} · ${c.level}`}
                  title={c.title}
                  body={c.why}
                  note={c.note}
                  meta={c.size}
                  cta="Start →"
                />
              ))}
            </CardGrid>
          </Section>
        ))}

        <NextStep href="/follow" label="Find people worth following" />
      </PageBody>
    </>
  );
}
