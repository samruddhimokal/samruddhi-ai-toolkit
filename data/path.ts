// The 30-day "Start here" path. Four weeks, one real deliverable each.
// Time: 30 to 45 min on weekdays, 60 to 90 min on the weekend project.
// Built on spaced practice and self-testing: each Monday opens with a quiz
// on the previous week.

export interface PathStep {
  days: string;
  do: string;
  /** Link to a resource on this site or an external one */
  href?: string;
  linkLabel?: string;
}

export interface PathWeek {
  week: number;
  theme: string;
  goal: string;
  steps: PathStep[];
  project: string;
}

export const pathWeeks: PathWeek[] = [
  {
    week: 1,
    theme: "Understand what AI is",
    goal: "Know what these tools can and cannot do, and where they fit in your week.",
    steps: [
      { days: "Day 1", do: "Watch 'Large Language Models explained briefly' (8 min).", href: "https://www.youtube.com/watch?v=LPZh9BOjkQs", linkLabel: "Watch" },
      { days: "Day 2", do: "Read the 'Basics' and 'How models work' sections of the glossary.", href: "/glossary", linkLabel: "Glossary" },
      { days: "Day 3", do: "Watch Karpathy's 'Intro to Large Language Models'. Split it over two sittings if needed.", href: "https://www.youtube.com/watch?v=zjkBMFhNj_g", linkLabel: "Watch" },
      { days: "Day 4", do: "Sign up for one assistant (Claude, ChatGPT, or Gemini). Ask it to explain your job back to you.", href: "/#llm-chat", linkLabel: "Assistants" },
      { days: "Day 5", do: "Start Anthropic's AI Fluency course: the first 3 videos.", href: "https://www.youtube.com/playlist?list=PLf2m23nhTg1NjL3-jL3s0qZCYzO07ZQPv", linkLabel: "Course" },
    ],
    project: "AI audit of your week: list your 10 most repeated tasks and rate each for how much AI could help (high, some, none).",
  },
  {
    week: 2,
    theme: "Use AI at work",
    goal: "Get reliably good answers on the tasks you actually do.",
    steps: [
      { days: "Day 8", do: "Quiz: without looking, write down what a token, a context window, and a hallucination are. Then check the glossary." },
      { days: "Day 9", do: "Learn the 8-part prompt template.", href: "/prompts", linkLabel: "Template" },
      { days: "Day 10", do: "Use 'Tighten a draft' and 'Summarize a long document' on real work.", href: "/prompts", linkLabel: "Prompts" },
      { days: "Day 11", do: "Watch freeCodeCamp's Prompt Engineering Tutorial (42 min).", href: "https://www.youtube.com/watch?v=_ZvnD73m40o", linkLabel: "Watch" },
      { days: "Day 12", do: "Pick your role's stack and try one tool you have not used before.", href: "/stacks", linkLabel: "Stacks" },
    ],
    project: "Build your personal prompt library: 5 reusable prompts for your 5 highest-rated tasks from Week 1, each tested twice.",
  },
  {
    week: 3,
    theme: "Automate one thing",
    goal: "Have one real task run without you.",
    steps: [
      { days: "Day 15", do: "Quiz: rewrite one of your Week 2 prompts from memory, then compare." },
      { days: "Day 16", do: "Watch the first 3 videos of the official n8n Beginner course.", href: "https://www.youtube.com/playlist?list=PLlET0GsrLUL59YbxstZE71WszP3pVnZfI", linkLabel: "Course" },
      { days: "Day 17", do: "Run the 'Find what to automate' prompt on your Week 1 audit.", href: "/prompts", linkLabel: "Prompt" },
      { days: "Day 18", do: "Import a ready-made template and get it running.", href: "https://n8n.io/creators/samruddhi-ai-automations/", linkLabel: "Templates" },
      { days: "Day 19", do: "Finish the n8n Beginner course.", href: "https://www.youtube.com/playlist?list=PLlET0GsrLUL59YbxstZE71WszP3pVnZfI", linkLabel: "Course" },
    ],
    project: "Automate one real workflow end to end. Write down the time it took before and the time it takes now.",
  },
  {
    week: 4,
    theme: "Agents, judgment, and habits",
    goal: "Know when to trust AI, when not to, and how to keep learning.",
    steps: [
      { days: "Day 22", do: "Quiz: explain RAG and an AI agent to a colleague in two sentences each." },
      { days: "Day 23", do: "Read the 'Risks & responsibility' section of the glossary.", href: "/glossary", linkLabel: "Glossary" },
      { days: "Day 24", do: "Watch 'AI Agents for Beginners' lessons 1 to 3 from Microsoft.", href: "https://www.youtube.com/playlist?list=PLlrxD0HtieHgKcRjd5-8DT9TbwdlDO-OC", linkLabel: "Course" },
      { days: "Day 25", do: "Choose one newsletter and one podcast to keep up with.", href: "/stay-current", linkLabel: "Stay current" },
      { days: "Day 26", do: "Follow five people on the platform you already use most.", href: "/follow", linkLabel: "Follow" },
    ],
    project: "Write a one-page case study: the task, what you built, hours saved per week, and what still needs a human. Share it with your team.",
  },
];
