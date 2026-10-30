// Prompt starter pack. Works in ChatGPT, Claude, Gemini, or Copilot.
// Template parts map onto the official guides from Google (Persona, Task,
// Context, Format), Microsoft (Goal, Context, Source, Expectations) and
// Anthropic (clarity, examples, structure, step-by-step).

export interface TemplatePart {
  part: string;
  ask: string;
  example: string;
}

export const promptTemplate: TemplatePart[] = [
  { part: "Role", ask: "Who should the AI act as?", example: "Act as a senior B2B marketing strategist." },
  { part: "Task", ask: "What exactly do you want?", example: "Write three subject lines for our product launch email." },
  { part: "Context", ask: "What does it need to know?", example: "We sell payroll software to Indian startups with 20 to 200 staff." },
  { part: "Input", ask: "What material should it use?", example: "Use the launch notes pasted below." },
  { part: "Format", ask: "What should the answer look like?", example: "A table with subject line, angle, and expected open rate." },
  { part: "Constraints", ask: "What should it avoid or respect?", example: "Under 50 characters. No emojis. No exclamation marks." },
  { part: "Examples", ask: "What does good look like?", example: "Here is a subject line that worked last quarter: ..." },
  { part: "Iterate", ask: "How will you refine it?", example: "Ask me two questions first if anything is unclear." },
];

export interface StarterPrompt {
  id: string;
  title: string;
  task: string;
  prompt: string;
}

export interface PromptGroup {
  label: string;
  prompts: StarterPrompt[];
}

