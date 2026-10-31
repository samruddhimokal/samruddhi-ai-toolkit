"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  capabilities,
  frequencyWeight,
  exampleTasks,
  exampleTeamSize,
  toolNames,
  seats,
  wrongHires,
  needs,
  sensitiveData,
  policyNotes,
  gateQuestions,
  interviews,
  seatTools,
  exampleUsageBudget,
  reviewQuestions,
  reviewOutcomes,
  feelingWords,
  prompts,
  type Task,
  type Capability,
  type Frequency,
  type Settings,
  type DataKind,
  type Candidate,
  type Score,
} from "@/data/toolPlanner";
import { CopyButton } from "./CopyButton";

// ── State ────────────────────────────────────────────────────────────────

interface State {
  tasks: Task[];
  settings: Settings;
  data: DataKind[];
  scores: Candidate[][];
  teamSize: number;
  daily: number[];
  usage: number;
}

const initial: State = {
  tasks: exampleTasks,
  settings: { workspace: "google", technical: true, solo: false },
  data: ["customer", "client"],
  scores: interviews.map((i) => i.candidates),
  teamSize: exampleTeamSize,
  daily: seatTools.map((t) => t.exampleDaily),
  usage: exampleUsageBudget,
};

const KEY = "choose-your-stack-v1";

const steps = [
  { n: 1, id: "tasks", title: "Write the job description", line: "Name the task before you name the tool." },
  { n: 2, id: "seats", title: "Fill four seats, one default per need", line: "One default per need. A second tool only for a job the first cannot do." },
  { n: 3, id: "data", title: "Run the background check", line: "Rule out on data first. Compare features second." },
  { n: 4, id: "interview", title: "Interview with a scorecard", line: "Gate first, then score." },
  { n: 5, id: "headcount", title: "Decide the headcount", line: "Treat every paid seat like a hire." },
  { n: 6, id: "review", title: "Review every quarter", line: "If you cannot say the difference in one sentence, you are paying twice." },
];

export function StackBuilder() {
  const [s, setS] = useState<State>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* private window or blocked storage: start from the example */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {}
  }, [s, loaded]);

  const update = (patch: Partial<State>) => setS((prev) => ({ ...prev, ...patch }));

  const seatWeight = useMemo(() => {
    const w: Record<string, number> = {};
    for (const t of s.tasks)
      for (const c of t.caps) {
        const seat = capabilities.find((x) => x.id === c)!.seat;
        w[seat] = (w[seat] ?? 0) + frequencyWeight[t.freq];
      }
    return w;
  }, [s.tasks]);

  const capUsed = (c: Capability) => s.tasks.some((t) => t.caps.includes(c));

  return (
    <div className="space-y-20">
      <nav aria-label="Steps" className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6">
        {steps.map((st) => (
          <a
            key={st.id}
            href={`#${st.id}`}
            className="shrink-0 rounded border border-dark-border px-3 py-1.5 text-[13px] text-soft-white/80 transition-colors hover:border-amethyst/60 hover:text-bone"
          >
            <span className="mr-1.5 text-amethyst">0{st.n}</span>
            {st.title.split(",")[0]}
          </a>
        ))}
        <a
          href="#one-page"
          className="shrink-0 rounded border border-amethyst/60 px-3 py-1.5 text-[13px] text-dusk transition-colors hover:text-bone"
        >
          Your one page
        </a>
      </nav>

      <Step {...steps[0]} blurb="List what your team does every week, in plain words. Ten to fifteen recurring tasks. Not goals, not projects. No tool names in this step.">
        <TaskMapper tasks={s.tasks} onChange={(tasks) => update({ tasks })} />
        <PromptBlock title="Let your assistant tag a messy list" text={prompts.tagTasks} />
      </Step>

      <Step {...steps[1]} blurb="A stack is not a list of products. It is a few seats, each a job your work needs done. Your tasks above decide which seats you need.">
        <SeatsView weights={seatWeight} />
        <WrongHires />
        <NeedsTable settings={s.settings} onSettings={(settings) => update({ settings })} capUsed={capUsed} />
        <FiveWordTest />
      </Step>

      <Step {...steps[2]} blurb="Before comparing a single feature, decide where your data can go. A tool that fails here is out. Not scored lower. Out.">
        <BackgroundCheck selected={s.data} onChange={(data) => update({ data })} />
      </Step>

      <Step {...steps[3]} blurb="Two gates, four scores, one total out of 12. Highest total becomes the default. A tie goes to the tool you already have. Change any score below.">
        <Scorecards scores={s.scores} onChange={(scores) => update({ scores })} />
        <PromptBlock title="Get a first-pass scorecard, then overrule it" text={prompts.scorecard} />
      </Step>

      <Step {...steps[4]} blurb="Daily users get a paid seat. Weekly users use the free tier. Never means nothing. Move the sliders and watch the bill.">
        <Headcount
          teamSize={s.teamSize}
          daily={s.daily}
          usage={s.usage}
          onChange={(patch) => update(patch)}
        />
        <PromptBlock title="Tier your team in one pass" text={prompts.seats} />
      </Step>

      <Step {...steps[5]} blurb="Tools change under you every quarter. Twenty minutes, four possible outcomes, a date in the calendar.">
        <Review />
      </Step>

      <OnePage state={s} capUsed={capUsed} onReset={() => setS(initial)} />
    </div>
  );
}

