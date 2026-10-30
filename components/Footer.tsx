import { ArrowUpRight } from "./icons";
import { N8N_CREATOR_URL } from "@/data/learn";
import { SubscribeForm } from "./Subscribe";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samruddhi-mokal/" },
  { label: "X / Twitter", href: "https://x.com/samruddhi_mokal" },
  { label: "n8n templates", href: N8N_CREATOR_URL },
  { label: "pacelabz.com", href: "https://www.pacelabz.com/" },
];

const press = [
  {
    label: "Best Practical AI Training 2025",
    href: "https://evergreenawards.com/awards/pace-labz-best-practical-ai-training-for-business-leaders-in-the-u-s-of-2025",
  },
  {
    label: "CEO Times",
    href: "https://ceotimes.com/why-brilliant-professionals-are-getting-left-behind-by-ai-and-one-founders-mission-to-change-that/",
  },
  {
    label: "Leadr Magazine",
    href: "https://leadrmagazine.com/empowering-professionals-with-ai-how-samruddhi-mokal-is-turning-overwhelming-technology-into-business-power/",
  },
];

function LinkRow({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-[15px] text-soft-white transition-colors hover:text-bone"
    >
      {label}
      <ArrowUpRight className="text-stone transition-colors group-hover:text-amethyst" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-dark-border">
      <div className="mx-auto max-w-shell px-6 py-20 md:py-28">
        <p className="eyebrow text-dusk">The monthly update</p>
        <h2 className="mt-6 max-w-3xl font-serif text-[30px] font-normal leading-[1.14] tracking-[-0.02em] text-bone sm:text-[44px]">
          Keep up without the noise.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-stone">
          Once a month: the tools worth adding, the best new videos, and what
          actually changed in AI.
        </p>
        <div className="mt-8">
          <SubscribeForm compact />
        </div>

        <div className="mt-16 grid gap-10 border-t border-dark-border pt-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-[22px] tracking-[-0.01em] text-bone">
              Samruddhi Mokal
            </p>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-stone">
              I train teams and leaders to use AI like orchestrators. Founder of
              Pace Labz.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4 text-dusk">Recognition</p>
            <ul className="space-y-2">
              {press.map((p) => (
                <li key={p.label}>
                  <LinkRow label={p.label} href={p.href} />
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end">
            <p className="eyebrow mb-4 text-dusk">Reach me</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <LinkRow label={s.label} href={s.href} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-dark-border pt-8">
          <span className="font-serif text-[18px] tracking-[-0.01em]">
            <span className="text-bone">Pace</span>
            <span className="text-amethyst"> Labz</span>
          </span>
          <p className="text-[12px] text-stone">
            Building a future where AI empowers human freedom.
          </p>
        </div>
      </div>
    </footer>
  );
}
