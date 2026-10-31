// AI Tool Planner: Samruddhi's six-step method for picking AI tools,
// rebuilt as an interactive page. Defaults, prices, and privacy notes are her
// calls as of September 2026. Prices are indicative list prices in USD.

export type Capability = "write" | "research" | "automate" | "build" | "create";
export type Frequency = "daily" | "weekly" | "monthly";

export const capabilities: { id: Capability; label: string; seat: string }[] = [
  { id: "write", label: "Write", seat: "assistant" },
  { id: "research", label: "Research", seat: "researcher" },
  { id: "automate", label: "Automate", seat: "operator" },
  { id: "build", label: "Build", seat: "builder" },
  { id: "create", label: "Create visuals", seat: "specialist" },
];

export const frequencyWeight: Record<Frequency, number> = { daily: 3, weekly: 2, monthly: 1 };

export interface Task {
  id: string;
  text: string;
  caps: Capability[];
  freq: Frequency;
}

// Worked example: a 14-person consulting firm.
export const exampleTeamSize = 14;
export const exampleTasks: Task[] = [
  { id: "t1", text: "Proposals and client emails", caps: ["write"], freq: "daily" },
  { id: "t2", text: "Notes and follow-ups after client calls", caps: ["write", "automate"], freq: "daily" },
  { id: "t3", text: "Research a prospect before a call", caps: ["research"], freq: "weekly" },
  { id: "t4", text: "Find answers in our own past reports", caps: ["research"], freq: "weekly" },
  { id: "t5", text: "Weekly status update to each client", caps: ["automate", "write"], freq: "weekly" },
  { id: "t6", text: "Workshop slides and one-pagers", caps: ["write", "create"], freq: "weekly" },
  { id: "t7", text: "LinkedIn posts with a visual", caps: ["write", "create"], freq: "weekly" },
  { id: "t8", text: "Invoice reminders", caps: ["automate"], freq: "monthly" },
  { id: "t9", text: "Internal project tracker", caps: ["build"], freq: "monthly" },
];

// Names that should not appear in step 1. Name the task, not the tool.
export const toolNames = [
  "chatgpt", "claude", "gemini", "copilot", "perplexity", "notebooklm", "granola", "fathom", "fireflies",
  "n8n", "zapier", "make.com", "lovable", "gamma", "midjourney", "heygen", "canva", "notion", "grok",
];

export interface Seat {
  id: string;
  name: string;
  job: string;
  note: string;
}

export const seats: Seat[] = [
  { id: "assistant", name: "Assistant", job: "Thinks and writes with you.", note: "Works while you work. Stops when you close the laptop." },
  { id: "researcher", name: "Researcher", job: "Finds things and shows its sources.", note: "Two jobs: search the web, or answer only from your own files." },
  { id: "operator", name: "Operator", job: "Runs recurring work without you.", note: "Works while you sleep. The Monday report sends itself." },
  { id: "builder", name: "Builder", job: "Makes small tools and pages.", note: "Most small teams leave this seat empty for months. That is fine." },
  { id: "specialist", name: "Specialist", job: "Images, video, and voice.", note: "Bought per need for the people who make visuals. Never for everyone." },
];

export const wrongHires = [
  { title: "Operator work given to the Assistant", body: "Someone pastes the same numbers into a chat every Monday and asks for a summary. It works, and it costs a person 20 minutes a week, forever." },
  { title: "A Builder hired to do the Assistant's job", body: "The demo was impressive, so the team bought an app builder. What they needed was better writing. The tool sits unused." },
  { title: "Research with no sources", body: "Client research done in a chat window, pasted into a proposal. Then the client asks where a number came from, and nobody knows." },
];

export type Workspace = "google" | "microsoft" | "other";

export interface Settings {
  workspace: Workspace;
  technical: boolean;
  solo: boolean;
}

export interface Need {
  id: string;
  label: string;
  cap: Capability;
  defaultTool: (s: Settings) => string;
  exception: (s: Settings) => { tool: string; job: string } | null;
}

