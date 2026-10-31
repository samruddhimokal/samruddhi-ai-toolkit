// Who to follow, by platform. Edit freely.
// Each handle was checked on 2026-10-30 against an official source: the person's
// own website, their YouTube channel links, their newsletter, or Wikidata.
// Subscriber counts for YouTube were read from the channel page that day.

export interface Account {
  name: string;
  handle: string;
  url: string;
  /** What they post about, one line */
  why: string;
  /** Rough audience size, e.g. "1.7M" */
  size?: string;
}

export interface AccountGroup {
  label: string;
  accounts: Account[];
}

export interface Platform {
  id: "linkedin" | "x" | "youtube" | "instagram" | "reddit";
  label: string;
  blurb: string;
  tip: string;
  groups: AccountGroup[];
}

const li = (slug: string) => `https://www.linkedin.com/in/${slug}/`;
const x = (h: string) => `https://x.com/${h}`;
const ig = (h: string) => `https://www.instagram.com/${h}/`;
const yt = (h: string) => `https://www.youtube.com/${h}`;
const r = (s: string) => `https://www.reddit.com/r/${s}/`;

export const platforms: Platform[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    blurb: "AI at work. The best feed for professionals and leaders.",
    tip: "Follow a few, then turn on notifications for the two you learn the most from.",
    groups: [
      {
        label: "Start with these five",
        accounts: [
          { name: "Ethan Mollick", handle: "emollick", url: li("emollick"), why: "Wharton professor. Evidence on how AI changes real work." },
          { name: "Allie K. Miller", handle: "alliekmiller", url: li("alliekmiller"), why: "Hands-on tests of AI tools and agents for business." },
          { name: "Andrew Ng", handle: "andrewyng", url: li("andrewyng"), why: "DeepLearning.AI founder. Clear takes on where AI is going." },
          { name: "Conor Grennan", handle: "conorgrennan", url: li("conorgrennan"), why: "NYU Stern. The mindset shift behind using AI well." },
          { name: "Simon Willison", handle: "simonwillison", url: li("simonwillison"), why: "Tests every new model and writes up what he finds." },
        ],
      },
      {
        label: "Practical how-to",
        accounts: [
          { name: "Ruben Hassid", handle: "ruben-hassid", url: li("ruben-hassid"), why: "Step-by-step prompting guides and carousels." },
          { name: "Lenny Rachitsky", handle: "lennyrachitsky", url: li("lennyrachitsky"), why: "How product teams are adopting AI." },
          { name: "Vaibhav Sisinty", handle: "vaibhavsisinty", url: li("vaibhavsisinty"), why: "AI tools, prompts, and workflows to move faster at work." },
          { name: "Cassie Kozyrkov", handle: "kozyrkov", url: li("kozyrkov"), why: "Decision intelligence. Ex-Chief Decision Scientist at Google." },
          { name: "Zain Kahn", handle: "zainkahn", url: li("zainkahn"), why: "Superhuman AI newsletter. Quick tool tips." },
          { name: "Greg Isenberg", handle: "gisenberg", url: li("gisenberg"), why: "AI startup ideas and how small teams build with AI." },
        ],
      },
      {
        label: "Builders & researchers",
        accounts: [
          { name: "Fei-Fei Li", handle: "fei-fei-li-4541247", url: li("fei-fei-li-4541247"), why: "Stanford HAI. Human-centered and spatial AI." },
          { name: "Yann LeCun", handle: "yann-lecun", url: li("yann-lecun"), why: "Turing Award winner. Skeptic on LLMs, now building world models." },
          { name: "Mustafa Suleyman", handle: "mustafa-suleyman", url: li("mustafa-suleyman"), why: "CEO of Microsoft AI. DeepMind co-founder." },
          { name: "Aravind Srinivas", handle: "aravind-srinivas-16051987", url: li("aravind-srinivas-16051987"), why: "Perplexity CEO. Product lessons from an AI-native company." },
        ],
      },
    ],
  },
  {
    id: "x",
    label: "X / Twitter",
    blurb: "Where new models and research land first.",
    tip: "Keep it short. Ten great accounts beat two hundred noisy ones.",
    groups: [
      {
        label: "Builders & researchers",
        accounts: [
          { name: "Andrej Karpathy", handle: "@karpathy", url: x("karpathy"), why: "Anthropic pre-training. Ex-OpenAI, ex-Tesla. The best explainer in AI." },
          { name: "Andrew Ng", handle: "@AndrewYNg", url: x("AndrewYNg"), why: "Founder of DeepLearning.AI. Weekly 'The Batch'." },
          { name: "Demis Hassabis", handle: "@demishassabis", url: x("demishassabis"), why: "CEO of Google DeepMind. Nobel laureate." },
          { name: "Jeremy Howard", handle: "@jeremyphoward", url: x("jeremyphoward"), why: "fast.ai. Practical deep learning for everyone." },
          { name: "Fei-Fei Li", handle: "@drfeifei", url: x("drfeifei"), why: "Stanford HAI. Co-founder of World Labs." },
        ],
      },
      {
        label: "Practical AI",
        accounts: [
          { name: "Ethan Mollick", handle: "@emollick", url: x("emollick"), why: "What the research says about AI at work." },
          { name: "Simon Willison", handle: "@simonw", url: x("simonw"), why: "Honest, same-day testing of every new release." },
          { name: "Allie K. Miller", handle: "@alliekmiller", url: x("alliekmiller"), why: "AI for business, tested hands-on." },
          { name: "Vaibhav Sisinty", handle: "@vaibhavsisinty", url: x("vaibhavsisinty"), why: "AI tools and workflows for work and business." },
          { name: "Conor Grennan", handle: "@conorgrennan", url: x("conorgrennan"), why: "Using AI like a thinking partner." },
          { name: "Lenny Rachitsky", handle: "@lennysan", url: x("lennysan"), why: "AI for product builders." },
          { name: "Cassie Kozyrkov", handle: "@decisionleader", url: x("decisionleader"), why: "Decision-making in the age of AI." },
        ],
      },
      {
        label: "News & signal",
        accounts: [
          { name: "Rowan Cheung", handle: "@rowancheung", url: x("rowancheung"), why: "Founder of The Rundown. Daily AI news." },
          { name: "Logan Kilpatrick", handle: "@OfficialLoganK", url: x("OfficialLoganK"), why: "Leads Google AI Studio. Gemini launches first." },
          { name: "swyx", handle: "@swyx", url: x("swyx"), why: "Latent Space. The AI engineer's view." },
          { name: "Dwarkesh Patel", handle: "@dwarkesh_sp", url: x("dwarkesh_sp"), why: "Long-form interviews with the people building AI." },
          { name: "Lex Fridman", handle: "@lexfridman", url: x("lexfridman"), why: "Long conversations with researchers and founders." },
        ],
      },
      {
        label: "For balance",
        accounts: [
          { name: "Yann LeCun", handle: "@ylecun", url: x("ylecun"), why: "Argues LLMs alone will not reach human-level AI." },
          { name: "Gary Marcus", handle: "@garymarcus", url: x("garymarcus"), why: "The loudest skeptic. Read him to stress-test the hype." },
        ],
      },
    ],
  },
  {
    id: "youtube",
    label: "YouTube",
    blurb: "The deepest free learning on the internet.",
    tip: "Subscribe, then use the channel's Playlists tab. That is where the courses live.",
    groups: [
      {
        label: "Understand how AI works",
        accounts: [
          { name: "Andrej Karpathy", handle: "@AndrejKarpathy", url: yt("@AndrejKarpathy"), size: "1.7M", why: "Long, careful explainers on LLMs from first principles." },
          { name: "3Blue1Brown", handle: "@3blue1brown", url: yt("@3blue1brown"), size: "8.7M", why: "Visual math behind neural networks and transformers." },
          { name: "StatQuest", handle: "@statquest", url: yt("@statquest"), size: "1.7M", why: "Machine learning concepts, clearly explained." },
          { name: "IBM Technology", handle: "@IBMTechnology", url: yt("@IBMTechnology"), size: "1.8M", why: "Short whiteboard explainers on every AI term." },
        ],
      },
      {
        label: "Use AI at work",
        accounts: [
          { name: "Jeff Su", handle: "@JeffSu", url: yt("@JeffSu"), size: "1.9M", why: "Productivity with AI. Short, practical, no fluff." },
          { name: "Tina Huang", handle: "@TinaHuang1", url: yt("@TinaHuang1"), size: "1.4M", why: "AI fundamentals and agents, summarized well." },
          { name: "Vaibhav Sisinty", handle: "@VaibhavSisinty", url: yt("@VaibhavSisinty"), size: "878K", why: "AI tools, prompts, and workflows, plus interviews with AI builders." },
          { name: "Aishwarya Srinivasan", handle: "@AishwaryaSrinivasan", url: yt("@AishwaryaSrinivasan"), size: "191K", why: "GenAI concepts and AI careers." },
          { name: "Varun Mayya", handle: "@VarunMayya", url: yt("@VarunMayya"), size: "1.2M", why: "AI news and what it means for India." },
        ],
      },
      {
        label: "Build automations & agents",
        accounts: [
          { name: "Nate Herk", handle: "@NateHerk", url: yt("@NateHerk"), size: "1.1M", why: "n8n and AI agent builds, step by step." },
          { name: "Nick Saraev", handle: "@nicksaraev", url: yt("@nicksaraev"), size: "575K", why: "Long, hands-on automation and vibe-coding builds." },
          { name: "Sabrina Ramonov", handle: "@sabrina_ramonov", url: yt("@sabrina_ramonov"), size: "442K", why: "AI content and automation tutorials." },
          { name: "Kyle Balmer", handle: "@iamkylebalmer", url: yt("@iamkylebalmer"), size: "81K", why: "Plain-English AI tutorials for non-technical people." },
        ],
      },
      {
        label: "Stay current",
        accounts: [
          { name: "AI Explained", handle: "@aiexplained-official", url: yt("@aiexplained-official"), size: "457K", why: "Sober breakdowns of every major model release." },
          { name: "Two Minute Papers", handle: "@TwoMinutePapers", url: yt("@TwoMinutePapers"), size: "1.8M", why: "New research, explained in minutes." },
          { name: "Dwarkesh Patel", handle: "@DwarkeshPatel", url: yt("@DwarkeshPatel"), size: "1.5M", why: "Deep interviews with AI researchers." },
          { name: "Lenny's Podcast", handle: "@LennysPodcast", url: yt("@LennysPodcast"), size: "649K", why: "How top product teams use AI." },
        ],
      },
    ],
  },
  {
    id: "instagram",
    label: "Instagram",
    blurb: "A discovery feed. Good for spotting tools, not for deep learning.",
    tip: "When a reel interests you, find the creator's YouTube or newsletter for the full version.",
    groups: [
      {
        label: "Hands-on tutorials",
        accounts: [
          { name: "Tina Huang", handle: "@hellotinah", url: ig("hellotinah"), why: "Bite-size AI concepts from a former data scientist." },
          { name: "Jeff Su", handle: "@j.sushie", url: ig("j.sushie"), why: "Short AI productivity tips." },
          { name: "Kyle Balmer", handle: "@iamkylebalmer", url: ig("iamkylebalmer"), why: "Simple AI how-tos for non-technical people." },
          { name: "Vaibhav Sisinty", handle: "@vaibhavsisinty", url: ig("vaibhavsisinty"), why: "Short AI tool and workflow tips." },
          { name: "Sabrina Ramonov", handle: "@sabrina_ramonov", url: ig("sabrina_ramonov"), why: "AI automation for content creators." },
          { name: "Varun Mayya", handle: "@thevarunmayya", url: ig("thevarunmayya"), why: "AI news and tools, India-focused." },
          { name: "Nate Herk", handle: "@nateherk", url: ig("nateherk"), why: "n8n and agent builds in short form." },
        ],
      },
      {
        label: "Staying current",
        accounts: [
          { name: "Allie K. Miller", handle: "@alliekmiller", url: ig("alliekmiller"), why: "AI for business leaders." },
          { name: "The Rundown AI", handle: "@therundownai", url: ig("therundownai"), why: "Daily AI headlines from Rowan Cheung's team." },
          { name: "Zain Kahn", handle: "@heyzainkahn", url: ig("heyzainkahn"), why: "Quick AI tool tips." },
          { name: "Two Minute Papers", handle: "@twominutepapers", url: ig("twominutepapers"), why: "Research highlights in short clips." },
          { name: "3Blue1Brown", handle: "@3blue1brown", url: ig("3blue1brown"), why: "Beautiful math animations." },
        ],
      },
    ],
  },
  {
    id: "reddit",
    label: "Reddit",
    blurb: "Real users comparing notes. Best for honest tool reviews and help.",
    tip: "Sort by Top of the week and read the comments. Skip posts that end in a course pitch.",
    groups: [
      {
        label: "Best for learners",
        accounts: [
          { name: "r/learnmachinelearning", handle: "~650K members", url: r("learnmachinelearning"), why: "Beginner-friendly ML questions and study plans." },
          { name: "r/ChatGPTPro", handle: "~620K members", url: r("ChatGPTPro"), why: "Advanced ChatGPT use cases and workflows." },
          { name: "r/ClaudeAI", handle: "~900K members", url: r("ClaudeAI"), why: "Claude tips, prompts, and honest comparisons." },
          { name: "r/n8n", handle: "~250K members", url: r("n8n"), why: "Workflow help and shared automations." },
          { name: "r/PromptEngineering", handle: "~400K members", url: r("PromptEngineering"), why: "Prompt techniques and templates." },
        ],
      },
      {
        label: "Builders",
        accounts: [
          { name: "r/LocalLLaMA", handle: "~800K members", url: r("LocalLLaMA"), why: "Running open models on your own machine. High signal." },
          { name: "r/ClaudeCode", handle: "~390K members", url: r("ClaudeCode"), why: "Coding agents in practice." },
          { name: "r/AI_Agents", handle: "~450K members", url: r("AI_Agents"), why: "Agent frameworks and real use cases." },
          { name: "r/automation", handle: "~220K members", url: r("automation"), why: "Business automation beyond one tool." },
        ],
      },
      {
        label: "Pulse check only",
        accounts: [
          { name: "r/MachineLearning", handle: "~3M members", url: r("MachineLearning"), why: "Research papers and discussion. Advanced." },
          { name: "r/ChatGPT", handle: "~11M members", url: r("ChatGPT"), why: "What the public is doing with AI." },
          { name: "r/singularity", handle: "~3.5M members", url: r("singularity"), why: "Big-picture AGI debate." },
        ],
      },
    ],
  },
];
