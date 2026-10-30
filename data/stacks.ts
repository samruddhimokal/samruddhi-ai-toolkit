// AI stacks by role. Categories first, tools as examples.
// Every tool name here must match a name in data/tools.ts so it can open
// the same detail card as the directory.

export interface StackLayer {
  job: string;
  tools: string[];
}

export interface RoleStack {
  id: string;
  label: string;
  blurb: string;
  firstWin: string;
  layers: StackLayer[];
}

// Everyone starts here, whatever the role.
export const coreStack: StackLayer[] = [
  { job: "A general assistant", tools: ["Claude", "ChatGPT", "Gemini"] },
  { job: "Research with sources", tools: ["Perplexity", "NotebookLM"] },
  { job: "Meeting notes", tools: ["Granola", "Fathom"] },
  { job: "Simple automation", tools: ["n8n", "Zapier"] },
];

export const roleStacks: RoleStack[] = [
  {
    id: "founder",
    label: "Founder",
    blurb: "Move fast across strategy, product, and sales with a tiny team.",
    firstWin: "Turn every customer call into notes, then ask an assistant for the top 3 objections this month.",
    layers: [
      { job: "Research and strategy", tools: ["Perplexity", "Genspark", "Manus"] },
      { job: "Build a prototype", tools: ["Lovable", "Bolt", "Replit", "v0"] },
      { job: "Decks and docs", tools: ["Gamma", "Notion"] },
      { job: "Automate the busywork", tools: ["n8n", "Make", "Lindy"] },
      { job: "Take payments", tools: ["Stripe", "Razorpay"] },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    blurb: "Research accounts, personalize outreach, and never lose a call note.",
    firstWin: "Before each call, have an assistant brief you on the company and draft 5 discovery questions.",
    layers: [
      { job: "Find and enrich accounts", tools: ["Apollo", "Clay", "Explorium"] },
      { job: "Outbound at volume", tools: ["Instantly", "Smartlead"] },
      { job: "Call notes and follow-ups", tools: ["Fathom", "Fireflies", "Read AI"] },
      { job: "Voice agents", tools: ["Retell AI", "Vapi"] },
      { job: "Account research", tools: ["Perplexity", "Claude"] },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    blurb: "Produce more content without losing your voice.",
    firstWin: "Turn one long piece (a webinar or blog) into 5 social posts with a single prompt.",
    layers: [
      { job: "Writing and ideas", tools: ["Claude", "ChatGPT"] },
      { job: "Images", tools: ["Midjourney", "Leonardo AI", "Flux"] },
      { job: "Video and avatars", tools: ["HeyGen", "Runway", "Arcads AI"] },
      { job: "Voice and music", tools: ["ElevenLabs", "Suno"] },
      { job: "Schedule and distribute", tools: ["Blotato", "PhantomBuster"] },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    blurb: "Remove repetitive steps and connect your systems.",
    firstWin: "List your 10 most repeated tasks and automate the one that takes the most hours.",
    layers: [
      { job: "Workflow automation", tools: ["n8n", "Make", "Zapier", "Power Automate"] },
      { job: "AI agents for tasks", tools: ["Lindy", "Gumloop", "Dify"] },
      { job: "Data collection", tools: ["Apify", "Firecrawl"] },
      { job: "Docs and project tracking", tools: ["Notion", "ClickUp"] },
      { job: "Process maps", tools: ["Miro", "Excalidraw"] },
    ],
  },
  {
    id: "hr",
    label: "HR & People",
    blurb: "Write faster, interview better, and answer policy questions once.",
    firstWin: "Upload your policies to NotebookLM and let employees ask it questions instead of you.",
    layers: [
      { job: "Job descriptions and policies", tools: ["Claude", "ChatGPT"] },
      { job: "Policy Q&A from your documents", tools: ["NotebookLM"] },
      { job: "Interview notes", tools: ["Granola", "Fathom"] },
      { job: "Onboarding automation", tools: ["n8n", "Zapier"] },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    blurb: "Speed up analysis and reporting while you keep the judgment.",
    firstWin: "Upload last month's numbers and ask for the 3 biggest changes, with the figures shown.",
    layers: [
      { job: "Spreadsheet analysis", tools: ["Claude", "ChatGPT", "Gemini"] },
      { job: "Research and filings", tools: ["Perplexity", "NotebookLM"] },
      { job: "Report automation", tools: ["n8n", "Power Automate"] },
      { job: "Board decks", tools: ["Gamma"] },
    ],
  },
  {
    id: "student",
    label: "Student & learner",
    blurb: "Learn faster without letting AI do the thinking for you.",
    firstWin: "Ask an assistant to quiz you on today's lecture instead of summarizing it.",
    layers: [
      { job: "A study partner", tools: ["Claude", "ChatGPT", "Gemini"] },
      { job: "Study from your own notes", tools: ["NotebookLM"] },
      { job: "Research with sources", tools: ["Perplexity"] },
      { job: "Build your first projects", tools: ["Google AI Studio", "Lovable", "Replit"] },
    ],
  },
];
