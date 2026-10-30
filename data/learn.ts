// Learning shelf: single talks and free YouTube courses. Edit freely.
// Every link below was checked against YouTube on 2026-10-30 (title + channel).

export const N8N_CREATOR_URL = "https://n8n.io/creators/samruddhi-ai-automations/";

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const ytList = (id: string) => `https://www.youtube.com/playlist?list=${id}`;

export interface Video {
  title: string;
  by: string;
  url: string;
  /** e.g. "1h", "8 min" */
  length: string;
  why: string;
}

export interface VideoTrack {
  id: string;
  label: string;
  blurb: string;
  videos: Video[];
}

export const videoTracks: VideoTrack[] = [
  {
    id: "start-here",
    label: "Start here",
    blurb: "Zero background needed. Watch these first.",
    videos: [
      {
        title: "Large Language Models explained briefly",
        by: "3Blue1Brown",
        url: yt("LPZh9BOjkQs"),
        length: "8 min",
        why: "The clearest 8 minutes on what an LLM is.",
      },
      {
        title: "Intro to Large Language Models",
        by: "Andrej Karpathy",
        url: yt("zjkBMFhNj_g"),
        length: "1h",
        why: "The busy person's mental model of LLMs.",
      },
      {
        title: "How I use LLMs",
        by: "Andrej Karpathy",
        url: yt("EWvNQjAaOHw"),
        length: "2h",
        why: "Practical daily use, from someone who helped build them.",
      },
    ],
  },
  {
    id: "how-llms-work",
    label: "How LLMs actually work",
    blurb: "Under the hood. Pretraining, transformers, and post-training.",
    videos: [
      {
        title: "Deep Dive into LLMs like ChatGPT",
        by: "Andrej Karpathy",
        url: yt("7xTGNNLPyMI"),
        length: "3.5h",
        why: "The full ChatGPT pipeline for a general audience.",
      },
      {
        title: "Transformers, the tech behind LLMs",
        by: "3Blue1Brown",
        url: yt("wjZofJX0v4M"),
        length: "27 min",
        why: "See the transformer instead of reading about it.",
      },
      {
        title: "Attention in transformers, step-by-step",
        by: "3Blue1Brown",
        url: yt("eMlx5fFNoYc"),
        length: "26 min",
        why: "The one mechanism that made modern AI work.",
      },
    ],
  },
  {
    id: "big-picture",
    label: "The big picture",
    blurb: "How we got here and where it is going.",
    videos: [
      {
        title: "Software Is Changing (Again)",
        by: "Andrej Karpathy · Y Combinator",
        url: yt("LCEmiRjPEtQ"),
        length: "40 min",
        why: "Software 3.0. English is the new programming language.",
      },
      {
        title: "We're summoning ghosts, not building animals",
        by: "Dwarkesh Patel with Andrej Karpathy",
        url: yt("lXUZvyajciY"),
        length: "2.5h",
        why: "An honest read on what agents can and cannot do yet.",
      },
      {
        title: "The Thinking Game",
        by: "Google DeepMind",
        url: yt("d95J8yzvjbQ"),
        length: "1.5h",
        why: "Free documentary on DeepMind, AlphaGo, and AlphaFold.",
      },
      {
        title: "Geoffrey Hinton: The 60 Minutes Interview",
        by: "CBS 60 Minutes",
        url: yt("qrvK_KuIeJk"),
        length: "15 min",
        why: "The godfather of deep learning on the risks and the upside.",
      },
    ],
  },
];

export interface Course {
  title: string;
  /** Official channel that published it */
  by: string;
  url: string;
  /** e.g. "12 videos", "3.5h" */
  size: string;
  /** Beginner | Intermediate | Technical */
  level: "Beginner" | "Intermediate" | "Technical";
  why: string;
  note?: string;
}

export interface CourseGroup {
  id: string;
  label: string;
  blurb: string;
  courses: Course[];
}

