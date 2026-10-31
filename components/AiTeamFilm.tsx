"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";

// A one-minute animated explainer of Build Your AI Team. It plays like a
// muted video: autoplay on view, pause, jump to a chapter, replay. Everything
// is CSS animation inside a 16:9 stage sized in container units, so it scales
// from phone to desktop. Pausing freezes the animations and the clock.

const scenes = [
  { id: "problem", label: "The problem", secs: 7, caption: "Most teams do not have an AI problem. They have a buying problem." },
  { id: "tasks", label: "1 · Tasks", secs: 7, caption: "List the recurring tasks. Tag what each one needs. Count how often." },
  { id: "seats", label: "2 · Seats", secs: 7, caption: "Every task fills a seat. Each need gets one default tool." },
  { id: "data", label: "3 · Data", secs: 7, caption: "Check where your data can go. Fail the check, and you are out." },
  { id: "score", label: "4 · Score", secs: 7, caption: "Two gates, four scores, a total out of 12. Highest becomes the default." },
  { id: "seats-cost", label: "5 · Headcount", secs: 7, caption: "Paid seats only for people who use the tool every day." },
  { id: "review", label: "6 · Review", secs: 6, caption: "Twenty minutes every quarter. One word per tool." },
  { id: "page", label: "Your page", secs: 7, caption: "Six steps, about an hour. Now build yours." },
];

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Inline animation helper: name, delay in seconds, duration in seconds. */
const a = (name: string, delay: number, dur = 0.6): CSSProperties => ({
  animation: `${name} ${dur}s ${ease} ${delay}s both`,
});

export function AiTeamFilm() {
  const [scene, setScene] = useState(0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Autoplay the first time the film scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          setPlaying(true);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // The clock.
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setT((prev) => {
        const next = prev + 0.05;
        if (next < scenes[scene].secs) return next;
        if (scene < scenes.length - 1) {
          setScene(scene + 1);
          return 0;
        }
        setPlaying(false);
        setEnded(true);
        return scenes[scene].secs;
      });
    }, 50);
    return () => clearInterval(id);
  }, [playing, scene]);

  const jump = (i: number) => {
    setScene(i);
    setT(0);
    setEnded(false);
    setPlaying(true);
    setStarted(true);
  };

  const elapsed = scenes.slice(0, scene).reduce((n, s) => n + s.secs, 0) + t;
  const totalSecs = scenes.reduce((n, s) => n + s.secs, 0);
  const fmt = (s: number) => `0:${String(Math.floor(s)).padStart(2, "0")}`;
  const Scene = sceneViews[scene];

  return (
    <div ref={ref} className="overflow-hidden rounded border border-dark-border bg-[#070707]">
      <div
        className={`relative aspect-[4/5] w-full [container-type:inline-size] sm:aspect-video ${playing ? "" : "film-paused"}`}
        aria-label={`Animated explainer, scene: ${scenes[scene].label}. ${scenes[scene].caption}`}
        role="img"
      >
        {/* Soft brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 60% at 85% 100%, rgba(107,93,211,0.18), transparent 70%)" }}
        />
        <div key={`${scene}-${started}`} className="absolute inset-0 px-[5cqw] pb-[13cqw] pt-[5cqw] sm:pb-[9cqw]">
          {started ? <Scene t={t} /> : <Poster />}
        </div>

        {/* Caption */}
        {started && (
          <div className="absolute inset-x-0 bottom-0 px-[5cqw] pb-[3.4cqw]">
            <p
              key={`cap-${scene}`}
              className="font-serif text-[4.4cqw] leading-snug text-bone sm:text-[2.5cqw]"
              style={a("filmFadeUp", 0.2)}
            >
              {scenes[scene].caption}
            </p>
          </div>
        )}

        {!started && (
          <button
            type="button"
            onClick={() => jump(0)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Play the explainer"
          >
            <span className="flex h-[14cqw] w-[14cqw] items-center justify-center rounded-full bg-amethyst text-bone shadow-[0_0_40px_-6px_rgba(107,93,211,0.9)] sm:h-[8cqw] sm:w-[8cqw]">
              <PlayIcon />
            </span>
          </button>
        )}
        {ended && (
          <button
            type="button"
            onClick={() => jump(0)}
            className="absolute right-[3cqw] top-[3cqw] rounded border border-dark-border bg-obsidian/80 px-3 py-1.5 text-[12.5px] text-soft-white hover:text-bone"
          >
            ↺ Replay
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 border-t border-dark-border px-4 py-3">
        <button
          type="button"
          onClick={() => (ended ? jump(0) : (setStarted(true), setPlaying((p) => !p)))}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dark-border text-soft-white transition-colors hover:border-amethyst hover:text-bone"
        >
          {playing ? <PauseIcon /> : <PlayIcon small />}
        </button>
        <div className="flex flex-1 gap-1" role="tablist" aria-label="Chapters">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === scene}
              aria-label={s.label}
              title={s.label}
              onClick={() => jump(i)}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded bg-dark-border group-hover:bg-stone/40">
                <span
                  className="block h-full bg-amethyst"
                  style={{ width: `${i < scene ? 100 : i === scene ? (t / s.secs) * 100 : 0}%` }}
                />
              </span>
            </button>
          ))}
        </div>
        <span className="hidden w-[92px] shrink-0 text-right text-[11.5px] tabular-nums text-stone sm:block">
          {fmt(elapsed)} / {fmt(totalSecs)}
        </span>
      </div>
      <p className="border-t border-dark-border px-4 py-2 text-[12px] text-stone">
        <span className="text-soft-white/80">{scenes[scene].label}</span> · tap a segment to jump
      </p>
    </div>
  );
}

