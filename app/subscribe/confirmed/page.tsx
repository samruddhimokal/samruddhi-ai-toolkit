import type { Metadata } from "next";
import { PageHeader, PageBody, CardGrid, LinkCard } from "@/components/ui";

// Kit redirects here after someone clicks the confirm button in the double opt-in email.
export const metadata: Metadata = {
  title: "You're in",
  robots: { index: false },
};

export default function ConfirmedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Email confirmed"
        title="You're in. Thank you."
        blurb="Samruddhi here. I spend a lot of my time testing new AI tools, watching the videos, and tracking what actually changed. From now on, you get the short list: what's worth your time, and what you can skip. Free, always."
      />
      <PageBody>
        <section className="max-w-2xl space-y-4 text-[16px] leading-relaxed text-soft-white/85">
          <p className="font-serif text-[24px] tracking-[-0.015em] text-bone">One ask before you go.</p>
          <p>
            Reply to my email and tell me one thing you want AI to do for you right now. I read every
            reply, and it shapes what I send next.
          </p>
          <p className="text-stone">Samruddhi Mokal · Founder, Pace Labz</p>
        </section>

        <section>
          <p className="eyebrow mb-6 text-dusk">While you wait</p>
          <CardGrid>
            <LinkCard
              href="/start"
              eyebrow="30 days"
              title="Start here: learn AI in 30 days"
              body="Four weeks, 30 to 45 minutes a day. Each week ends with something real you can use at work."
              cta="Start →"
            />
            <LinkCard
              href="/"
              eyebrow="The toolkit"
              title="Browse the tools I use"
              body="Every tool I recommend to the teams and leaders I train, sorted by what you need done."
              cta="Browse →"
            />
            <LinkCard
              href="https://www.linkedin.com/in/samruddhi-mokal/"
              eyebrow="LinkedIn"
              title="Follow me between emails"
              body="Where I share what I see in the training room, as it happens."
              cta="Follow →"
            />
          </CardGrid>
        </section>
      </PageBody>
    </>
  );
}
