import { ArrowUpRight } from "./icons";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samruddhi-mokal/" },
  { label: "X / Twitter", href: "https://x.com/samruddhi_mokal" },
  { label: "pacelabz.com", href: "https://www.pacelabz.com/" },
];

export function Footer() {
  return (
    <footer className="bg-obsidian text-soft-white">
      <div className="mx-auto max-w-shell px-6 py-20 md:py-28">
        {/* Closing statement + CTA */}
        <p className="eyebrow text-dusk">The go-to AI resource</p>
        <h2 className="mt-6 font-serif text-bone font-normal leading-[1.12] tracking-[-0.02em] text-[30px] sm:text-[42px] max-w-3xl">
          Your team. 10x faster. With AI. This is the toolkit. The training is the
          rest.
        </h2>

        <a
          href="https://www.pacelabz.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2 rounded bg-bone px-6 py-3 text-obsidian text-[15px] transition-opacity hover:opacity-90"
        >
          Schedule the diagnostic
          <ArrowUpRight className="text-amethyst transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Divider */}
        <div className="mt-16 pt-10 border-t border-dark-border grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-serif text-bone text-[22px] tracking-[-0.01em]">
              Curated by Samruddhi Mokal
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-stone max-w-md">
              3x founder. Best AI Trainer Award 2025. Featured in CEO Times and
              Leaders Magazine. Founder of Pace Labz.
            </p>
          </div>

          <div className="md:justify-self-end">
            <p className="eyebrow text-dusk mb-4">Reach me</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[15px] text-soft-white hover:text-bone transition-colors"
                  >
                    {s.label}
                    <ArrowUpRight className="text-stone transition-colors group-hover:text-amethyst" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 text-[12px] text-stone">
          Building a future where AI empowers human freedom.
        </p>
      </div>
    </footer>
  );
}
