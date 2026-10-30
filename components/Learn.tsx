import { videoTracks, peopleGroups, N8N_CREATOR_URL } from "@/data/learn";
import { ArrowUpRight } from "./icons";

function SectionHead({
  id,
  eyebrow,
  title,
  blurb,
}: {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <div className="border-b border-dark-border pb-4">
      <p className="eyebrow text-dusk">{eyebrow}</p>
      <h2
        id={`${id}-h`}
        className="mt-3 font-serif text-[30px] tracking-[-0.015em] text-bone md:text-[40px]"
      >
        {title}
      </h2>
      <p className="mt-1.5 max-w-xl text-[14px] text-stone">{blurb}</p>
    </div>
  );
}

export function Learn() {
  return (
    <div className="border-t border-dark-border">
      <div className="mx-auto max-w-shell space-y-24 px-6 py-20 md:py-28">
        {/* ── n8n templates ─────────────────────────────────────── */}
        <section id="templates" aria-label="n8n templates" className="scroll-mt-24">
          <a
            href={N8N_CREATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-6 rounded border border-dark-border border-l-2 border-l-amethyst bg-panel p-8 transition-colors hover:border-amethyst/60 hover:bg-panel-hover md:flex-row md:items-center md:justify-between md:p-10"
          >
            <div>
              <p className="eyebrow text-dusk">Build with my templates</p>
              <p className="mt-3 max-w-2xl font-serif text-[26px] leading-tight tracking-[-0.015em] text-bone md:text-[32px]">
                My n8n automations. Import, plug in your keys, run.
              </p>
              <p className="mt-2 max-w-xl text-[14.5px] text-stone">
                The workflows I build for clients, published on the official n8n
                creator hub.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-soft-white transition-colors group-hover:text-amethyst">
              View on n8n
              <ArrowUpRight className="text-stone transition-colors group-hover:text-amethyst" />
            </span>
          </a>
        </section>

        {/* ── Videos ─────────────────────────────────────────────── */}
        <section id="learn" aria-labelledby="learn-h" className="scroll-mt-24">
          <SectionHead
            id="learn"
            eyebrow="Learn AI"
            title="Watch these to understand how it all works."
            blurb="From what an LLM is to how ChatGPT is trained. In the order I would watch them."
          />
          <div className="mt-10 space-y-14">
            {videoTracks.map((track, ti) => (
              <div key={track.id}>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[18px] text-amethyst">
                    0{ti + 1}
                  </span>
                  <h3 className="font-serif text-[22px] tracking-[-0.01em] text-bone">
                    {track.label}
                  </h3>
                  <span className="hidden text-[13px] text-stone sm:inline">
                    {track.blurb}
                  </span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {track.videos.map((v) => (
                    <a
                      key={v.title}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col justify-between rounded border border-dark-border bg-panel p-6 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-amethyst/60 hover:bg-panel-hover"
                    >
                      <div>
                        <p className="text-[11px] tracking-[0.06em] text-stone">
                          {v.by}
                        </p>
                        <p className="mt-2 font-serif text-[19px] leading-tight tracking-[-0.01em] text-bone">
                          {v.title}
                        </p>
                        <p className="mt-2.5 text-[14px] leading-relaxed text-soft-white/70">
                          {v.why}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between gap-3">
                        <span className="text-[11px] lowercase tracking-[0.06em] text-stone">
                          {v.length}
                        </span>
                        <span className="text-[11px] font-medium tracking-[0.06em] text-stone transition-colors group-hover:text-amethyst">
                          Watch →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── People ─────────────────────────────────────────────── */}
        <section id="follow" aria-labelledby="follow-h" className="scroll-mt-24">
          <SectionHead
            id="follow"
            eyebrow="Who to follow"
            title="The people worth your feed."
            blurb="Builders, practitioners, and the fastest signal on what just shipped."
          />
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {peopleGroups.map((g) => (
              <div key={g.id}>
                <p className="eyebrow mb-4 text-stone">{g.label}</p>
                <ul className="divide-y divide-dark-border border-y border-dark-border">
                  {g.people.map((p) => (
                    <li key={p.name}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block py-3.5"
                      >
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="font-serif text-[17px] text-bone transition-colors group-hover:text-amethyst">
                            {p.name}
                          </span>
                          <span className="shrink-0 text-[11px] tracking-[0.04em] text-stone">
                            {p.handle}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[13.5px] leading-snug text-stone">
                          {p.role}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