// ── Scenes ───────────────────────────────────────────────────────────────

type SceneProps = { t: number };

const Eyebrow = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <p className="text-[2.6cqw] font-medium uppercase tracking-[0.2em] text-dusk sm:text-[1.3cqw]" style={a("filmFadeUp", delay)}>
    {children}
  </p>
);

const Title = ({ children, delay = 0.15 }: { children: ReactNode; delay?: number }) => (
  <p
    className="mt-[1cqw] font-serif text-[6cqw] leading-[1.08] tracking-[-0.02em] text-bone sm:text-[3.6cqw]"
    style={a("filmFadeUp", delay)}
  >
    {children}
  </p>
);

const chip =
  "rounded-[0.5cqw] border border-dark-border bg-panel px-[1.6cqw] py-[1cqw] text-[2.9cqw] text-soft-white/85 sm:px-[1cqw] sm:py-[0.7cqw] sm:text-[1.5cqw]";

function Poster() {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>One minute · six steps</Eyebrow>
      <Title>How to choose AI tools without wasting money.</Title>
    </div>
  );
}

const pile = ["Chat app", "Note taker", "Deck maker", "Avatar video", "Image tool", "2nd chat app", "Research agent", "Writing tool", "App builder", "Automation", "Voice tool", "Scraper"];
const unused = [1, 3, 5, 6, 7, 8, 10];

function SceneProblem() {
  return (
    <div className="grid h-full items-center gap-[4cqw] sm:grid-cols-[1.15fr_1fr]">
      <div className="grid grid-cols-3 gap-[1.6cqw] sm:grid-cols-4 sm:gap-[1cqw]">
        {pile.map((p, i) => {
          const k = unused.indexOf(i);
          return (
            <div
              key={p}
              className={`relative overflow-hidden text-center ${chip}`}
              style={{
                ...a("filmDrop", i * 0.08, 0.5),
                ...(k >= 0 ? { animation: `filmDrop 0.5s ${ease} ${i * 0.08}s both, filmDim 0.4s ease ${2.4 + k * 0.28}s forwards` } : {}),
              }}
            >
              {p}
              {k >= 0 && (
                <span
                  aria-hidden
                  className="absolute left-[8%] right-[8%] top-1/2 h-[0.35cqw] origin-left bg-[#d26a6a]"
                  style={a("filmStrike", 2.3 + k * 0.28, 0.35)}
                />
              )}
            </div>
          );
        })}
      </div>
      <div>
        <Eyebrow delay={0.6}>A year of buying on impulse</Eyebrow>
        <p className="mt-[1.4cqw] font-serif text-[9cqw] leading-none text-bone sm:text-[5.4cqw]" style={a("filmFadeUp", 4.3)}>
          12 paid.
        </p>
        <p className="font-serif text-[9cqw] leading-none text-dusk sm:text-[5.4cqw]" style={a("filmFadeUp", 4.8)}>
          5 used.
        </p>
      </div>
    </div>
  );
}

const tasks = [
  { text: "Proposals and client emails", cap: "Write", dots: 5 },
  { text: "Research before client calls", cap: "Research", dots: 1 },
  { text: "Weekly update to each client", cap: "Automate", dots: 1 },
  { text: "Internal project tracker", cap: "Build", dots: 0 },
];

