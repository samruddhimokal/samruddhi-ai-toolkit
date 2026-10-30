// Learning shelf + people to follow. Edit freely.
// Video links point to the official channel upload or the creator's own page.

export const N8N_CREATOR_URL = "https://n8n.io/creators/samruddhi-ai-automations/";

export interface Video {
  title: string;
  by: string;
  url: string;
  /** e.g. "1h", "8 min", "Series" */
  length: string;
  why: string;
}

export interface VideoTrack {
  id: string;
  label: string;
  blurb: string;
  videos: Video[];
}

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const ytSearch = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const videoTracks: VideoTrack[] = [
  {
    id: "start-here",
    label: "Start here",
    blurb: "Zero background needed. Watch these first.",
    videos: [
      {
        title: "Large Language Models explained briefly",
        by: "3Blue1Brown",
        url: ytSearch("3Blue1Brown Large Language Models explained briefly"),
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
        why: "Practical daily use, from the person who built them.",
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
        title: "But what is a GPT? Visual intro to transformers",
        by: "3Blue1Brown",
        url: yt("wjZofJX0v4M"),
        length: "27 min",
        why: "See the transformer instead of reading about it.",
      },
      {
        title: "Neural Networks series",
        by: "3Blue1Brown",
        url: "https://www.3blue1brown.com/topics/neural-networks",
        length: "Series",
        why: "Neurons, gradient descent, attention. Visually.",
      },
      {
        title: "Neural Networks: Zero to Hero",
        by: "Andrej Karpathy",
        url: "https://karpathy.ai/zero-to-hero.html",
        length: "Series",
        why: "Build GPT from scratch in code. For builders.",
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
        url: ytSearch("Andrej Karpathy Software Is Changing (Again) YC AI Startup School"),
        length: "40 min",
        why: "Software 3.0. English is the new programming language.",
      },
      {
        title: "AGI is still a decade away",
        by: "Dwarkesh Patel with Andrej Karpathy",
        url: yt("lXUZvyajciY"),
        length: "2.5h",
        why: "An honest read on what agents can and cannot do yet.",
      },
      {
        title: "The Thinking Game",
        by: "Google DeepMind",
        url: ytSearch("The Thinking Game full documentary Google DeepMind"),
        length: "1.5h",
        why: "Free documentary on DeepMind, AlphaGo, and AlphaFold.",
      },
      {
        title: "Geoffrey Hinton on 60 Minutes",
        by: "CBS 60 Minutes",
        url: ytSearch("Geoffrey Hinton 60 Minutes godfather of AI"),
        length: "15 min",
        why: "The godfather of deep learning on the risks and the upside.",
      },
    ],
  },
];

export interface Person {
  name: string;
  /** What they are known for, one line */
  role: string;
  /** Primary handle to follow */
  url: string;
  handle: string;
}

export interface PeopleGroup {
  id: string;
  label: string;
  people: Person[];
}

export const peopleGroups: PeopleGroup[] = [
  {
    id: "builders",
    label: "Builders & researchers",
    people: [
      { name: "Andrej Karpathy", role: "Ex-OpenAI, ex-Tesla AI. Best AI teacher alive.", url: "https://x.com/karpathy", handle: "@karpathy" },
      { name: "Andrew Ng", role: "DeepLearning.AI, Coursera. Weekly 'The Batch'.", url: "https://x.com/AndrewYNg", handle: "@AndrewYNg" },
      { name: "Demis Hassabis", role: "CEO, Google DeepMind. Nobel laureate.", url: "https://x.com/demishassabis", handle: "@demishassabis" },
      { name: "Sam Altman", role: "CEO, OpenAI.", url: "https://x.com/sama", handle: "@sama" },
      { name: "Yann LeCun", role: "Turing Award winner. Contrarian on LLMs.", url: "https://x.com/ylecun", handle: "@ylecun" },
      { name: "Jeremy Howard", role: "fast.ai. Practical deep learning for everyone.", url: "https://x.com/jeremyphoward", handle: "@jeremyphoward" },
    ],
  },
  {
    id: "practical",
    label: "Practical AI",
    people: [
      { name: "Ethan Mollick", role: "Wharton. How AI changes real work.", url: "https://x.com/emollick", handle: "@emollick" },
      { name: "Simon Willison", role: "Hands-on LLM experiments, written up daily.", url: "https://simonwillison.net", handle: "simonwillison.net" },
      { name: "Allie K. Miller", role: "AI for business leaders.", url: "https://x.com/alliekmiller", handle: "@alliekmiller" },
      { name: "Logan Kilpatrick", role: "Google AI Studio and Gemini API.", url: "https://x.com/OfficialLoganK", handle: "@OfficialLoganK" },
      { name: "Greg Isenberg", role: "AI startup ideas and distribution.", url: "https://x.com/gregisenberg", handle: "@gregisenberg" },
    ],
  },
  {
    id: "signal",
    label: "News & signal",
    people: [
      { name: "Rowan Cheung", role: "The Rundown AI. Daily news in 5 minutes.", url: "https://x.com/rowancheung", handle: "@rowancheung" },
      { name: "swyx", role: "Latent Space. The AI engineer's podcast.", url: "https://x.com/swyx", handle: "@swyx" },
      { name: "Dwarkesh Patel", role: "Long-form interviews with the frontier.", url: "https://x.com/dwarkesh_sp", handle: "@dwarkesh_sp" },
      { name: "AI Explained", role: "Sober breakdowns of every major release.", url: "https://www.youtube.com/@aiexplained-official", handle: "YouTube" },
      { name: "Two Minute Papers", role: "New research, explained in minutes.", url: "https://www.youtube.com/@TwoMinutePapers", handle: "YouTube" },
    ],
  },
];