// ── Layout pieces ────────────────────────────────────────────────────────

function Step({
  n,
  id,
  title,
  line,
  blurb,
  children,
}: {
  n: number;
  id: string;
  title: string;
  line: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <div className="flex items-baseline gap-4 border-b border-dark-border pb-4">
        <span className="font-serif text-[22px] text-amethyst">0{n}</span>
        <div>
          <h2 id={`${id}-h`} className="font-serif text-[26px] tracking-[-0.015em] text-bone md:text-[32px]">
            {title}
          </h2>
          <p className="mt-1.5 max-w-2xl text-[14.5px] text-stone">{blurb}</p>
        </div>
      </div>
      <div className="mt-8 space-y-10">{children}</div>
      <Reveal>
        <p className="mt-10 border-l-2 border-amethyst pl-5 font-serif text-[22px] leading-snug tracking-[-0.01em] text-bone md:text-[26px]">
          {line}
        </p>
      </Reveal>
    </section>
  );
}

/** Fades children in when they scroll into view. */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

function PromptBlock({ title, text }: { title: string; text: string }) {
  return (
    <details className="group rounded border border-dark-border bg-panel">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5">
        <span>
          <span className="eyebrow mr-3 text-dusk">Prompt</span>
          <span className="text-[14.5px] text-bone">{title}</span>
        </span>
        <span className="text-stone transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="border-t border-dark-border">
        <div className="flex justify-end px-5 pt-3">
          <CopyButton text={text} />
        </div>
        <pre className="whitespace-pre-wrap px-5 pb-4 pt-2 font-sans text-[13.5px] leading-relaxed text-soft-white/80">{text}</pre>
      </div>
    </details>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex overflow-hidden rounded border border-dark-border">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 text-[12.5px] transition-colors ${
            value === o.value ? "bg-amethyst text-bone" : "text-stone hover:text-soft-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ── Step 1: tasks ────────────────────────────────────────────────────────

function Dots({ freq }: { freq: Frequency }) {
  const n = freq === "daily" ? 5 : 1;
  return (
    <span className="inline-flex w-[54px] items-center gap-1" aria-label={freq}>
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${freq === "monthly" ? "border border-dusk" : "bg-amethyst"}`}
        />
      ))}
    </span>
  );
}

function TaskMapper({ tasks, onChange }: { tasks: Task[]; onChange: (t: Task[]) => void }) {
  const [draft, setDraft] = useState("");
  const named = toolNames.find((n) => draft.toLowerCase().includes(n));
  const add = () => {
    const text = draft.trim();
    if (!text) return;
    onChange([...tasks, { id: `t${Date.now()}`, text, caps: [], freq: "weekly" }]);
    setDraft("");
  };
  const set = (id: string, patch: Partial<Task>) => onChange(tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const daily = tasks.filter((t) => t.freq === "daily");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(exampleTasks)}
          className="rounded border border-dark-border px-3 py-1.5 text-[12.5px] text-stone transition-colors hover:border-amethyst/60 hover:text-bone"
        >
          Load the example: a 14-person consulting firm
        </button>
        <button
          type="button"
          onClick={() => onChange([])}
          className="rounded border border-dark-border px-3 py-1.5 text-[12.5px] text-stone transition-colors hover:border-amethyst/60 hover:text-bone"
        >
          Start blank with my own tasks
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded border border-dark-border">
        <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-dark-border bg-panel px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-stone md:grid">
          <span>Task</span>
          <span className="w-[300px]">Capability it needs</span>
          <span className="w-[200px]">How often</span>
          <span className="w-[54px]">Weight</span>
        </div>
        {tasks.length === 0 && <p className="px-4 py-6 text-[14px] text-stone">No tasks yet. Add your first one below.</p>}
        {tasks.map((t) => (
          <div
            key={t.id}
            className="grid animate-[popIn_0.35s_ease-out] gap-3 border-b border-dark-border px-4 py-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-4"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Remove ${t.text}`}
                onClick={() => onChange(tasks.filter((x) => x.id !== t.id))}
                className="text-[13px] text-stone/60 hover:text-soft-white"
              >
                ✕
              </button>
              <input
                value={t.text}
                onChange={(e) => set(t.id, { text: e.target.value })}
                className="w-full bg-transparent text-[14.5px] text-bone outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 md:w-[300px]">
              {capabilities.map((c) => {
                const on = t.caps.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => set(t.id, { caps: on ? t.caps.filter((x) => x !== c.id) : [...t.caps, c.id] })}
                    className={`rounded px-2 py-0.5 text-[11.5px] transition-colors ${
                      on ? "bg-amethyst/25 text-bone" : "border border-dark-border text-stone hover:text-soft-white"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
            <div className="md:w-[200px]">
              <Segmented
                label="How often"
                value={t.freq}
                onChange={(freq) => set(t.id, { freq })}
                options={[
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                  { value: "monthly", label: "Monthly" },
                ]}
              />
            </div>
            <Dots freq={t.freq} />
          </div>
        ))}
        <div className="flex gap-2 bg-panel px-4 py-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a task, e.g. reply to customer questions"
            className="flex-1 bg-transparent text-[14.5px] text-bone outline-none placeholder:text-stone"
          />
          <button type="button" onClick={add} className="rounded bg-amethyst px-3 py-1 text-[12.5px] text-bone hover:opacity-90">
            Add
          </button>
        </div>
      </div>
      {named && (
        <p role="status" className="mt-2 text-[13px] text-dusk">
          That is a tool name. Describe the job instead: what gets written, found, run, or made?
        </p>
      )}

      {daily.length > 0 && (
        <p className="mt-5 text-[14.5px] leading-relaxed text-soft-white/80">
          Your eye should go to the rows with five dots. <span className="text-bone">{daily.map((d) => d.text).join(", ")}</span>.
          That is where your money belongs. Monthly tasks get a free tier, or get built once and left alone.
        </p>
      )}
    </div>
  );
}

// ── Step 2: seats and needs ──────────────────────────────────────────────

function SeatsView({ weights }: { weights: Record<string, number> }) {
  const max = Math.max(1, ...Object.values(weights));
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {seats.map((seat) => {
        const w = weights[seat.id] ?? 0;
        const on = w > 0;
        return (
          <div
            key={seat.id}
            className={`flex flex-col rounded border p-5 transition-all duration-500 ${
              on ? "border-amethyst/70 bg-panel shadow-[0_0_28px_-10px_rgba(107,93,211,0.7)]" : "border-dark-border opacity-60"
            }`}
          >
            <Chair on={on} />
            <p className="mt-3 font-serif text-[19px] text-bone">{seat.name}</p>
            <p className="mt-1 text-[13.5px] text-soft-white/80">{seat.job}</p>
            <p className="mt-2 flex-1 text-[12.5px] leading-snug text-stone">{seat.note}</p>
            <div className="mt-4">
              <div className="h-1.5 overflow-hidden rounded bg-dark-border">
                <div className="h-full rounded bg-amethyst transition-[width] duration-700 ease-out" style={{ width: `${(w / max) * 100}%` }} />
              </div>
              <p className="mt-1.5 text-[11.5px] tracking-[0.04em] text-stone">{on ? `Hire · weight ${w}` : "Leave empty for now"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Chair({ on }: { on: boolean }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="transition-colors duration-500">
      <rect x="9" y="4" width="16" height="13" rx="2" fill="none" stroke={on ? "#9B8FE0" : "#3a3a3a"} strokeWidth="2" />
      <rect x="7" y="17" width="20" height="5" rx="1.5" fill={on ? "#6B5DD3" : "none"} stroke={on ? "#6B5DD3" : "#3a3a3a"} strokeWidth="2" />
      <path d="M10 22v8M24 22v8" stroke={on ? "#9B8FE0" : "#3a3a3a"} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WrongHires() {
  return (
    <div>
      <p className="eyebrow text-stone">Three wrong hires, seen every month</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {wrongHires.map((w) => (
          <div key={w.title} className="relative rounded border border-dark-border bg-panel p-5">
            <span className="absolute right-4 top-4 rotate-6 rounded border border-[#d26a6a]/60 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#e29a9a]">
              Wrong seat
            </span>
            <p className="pr-20 font-serif text-[16.5px] leading-snug text-bone">{w.title}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-soft-white/75">{w.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[14px] text-stone">When roles get mixed, the tool is rarely wrong. The seat is.</p>
    </div>
  );
}

function NeedsTable({
  settings,
  onSettings,
  capUsed,
}: {
  settings: Settings;
  onSettings: (s: Settings) => void;
  capUsed: (c: Capability) => boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="flex items-center gap-3 text-[13px] text-stone">
          Your team works in
          <Segmented
            label="Workspace"
            value={settings.workspace}
            onChange={(workspace) => onSettings({ ...settings, workspace })}
            options={[
              { value: "google", label: "Google" },
              { value: "microsoft", label: "Microsoft" },
              { value: "other", label: "Neither" },
            ]}
          />
        </label>
        <label className="flex items-center gap-3 text-[13px] text-stone">
          A technical person on the team?
          <Segmented
            label="Technical person"
            value={settings.technical ? "yes" : "no"}
            onChange={(v) => onSettings({ ...settings, technical: v === "yes" })}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </label>
        <label className="flex items-center gap-3 text-[13px] text-stone">
          Working solo?
          <Segmented
            label="Solo"
            value={settings.solo ? "yes" : "no"}
            onChange={(v) => onSettings({ ...settings, solo: v === "yes" })}
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
          />
        </label>
      </div>

      <div className="mt-5 overflow-x-auto rounded border border-dark-border">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-dark-border bg-panel text-[11px] uppercase tracking-[0.14em] text-stone">
              <th className="px-4 py-2.5 font-medium">Need</th>
              <th className="px-4 py-2.5 font-medium">Default</th>
              <th className="px-4 py-2.5 font-medium">Second tool only if</th>
            </tr>
          </thead>
          <tbody>
            {needs.map((n) => {
              const ex = n.exception(settings);
              const used = capUsed(n.cap);
              return (
                <tr key={n.id} className={`border-b border-dark-border transition-opacity duration-500 last:border-b-0 ${used ? "" : "opacity-40"}`}>
                  <td className="px-4 py-3 text-[14px] text-soft-white/85">{n.label}</td>
                  <td className="px-4 py-3 text-[14px] text-bone">
                    <span key={n.defaultTool(settings)} className="inline-block animate-[popIn_0.35s_ease-out]">
                      {n.defaultTool(settings)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13.5px] text-stone">
                    {ex ? (
                      <>
                        <span className="text-soft-white/85">{ex.tool}</span> · &ldquo;{ex.job}&rdquo;
                      </>
                    ) : (
                      "Nothing. Learn the default."
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] text-stone">
        Samruddhi&apos;s defaults as of September 2026. Faded rows are needs your task list does not have yet.
      </p>
    </div>
  );
}

function FiveWordTest() {
  const [reason, setReason] = useState("");
  const words = reason.trim() ? reason.trim().split(/\s+/) : [];
  const feeling = words.some((w) => feelingWords.includes(w.toLowerCase().replace(/[^a-z]/g, "")));
  let verdict: { ok: boolean; text: string } | null = null;
  if (words.length > 0) {
    if (feeling) verdict = { ok: false, text: "That is a feeling, not a job. Keep one tool and learn it properly." };
    else if (words.length > 5) verdict = { ok: false, text: `${words.length} words. If it takes more than five, the job is not clear yet.` };
    else verdict = { ok: true, text: "That is a job. The second tool can stay, in the exception column." };
  }
  return (
    <div className="rounded border border-dark-border border-l-2 border-l-amethyst bg-panel p-6">
      <p className="eyebrow text-dusk">The five-word test</p>
      <p className="mt-2 text-[15px] leading-relaxed text-soft-white/85">
        Want a second tool for a need? Name the job the default cannot do, in five words or fewer.
      </p>
      <input
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder='Try "grounded in our own documents" or "the team likes it more"'
        className="mt-4 w-full rounded border border-dark-border bg-obsidian px-4 py-3 text-[14.5px] text-bone outline-none placeholder:text-stone focus:border-amethyst"
      />
      <div className="mt-3 flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-6 rounded-sm transition-colors duration-300 ${
                i < words.length ? (words.length > 5 || feeling ? "bg-[#d26a6a]" : "bg-amethyst") : "bg-dark-border"
              }`}
            />
          ))}
        </div>
        {verdict && (
          <p role="status" className={`text-[13.5px] ${verdict.ok ? "text-dusk" : "text-[#e29a9a]"}`}>
            {verdict.text}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Step 3: background check ─────────────────────────────────────────────

const verdictStyle = {
  out: { label: "Out", cls: "border-[#d26a6a]/60 text-[#e29a9a]" },
  fix: { label: "Fix on day one", cls: "border-dusk/60 text-dusk" },
  pass: { label: "Pass", cls: "border-dark-border text-soft-white/80" },
};

function BackgroundCheck({ selected, onChange }: { selected: DataKind[]; onChange: (d: DataKind[]) => void }) {
  const relevant = policyNotes
    .filter((p) => p.affects === "all" || p.affects.some((a) => selected.includes(a)))
    .sort((a, b) => ["out", "fix", "pass"].indexOf(a.verdict) - ["out", "fix", "pass"].indexOf(b.verdict));

  return (
    <div className="space-y-8">
      <div className="grid gap-3 md:grid-cols-3">
        {gateQuestions.map((g, i) => (
          <div key={g.q} className="rounded border border-dark-border bg-panel p-5">
            <p className="font-serif text-[15px] text-amethyst">{i + 1}</p>
            <p className="mt-1 font-serif text-[18px] text-bone">{g.q}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-soft-white/75">{g.detail}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-stone">Pass or fail. No points.</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-[15px] text-soft-white/85">Draw your red line. What must never leave your control?</p>
          <div className="mt-4 rounded border-2 border-dashed border-[#d26a6a]/50 p-4">
            {sensitiveData.map((d) => {
              const on = selected.includes(d.id);
              return (
                <label key={d.id} className="flex cursor-pointer items-center gap-3 py-2 text-[14px] text-soft-white/85">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => onChange(on ? selected.filter((x) => x !== d.id) : [...selected, d.id])}
                    className="h-4 w-4 accent-[#6B5DD3]"
                  />
                  {d.label}
                </label>
              );
            })}
          </div>
          <p className="mt-3 text-[12.5px] text-stone">
            Where to check any tool: its Security, Trust, or Privacy page. Five minutes there beats a two-week trial.
          </p>
        </div>
        <ul className="space-y-2">
          {relevant.map((p) => (
            <li key={p.tool} className="flex animate-[popIn_0.35s_ease-out] items-start gap-3 rounded border border-dark-border bg-panel px-4 py-3">
              <span className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 text-[10.5px] uppercase tracking-[0.12em] ${verdictStyle[p.verdict].cls}`}>
                {verdictStyle[p.verdict].label}
              </span>
              <span>
                <span className="text-[14px] text-bone">{p.tool}.</span>{" "}
                <span className="text-[13.5px] text-soft-white/70">{p.note}</span>
              </span>
            </li>
          ))}
          <li className="pt-1 text-[12px] text-stone">Policies as of September 2026. Check the tool&apos;s own page on the day you decide.</li>
        </ul>
      </div>
    </div>
  );
}

// ── Step 4: scorecards ───────────────────────────────────────────────────

const scoreRows: { key: "quality" | "ease" | "cost" | "risk"; label: string; hint: string }[] = [
  { key: "quality", label: "Quality", hint: "on this task, not in general" },
  { key: "ease", label: "Ease", hint: "for the people who will use it" },
  { key: "cost", label: "Cost", hint: "per person who really uses it" },
  { key: "risk", label: "Automation risk", hint: "3 = safe with light checks, 1 = never unattended" },
];

const total = (c: Candidate) => c.quality + c.ease + c.cost + c.risk;
const passes = (c: Candidate) => c.dataGate && c.integrationGate;

function Scorecards({ scores, onChange }: { scores: Candidate[][]; onChange: (s: Candidate[][]) => void }) {
  const [tab, setTab] = useState(0);
  const cands = scores[tab];
  const best = Math.max(...cands.filter(passes).map(total), 0);
  const set = (ci: number, patch: Partial<Candidate>) =>
    onChange(scores.map((row, r) => (r !== tab ? row : row.map((c, i) => (i === ci ? { ...c, ...patch } : c)))));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {interviews.map((iv, i) => (
          <button
            key={iv.need}
            type="button"
            onClick={() => setTab(i)}
            className={`rounded border px-3 py-1.5 text-[13px] transition-colors ${
              tab === i ? "border-amethyst bg-amethyst/15 text-bone" : "border-dark-border text-stone hover:text-soft-white"
            }`}
          >
            {iv.need}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange(scores.map((row, r) => (r === tab ? interviews[r].candidates : row)))}
          className="ml-auto text-[12.5px] text-stone hover:text-soft-white"
        >
          Reset scores
        </button>
      </div>
      <p className="mt-3 text-[13px] text-stone">
        This need happens <span className="text-soft-white/85">{interviews[tab].freq}</span>, so it carries a weight of{" "}
        {frequencyWeight[interviews[tab].freq]}. Weight decides whether the need deserves a paid seat at all.
      </p>

      <div className="mt-4 overflow-x-auto rounded border border-dark-border">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-dark-border bg-panel">
              <th className="w-[210px] px-4 py-3" />
              {cands.map((c) => (
                <th key={c.tool} className="px-4 py-3 align-top">
                  <span className="font-serif text-[17px] font-normal text-bone">{c.tool}</span>
                  <span className="mt-1 block text-[12px] font-normal leading-snug text-stone">{c.why}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(["dataGate", "integrationGate"] as const).map((g) => (
              <tr key={g} className="border-b border-dark-border">
                <td className="px-4 py-2.5 text-[13.5px] text-soft-white/85">
                  {g === "dataGate" ? "Data & privacy" : "Integrations"}
                  <span className="ml-2 text-[10.5px] uppercase tracking-[0.12em] text-dusk">Gate</span>
                </td>
                {cands.map((c, ci) => (
                  <td key={c.tool} className="px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => set(ci, { [g]: !c[g] } as Partial<Candidate>)}
                      className={`rounded border px-2 py-0.5 text-[12px] transition-colors ${
                        c[g] ? "border-dark-border text-soft-white/80" : "border-[#d26a6a]/60 text-[#e29a9a]"
                      }`}
                    >
                      {c[g] ? "Pass" : "Fail"}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
            {scoreRows.map((row) => (
              <tr key={row.key} className="border-b border-dark-border">
                <td className="px-4 py-2.5 text-[13.5px] text-soft-white/85">
                  {row.label}
                  <span className="block text-[11.5px] text-stone">{row.hint}</span>
                </td>
                {cands.map((c, ci) => (
                  <td key={c.tool} className={`px-4 py-2.5 transition-opacity ${passes(c) ? "" : "opacity-30"}`}>
                    <div className="inline-flex gap-1">
                      {([1, 2, 3] as Score[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          aria-label={`${row.label} ${v} for ${c.tool}`}
                          onClick={() => set(ci, { [row.key]: v } as Partial<Candidate>)}
                          className={`h-7 w-7 rounded text-[12.5px] transition-all ${
                            c[row.key] >= v ? "bg-amethyst text-bone" : "border border-dark-border text-stone hover:text-soft-white"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-4 py-4 text-[13.5px] text-soft-white/85">Total and verdict</td>
              {cands.map((c) => {
                const ok = passes(c);
                const t = total(c);
                const win = ok && t === best;
                return (
                  <td key={c.tool} className="px-4 py-4 align-top">
                    {ok ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-[26px] text-bone">{t}</span>
                          <span className="text-[12px] text-stone">/ 12</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded bg-dark-border">
                          <div className="h-full rounded bg-amethyst transition-[width] duration-500" style={{ width: `${(t / 12) * 100}%` }} />
                        </div>
                        <span
                          key={win ? "win" : "cut"}
                          className={`mt-2 inline-block animate-[popIn_0.35s_ease-out] rounded px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] ${
                            win ? "bg-amethyst text-bone" : "border border-dark-border text-stone"
                          }`}
                        >
                          {win ? "Default" : "Cut, unless it passes the five-word test"}
                        </span>
                      </>
                    ) : (
                      <span className="inline-block rounded border border-[#d26a6a]/60 px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] text-[#e29a9a]">
                        Out at the gate. Not scored.
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] text-stone">
        Example scores from real use. Your team, your tasks, your scores: click any number to change it.
      </p>
    </div>
  );
}

// ── Step 5: headcount ────────────────────────────────────────────────────

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function Headcount({
  teamSize,
  daily,
  usage,
  onChange,
}: {
  teamSize: number;
  daily: number[];
  usage: number;
  onChange: (p: Partial<State>) => void;
}) {
  const everyone = teamSize * seatTools.reduce((n, t) => n + t.price, 0);
  const right = seatTools.reduce((n, t, i) => n + Math.min(daily[i], teamSize) * t.price, 0) + usage;
  const seatsHeld = daily.reduce((n, d) => n + Math.min(d, teamSize), 0);
  const saved = everyone > 0 ? Math.round((1 - right / everyone) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded border border-dark-border bg-panel p-5">
          <p className="eyebrow text-dusk">Seat pricing · a monthly pass</p>
          <p className="mt-2 text-[14px] leading-relaxed text-soft-white/80">
            A fixed fee per person. Right for a tool a person opens every day.
          </p>
        </div>
        <div className="rounded border border-dark-border bg-panel p-5">
          <p className="eyebrow text-dusk">Usage pricing · a taxi meter</p>
          <p className="mt-2 text-[14px] leading-relaxed text-soft-white/80">
            You pay for what runs. Right for automations, where a machine does the work. The mistake is a pass for a
            machine, or a meter for a person.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <label className="flex items-center gap-3 text-[14px] text-soft-white/85">
            People on the team
            <input
              type="number"
              min={1}
              max={500}
              value={teamSize}
              onChange={(e) => onChange({ teamSize: Math.max(1, Math.min(500, Number(e.target.value) || 1)) })}
              className="w-20 rounded border border-dark-border bg-obsidian px-2 py-1 text-bone outline-none focus:border-amethyst"
            />
          </label>
          <div className="mt-4 divide-y divide-dark-border rounded border border-dark-border">
            {seatTools.map((t, i) => {
              const d = Math.min(daily[i], teamSize);
              return (
                <div key={t.tool} className="px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
                    <span className="text-bone">{t.tool}</span>
                    <span className="text-stone">
                      ${t.price}/seat · <span className="text-soft-white/85">{d} daily</span> = {usd(d * t.price)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={teamSize}
                    value={d}
                    aria-label={`Daily users of ${t.tool}`}
                    onChange={(e) => onChange({ daily: daily.map((x, j) => (j === i ? Number(e.target.value) : x)) })}
                    className="mt-2 w-full accent-[#6B5DD3]"
                  />
                </div>
              );
            })}
            <label className="flex items-center justify-between gap-3 px-4 py-3 text-[13.5px]">
              <span className="text-bone">Automation server and usage budget</span>
              <span className="flex items-center gap-1 text-stone">
                $
                <input
                  type="number"
                  min={0}
                  value={usage}
                  onChange={(e) => onChange({ usage: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-16 rounded border border-dark-border bg-obsidian px-2 py-0.5 text-bone outline-none focus:border-amethyst"
                />
                /mo
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          {[
            { label: "Everyone gets everything", value: everyone, tone: "bg-[#d26a6a]/70" },
            { label: "Right-sized: daily users only", value: right, tone: "bg-amethyst" },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between">
                <span className="text-[13.5px] text-soft-white/85">{b.label}</span>
                <span className="font-serif text-[24px] text-bone">
                  {usd(b.value)}
                  <span className="text-[12px] text-stone"> /mo</span>
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded bg-dark-border">
                <div
                  className={`h-full rounded ${b.tone} transition-[width] duration-700 ease-out`}
                  style={{ width: `${everyone ? Math.max(2, (b.value / everyone) * 100) : 0}%` }}
                />
              </div>
            </div>
          ))}
          <div className="rounded border border-amethyst/50 bg-panel p-5">
            <p className="font-serif text-[30px] text-bone">{saved}% less</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-soft-white/75">
              {seatsHeld} paid seats across {seatTools.length} tools, for {teamSize} people. {usd((everyone - right) * 12)} a year that stays in the business.
              Same tools, same work. The gap is the difference between a hire and a headcount.
            </p>
          </div>
          <p className="text-[12px] text-stone">
            Indicative list prices, September 2026. Check each tool&apos;s pricing page on the day, and write the month down.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { t: "Daily", d: "Opens it most working days. Paid seat." },
          { t: "Weekly", d: "Free tier. Weekly use almost always fits." },
          { t: "Never", d: "Nothing. A real answer, and often a third of the company." },
        ].map((x) => (
          <div key={x.t} className="rounded border border-dark-border px-4 py-3">
            <p className="font-serif text-[16px] text-bone">{x.t}</p>
            <p className="mt-1 text-[13px] text-stone">{x.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 6: review ───────────────────────────────────────────────────────

function Review() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [why, setWhy] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const words = why.trim() ? why.trim().split(/\s+/) : [];
  const feeling = words.some((w) => feelingWords.includes(w.toLowerCase().replace(/[^a-z]/g, "")));

  const reviewDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d;
  }, []);
  const ymd = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");
  const end = new Date(reviewDate);
  end.setDate(end.getDate() + 1);
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "AI stack review (20 min)"
  )}&dates=${ymd(reviewDate)}/${ymd(end)}&details=${encodeURIComponent(
    "1. What got used? 2. What did not? 3. What changed? Then one word per tool: Keep, Cut, Upgrade, Downgrade."
  )}`;

  return (
    <div className="space-y-10">
      <div className="rounded border border-dark-border bg-panel p-6">
        <p className="eyebrow text-dusk">The overlap test</p>
        <p className="mt-2 text-[15px] text-soft-white/85">Take two tools you pay for. Say the difference in one sentence.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input value={a} onChange={(e) => setA(e.target.value)} placeholder="Tool one" className="rounded border border-dark-border bg-obsidian px-3 py-2 text-[14px] text-bone outline-none placeholder:text-stone focus:border-amethyst" />
          <input value={b} onChange={(e) => setB(e.target.value)} placeholder="Tool two" className="rounded border border-dark-border bg-obsidian px-3 py-2 text-[14px] text-bone outline-none placeholder:text-stone focus:border-amethyst" />
        </div>
        <input
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder={`${a || "Tool one"} does ___, ${b || "tool two"} does ___`}
          className="mt-3 w-full rounded border border-dark-border bg-obsidian px-3 py-2 text-[14px] text-bone outline-none placeholder:text-stone focus:border-amethyst"
        />
        {words.length > 0 && (
          <p role="status" className={`mt-3 text-[13.5px] ${feeling ? "text-[#e29a9a]" : "text-dusk"}`}>
            {feeling
              ? "That is a difference in taste, not in job. One of them goes."
              : words.length < 6
                ? "Keep going. A real difference names what each one does."
                : "That is a real difference. Now ask the second question: is it worth the extra seats every month?"}
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow text-stone">Twenty minutes, once a quarter</p>
          <ol className="mt-4 space-y-3">
            {reviewQuestions.map((r, i) => (
              <li key={r.q} className="flex gap-4 rounded border border-dark-border px-4 py-3">
                <span className="font-serif text-[17px] text-amethyst">{i + 1}</span>
                <span>
                  <span className="block text-[14.5px] text-bone">{r.q}</span>
                  <span className="text-[13px] text-stone">{r.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="eyebrow text-stone">Then one word per tool</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {reviewOutcomes.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setPicked(o)}
                className={`rounded border px-3 py-3 font-serif text-[18px] transition-all ${
                  picked === o ? "scale-[1.03] border-amethyst bg-amethyst/20 text-bone" : "border-dark-border text-soft-white/80 hover:border-amethyst/60"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-stone">
            {picked === "Downgrade"
              ? "Good default when you have argued about one tool for more than a minute. Revisit next quarter."
              : "Arguing about one tool for more than a minute? The answer is downgrade."}
          </p>
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded bg-amethyst px-4 py-2.5 text-[13.5px] text-bone transition-opacity hover:opacity-90"
          >
            Add the review to Google Calendar ({reviewDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}) →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── The one page ─────────────────────────────────────────────────────────

const seatFor: Record<string, number | "free" | "usage" | "included"> = {
  write: 0,
  web: 1,
  meetings: 2,
  images: 3,
  tools: 4,
  video: 5,
  docs: "free",
  recurring: "usage",
  decks: "included",
};

function OnePage({ state, capUsed, onReset }: { state: State; capUsed: (c: Capability) => boolean; onReset: () => void }) {
  const rows = needs.filter((n) => capUsed(n.cap));
  const review = new Date();
  review.setDate(review.getDate() + 90);
  const right =
    seatTools.reduce((n, t, i) => n + Math.min(state.daily[i], state.teamSize) * t.price, 0) + state.usage;

  const seatLabel = (id: string) => {
    const v = seatFor[id];
    if (v === "free") return "Free / included";
    if (v === "usage") return "Usage budget";
    if (v === "included") return "In the assistant seat";
    const n = Math.min(state.daily[v], state.teamSize);
    return n === 0 ? "Free tier" : `${n} paid`;
  };

  const text = [
    "MY AI STACK",
    ...rows.map((n) => {
      const ex = n.exception(state.settings);
      return `${n.label}: ${n.defaultTool(state.settings)}${ex ? ` | exception: ${ex.tool} (${ex.job})` : ""} | seats: ${seatLabel(n.id)}`;
    }),
    `Monthly: about ${usd(right)} for ${state.teamSize} people`,
    `Next review: ${review.toDateString()}`,
  ].join("\n");

  return (
    <section id="one-page" aria-labelledby="one-page-h" className="scroll-mt-24">
      <div className="rounded border border-amethyst/60 bg-panel p-6 md:p-8 print:border-black">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-dusk">Your one page</p>
            <h2 id="one-page-h" className="mt-2 font-serif text-[28px] tracking-[-0.015em] text-bone md:text-[34px]">
              Which tool, for which task.
            </h2>
            <p className="mt-1 text-[14px] text-stone">Built from your answers above. Change anything and this page updates.</p>
          </div>
          <div className="flex gap-2 print:hidden">
            <CopyButton text={text} label="Copy as text" />
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded border border-dark-border px-2.5 py-1 text-[11.5px] tracking-[0.04em] text-stone transition-colors hover:border-amethyst/60 hover:text-bone"
            >
              Print
            </button>
          </div>
        </div>

        {rows.length === 0 ? (
          <p className="mt-6 text-[14.5px] text-stone">Add tasks and capabilities in step 1 to fill this page.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-dark-border text-[11px] uppercase tracking-[0.14em] text-stone">
                  <th className="py-2 pr-4 font-medium">Need</th>
                  <th className="py-2 pr-4 font-medium">Default</th>
                  <th className="py-2 pr-4 font-medium">Exception</th>
                  <th className="py-2 font-medium">Seats</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((n) => {
                  const ex = n.exception(state.settings);
                  return (
                    <tr key={n.id} className="border-b border-dark-border last:border-b-0">
                      <td className="py-3 pr-4 text-[14px] text-soft-white/85">{n.label}</td>
                      <td className="py-3 pr-4 text-[14px] text-bone">{n.defaultTool(state.settings)}</td>
                      <td className="py-3 pr-4 text-[13.5px] text-stone">{ex ? `${ex.tool} · "${ex.job}"` : "None"}</td>
                      <td className="py-3 text-[13.5px] text-soft-white/85">{seatLabel(n.id)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-dark-border pt-5 text-[14px]">
          <span className="text-stone">
            Monthly: <span className="text-bone">about {usd(right)}</span> for {state.teamSize} people
          </span>
          <span className="text-stone">
            Next review:{" "}
            <span className="text-bone">{review.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          </span>
          <button type="button" onClick={onReset} className="ml-auto text-[12.5px] text-stone hover:text-soft-white print:hidden">
            Start over with the example
          </button>
        </div>
      </div>
      <p className="mt-8 font-serif text-[24px] leading-snug tracking-[-0.01em] text-bone md:text-[28px]">
        One page. Every tool has a task. Checked every quarter.
      </p>
    </section>
  );
}