export const needs: Need[] = [
  {
    id: "write",
    label: "Write and edit",
    cap: "write",
    defaultTool: (s) => (s.workspace === "microsoft" ? "Microsoft 365 Copilot (if your company pays for it), else Claude" : "Claude"),
    exception: (s) => (s.workspace === "google" ? { tool: "Gemini in Gmail and Docs", job: "writes inside Gmail all day" } : null),
  },
  { id: "web", label: "Research the web", cap: "research", defaultTool: () => "Perplexity", exception: () => null },
  { id: "docs", label: "Research your own documents", cap: "research", defaultTool: () => "NotebookLM", exception: () => null },
  {
    id: "meetings",
    label: "Meeting notes",
    cap: "write",
    defaultTool: (s) => (s.solo ? "Fathom (free)" : "Granola"),
    exception: (s) => (s.solo ? null : { tool: "Fireflies", job: "shared, searchable call library" }),
  },
  {
    id: "recurring",
    label: "Recurring work between apps",
    cap: "automate",
    defaultTool: (s) =>
      s.workspace === "microsoft" ? "Power Automate" : s.technical ? "n8n (self-hosted)" : "Zapier",
    exception: (s) =>
      s.workspace !== "microsoft" && s.technical ? { tool: "Zapier", job: "non-technical teammate builds flows" } : null,
  },
  { id: "tools", label: "Internal tools and pages", cap: "build", defaultTool: () => "Lovable", exception: () => null },
  {
    id: "decks",
    label: "Decks and one-pagers",
    cap: "write",
    defaultTool: () => "Claude Design (inside your Claude seat)",
    exception: (s) => (s.workspace === "google" ? { tool: "Gemini in Docs", job: "SOPs that live in Docs" } : null),
  },
  {
    id: "images",
    label: "Images",
    cap: "create",
    defaultTool: () => "Gemini image, paid tier (Nano Banana)",
    exception: () => ({ tool: "Midjourney", job: "mood and concept art" }),
  },
  {
    id: "video",
    label: "Video",
    cap: "create",
    defaultTool: () => "HeyGen",
    exception: () => ({ tool: "Higgsfield", job: "product motion, many models" }),
  },
];

// Step 3: the background check.
export const sensitiveData = [
  { id: "customer", label: "Customer names, phones, addresses" },
  { id: "payment", label: "Payment and finance data" },
  { id: "client", label: "Client documents under NDA" },
  { id: "creative", label: "Unreleased products and creatives" },
] as const;

export type DataKind = (typeof sensitiveData)[number]["id"];

export interface PolicyNote {
  tool: string;
  verdict: "pass" | "fix" | "out";
  note: string;
  /** Which kinds of data make this note matter */
  affects: DataKind[] | "all";
}

export const policyNotes: PolicyNote[] = [
  { tool: "Claude Team, ChatGPT Business", verdict: "pass", note: "Business plans do not train on your data by default. Admin controls and export.", affects: "all" },
  { tool: "Gemini in Workspace", verdict: "pass", note: "Does not train on your Workspace content.", affects: "all" },
  { tool: "n8n, self-hosted", verdict: "pass", note: "Runs on your own server, so customer and payment data never leaves.", affects: ["customer", "payment"] },
  { tool: "Granola", verdict: "fix", note: "Trains by default. Switch the training toggle off on day one.", affects: ["client", "customer"] },
  { tool: "HeyGen", verdict: "fix", note: "Trains by default. Send the opt-out on day one.", affects: ["creative", "customer"] },
  { tool: "Gemini image, free tier", verdict: "fix", note: "The free tier trains on your uploads. Use the paid tier for real products.", affects: ["creative"] },
  { tool: "Midjourney", verdict: "fix", note: "Images are public unless you pay for stealth mode.", affects: ["creative"] },
  { tool: "Gamma", verdict: "fix", note: "May train on content below the business plan. Add real numbers after export.", affects: ["client"] },
  { tool: "Base44", verdict: "out", note: "Trains on data below Enterprise, with no opt-out. Public pages only.", affects: ["customer", "client"] },
  { tool: "Flux via API", verdict: "out", note: "API terms grant a licence to train on what you upload.", affects: ["creative"] },
  { tool: "Arcads", verdict: "out", note: "Trains on your uploads with no opt-out.", affects: ["creative", "customer"] },
];

export const gateQuestions = [
  { q: "Can this data go in?", detail: "Training off, or off by default. Admin controls. You know where it is stored." },
  { q: "Can it reach where the work lives?", detail: "If your team lives in Gmail and Sheets, a tool that cannot see them adds a copy-paste step. That step is where adoption dies." },
  { q: "Can you get your data back out?", detail: "A real export, not screenshots. If you cannot leave, you have a landlord, not a tool." },
];

// Step 4: the interview.
export type Score = 1 | 2 | 3;

export interface Candidate {
  tool: string;
  dataGate: boolean;
  integrationGate: boolean;
  quality: Score;
  ease: Score;
  cost: Score;
  risk: Score;
  why: string;
}