// Free on YouTube, from the official channel. No sign-up, no paywall.
export const courseGroups: CourseGroup[] = [
  {
    id: "literacy",
    label: "AI literacy for everyone",
    blurb: "No code. What AI is, what it is good at, and how to work with it.",
    courses: [
      {
        title: "AI Fluency Course",
        by: "Anthropic",
        url: ytList("PLf2m23nhTg1NjL3-jL3s0qZCYzO07ZQPv"),
        size: "12 videos",
        level: "Beginner",
        why: "A framework for working with AI well: delegate, describe, discern.",
      },
      {
        title: "OpenAI Academy",
        by: "OpenAI",
        url: ytList("PLOXw6I10VTv-b--yfoyxalr34VJ1ouY6_"),
        size: "13 videos",
        level: "Beginner",
        why: "Practical ChatGPT skills for everyday work.",
      },
      {
        title: "Google AI Essentials",
        by: "Grow with Google",
        url: ytList("PLTZYG7bZ1u6piogbmszA_TzDyR3K85Qn9"),
        size: "Full playlist",
        level: "Beginner",
        why: "Google's beginner course, lesson videos free on YouTube.",
        note: "The certificate is paid on Coursera. The videos are free here.",
      },
      {
        title: "Introduction to Generative AI",
        by: "Google Cloud",
        url: ytList("PLBgogxgQVM9sl-KnKywVEhkb3QtLHU4OK"),
        size: "4 videos",
        level: "Beginner",
        why: "Short primers on GenAI, LLMs, and responsible AI.",
      },
      {
        title: "AI Academy",
        by: "IBM Technology",
        url: ytList("PLOspHqNVtKACJx_ue2EXC1MerohY_lLKO"),
        size: "24 videos",
        level: "Beginner",
        why: "AI for business decisions: data, governance, and value.",
      },
    ],
  },
  {
    id: "prompting",
    label: "Using AI at work",
    blurb: "Get better answers faster. Prompting and daily workflows.",
    courses: [
      {
        title: "Prompt Engineering Tutorial",
        by: "freeCodeCamp",
        url: yt("_ZvnD73m40o"),
        size: "42 min",
        level: "Beginner",
        why: "The fundamentals of prompting in one sitting.",
      },
      {
        title: "Claude Code 101",
        by: "Claude (Anthropic)",
        url: ytList("PLmWCw1CzcFilebjK89WLb5cAvM8K0cLB3"),
        size: "9 videos",
        level: "Intermediate",
        why: "Your first AI agent that works on real files.",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation & agents",
    blurb: "Low code. Build workflows and agents that do work for you.",
    courses: [
      {
        title: "n8n Beginner course",
        by: "n8n",
        url: ytList("PLlET0GsrLUL59YbxstZE71WszP3pVnZfI"),
        size: "10 videos",
        level: "Beginner",
        why: "The official start for workflow automation.",
      },
      {
        title: "n8n Tutorial: Zero to Hero",
        by: "freeCodeCamp",
        url: yt("UIf-SlmMays"),
        size: "3.5h",
        level: "Beginner",
        why: "One long session, from first node to AI workflows.",
      },
      {
        title: "AI Agents for Beginners",
        by: "Microsoft Developer",
        url: ytList("PLlrxD0HtieHgKcRjd5-8DT9TbwdlDO-OC"),
        size: "15 videos",
        level: "Intermediate",
        why: "What agents are, design patterns, and when to use them.",
      },
      {
        title: "Generative AI for Beginners",
        by: "Microsoft Developer",
        url: ytList("PLlrxD0HtieHj2nfK54c62lcs3-YSTx3Je"),
        size: "19 videos",
        level: "Intermediate",
        why: "Build GenAI apps: prompts, RAG, and safety.",
      },
      {
        title: "RAG & MCP Fundamentals",
        by: "freeCodeCamp",
        url: yt("I7_WXKhyGms"),
        size: "1.7h",
        level: "Intermediate",
        why: "How agents read your documents and use tools.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical foundations",
    blurb: "For builders who want to know how the models work.",
    courses: [
      {
        title: "Neural networks",
        by: "3Blue1Brown",
        url: ytList("PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"),
        size: "10 videos",
        level: "Intermediate",
        why: "Neurons to attention. Visual, no heavy math required.",
      },
      {
        title: "Neural Networks: Zero to Hero",
        by: "Andrej Karpathy",
        url: ytList("PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ"),
        size: "10 videos",
        level: "Technical",
        why: "Build GPT from scratch in Python.",
      },
      {
        title: "CS50's Introduction to AI with Python",
        by: "Harvard CS50",
        url: ytList("PLhQjrBD2T381PopUTYtMSstgk-hsTGkVm"),
        size: "Full lectures",
        level: "Technical",
        why: "Search, reasoning, ML, and neural nets. A full university course.",
      },
      {
        title: "Practical Deep Learning for Coders",
        by: "Jeremy Howard (fast.ai)",
        url: ytList("PLfYUBJiXbdtSvpQjSnJJ_PmDQB_VyT5iU"),
        size: "Full lessons",
        level: "Technical",
        why: "Top-down and hands-on. Train real models from lesson one.",
      },
      {
        title: "Hugging Face Course",
        by: "Hugging Face",
        url: ytList("PLo2EIpI_JMQvWfQndUesu0nPBAtZ9gP1o"),
        size: "Full playlist",
        level: "Technical",
        why: "Use open models with Transformers, datasets, and tokenizers.",
      },
      {
        title: "MIT 6.S191: Introduction to Deep Learning",
        by: "Alexander Amini (MIT)",
        url: ytList("PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI"),
        size: "Lectures by year",
        level: "Technical",
        why: "MIT's bootcamp, refreshed every year.",
      },
      {
        title: "CME295: Transformers and Large Language Models",
        by: "Stanford Online",
        url: ytList("PLoROMvodv4rOCXd21gf0CF4xr35yINeOy"),
        size: "9 lectures",
        level: "Technical",
        why: "Stanford's 2025 course on how LLMs are built and trained.",
      },
      {
        title: "CS229: Machine Learning (Andrew Ng)",
        by: "Stanford Online",
        url: ytList("PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU"),
        size: "20 lectures",
        level: "Technical",
        why: "The classic ML course. Math-heavy and foundational.",
      },
    ],
  },
];
