import { ArrowUpRight } from "./icons";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samruddhi-mokal/" },
  { label: "X / Twitter", href: "https://x.com/samruddhi_mokal" },
  { label: "pacelabz.com", href: "https://www.pacelabz.com/" },
];

export function Footer() {
  return (
    <footer className="border-t border-dark-border">
      <div className="mx-auto max-w-shell px-6 py-20 md:py-28">
        <p className="eyebrow text-dusk">The go-to AI resource</p>
        <h2 className="mt-6 max-w-3xl font-serif text-[30px] font-normal leading-[1.14] tracking-[-0.02em] text-bone sm:text-[44px]">
          That is the toolkit. Curated by someone who actually uses it.
        </h2>

        <div className="mt-16 grid gap-10 border-t border-dark-border pt-10 md:grid-cols-2">
          <div>
            <p className="font-serif text-[22px] tracking-[-0.01em] text-bone">
              Samruddhi Mokal
            </p>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-stone">
              3x founder. Best AI Trainer Award 2025. Featured in CEO Times and
              Leaders Magazine. Founder of Pace Labz.
            </p>
          </div>

          <div className="md:justify-self-end">
            <p className="eyebrow mb-4 text-dusk">Reach me</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[15px] text-soft-white transition-colors hover:text-bone"
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
