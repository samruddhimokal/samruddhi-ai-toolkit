import type { Tool } from "@/lib/types";

// Every URL below was verified to the tool's official domain.
// `favorite` marks tools Samruddhi personally uses (edit freely).
// `added` marks curated additions beyond the original list.
export const tools: Tool[] = [
  // ── AI Research & Agents ──────────────────────────────────────────────
  { name: "Genspark", url: "https://www.genspark.ai", category: "research-agents", blurb: "Agentic search that builds the answer." },
  { name: "NotebookLM", url: "https://notebooklm.google.com", category: "research-agents", blurb: "Google's research notebook grounded in your sources." },
  { name: "Perplexity", url: "https://www.perplexity.ai", category: "research-agents", added: true, blurb: "Answer engine with citations you can trust." },
  { name: "Manus", url: "https://manus.im", category: "research-agents", added: true, blurb: "General agent that plans and executes." },

  // ── LLM Chat & Assistants ─────────────────────────────────────────────
  { name: "ChatGPT", url: "https://chatgpt.com", category: "llm-chat", added: true, blurb: "OpenAI's assistant. The default starting point." },
  { name: "Claude", url: "https://claude.ai", category: "llm-chat", favorite: true, added: true, blurb: "Anthropic's assistant. Strong reasoning and writing." },
  { name: "Gemini", url: "https://gemini.google.com", category: "llm-chat", added: true, blurb: "Google's multimodal model family." },
  { name: "Grok", url: "https://grok.com", category: "llm-chat", added: true, blurb: "xAI's assistant wired into real-time X." },

  // ── Model Access & Infrastructure ─────────────────────────────────────
  { name: "OpenRouter", url: "https://openrouter.ai", category: "model-infra", favorite: true, blurb: "One API for every major model." },
  { name: "Fal.ai", url: "https://fal.ai", category: "model-infra", favorite: true, blurb: "Fast generative media inference for developers." },
  { name: "Higgsfield", url: "https://higgsfield.ai", category: "model-infra", blurb: "Cinematic AI video and camera control." },
  { name: "Groq", url: "https://groq.com", category: "model-infra", added: true, blurb: "Inference at very low latency." },

  // ── Scraping, Search & Data Collection ────────────────────────────────
  { name: "Apify", url: "https://apify.com", category: "scraping-search", favorite: true, blurb: "Scrapers and actors for any site." },
  { name: "BrowserAct", url: "https://www.browseract.com", category: "scraping-search", blurb: "No-code browser automation for agents." },
  { name: "Tavily", url: "https://tavily.com", category: "scraping-search", blurb: "Search API built for AI agents." },
  { name: "Firecrawl", url: "https://www.firecrawl.dev", category: "scraping-search", blurb: "Turn any website into clean markdown." },
  { name: "RSS.app", url: "https://rss.app", category: "scraping-search", blurb: "Generate feeds from anything on the web." },
  { name: "Serper", url: "https://serper.dev", category: "scraping-search", blurb: "Fast, cheap Google search API." },

  // ── Image & Video Generation ──────────────────────────────────────────
  { name: "Midjourney", url: "https://www.midjourney.com", category: "image-video", blurb: "The benchmark for generated imagery." },
  { name: "Leonardo AI", url: "https://leonardo.ai", category: "image-video", blurb: "Production image generation with fine control." },
  { name: "Flux", url: "https://blackforestlabs.ai", category: "image-video", blurb: "Black Forest Labs' open image models." },
  { name: "Runway", url: "https://runwayml.com", category: "image-video", blurb: "Text and image to video." },
  { name: "HeyGen", url: "https://www.heygen.com", category: "image-video", favorite: true, blurb: "AI avatars and video at scale." },
  { name: "Arcads AI", url: "https://www.arcads.ai", category: "image-video", blurb: "UGC-style video ads from a script." },
  { name: "Kling AI", url: "https://klingai.com", category: "image-video", added: true, blurb: "High-fidelity AI video generation." },
  { name: "Sora", url: "https://openai.com/sora", category: "image-video", added: true, blurb: "OpenAI's text-to-video model." },

  // ── Voice, Audio & Music ──────────────────────────────────────────────
  { name: "ElevenLabs", url: "https://elevenlabs.io", category: "voice-audio", favorite: true, blurb: "The standard for AI voice." },
  { name: "Suno", url: "https://suno.com", category: "voice-audio", favorite: true, blurb: "Full songs from a text prompt." },
  { name: "Udio", url: "https://www.udio.com", category: "voice-audio", blurb: "Studio-quality music generation." },

  // ── Voice AI Agents & Telephony ───────────────────────────────────────
  { name: "Retell AI", url: "https://www.retellai.com", category: "voice-agents", favorite: true, blurb: "Build phone agents that sound human." },
  { name: "Vapi", url: "https://vapi.ai", category: "voice-agents", blurb: "Developer platform for voice agents." },
  { name: "Bolna", url: "https://www.bolna.ai", category: "voice-agents", blurb: "Voice agents for Indian languages." },
  { name: "Sarvam", url: "https://www.sarvam.ai", category: "voice-agents", blurb: "India-first models and voice stack." },
  { name: "Vobiz", url: "https://www.vobiz.ai", category: "voice-agents", favorite: true, blurb: "SIP trunking and voice API for AI." },
  { name: "Twilio", url: "https://www.twilio.com", category: "voice-agents", blurb: "Programmable calls and messaging." },

  // ── Automation & Workflow ─────────────────────────────────────────────
  { name: "n8n", url: "https://n8n.io", category: "automation", favorite: true, blurb: "Open-source automation you actually own." },
  { name: "Make", url: "https://www.make.com", category: "automation", blurb: "Visual workflows across your whole stack." },
  { name: "Zapier", url: "https://zapier.com", category: "automation", blurb: "Connect thousands of apps, no code." },
  { name: "Lindy", url: "https://www.lindy.ai", category: "automation", blurb: "AI assistants that run your workflows." },
  { name: "Gumloop", url: "https://www.gumloop.com", category: "automation", blurb: "Drag-and-drop AI automation for teams." },
  { name: "Dify", url: "https://dify.ai", category: "automation", blurb: "Build and ship LLM apps fast." },
  { name: "Power Automate", url: "https://www.microsoft.com/power-platform/products/power-automate", category: "automation", blurb: "Microsoft's automation across the enterprise." },

  // ── AI App Builders ───────────────────────────────────────────────────
  { name: "Lovable", url: "https://lovable.dev", category: "app-builders", favorite: true, blurb: "Describe an app. Get full-stack code." },
  { name: "Bolt", url: "https://bolt.new", category: "app-builders", blurb: "Prompt to deployed app in-browser." },
  { name: "Replit", url: "https://replit.com", category: "app-builders", favorite: true, blurb: "Build, run, and host from anywhere." },
  { name: "Base44", url: "https://base44.com", category: "app-builders", blurb: "Internal tools from natural language." },
  { name: "Google AI Studio", url: "https://aistudio.google.com", category: "app-builders", blurb: "Prototype with Gemini and ship." },
  { name: "Antigravity", url: "https://antigravity.google", category: "app-builders", blurb: "Google's agent-first development platform." },
  { name: "v0", url: "https://v0.app", category: "app-builders", added: true, blurb: "Vercel's generative UI builder." },

  // ── AI Coding Assistants ──────────────────────────────────────────────
  { name: "Claude Code", url: "https://www.anthropic.com/claude-code", category: "coding-assistants", blurb: "Agentic coding in your terminal." },
  { name: "Codex", url: "https://openai.com/codex", category: "coding-assistants", blurb: "OpenAI's software engineering agent." },
  { name: "Cursor / VS Code", url: "https://cursor.com", category: "coding-assistants", favorite: true, blurb: "The AI-native code editor." },
  { name: "GitHub Copilot", url: "https://github.com/features/copilot", category: "coding-assistants", added: true, blurb: "Inline completions inside your editor." },

  // ── Local & Open-Source Models ────────────────────────────────────────
  { name: "Ollama", url: "https://ollama.com", category: "local-models", favorite: true, blurb: "Run open models locally in one command." },
  { name: "Msty", url: "https://msty.app", category: "local-models", blurb: "Clean desktop app for local LLMs." },
  { name: "LM Studio", url: "https://lmstudio.ai", category: "local-models", blurb: "Discover and run models on your machine." },
  { name: "Hugging Face", url: "https://huggingface.co", category: "local-models", favorite: true, blurb: "The home of open models and datasets." },

  // ── Sales Intelligence & Enrichment ───────────────────────────────────
  { name: "Apollo", url: "https://www.apollo.io", category: "sales-intel", blurb: "Contact data and outbound in one place." },
  { name: "Clay", url: "https://www.clay.com", category: "sales-intel", favorite: true, blurb: "Enrich and automate any GTM list." },
  { name: "Explorium", url: "https://www.explorium.ai", category: "sales-intel", blurb: "Agentic data for go-to-market." },
  { name: "Unipile", url: "https://www.unipile.com", category: "sales-intel", blurb: "One API for email and LinkedIn." },

  // ── Cold Email & Outreach ─────────────────────────────────────────────
  { name: "Instantly", url: "https://instantly.ai", category: "cold-email", blurb: "Cold email at scale with deliverability." },
  { name: "Smartlead", url: "https://www.smartlead.ai", category: "cold-email", blurb: "Unlimited inboxes and warmup." },

  // ── Social Media Automation ───────────────────────────────────────────
  { name: "PhantomBuster", url: "https://phantombuster.com", category: "social-automation", blurb: "Extract and automate across social platforms." },
  { name: "Blotato", url: "https://blotato.com", category: "social-automation", favorite: true, blurb: "Create and post to every channel." },

  // ── Meeting Notes & Transcription ─────────────────────────────────────
  { name: "Fireflies", url: "https://fireflies.ai", category: "meeting-notes", blurb: "Record, transcribe, and search every call." },
  { name: "Granola", url: "https://www.granola.ai", category: "meeting-notes", favorite: true, blurb: "AI notepad that upgrades your notes." },
  { name: "Fathom", url: "https://fathom.video", category: "meeting-notes", blurb: "Free AI notetaker for meetings." },
  { name: "Read AI", url: "https://www.read.ai", category: "meeting-notes", blurb: "Meeting summaries and engagement analytics." },

  // ── Presentations & Docs ──────────────────────────────────────────────
  { name: "Gamma", url: "https://gamma.app", category: "presentations", favorite: true, blurb: "Decks, docs, and sites from a prompt." },
  { name: "Chronicle", url: "https://chroniclehq.com", category: "presentations", blurb: "Design-led AI presentations." },

  // ── Whiteboarding & Diagramming ───────────────────────────────────────
  { name: "Miro", url: "https://miro.com", category: "whiteboarding", blurb: "The infinite canvas for teams." },
  { name: "Excalidraw", url: "https://excalidraw.com", category: "whiteboarding", favorite: true, blurb: "Hand-drawn diagrams, open and free." },

  // ── Backend, Database & Vector ────────────────────────────────────────
  { name: "Supabase", url: "https://supabase.com", category: "backend-db", favorite: true, blurb: "Postgres backend with auth and storage." },
  { name: "Firebase", url: "https://firebase.google.com", category: "backend-db", blurb: "Google's app backend platform." },
  { name: "Pinecone", url: "https://www.pinecone.io", category: "backend-db", blurb: "Vector database for retrieval." },
  { name: "Notion", url: "https://www.notion.so", category: "backend-db", favorite: true, blurb: "Docs, databases, and wiki in one." },

  // ── Payments ──────────────────────────────────────────────────────────
  { name: "Stripe", url: "https://stripe.com", category: "payments", favorite: true, blurb: "Payments infrastructure for the internet." },
  { name: "Razorpay", url: "https://razorpay.com", category: "payments", blurb: "Payments and banking built for India." },
  { name: "PayPal", url: "https://www.paypal.com", category: "payments", blurb: "Global payments people already trust." },

  // ── Project Management ────────────────────────────────────────────────
  { name: "ClickUp", url: "https://clickup.com", category: "project-mgmt", blurb: "Tasks, docs, and goals in one app." },

  // ── Deploy & Hosting ──────────────────────────────────────────────────
  { name: "Vercel", url: "https://vercel.com", category: "deploy-hosting", favorite: true, blurb: "Ship frontends and full-stack apps instantly." },
  { name: "Netlify", url: "https://www.netlify.com", category: "deploy-hosting", blurb: "Deploy and scale modern web projects." },
  { name: "GitHub", url: "https://github.com", category: "deploy-hosting", blurb: "Where the world's code lives." },

  // ── GPU & Compute ─────────────────────────────────────────────────────
  { name: "RunPod", url: "https://www.runpod.io", category: "gpu-compute", blurb: "Rent GPUs for training and inference." },

  // ── MCP & Skills ──────────────────────────────────────────────────────
  { name: "Skills.sh", url: "https://skills.sh", category: "mcp-skills", blurb: "Marketplace and leaderboard for agent skills." },
  { name: "Smithery", url: "https://smithery.ai", category: "mcp-skills", blurb: "Registry to find and deploy MCP servers." },
  { name: "MCP.so", url: "https://mcp.so", category: "mcp-skills", blurb: "Directory of MCP servers and clients." },

  // ── AI Security & Code Review ─────────────────────────────────────────
  { name: "Gandalf AI", url: "https://gandalf.lakera.ai", category: "ai-security", blurb: "Learn prompt injection by playing." },
  { name: "CodeAnt AI", url: "https://www.codeant.ai", category: "ai-security", blurb: "AI code review, security, and quality." },
  { name: "Lakera AI", url: "https://www.lakera.ai", category: "ai-security", blurb: "Runtime security for AI applications." },
  { name: "CodeRabbit", url: "https://www.coderabbit.ai", category: "ai-security", blurb: "AI reviewer on every pull request." },
  { name: "Canary", url: "https://www.runcanary.ai", category: "ai-security", blurb: "AI writes the code. Canary breaks it." },

  // ── AI Memory ─────────────────────────────────────────────────────────
  { name: "Mem0", url: "https://mem0.ai", category: "ai-memory", blurb: "Memory layer for AI applications." },
  { name: "Supermemory", url: "https://supermemory.ai", category: "ai-memory", blurb: "Universal memory API for your agents." },
  { name: "Memorae", url: "https://memorae.ai/en", category: "ai-memory", blurb: "Second brain across your messaging apps." },

  // ── Vertical AI ───────────────────────────────────────────────────────
  { name: "Harvey AI", url: "https://www.harvey.ai", category: "vertical-ai", blurb: "AI built for legal work." },

  // ── Communities & Discovery ───────────────────────────────────────────
  { name: "Product Hunt", url: "https://www.producthunt.com", category: "communities", blurb: "New products launch here first." },
  { name: "Reddit", url: "https://www.reddit.com", category: "communities", blurb: "Unfiltered signal from real users." },
  { name: "Indie Hackers", url: "https://www.indiehackers.com", category: "communities", blurb: "Founders sharing what actually works." },
  { name: "Hacker News", url: "https://news.ycombinator.com", category: "communities", blurb: "The pulse of technical builders." },
  { name: "JoinSecret", url: "https://www.joinsecret.com", category: "communities", blurb: "Startup deals on hundreds of tools." },

  // ── Accelerators & Fellowships ────────────────────────────────────────
  { name: "Y Combinator", url: "https://www.ycombinator.com", category: "accelerators", blurb: "The accelerator that set the standard." },
  { name: "Entrepreneur First", url: "https://www.joinef.com", category: "accelerators", blurb: "Builds companies from individuals up." },
  { name: "South Park Commons", url: "https://www.southparkcommons.com", category: "accelerators", blurb: "For builders in the idea stage." },
  { name: "The Residency", url: "https://www.livetheresidency.com", category: "accelerators", blurb: "Live and build with ambitious peers." },
  { name: "Localhost HQ", url: "https://www.localhosthq.com", category: "accelerators", blurb: "In-person lab for young founders." },

  // ── Grants & Non-Dilutive Funding ─────────────────────────────────────
  { name: "Granted", url: "https://granted.tech", category: "grants", blurb: "AI grant discovery and applications." },
  { name: "Emergent Ventures", url: "https://www.mercatus.org/emergent-ventures", category: "grants", blurb: "Fast grants for high-upside ideas." },

  // ── Autonomous Agent Frameworks ───────────────────────────────────────
  { name: "Hermes", url: "https://github.com/NousResearch/hermes-agent", category: "agent-frameworks", blurb: "Self-improving agent on your infrastructure." },
  { name: "OpenClaw", url: "https://openclaw.ai", category: "agent-frameworks", blurb: "Self-hosted personal agent, local-first." },

  // ── Prompt Libraries & Awesome Lists ──────────────────────────────────
  { name: "n8n Workflow Templates", url: "https://n8n.io/workflows", category: "resources", blurb: "Thousands of ready automation workflows." },
  { name: "System Prompts Leaks", url: "https://github.com/asgeirtj/system_prompts_leaks", category: "resources", blurb: "Leaked system prompts from major apps." },
  { name: "Last 30 Days Skill", url: "https://github.com/mvanhorn/last30days-skill", category: "resources", blurb: "Keep Claude current on recent releases." },
  { name: "Prompt Optimizer", url: "https://github.com/linshenkx/prompt-optimizer", category: "resources", blurb: "Refine prompts systematically." },
  { name: "Nano Banana Pro Prompts", url: "https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts", category: "resources", blurb: "Prompt patterns for Gemini image edits." },
  { name: "The Big Prompt Library", url: "https://github.com/0xeb/TheBigPromptLibrary", category: "resources", blurb: "System prompts, jailbreaks, and guides." },
  { name: "prompts.chat", url: "https://github.com/f/prompts.chat", category: "resources", blurb: "The classic awesome ChatGPT prompts." },
  { name: "Awesome Generative AI Guide", url: "https://github.com/aishwaryanr/awesome-generative-ai-guide", category: "resources", blurb: "Courses, papers, and interview prep." },
  { name: "Awesome LLM Apps", url: "https://github.com/Shubhamsaboo/awesome-llm-apps", category: "resources", blurb: "Buildable LLM and agent app examples." },
  { name: "Awesome Agentic Engineering", url: "https://github.com/EthicalML/awesome-agentic-engineering-resources", category: "resources", blurb: "Resources for building real agents." },
  { name: "Awesome Launch Platforms", url: "https://github.com/DirectorySurf/awesome-launch-platforms", category: "resources", blurb: "Every place to launch your product." },
  { name: "Awesome (sindresorhus)", url: "https://github.com/sindresorhus/awesome", category: "resources", blurb: "The awesome list of awesome lists." },
  { name: "ML Papers of the Week", url: "https://github.com/dair-ai/ML-Papers-of-the-Week", category: "resources", blurb: "The research worth reading, weekly." },
  { name: "Awesome Machine Learning", url: "https://github.com/josephmisiti/awesome-machine-learning", category: "resources", blurb: "The canonical ML resource collection." },
];
