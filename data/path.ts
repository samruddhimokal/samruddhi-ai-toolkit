// The 30-day "Start here" path. Four weeks plus a final stretch, one real
// deliverable each. Weekdays 15 to 45 min, weekend project 60 to 90 min.
// Built on spaced practice and self-testing: each week opens with a quiz on
// the week before. Step ids are stable: learners' ticks are saved against them.

export interface PathStep {
  id: string;
  days: string;
  minutes: number;
  do: string;
  /** Link to a resource on this site or an external one */
  href?: string;
  linkLabel?: string;
}

export interface PathWeek {
  week: number;
  label: string;
  theme: string;
  goal: string;
  /** What you can do by the end of the week */
  outcomes: string[];
  steps: PathStep[];
  project: { id: string; title: string; brief: string; doneWhen: string };
  /** The mistake most people make this week */
  trap: string;
}

export const pathSetup = [
  "Pick one assistant (Claude, ChatGPT, or Gemini) and use only that one for all 30 days.",
  "Open a doc called \"AI log\". Every day, write one line: what you tried and what happened.",
  "Choose one real work task you will improve this month. Every week builds toward it.",
  "Block 30 minutes in your calendar on weekdays, and 90 minutes on one weekend day.",
];

export const pathWeeks: PathWeek[] = [
  {
    week: 1,
    label: "Week 1",
    theme: "Understand what AI is",
    goal: "Know what these tools can and cannot do, and where they fit in your week.",
    outcomes: [
      "Explain how a large language model works in plain words",
      "Sort any tool into Think, Create, or Automate",
      "Have one assistant set up with your role and context",
    ],
    steps: [
      { id: "w1d1", days: "Day 1", minutes: 15, do: "Watch 'Large Language Models explained briefly' (8 min). In your AI log, write what surprised you.", href: "https://www.youtube.com/watch?v=LPZh9BOjkQs", linkLabel: "Watch" },
      { id: "w1d2", days: "Day 2", minutes: 20, do: "Read the 'Basics' and 'How models work' sections of the glossary. Pick 3 terms you could explain to a colleague.", href: "/glossary", linkLabel: "Glossary" },
      { id: "w1d3", days: "Day 3", minutes: 45, do: "Watch Karpathy's 'Intro to Large Language Models'. Split it over two sittings if needed.", href: "https://www.youtube.com/watch?v=zjkBMFhNj_g", linkLabel: "Watch" },
      { id: "w1d4", days: "Day 4", minutes: 30, do: "Sign up for your one assistant. Fill in its custom instructions with your role, team, and writing style. Ask it to explain your job back to you.", href: "/#llm-chat", linkLabel: "Assistants" },
      { id: "w1d5", days: "Day 5", minutes: 30, do: "Start Anthropic's AI Fluency course: the first 3 videos.", href: "https://www.youtube.com/playlist?list=PLf2m23nhTg1NjL3-jL3s0qZCYzO07ZQPv", linkLabel: "Course" },
    ],
    project: {
      id: "w1p",
      title: "AI audit of your week",
      brief: "List your 10 most repeated tasks. For each: how often, minutes it takes, its bucket (Think, Create, or Automate), and how much AI could help (high, some, none).",
      doneWhen: "You have a table of 10 tasks and at least 3 marked high.",
    },
    trap: "Trying five tools at once. Pick one assistant and stay with it. Depth beats variety in month one.",
  },
  {
    week: 2,
    label: "Week 2",
    theme: "Use AI on real work",
    goal: "Get reliably good answers on the tasks you actually do.",
    outcomes: [
      "Write prompts with all 5 elements without looking",
      "Know when a task needs a text prompt and when it needs JSON",
      "Own 5 tested prompts for your own work",
    ],
    steps: [
      { id: "w2d8", days: "Day 8", minutes: 10, do: "Quiz: without looking, write what a token, a context window, and a hallucination are. Then check the glossary." },
      { id: "w2d9", days: "Day 9", minutes: 20, do: "Learn the 5 elements of a great prompt. Rewrite your last vague prompt with all five and compare the answers.", href: "/prompts#elements", linkLabel: "5 elements" },
      { id: "w2d10", days: "Day 10", minutes: 30, do: "Use 'Edit like a ruthless editor' and 'Read a long document for you' on real work.", href: "/prompts#edit-draft", linkLabel: "Prompts" },
      { id: "w2d11", days: "Day 11", minutes: 45, do: "Watch freeCodeCamp's Prompt Engineering Tutorial (42 min).", href: "https://www.youtube.com/watch?v=_ZvnD73m40o", linkLabel: "Watch" },
      { id: "w2d12", days: "Day 12", minutes: 20, do: "Try 'Make it interview you first' on the task you have been putting off.", href: "/prompts#interview-me", linkLabel: "Prompt" },
    ],
    project: {
      id: "w2p",
      title: "Your personal prompt library",
      brief: "Write 5 reusable prompts for the 5 highest-rated tasks from your Week 1 audit. Test each one twice on real work and fix what fails.",
      doneWhen: "Each prompt has [brackets] for the parts that change, and lives somewhere you will find it: a note, a Claude Project, or a Custom GPT.",
    },
    trap: "Accepting the first answer. Push back twice. The third answer is usually the one you keep.",
  },
  {
    week: 3,
    label: "Week 3",
    theme: "Automate one thing",
    goal: "Have one real task run without you.",
    outcomes: [
      "Explain triggers, actions, and where a human checks the work",
      "Run one workflow end to end",
      "Measure the time it saves",
    ],
    steps: [
      { id: "w3d15", days: "Day 15", minutes: 10, do: "Quiz: rewrite one of your Week 2 prompts from memory, then compare with the saved version." },
      { id: "w3d16", days: "Day 16", minutes: 30, do: "Watch the first 3 videos of the official n8n Beginner course.", href: "https://www.youtube.com/playlist?list=PLlET0GsrLUL59YbxstZE71WszP3pVnZfI", linkLabel: "Course" },
      { id: "w3d17", days: "Day 17", minutes: 20, do: "Run 'Turn a messy process into an SOP' on the task you want to automate. Steps first, automation second.", href: "/prompts#sop", linkLabel: "Prompt" },
      { id: "w3d18", days: "Day 18", minutes: 30, do: "Run 'Find what to automate' on your Week 1 audit, then import a ready-made template and get it running.", href: "https://n8n.io/creators/samruddhi-ai-automations/", linkLabel: "Templates" },
      { id: "w3d19", days: "Day 19", minutes: 40, do: "Finish the n8n Beginner course.", href: "https://www.youtube.com/playlist?list=PLlET0GsrLUL59YbxstZE71WszP3pVnZfI", linkLabel: "Course" },
    ],
    project: {
      id: "w3p",
      title: "One workflow, end to end",
      brief: "Automate one real workflow from your audit. Write down how long it took by hand, and how long it takes now.",
      doneWhen: "It has run 3 times without you touching it, and you know where a human checks the output.",
    },
    trap: "Automating a messy process. A broken process runs faster when automated, and still breaks. Write the steps down first.",
  },
  {
    week: 4,
    label: "Week 4",
    theme: "Create, judge, and choose",
    goal: "Make visuals with precision, know when not to trust AI, and choose tools on purpose.",
    outcomes: [
      "Generate an image with a JSON prompt and control it field by field",
      "Spot the risks: hallucination, data, and bias",
      "Know which tools deserve a paid seat, and which do not",
    ],
    steps: [
      { id: "w4d22", days: "Day 22", minutes: 10, do: "Quiz: explain RAG and an AI agent to a colleague, two sentences each." },
      { id: "w4d23", days: "Day 23", minutes: 30, do: "Make one image with a JSON template. Then change one field at a time, 3 times. Note what each field did.", href: "/prompts#json", linkLabel: "JSON" },
      { id: "w4d24", days: "Day 24", minutes: 20, do: "Read the 'Risks & responsibility' section of the glossary.", href: "/glossary", linkLabel: "Glossary" },
      { id: "w4d25", days: "Day 25", minutes: 45, do: "Watch 'AI Agents for Beginners' lessons 1 to 3 from Microsoft.", href: "https://www.youtube.com/playlist?list=PLlrxD0HtieHgKcRjd5-8DT9TbwdlDO-OC", linkLabel: "Course" },
      { id: "w4d26", days: "Day 26", minutes: 30, do: "Build Your AI Team: map your tasks, fill the seats, and see what you actually need to pay for.", href: "/build-your-ai-team", linkLabel: "Build" },
    ],
    project: {
      id: "w4p",
      title: "One-page case study",
      brief: "Write it up: the task, what you built or changed, hours saved per week, and what still needs a human. Share it with your team or manager.",
      doneWhen: "Someone else has read it and asked you a question about it.",
    },
    trap: "Paying for tools you open once a month. A paid seat is for a tool you open most working days.",
  },
  {
    week: 5,
    label: "Days 27-30",
    theme: "Make it stick",
    goal: "Turn a month of practice into a habit and a 90-day plan.",
    outcomes: [
      "See exactly what changed since Day 1",
      "Teach one thing, which locks it in",
      "Leave with a 90-day plan in your calendar",
    ],
    steps: [
      { id: "w5d27", days: "Day 27", minutes: 20, do: "Re-score your Week 1 audit. Which tasks moved from 'high' to 'done'? Write the hours saved per week." },
      { id: "w5d28", days: "Day 28", minutes: 20, do: "Teach it: show one colleague your best prompt or workflow. Explaining it is the fastest way to remember it." },
      { id: "w5d29", days: "Day 29", minutes: 15, do: "Choose one newsletter and one podcast, and follow five people on the platform you already use most.", href: "/stay-current", linkLabel: "Stay current" },
      { id: "w5d30", days: "Day 30", minutes: 30, do: "Write your 90-day plan: one new skill per month, one new workflow per month, one number you will track.", href: "/learn", linkLabel: "Go deeper" },
    ],
    project: {
      id: "w5p",
      title: "Your 90-day plan",
      brief: "Three months, three skills, three workflows. Put the first month's sessions in your calendar now.",
      doneWhen: "The next 4 weeks of practice are in your calendar.",
    },
    trap: "Stopping at Day 30. The gains compound over the next 90 days, not the first 30.",
  },
];