export const promptGroups: PromptGroup[] = [
  {
    label: "Write & edit",
    prompts: [
      {
        id: "edit-draft",
        title: "Tighten a draft",
        task: "Editing",
        prompt: `Act as a sharp editor. Edit the draft below so it is clearer and shorter without changing my meaning or voice.

Return:
1. The edited version.
2. A short list of the biggest changes and why.

Rules: cut filler words, use short sentences, keep any numbers and names exactly as written.

Draft:
[paste your text]`,
      },
      {
        id: "email-reply",
        title: "Reply to a tricky email",
        task: "Email",
        prompt: `Act as a calm, professional communicator. Draft a reply to the email below.

My goal: [what you want to happen]
Tone: [warm / firm / formal]
Must include: [key points]

Give me two versions: one short (under 80 words) and one fuller. Do not promise anything I have not listed.

Email:
[paste the email]`,
      },
      {
        id: "rewrite-audience",
        title: "Rewrite for a different audience",
        task: "Editing",
        prompt: `Rewrite the text below for [audience, e.g. a CEO with 2 minutes / a new hire / a customer].

Keep: the facts and the main recommendation.
Change: the vocabulary, length, and order so it suits that reader.
Format: [one paragraph / 5 bullets / a short email].

Text:
[paste your text]`,
      },
    ],
  },
  {
    label: "Summarize & understand",
    prompts: [
      {
        id: "summarize-doc",
        title: "Summarize a long document",
        task: "Summarizing",
        prompt: `Summarize the document below for a busy reader.

Format:
- One-line summary
- 5 key points
- Decisions or actions required, with owners if named
- Anything that seems missing, unclear, or risky

Quote the exact sentence for any number you include.

Document:
[paste text or attach the file]`,
      },
      {
        id: "meeting-notes",
        title: "Turn a meeting transcript into notes",
        task: "Meetings",
        prompt: `Turn this meeting transcript into clean notes.

Sections:
1. Decisions made
2. Action items (owner, task, due date if mentioned)
3. Open questions
4. A 3-sentence summary I can send to people who missed it

Only use what is in the transcript. If an owner or date is not stated, write "not stated".

Transcript:
[paste transcript]`,
      },
      {
        id: "explain-simply",
        title: "Explain something simply",
        task: "Learning",
        prompt: `Explain [topic] to me as if I am smart but new to it.

1. Start with a one-sentence definition.
2. Give an everyday analogy.
3. Explain how it works in 3 to 5 steps.
4. Tell me the 2 most common misconceptions.
5. Ask me one question to check I understood.`,
      },
    ],
  },
  {
    label: "Research & decide",
    prompts: [
      {
        id: "research-brief",
        title: "Research brief",
        task: "Research",
        prompt: `Act as a research analyst. Build a brief on [topic / company / market].

Cover:
- What it is and why it matters now
- Key players and how they differ
- Recent developments (with dates)
- Open questions and risks

Cite a source link for every factual claim. If you are not sure about something, say so instead of guessing.`,
      },
      {
        id: "compare-options",
        title: "Compare options",
        task: "Decisions",
        prompt: `Help me choose between [option A], [option B], and [option C] for [goal].

My priorities, in order: [e.g. cost, speed, ease of use].
My constraints: [budget, team size, deadline].

Return a comparison table, then a recommendation with the main reason, then what would change your recommendation.`,
      },
      {
        id: "pressure-test",
        title: "Pressure-test my plan",
        task: "Decisions",
        prompt: `Act as a skeptical advisor. Here is my plan:
[paste plan]

1. List the 5 biggest risks or weak assumptions.
2. For each, give one way to test it cheaply this week.
3. Tell me what a strong critic would say, in their words.

Be direct. Do not soften the feedback.`,
      },
    ],
  },
  {
    label: "Create & plan",
    prompts: [
      {
        id: "brainstorm",
        title: "Brainstorm ideas",
        task: "Ideas",
        prompt: `Brainstorm 15 ideas for [goal] for [audience].

Mix: 5 safe, 5 bold, 5 unusual.
For each idea: one line on what it is and one line on why it could work.
Then pick your top 3 and explain the choice.`,
      },
      {
        id: "project-plan",
        title: "Plan a project",
        task: "Planning",
        prompt: `Help me plan [project] that needs to be done by [date].

Team: [who is involved]
Constraints: [budget, tools, dependencies]

Return a week-by-week plan with milestones, owners, and the first 3 tasks I should do today. Flag any step that is likely to slip.`,
      },
      {
        id: "social-post",
        title: "Turn an idea into a post",
        task: "Content",
        prompt: `Turn the idea below into a [LinkedIn post / X thread / newsletter section].

Audience: [who]
Goal: [teach / start a discussion / share a result]
Voice: [describe or paste a past post you like]

Give me 3 hook options and one full draft. Keep sentences short. No hashtags unless I ask.

Idea:
[paste notes]`,
      },
    ],
  },
  {
    label: "Data & automation",
    prompts: [
      {
        id: "analyze-data",
        title: "Analyze a spreadsheet",
        task: "Data",
        prompt: `I am attaching a spreadsheet about [what it contains].

1. Describe what the data covers and any quality issues (blanks, duplicates, odd values).
2. Find the 3 most important patterns or changes.
3. Suggest one chart that would show the main insight, and why.

Show the numbers you used for every claim.`,
      },
      {
        id: "spreadsheet-formula",
        title: "Write a spreadsheet formula",
        task: "Data",
        prompt: `I use [Google Sheets / Excel]. My data is in columns: [describe each column].

I want a formula that [describe the result].

Give me the formula, explain each part in plain English, and show what it returns for one example row.`,
      },
      {
        id: "find-automation",
        title: "Find what to automate",
        task: "Automation",
        prompt: `Here is how I spend a typical work week:
[list your recurring tasks and roughly how long each takes]

1. Rank the tasks by how well AI or automation could help.
2. For the top 3, describe a simple workflow (trigger, steps, output) I could build in a tool like n8n or Zapier.
3. Estimate the hours saved per week, and tell me what still needs a human.`,
      },
    ],
  },
];

export interface Guide {
  name: string;
  by: string;
  url: string;
  why: string;
}

export const promptGuides: Guide[] = [
  { name: "Prompt engineering overview", by: "Anthropic", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview", why: "Clear, example-led techniques. Works beyond Claude." },
  { name: "Prompting guide", by: "OpenAI", url: "https://platform.openai.com/docs/guides/prompt-engineering", why: "Official strategies for getting better results." },
  { name: "Gemini prompt guide for Workspace", by: "Google", url: "https://workspace.google.com/learning/content/gemini-prompt-guide", why: "Role-by-role prompts for Gmail, Docs, and Sheets." },
  { name: "Writing prompts in Microsoft 365 Copilot", by: "Microsoft", url: "https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5", why: "Goal, context, source, expectations. Simple and practical." },
];
