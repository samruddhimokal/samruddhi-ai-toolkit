import type { Metadata } from "next";
import {
  promptTemplate,
  strategyRows,
  promptGroups,
  promptGuides,
  jsonFields,
  jsonTricks,
  jsonExamples,
  jsonifierPrompt,
  paragraphVsJson,
} from "@/data/prompts";
import { PageHeader, PageBody, JumpNav, Section, LinkCard, CardGrid, NextStep } from "@/components/ui";
import { CopyButton } from "@/components/CopyButton";
import { JsonExamples } from "@/components/JsonExamples";

export const metadata: Metadata = {
  title: "Prompts: the 5 elements, 15 advanced prompts, and JSON for image and video",
  description:
    "Text prompts for thinking and writing, JSON prompts for images and video. 15 copy-ready prompts and 6 JSON templates for Midjourney, GPT Image, Nano Banana, Veo, Sora, and Kling.",
};

const templateText = promptTemplate.map((p) => `${p.part}: ${p.example}`).join("\n");
const promptCount = promptGroups.reduce((n, g) => n + g.prompts.length, 0);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "");

export default function PromptsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prompts"
        title="Two ways to prompt. Know which one you need."
        blurb={`Text prompts for thinking, writing, and research. JSON prompts for images and video, where you need precision on ten things at once. ${promptCount} prompts and ${jsonExamples.length} JSON templates, all copy-ready. Fill in the [brackets].`}
      >
        <JumpNav
          items={[
            { id: "strategy", label: "Text or JSON" },
            { id: "elements", label: "The 5 elements" },
            ...promptGroups.map((g) => ({ id: slug(g.label), label: g.label })),
            { id: "json", label: "JSON for image & video" },
            { id: "guides", label: "Official guides" },
          ]}
        />
      </PageHeader>

      <PageBody>
        <Section
          id="strategy"
          title="Text or JSON?"
          blurb="80% of your daily AI use is text. JSON is the tool for visual work, where many details must land at once."
        >
          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <div className="overflow-hidden rounded border border-dark-border">
              {strategyRows.map((r) => (
                <div
                  key={r.task}
                  className="flex items-center justify-between gap-4 border-b border-dark-border px-5 py-3 last:border-b-0"
                >
                  <span className="text-[14.5px] text-soft-white/85">{r.task}</span>
                  <span
                    className={`shrink-0 rounded px-2 py-0.5 text-[11.5px] tracking-[0.06em] ${
                      r.approach === "JSON"
                        ? "bg-amethyst/20 text-dusk"
                        : r.approach === "Text"
                          ? "border border-dark-border text-stone"
                          : "border border-amethyst/40 text-soft-white/70"
                    }`}
                  >
                    {r.approach}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded border border-dark-border border-l-2 border-l-amethyst bg-panel p-6">
              <p className="eyebrow text-dusk">The rule</p>
              <p className="mt-3 font-serif text-[22px] leading-snug tracking-[-0.01em] text-bone">
                Words for thinking. Structure for seeing.
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-stone">
                A long paragraph about a video buries the camera move in the middle, and the model drops it. JSON gives
                every visual decision its own field, so nothing gets ignored.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="elements"
          title="The 5 elements of a great text prompt"
          blurb="Take your last vague prompt and rewrite it with all five. Compare the answers. You will not go back."
        >
          <div className="overflow-hidden rounded border border-dark-border">
            <div className="flex items-center justify-between border-b border-dark-border bg-panel px-5 py-3">
              <span className="eyebrow text-stone">Template</span>
              <CopyButton text={templateText} label="Copy example" />
            </div>
            <dl className="divide-y divide-dark-border">
              {promptTemplate.map((p, i) => (
                <div key={p.part} className="grid gap-1 px-5 py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <dt className="font-serif text-[17px] text-bone">
                    <span className="mr-2 text-amethyst">{i + 1}</span>
                    {p.part}
                  </dt>
                  <dd>
                    <p className="text-[14px] text-stone">{p.ask}</p>
                    <p className="mt-1 text-[14.5px] text-soft-white/85">{p.example}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {promptGroups.map((g) => (
          <Section key={g.label} id={slug(g.label)} title={g.label} count={g.prompts.length}>
            <div className="grid gap-4 lg:grid-cols-2">
              {g.prompts.map((p) => (
                <article
                  key={p.id}
                  id={p.id}
                  className="flex scroll-mt-24 flex-col rounded border border-dark-border bg-panel"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-dark-border px-5 py-3.5">
                    <div>
                      <p className="text-[11px] tracking-[0.06em] text-stone">{p.task}</p>
                      <h3 className="font-serif text-[18px] tracking-[-0.01em] text-bone">{p.title}</h3>
                      <p className="mt-1 text-[13px] leading-snug text-dusk/90">{p.why}</p>
                    </div>
                    <CopyButton text={p.prompt} />
                  </div>
                  <pre className="flex-1 whitespace-pre-wrap px-5 py-4 font-sans text-[13.5px] leading-relaxed text-soft-white/80">
                    {p.prompt}
                  </pre>
                </article>
              ))}
            </div>
          </Section>
        ))}

        <Section
          id="json"
          title="JSON prompts for image and video"
          blurb="The structure most people never use. Same idea, ten times the control."
        >
          <div className="space-y-14">
            {/* Paragraph vs JSON */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded border border-dark-border bg-panel p-5">
                <p className="eyebrow text-stone">What most people type</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-soft-white/70">{paragraphVsJson.paragraph}</p>
                <p className="mt-4 text-[12.5px] text-stone">
                  Which camera move? When does the grab happen? What music? The model guesses.
                </p>
              </div>
              <div className="rounded border border-amethyst/50 bg-panel">
                <div className="flex items-center justify-between border-b border-dark-border px-5 py-3">
                  <span className="eyebrow text-dusk">The same idea as JSON</span>
                  <CopyButton text={paragraphVsJson.json} />
                </div>
                <pre className="whitespace-pre-wrap break-words px-5 py-4 font-mono text-[12.5px] leading-relaxed text-soft-white/85">
                  {paragraphVsJson.json}
                </pre>
              </div>
            </div>

            {/* Fields */}
            <div>
              <h3 className="font-serif text-[22px] tracking-[-0.01em] text-bone">The fields</h3>
              <p className="mt-1.5 max-w-xl text-[14px] text-stone">
                Use the ones your shot needs. The marked fields are the ones people leave out, and they make the biggest
                difference.
              </p>
              <dl className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {jsonFields.map((f) => (
                  <div key={f.key} className="flex gap-4 border-b border-dark-border py-3.5">
                    <dt className="w-32 shrink-0 font-mono text-[13px] text-bone">
                      {f.key}
                      {f.missed && (
                        <span className="mt-1 block font-sans text-[10.5px] uppercase tracking-[0.14em] text-dusk">
                          Most skip
                        </span>
                      )}
                    </dt>
                    <dd className="text-[13.5px] leading-snug text-soft-white/75">{f.does}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Tricks */}
            <div>
              <h3 className="font-serif text-[22px] tracking-[-0.01em] text-bone">Four moves that change the output</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {jsonTricks.map((t, i) => (
                  <div key={t.title} className="rounded border border-dark-border bg-panel p-5">
                    <p className="font-serif text-[15px] text-amethyst">0{i + 1}</p>
                    <p className="mt-1 font-serif text-[18px] tracking-[-0.01em] text-bone">{t.title}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-soft-white/75">{t.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Examples */}
            <div>
              <h3 className="font-serif text-[22px] tracking-[-0.01em] text-bone">Six templates to copy</h3>
              <p className="mt-1.5 max-w-xl text-[14px] text-stone">
                Paste as-is into the tool, or swap the product and the scene. JSON is read as structured text, so it works
                anywhere you can type a prompt.
              </p>
              <div className="mt-6">
                <JsonExamples examples={jsonExamples} />
              </div>
            </div>

            {/* JSON-ifier */}
            <div className="overflow-hidden rounded border border-dark-border border-l-2 border-l-amethyst">
              <div className="flex items-start justify-between gap-3 border-b border-dark-border bg-panel px-5 py-4">
                <div>
                  <p className="eyebrow text-dusk">Shortcut</p>
                  <h3 className="mt-1 font-serif text-[20px] tracking-[-0.01em] text-bone">
                    Let your assistant write the JSON
                  </h3>
                  <p className="mt-1 text-[13.5px] text-stone">
                    Paste this into Claude, ChatGPT, or Gemini with a one-line idea. Take the JSON to your image or video
                    tool.
                  </p>
                </div>
                <CopyButton text={jsonifierPrompt} />
              </div>
              <pre className="whitespace-pre-wrap px-5 py-4 font-sans text-[13.5px] leading-relaxed text-soft-white/80">
                {jsonifierPrompt}
              </pre>
            </div>
          </div>
        </Section>

        <Section id="guides" title="Official prompting guides" blurb="Straight from the companies that make the models.">
          <CardGrid>
            {promptGuides.map((g) => (
              <LinkCard key={g.url} href={g.url} eyebrow={g.by} title={g.name} body={g.why} cta="Read →" />
            ))}
          </CardGrid>
        </Section>

        <NextStep href="/tool-planner" label="Plan your AI tools" />
      </PageBody>
    </>
  );
}
