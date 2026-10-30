// Newsletters and podcasts for staying current. Edit freely.
// Every link was checked live on 2026-10-30. Reader counts are each
// publisher's own figure or a public estimate, so treat them as rough.

export type Depth = "Beginner" | "Business" | "Technical";

export interface Source {
  name: string;
  by: string;
  url: string;
  cadence: string;
  depth: Depth;
  why: string;
  note?: string;
}

export const newsletters: Source[] = [
  { name: "The Rundown AI", by: "Rowan Cheung", url: "https://www.therundown.ai", cadence: "Daily", depth: "Beginner", why: "The day's AI news in five minutes." },
  { name: "Superhuman AI", by: "Zain Kahn", url: "https://www.superhuman.ai", cadence: "Daily", depth: "Beginner", why: "News plus one practical tip a day." },
  { name: "The Neuron", by: "Grant Harvey", url: "https://www.theneurondaily.com", cadence: "Daily", depth: "Beginner", why: "Friendly, plain-English daily briefing." },
  { name: "One Useful Thing", by: "Ethan Mollick", url: "https://www.oneusefulthing.org", cadence: "Weekly", depth: "Business", why: "What the research says about AI at work and school." },
  { name: "The Batch", by: "Andrew Ng · DeepLearning.AI", url: "https://www.deeplearning.ai/the-batch/", cadence: "Weekly", depth: "Business", why: "A calm weekly read on what actually mattered." },
  { name: "Ben's Bites", by: "Ben Tossell", url: "https://www.bensbites.com", cadence: "Several a week", depth: "Business", why: "What builders are shipping with AI." },
  { name: "Exponential View", by: "Azeem Azhar", url: "https://www.exponentialview.co", cadence: "Weekly", depth: "Business", why: "AI's effect on the economy and society." },
  { name: "TLDR AI", by: "TLDR", url: "https://tldr.tech/ai", cadence: "Weekdays", depth: "Technical", why: "Fast links to papers, launches, and tools." },
  { name: "Simon Willison's Newsletter", by: "Simon Willison", url: "https://simonwillison.net/about/#subscribe", cadence: "About weekly", depth: "Technical", why: "Hands-on notes from testing every model." },
  { name: "Import AI", by: "Jack Clark", url: "https://jack-clark.net", cadence: "Weekly", depth: "Technical", why: "Research and policy, from an Anthropic co-founder." },
  { name: "Interconnects", by: "Nathan Lambert", url: "https://www.interconnects.ai", cadence: "About weekly", depth: "Technical", why: "How models are trained, explained by a researcher." },
  { name: "Latent Space", by: "swyx & Alessio Fanelli", url: "https://www.latent.space", cadence: "Weekly", depth: "Technical", why: "The AI engineer's newsletter and podcast." },
];

export const podcasts: Source[] = [
  { name: "The AI Daily Brief", by: "Nathaniel Whittemore", url: "https://www.youtube.com/@AIDailyBrief", cadence: "Daily", depth: "Beginner", why: "A 20 to 30 minute daily rundown with context." },
  { name: "Machine Gods", by: "Kevin Roose & Casey Newton", url: "https://www.youtube.com/@machinegodspod", cadence: "Twice a week", depth: "Beginner", why: "The former Hard Fork hosts' new AI show.", note: "New in October 2026." },
  { name: "Hard Fork", by: "The New York Times", url: "https://www.youtube.com/@hardfork", cadence: "Weekly", depth: "Beginner", why: "Tech and AI news for a general audience.", note: "Continuing with new hosts after September 2026." },
  { name: "Lenny's Podcast", by: "Lenny Rachitsky", url: "https://www.youtube.com/@LennysPodcast", cadence: "Weekly", depth: "Business", why: "How top product teams use AI." },
  { name: "No Priors", by: "Sarah Guo & Elad Gil", url: "https://www.youtube.com/@NoPriorsPodcast", cadence: "Weekly", depth: "Business", why: "Founders and researchers on where AI is heading." },
  { name: "The Cognitive Revolution", by: "Nathan Labenz", url: "https://www.cognitiverevolution.ai", cadence: "Several a week", depth: "Business", why: "Deep interviews across AI business and research." },
  { name: "Training Data", by: "Sequoia Capital", url: "https://www.youtube.com/playlist?list=PLOhHNjZItNnMm5tdW61JpnyxeYH5NDDx8", cadence: "Regular", depth: "Business", why: "Founders of AI companies on what they are building." },
  { name: "Lex Fridman Podcast", by: "Lex Fridman", url: "https://lexfridman.com/podcast/", cadence: "Every 1 to 2 weeks", depth: "Business", why: "Long conversations with the people behind AI." },
  { name: "Dwarkesh Podcast", by: "Dwarkesh Patel", url: "https://www.dwarkesh.com/podcast", cadence: "A few a month", depth: "Technical", why: "The most prepared interviewer in AI." },
  { name: "Latent Space", by: "swyx & Alessio Fanelli", url: "https://www.latent.space", cadence: "Weekly", depth: "Technical", why: "For people building AI products." },
  { name: "Practical AI", by: "Daniel Whitenack & Chris Benson", url: "https://practicalai.show", cadence: "Weekly", depth: "Technical", why: "Applied AI, minus the hype." },
  { name: "The TWIML AI Podcast", by: "Sam Charrington", url: "https://twimlai.com/podcast/twimlai/", cadence: "About weekly", depth: "Technical", why: "Researchers explain their work in plain terms." },
];