function SceneTasks() {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>Step 1 · Write the job description</Eyebrow>
      <div className="mt-[2.4cqw] space-y-[1.4cqw] sm:space-y-[0.9cqw]">
        {tasks.map((x, i) => (
          <div
            key={x.text}
            className="flex items-center gap-[2cqw] rounded-[0.5cqw] border border-dark-border bg-panel px-[2cqw] py-[1.4cqw] sm:py-[1cqw]"
            style={
              x.dots === 5
                ? { animation: `filmSlideIn 0.55s ${ease} ${0.3 + i * 0.35}s both, filmGlow 0.6s ease 4.6s forwards` }
                : a("filmSlideIn", 0.3 + i * 0.35, 0.55)
            }
          >
            <span className="flex-1 text-[3.1cqw] text-bone sm:text-[1.7cqw]">{x.text}</span>
            <span
              className="rounded-[0.4cqw] bg-amethyst/25 px-[1.2cqw] py-[0.3cqw] text-[2.6cqw] text-bone sm:px-[0.8cqw] sm:text-[1.3cqw]"
              style={a("filmPop", 2 + i * 0.25, 0.4)}
            >
              {x.cap}
            </span>
            <span className="flex w-[11cqw] gap-[0.6cqw] sm:w-[7cqw] sm:gap-[0.4cqw]">
              {x.dots === 0 ? (
                <span className="h-[1.6cqw] w-[1.6cqw] rounded-full border border-dusk sm:h-[0.9cqw] sm:w-[0.9cqw]" style={a("filmPop", 3.2 + i * 0.15, 0.3)} />
              ) : (
                Array.from({ length: x.dots }).map((_, d) => (
                  <span
                    key={d}
                    className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-amethyst sm:h-[0.9cqw] sm:w-[0.9cqw]"
                    style={a("filmPop", 3.2 + i * 0.15 + d * 0.06, 0.3)}
                  />
                ))
              )}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-[2cqw] text-[2.8cqw] text-stone sm:text-[1.4cqw]" style={a("filmFadeUp", 5.2)}>
        <span className="mr-[1cqw] text-[#e29a9a] line-through">ChatGPT</span> No tool names yet. Five dots means daily: that is where the money goes.
      </p>
    </div>
  );
}

const seatList = [
  { name: "Assistant", job: "writes with you", task: "Proposals" },
  { name: "Researcher", job: "finds, with sources", task: "Client research" },
  { name: "Operator", job: "runs work for you", task: "Weekly update" },
  { name: "Builder", job: "makes small tools", task: "Tracker" },
];

function Chair({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 34 34" className="h-[7cqw] w-[7cqw] sm:h-[4cqw] sm:w-[4cqw]" aria-hidden>
      <rect x="9" y="4" width="16" height="13" rx="2" fill="none" stroke="#3a3a3a" strokeWidth="2" style={{ animation: `filmStroke 0.4s ease ${delay}s forwards` }} />
      <rect x="7" y="17" width="20" height="5" rx="1.5" fill="none" stroke="#3a3a3a" strokeWidth="2" style={{ animation: `filmFill 0.4s ease ${delay}s forwards` }} />
      <path d="M10 22v8M24 22v8" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" style={{ animation: `filmStroke 0.4s ease ${delay}s forwards` }} />
    </svg>
  );
}

function SceneSeats() {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>Step 2 · Fill the seats</Eyebrow>
      <div className="mt-[3cqw] grid grid-cols-2 gap-[2cqw] sm:grid-cols-4 sm:gap-[1.4cqw]">
        {seatList.map((s, i) => {
          const land = 2 + i * 0.5;
          return (
            <div
              key={s.name}
              className="relative flex flex-col items-center rounded-[0.6cqw] border border-dark-border bg-panel px-[1.4cqw] pb-[2cqw] pt-[2.4cqw] text-center"
              style={{ animation: `filmFadeUp 0.5s ${ease} ${0.2 + i * 0.15}s both, filmGlow 0.5s ease ${land + 0.35}s forwards` }}
            >
              <span
                className="absolute -top-[2.6cqw] rounded-[0.4cqw] bg-amethyst px-[1.2cqw] py-[0.4cqw] text-[2.5cqw] text-bone sm:-top-[1.6cqw] sm:px-[0.8cqw] sm:text-[1.2cqw]"
                style={a("filmFlyDown", land, 0.5)}
              >
                {s.task}
              </span>
              <Chair delay={land + 0.35} />
              <p className="mt-[1cqw] font-serif text-[3.4cqw] text-bone sm:text-[1.9cqw]">{s.name}</p>
              <p className="text-[2.5cqw] text-stone sm:text-[1.25cqw]">{s.job}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-[2.6cqw] font-serif text-[3.6cqw] text-dusk sm:text-[2cqw]" style={a("filmFadeUp", 4.8)}>
        Four seats, not forty tools. One default per need.
      </p>
    </div>
  );
}

const checked = [
  { tool: "Assistant, business plan", out: false },
  { tool: "Meeting notes, training off", out: false },
  { tool: "App builder that trains on data", out: true },
  { tool: "Image API with a training licence", out: true },
  { tool: "Self-hosted automation", out: false },
];

function SceneData() {
  return (
    <div className="grid h-full items-center gap-[2cqw] sm:grid-cols-[0.8fr_1.2fr] sm:gap-[4cqw]">
      <div>
        <Eyebrow>Step 3 · Background check</Eyebrow>
        <div className="mt-[2cqw] rounded-[0.8cqw] border-[0.35cqw] border-dashed border-[#d26a6a]/70 p-[2.4cqw] sm:p-[1.6cqw]" style={a("filmPop", 0.4, 0.5)}>
          {["Customer data", "Payments", "Client documents"].map((d, i) => (
            <p key={d} className="py-[0.6cqw] text-[3cqw] text-bone sm:text-[1.6cqw]" style={a("filmFadeUp", 0.8 + i * 0.25)}>
              🔒 {d}
            </p>
          ))}
          <p className="mt-[0.6cqw] text-[2.4cqw] text-[#e29a9a] sm:text-[1.2cqw]" style={a("filmFadeUp", 1.6)}>
            must never leave your control
          </p>
        </div>
      </div>
      <div className="space-y-[1.2cqw] sm:space-y-[0.8cqw]">
        {checked.map((c, i) => (
          <div
            key={c.tool}
            className="flex items-center justify-between gap-[2cqw] rounded-[0.5cqw] border border-dark-border bg-panel px-[2cqw] py-[1.2cqw] sm:py-[0.9cqw]"
            style={{
              ...a("filmSlideIn", 1.8 + i * 0.2, 0.5),
              ...(c.out ? { borderColor: "rgba(210,106,106,0.35)" } : {}),
            }}
          >
            <span
              className={`text-[2.9cqw] text-soft-white/90 sm:text-[1.55cqw] ${c.out ? "line-through decoration-[#d26a6a]/70" : ""}`}
              style={c.out ? { animation: `filmDim 0.4s ease ${3.3 + i * 0.35}s forwards` } : undefined}
            >
              {c.tool}
            </span>
            <span
              className={`rounded-[0.4cqw] border px-[1cqw] py-[0.2cqw] text-[2.4cqw] font-medium uppercase tracking-[0.12em] sm:text-[1.15cqw] ${
                c.out ? "border-[#d26a6a] text-[#e29a9a]" : "border-dusk/70 text-dusk"
              }`}
              style={{ ...a("filmStamp", 3.2 + i * 0.35, 0.45), opacity: 0 }}
            >
              {c.out ? "Out" : "Pass"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const candidates = [
  { tool: "Note taker A", score: 11 },
  { tool: "Note taker B", score: 10 },
  { tool: "Note taker C", score: 8 },
];

function SceneScore({ t }: SceneProps) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>Step 4 · The interview</Eyebrow>
      <div className="mt-[1.4cqw] flex flex-wrap gap-[1.2cqw] text-[2.6cqw] text-stone sm:text-[1.3cqw]" style={a("filmFadeUp", 0.3)}>
        {["Gate: data ✓", "Gate: integrations ✓", "Quality", "Ease", "Cost", "Risk"].map((r) => (
          <span key={r} className="rounded-[0.4cqw] border border-dark-border px-[1cqw] py-[0.3cqw]">
            {r}
          </span>
        ))}
      </div>
      <div className="mt-[3cqw] space-y-[2cqw] sm:space-y-[1.4cqw]">
        {candidates.map((c, i) => {
          const start = 1.3 + i * 0.45;
          const shown = Math.min(c.score, Math.max(0, Math.round(((t - start) / 1.4) * c.score)));
          return (
            <div key={c.tool} className="flex items-center gap-[2cqw]">
              <span className="w-[22cqw] text-[3cqw] text-bone sm:w-[13cqw] sm:text-[1.6cqw]" style={a("filmFadeUp", 0.6 + i * 0.15)}>
                {c.tool}
              </span>
              <div className="relative h-[3cqw] flex-1 overflow-hidden rounded-[0.4cqw] bg-dark-border sm:h-[1.8cqw]">
                <div
                  className={`h-full origin-left rounded-[0.4cqw] ${i === 0 ? "bg-amethyst" : "bg-stone/60"}`}
                  style={{ width: `${(c.score / 12) * 100}%`, ...a("filmGrow", start, 1.4) }}
                />
              </div>
              <span className="w-[9cqw] text-right font-serif text-[3.6cqw] tabular-nums text-bone sm:w-[6cqw] sm:text-[2cqw]">
                {shown}
                <span className="text-[2.2cqw] text-stone sm:text-[1.1cqw]">/12</span>
              </span>
              <span
                className="w-[14cqw] sm:w-[9cqw]"
                style={{ ...a("filmStamp", 4.2 + i * 0.25, 0.45), opacity: 0 }}
              >
                <span
                  className={`inline-block rounded-[0.4cqw] px-[1cqw] py-[0.3cqw] text-[2.3cqw] font-medium uppercase tracking-[0.12em] sm:text-[1.1cqw] ${
                    i === 0 ? "bg-amethyst text-bone" : "border border-dark-border text-stone"
                  }`}
                >
                  {i === 0 ? "Default" : "Cut"}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SceneHeadcount({ t }: SceneProps) {
  const people = 14;
  const daily = new Set([0, 2, 5, 7, 9, 12]);
  const p = Math.min(1, Math.max(0, (t - 2.8) / 1.8));
  const cost = Math.round(1862 - (1862 - 429) * (1 - Math.pow(1 - p, 3)));
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>Step 5 · Headcount</Eyebrow>
      <div className="mt-[2.4cqw] flex flex-wrap gap-[1.2cqw] sm:gap-[0.9cqw]">
        {Array.from({ length: people }).map((_, i) => (
          <span
            key={i}
            className="flex h-[5.6cqw] w-[5.6cqw] items-center justify-center rounded-full border border-dark-border bg-panel sm:h-[3.4cqw] sm:w-[3.4cqw]"
            style={{
              animation: `filmPop 0.35s ${ease} ${0.2 + i * 0.05}s both, ${daily.has(i) ? "filmGlow" : "filmDim"} 0.4s ease ${2.4 + (i % 5) * 0.08}s forwards`,
            }}
          >
            <svg viewBox="0 0 20 20" className="h-1/2 w-1/2" aria-hidden>
              <circle cx="10" cy="6.5" r="3.5" fill="#9B8FE0" />
              <path d="M3 18c1-4 4-6 7-6s6 2 7 6" fill="#9B8FE0" />
            </svg>
          </span>
        ))}
      </div>
      <p className="mt-[1.4cqw] text-[2.6cqw] text-stone sm:text-[1.3cqw]" style={a("filmFadeUp", 2.6)}>
        <span className="text-dusk">●</span> uses it daily: paid seat · <span className="text-stone">●</span> weekly or never: free tier or nothing
      </p>
      <div className="mt-[2.4cqw] flex items-end gap-[3cqw]">
        <div className="flex-1">
          <div className="h-[3.4cqw] overflow-hidden rounded-[0.4cqw] bg-dark-border sm:h-[2cqw]" style={a("filmFadeUp", 0.8)}>
            <div
              className="h-full rounded-[0.4cqw] transition-[background-color] duration-700"
              style={{ width: `${(cost / 1862) * 100}%`, background: p > 0.5 ? "#6B5DD3" : "rgba(210,106,106,0.75)" }}
            />
          </div>
          <p className="mt-[0.8cqw] text-[2.5cqw] text-stone sm:text-[1.25cqw]" style={a("filmFadeUp", 0.9)}>
            {p < 0.05 ? "Everyone gets everything" : "Right-sized: daily users only"}
          </p>
        </div>
        <p className="font-serif text-[8cqw] leading-none tabular-nums text-bone sm:text-[4.6cqw]" style={a("filmFadeUp", 0.8)}>
          ${cost.toLocaleString("en-US")}
          <span className="text-[2.6cqw] text-stone sm:text-[1.4cqw]">/mo</span>
        </p>
      </div>
    </div>
  );
}

function SceneReview() {
  const outcomes = ["Keep", "Cut", "Upgrade", "Downgrade"];
  return (
    <div className="grid h-full items-center gap-[4cqw] sm:grid-cols-[0.7fr_1.3fr]">
      <div className="flex flex-col items-center">
        <div className="w-[30cqw] overflow-hidden rounded-[0.8cqw] border border-dark-border bg-panel text-center sm:w-[17cqw]" style={a("filmFlip", 0.2, 0.7)}>
          <p className="bg-amethyst py-[1cqw] text-[2.6cqw] uppercase tracking-[0.2em] text-bone sm:py-[0.6cqw] sm:text-[1.2cqw]">Every quarter</p>
          <p className="py-[2cqw] font-serif text-[9cqw] leading-none text-bone sm:py-[1.4cqw] sm:text-[5.4cqw]">90</p>
          <p className="pb-[1.6cqw] text-[2.6cqw] text-stone sm:pb-[1cqw] sm:text-[1.3cqw]">days · 20 minutes</p>
        </div>
      </div>
      <div>
        <Eyebrow delay={0.4}>Step 6 · Review</Eyebrow>
        <div className="mt-[1.6cqw] space-y-[0.8cqw] text-[3cqw] text-soft-white/85 sm:text-[1.6cqw]">
          {["What got used?", "What did not?", "What changed?"].map((q, i) => (
            <p key={q} style={a("filmFadeUp", 0.8 + i * 0.35)}>
              <span className="mr-[1cqw] text-amethyst">{i + 1}</span>
              {q}
            </p>
          ))}
        </div>
        <div className="mt-[2.4cqw] grid grid-cols-4 gap-[1.2cqw] sm:gap-[0.8cqw]">
          {outcomes.map((o, i) => (
            <span
              key={o}
              className={`rounded-[0.5cqw] border py-[1.2cqw] text-center font-serif text-[2.8cqw] sm:py-[0.8cqw] sm:text-[1.6cqw] ${
                o === "Cut" ? "border-amethyst bg-amethyst/20 text-bone" : "border-dark-border text-soft-white/80"
              }`}
              style={{ ...a("filmStamp", 2.4 + i * 0.3, 0.45), opacity: 0 }}
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const pageRows = [
  ["Write and edit", "Claude"],
  ["Research the web", "Perplexity"],
  ["Meeting notes", "Granola"],
  ["Recurring work", "n8n"],
  ["Images", "Gemini image"],
];

function ScenePage() {
  return (
    <div className="grid h-full items-center gap-[4cqw] sm:grid-cols-[1.1fr_1fr]">
      <div className="rounded-[0.8cqw] border border-amethyst/60 bg-panel p-[2.4cqw] sm:p-[1.6cqw]" style={a("filmPop", 0.2, 0.5)}>
        <p className="text-[2.4cqw] uppercase tracking-[0.2em] text-dusk sm:text-[1.15cqw]">Your one page</p>
        <div className="mt-[1.2cqw]">
          {pageRows.map(([need, tool], i) => (
            <div key={need} className="flex justify-between border-b border-dark-border py-[1cqw] last:border-b-0 sm:py-[0.65cqw]" style={a("filmSlideIn", 0.6 + i * 0.3, 0.45)}>
              <span className="text-[2.9cqw] text-soft-white/80 sm:text-[1.5cqw]">{need}</span>
              <span className="text-[2.9cqw] text-bone sm:text-[1.5cqw]">{tool}</span>
            </div>
          ))}
        </div>
        <p className="mt-[1.2cqw] text-[2.5cqw] text-stone sm:text-[1.25cqw]" style={a("filmFadeUp", 2.4)}>
          Next review: in 90 days
        </p>
      </div>
      <div>
        <Title delay={2.8}>Which tool, for which task.</Title>
        <a
          href="#tasks"
          className="mt-[2.4cqw] inline-block rounded-[0.5cqw] bg-amethyst px-[2.4cqw] py-[1.2cqw] text-[3cqw] text-bone hover:opacity-90 sm:px-[1.6cqw] sm:py-[0.8cqw] sm:text-[1.5cqw]"
          style={a("filmFadeUp", 3.6)}
        >
          Build yours below ↓
        </a>
      </div>
    </div>
  );
}

const sceneViews: ((p: SceneProps) => ReactElement)[] = [
  SceneProblem,
  SceneTasks,
  SceneSeats,
  SceneData,
  SceneScore,
  SceneHeadcount,
  SceneReview,
  ScenePage,
];

function PlayIcon({ small = false }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={small ? "ml-0.5 h-3.5 w-3.5" : "ml-[8%] h-[45%] w-[45%]"} aria-hidden>
      <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
      <path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" fill="currentColor" />
    </svg>
  );
}