export const interviews: { need: string; freq: Frequency; candidates: Candidate[] }[] = [
  {
    need: "Meeting notes",
    freq: "daily",
    candidates: [
      { tool: "Granola", dataGate: true, integrationGate: true, quality: 3, ease: 3, cost: 2, risk: 3, why: "No bot joins the call. Notes build on what you type." },
      { tool: "Fireflies", dataGate: true, integrationGate: true, quality: 3, ease: 2, cost: 2, risk: 3, why: "Bot records, whole team can search every call." },
      { tool: "Fathom", dataGate: true, integrationGate: true, quality: 1, ease: 3, cost: 3, risk: 3, why: "Free unlimited recording, few smart summaries a month." },
    ],
  },
  {
    need: "Research the web",
    freq: "weekly",
    candidates: [
      { tool: "Perplexity", dataGate: true, integrationGate: true, quality: 3, ease: 3, cost: 3, risk: 3, why: "Built for cited answers. Ask and read." },
      { tool: "Genspark", dataGate: true, integrationGate: false, quality: 3, ease: 2, cost: 2, risk: 2, why: "Strong agent, confusing credits. Drive link undocumented." },
      { tool: "ChatGPT with search", dataGate: true, integrationGate: true, quality: 2, ease: 3, cost: 2, risk: 3, why: "Good deep research, weaker everyday citations. A second seat." },
    ],
  },
  {
    need: "Recurring work between apps",
    freq: "weekly",
    candidates: [
      { tool: "n8n", dataGate: true, integrationGate: true, quality: 3, ease: 2, cost: 3, risk: 3, why: "Self-host it and data stays home. Needs one technical person." },
      { tool: "Zapier", dataGate: true, integrationGate: true, quality: 2, ease: 3, cost: 2, risk: 3, why: "Anyone can build in ten minutes. Per-task pricing adds up." },
      { tool: "Make", dataGate: true, integrationGate: true, quality: 2, ease: 2, cost: 3, risk: 3, why: "Cheap and visual. Overlaps both of the others." },
    ],
  },
  {
    need: "Product images",
    freq: "weekly",
    candidates: [
      { tool: "Gemini image (paid)", dataGate: true, integrationGate: true, quality: 3, ease: 3, cost: 3, risk: 2, why: "Keeps a real product looking real, gets packaging text right." },
      { tool: "Midjourney", dataGate: true, integrationGate: true, quality: 2, ease: 2, cost: 2, risk: 2, why: "Best for mood. Weak at exact products." },
      { tool: "Flux via API", dataGate: false, integrationGate: true, quality: 3, ease: 1, cost: 3, risk: 2, why: "Excellent model. Training licence on uploads." },
    ],
  },
];

// Step 5: headcount. Indicative monthly list prices, September 2026.
export interface SeatTool {
  tool: string;
  price: number;
  /** Daily users in the worked example */
  exampleDaily: number;
}

export const seatTools: SeatTool[] = [
  { tool: "Claude Team", price: 25, exampleDaily: 8 },
  { tool: "Perplexity Pro", price: 20, exampleDaily: 3 },
  { tool: "Granola", price: 14, exampleDaily: 6 },
  { tool: "Google AI Pro (images)", price: 20, exampleDaily: 1 },
  { tool: "Lovable Pro", price: 25, exampleDaily: 1 },
  { tool: "HeyGen Creator", price: 29, exampleDaily: 0 },
];

export const exampleUsageBudget = 40;

// Step 6: the review.
export const reviewQuestions = [
  { q: "What got used?", detail: "Open each tool's admin or billing page and check last login. Not memory, the page." },
  { q: "What did not?", detail: "No login in 30 days means cancel the seat, or move that person to the free tier." },
  { q: "What changed?", detail: "Ten minutes per tool on its changelog: a better model, a new feature, a price or privacy change." },
];

export const reviewOutcomes = ["Keep", "Cut", "Upgrade", "Downgrade"];

// Words that usually mean a feeling, not a job, in the five-word and overlap tests.
export const feelingWords = ["like", "likes", "prefer", "better", "faster", "nicer", "cool", "easier", "love", "loves", "newer", "cheaper"];

export const prompts = {
  tagTasks: `Here is a messy list of what my team does every week. Turn it into a table with four columns: the task in five words or less, the capability it needs (write, research, automate, build, create visuals, or a mix), how often it happens (daily, weekly, monthly), and who does it.

Keep my wording. Do not name any tools. If one task needs two capabilities, say so.

Tasks:
[paste your list, messy is fine]`,
  scorecard: `Using my task list, score these tools for one need: [need, e.g. "web research with sources"]. Candidates: [tool A], [tool B], [tool C].

Gates, pass or fail: data and privacy (does the paid plan train on our data, are there admin controls), and integrations (does it reach [where we work, e.g. Google Workspace]).
Scores 1 to 3: quality on this exact task, ease of use for [who will use it], cost per person who really uses it, and automation risk (3 = safe with light checks, 1 = never unattended).

Table, one line of reasoning per cell, total out of 12. Mark any score you are unsure about. Do not pick a winner. I will.`,
  seats: `Here is my team with roles, and the task map from earlier. For each person and each tool ([list tools]), mark Daily, Weekly, or Never based on the tasks they own and how often those happen.

Rule: Daily only if they would open the tool on most working days.

Output a table, people down the side, tools across the top, then one line of justification for every Daily.

Team:
[name, role] for each person`,
};
