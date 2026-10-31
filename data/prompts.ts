// Prompts page content. Works in ChatGPT, Claude, Gemini, or Copilot.
// The 5 elements and the JSON framework follow Samruddhi's "AI Decoded"
// playbook. Every prompt and JSON example here is original to this site.

// ── Strategy 1: text prompting ─────────────────────────────────────────────

export interface TemplatePart {
  part: string;
  ask: string;
  example: string;
}

export const promptTemplate: TemplatePart[] = [
  { part: "Role", ask: "Who should the AI be?", example: "You are a B2B pricing strategist who has priced services for consulting firms." },
  { part: "Context", ask: "What does it need to know?", example: "We are a 12-person agency moving from hourly billing to fixed-fee projects." },
  { part: "Task", ask: "What exactly do you want?", example: "Draft three pricing tiers for our website redesign service." },
  { part: "Constraints", ask: "What should it avoid?", example: "No jargon. No tier above $25,000. Do not invent client names." },
  { part: "Format", ask: "What should the answer look like?", example: "A table: tier, price, what is included, who it is for. Then one paragraph of reasoning." },
];

export interface StrategyRow {
  task: string;
  approach: "Text" | "JSON" | "Either";
}

export const strategyRows: StrategyRow[] = [
  { task: "Emails, content, reports", approach: "Text" },
  { task: "Research and analysis", approach: "Text" },
  { task: "Brainstorming and decisions", approach: "Text" },
  { task: "Custom GPTs and system prompts", approach: "Text" },
  { task: "Image generation", approach: "JSON" },
  { task: "Video generation", approach: "JSON" },
  { task: "Multi-step automations", approach: "Either" },
];

export interface StarterPrompt {
  id: string;
  title: string;
  task: string;
  /** The idea that makes it work, one line */
  why: string;
  prompt: string;
}

export interface PromptGroup {
  label: string;
  prompts: StarterPrompt[];
}

export const promptGroups: PromptGroup[] = [
  {
    label: "Think with AI",
    prompts: [
      {
        id: "interview-me",
        title: "Make it interview you first",
        task: "Any task",
        why: "Most weak answers come from missing context. This makes the AI pull it out of you.",
        prompt: `I need help with: [goal, e.g. a pricing page for our new service].

Before you write anything, interview me. Ask one question at a time, up to 7 questions, about what you need to do this well: audience, constraints, what good looks like, what I have already tried. Wait for my answer before the next question.

When you have enough, summarize what you understood in 5 bullets and ask me to confirm. Only then do the work.`,
      },
      {
        id: "expert-panel",
        title: "Run an expert panel",
        task: "Decisions",
        why: "One voice agrees with you. Three opposing voices find the gaps.",
        prompt: `I am deciding: [the decision, plus the key facts and numbers].

Simulate a panel of three experts who would disagree:
1. A CFO focused on cost and risk
2. The customer who would use this
3. A competitor trying to beat us

Each gives an honest take in under 100 words. Then each responds to the others once.

Finish with: where all three agree, the strongest objection, and the one question I must answer before I decide.`,
      },
      {
        id: "pre-mortem",
        title: "Pre-mortem your plan",
        task: "Planning",
        why: "Asking why it failed surfaces risks that asking what could go wrong never does.",
        prompt: `Here is my plan:
[paste plan]

It is 6 months from now and this plan failed badly. Write the post-mortem:
- The 5 most likely reasons it failed, ranked by probability
- The early warning sign for each, visible in the first 2 weeks
- One cheap test I can run this week to check each risk

Be blunt. I want the weak spots, not encouragement.`,
      },
    ],
  },
  {
    label: "Write in your voice",
    prompts: [
      {
        id: "voice-guide",
        title: "Extract your writing voice",
        task: "Writing",
        why: "Build your voice guide once, paste it on top of every writing prompt after that.",
        prompt: `Below are 3 to 5 things I wrote that sound like me.
[paste samples]

Build a voice guide I can reuse:
1. Sentence length and rhythm
2. Words and phrases I use often, and ones I never use
3. How I open and how I close
4. My tone in 3 adjectives, each with a real line from my samples
5. 8 rules in a "do / don't" list

Format it so I can paste it at the top of any future prompt.`,
      },
      {
        id: "edit-draft",
        title: "Edit like a ruthless editor",
        task: "Editing",
        why: "Diagnosis first, rewrite second. You see the problems before they disappear into a new draft.",
        prompt: `Edit the draft below. After reading it, the reader should [think or do what].

Work in two passes.
Pass 1: Name the 3 biggest problems (structure, clarity, missing point). Do not rewrite yet.
Pass 2: Rewrite it. Cut at least 30% of the words. Keep my voice, my numbers, and my names exactly.

Then list the 5 cuts you are least sure about, so I can put them back.

Draft:
[paste]`,
      },
      {
        id: "exec-update",
        title: "Turn anything into an executive update",
        task: "Communication",
        why: "Leaders read the first line. This puts the decision there.",
        prompt: `Rewrite the material below as an update for [an executive / a client] who has 60 seconds.

Structure:
- Bottom line: one sentence with the decision or result
- Why it matters: 2 bullets, each with a number
- What I need from you: one clear ask with a date
- Details: only what would change their decision

Remove anything that does not change what they do next.

Material:
[paste notes, thread, or report]`,
      },
    ],
  },
  {
    label: "Research & decide",
    prompts: [
      {
        id: "research-confidence",
        title: "Research with confidence ratings",
        task: "Research",
        why: "Rating every claim shows you where the evidence is thin before you rely on it.",
        prompt: `Research [topic / company / market]. I will use this to [decision].

For every claim:
- Cite the source with a link
- Rate confidence: High (several reliable sources), Medium (one source), Low (your inference)
- Flag anything older than 12 months

End with what most people get wrong about this topic, and the 3 questions your research could not answer.

(Use a tool with web search: Perplexity, ChatGPT search, Gemini, or Claude with research on.)`,
      },
      {
        id: "summarize-doc",
        title: "Read a long document for you",
        task: "Summarizing",
        why: "\"Not stated\" stops the AI from filling gaps with guesses.",
        prompt: `Read the attached document as if you were my chief of staff.

Give me:
1. The one-line takeaway
2. What is actually new here, compared with what anyone would expect
3. Decisions, deadlines, and owners, in a table
4. The numbers that matter, each with the exact sentence it came from
5. What is missing, vague, or risky

If something is not in the document, write "not stated". Do not fill gaps.`,
      },
      {
        id: "compare-options",
        title: "Score your options",
        task: "Decisions",
        why: "Weighting your criteria first stops the AI from choosing what it thinks you value.",
        prompt: `Help me choose between [A], [B], and [C] for [goal].

1. First ask me to weight my criteria (e.g. cost 40%, speed 30%, ease 30%). Wait for my answer.
2. Score each option 1 to 10 on each criterion, with one line of reasoning per score.
3. Show a weighted total in a table.
4. Tell me what would have to be true for the lowest scorer to be the right choice.`,
      },
    ],
  },
  {
    label: "Run the work",
    prompts: [
      {
        id: "meeting-notes",
        title: "Meeting to follow-ups in one pass",
        task: "Meetings",
        why: "Notes, open disagreements, and the follow-up email come out of one transcript.",
        prompt: `Here is a meeting transcript. Turn it into:
1. Decisions made, and who made them
2. Action items: owner, task, due date (write "not stated" if missing)
3. Disagreements that were not resolved
4. A follow-up email to attendees, under 120 words, in this tone: [describe]

Use only what is in the transcript.

Transcript:
[paste]`,
      },
      {
        id: "sop",
        title: "Turn a messy process into an SOP",
        task: "Operations",
        why: "Talk it through badly, get a process a new hire can follow on day one.",
        prompt: `Here is how I do [process], in my own words, messy and out of order:
[paste notes or a voice-note transcript]

Turn it into a standard operating procedure:
- Purpose, and when to use it
- Numbered steps a new hire could follow on day one
- Decision points written as "If X, then Y"
- Common mistakes and how to avoid them
- Steps that could be automated, marked [AUTOMATE]

Ask me about any unclear step before you finish.`,
      },
      {
        id: "find-automation",
        title: "Find what to automate",
        task: "Automation",
        why: "Scores every task on time, repeatability, and risk, so you automate the right one first.",
        prompt: `Here is my typical week: [list recurring tasks, how often, minutes each].

1. Score each task: hours per month, how rule-based it is (1 to 5), and the risk if AI gets it wrong (1 to 5).
2. Rank them by hours x rule-based score, divided by risk.
3. For the top 3, design the workflow: trigger, steps, tools (e.g. n8n, Zapier, an assistant), output, and where a human checks it.
4. Estimate hours saved per month, and tell me what on this list I should never automate.`,
      },
    ],
  },
  {
    label: "Build your own AI",
    prompts: [
      {
        id: "prompt-upgrade",
        title: "Upgrade any weak prompt",
        task: "Prompting",
        why: "Uses the 5 elements to diagnose your prompt, then fixes it with you.",
        prompt: `Here is a prompt I use that gives average results:
[paste prompt]

1. Diagnose what is missing, using Role, Context, Task, Constraints, Format.
2. Ask me up to 3 questions to fill the gaps.
3. Write the improved prompt, with [brackets] for the parts I change each time.
4. Tell me how to test it: what a good answer must contain.`,
      },
      {
        id: "system-prompt",
        title: "Build a Custom GPT or Claude Project",
        task: "Assistants",
        why: "Turns a prompt you keep re-typing into an assistant your whole team can use.",
        prompt: `Help me build a reusable assistant (a Custom GPT, Claude Project, or Gemini Gem) for: [job, e.g. reviewing sales proposals].

Interview me first about who uses it, what inputs it gets, what a great output looks like, and what it must never do.

Then write its instructions with these sections: Role, Goal, Inputs to expect, Step-by-step process, Output format, Rules and boundaries, How to handle missing information.

Finish with 3 test inputs I can use to check it works.`,
      },
      {
        id: "explain-simply",
        title: "Learn anything with a tutor",
        task: "Learning",
        why: "Checking your understanding after every idea is what makes it stick.",
        prompt: `Teach me [topic]. I already know [what you know]. I need it for [why].

Use this loop:
1. Explain one idea in under 100 words, with an everyday analogy.
2. Ask me one question to check I understood. Wait for my answer.
3. Correct me if I am wrong, then move to the next idea.

After 5 ideas, give me a one-page summary and 3 things to try at work this week.`,
      },
    ],
  },
];

// ── Strategy 2: JSON prompting for image and video ─────────────────────────

export interface JsonField {
  key: string;
  does: string;
  /** Fields people usually leave out */
  missed?: boolean;
}

export const jsonFields: JsonField[] = [
  { key: "description", does: "What happens in the scene, in one or two sentences." },
  { key: "style", does: "Cinematic, photoreal, editorial, 3D, anime, film stock." },
  { key: "camera / shot", does: "Framing, lens, and movement: \"close-up, 85mm, slow push in\"." },
  { key: "lighting", does: "Direction, quality, and mood of the light." },
  { key: "environment", does: "Where it happens, with texture and weather." },
  { key: "elements", does: "A list of what must be in frame. Nothing gets lost in a sentence." },
  { key: "motion", does: "How things move. Video only." },
  { key: "subject_lock", does: "A fixed description of your character or product, copied word for word into every prompt. This is how you get consistency.", missed: true },
  { key: "timeline", does: "Video split into timed beats (0-2s, 2-5s, 5-8s). The model gets a clear order of events.", missed: true },
  { key: "audio", does: "Dialogue lines in quotes with delivery, sound effects, ambience, music. For video models that make sound.", missed: true },
  { key: "color_palette", does: "Hex codes. Your brand colors, every time.", missed: true },
  { key: "text_render", does: "The exact words to show, and where. Or \"none\".", missed: true },
  { key: "avoid", does: "What must not appear: subtitles, extra logos, warped text.", missed: true },
  { key: "aspect_ratio", does: "9:16 for reels, 4:5 for feeds, 16:9 for YouTube and slides." },
];

export interface JsonTrick {
  title: string;
  body: string;
}

export const jsonTricks: JsonTrick[] = [
  {
    title: "Lock and vary",
    body: "Keep subject_lock and style identical. Change one field per generation. You learn what each field does, and you get a matching series instead of random one-offs.",
  },
  {
    title: "Direct in beats, not paragraphs",
    body: "Give an 8-second clip three timed beats at most. Each beat gets its own shot, action, and camera move, so nothing important gets buried mid-sentence.",
  },
  {
    title: "Treat sound as its own layer",
    body: "Put dialogue in quotes with how it is said, then list effects, ambience, and music separately. Add \"subtitles\" to avoid, or many video models burn captions in.",
  },
  {
    title: "Your JSON is a template",
    body: "Once a prompt works, save it. Swap the product or the scene, keep the camera, light, and palette. That is how one good ad becomes twenty.",
  },
];

export const paragraphVsJson = {
  paragraph:
    "A beautiful cinematic video of a silver water bottle with condensation, then someone grabs it at the gym and runs outside onto a trail in the morning with nice music and sound effects, ending on the bottle in the sun, vertical format, no text.",
  json: `{
  "duration": "8s",
  "aspect_ratio": "9:16",
  "subject_lock": "slim matte silver bottle, one teal band near the cap",
  "timeline": [
    { "t": "0-2s", "action": "condensation slides down the bottle", "camera": "slow push in" },
    { "t": "2-5s", "action": "a hand grabs it off a gym bench", "camera": "whip pan" },
    { "t": "5-8s", "action": "bottle on a sunlit trail rock", "camera": "locked off" }
  ],
  "audio": { "sfx": ["drip", "footsteps on gravel"], "music": "minimal beat, builds at 5s" },
  "avoid": ["subtitles", "on-screen text"]
}`,
};

export interface JsonExample {
  id: string;
  kind: "Image" | "Video";
  title: string;
  tools: string;
  why: string;
  json: string;
}

export const jsonExamples: JsonExample[] = [
  {
    id: "json-product-hero",
    kind: "Image",
    title: "Product hero shot",
    tools: "Midjourney, Flux, GPT Image, Nano Banana",
    why: "Lens, light direction, and hex palette turn a stock-looking render into a studio shot.",
    json: `{
  "description": "Hero shot of a matte black ceramic coffee dripper on a slab of wet dark basalt, a thin stream of coffee falling into a glass carafe below",
  "subject_lock": "matte black ceramic pour-over dripper, spiral ribs inside, small gold stamp 'ORA' on the front",
  "shot": "eye-level macro, 100mm lens, f/4, product fills 60% of the frame",
  "lighting": "one softbox from the top left, rim light from behind, steam backlit",
  "environment": "dark studio, faint mist, water droplets on the stone",
  "color_palette": ["#0E0E0E", "#3B2A1E", "#C8A46B"],
  "style": "commercial product photography, ultra sharp, high dynamic range",
  "text_render": "none",
  "avoid": ["extra logos", "warped text", "plastic look", "clutter"],
  "aspect_ratio": "4:5"
}`,
  },
  {
    id: "json-poster",
    kind: "Image",
    title: "Poster with perfect text",
    tools: "GPT Image, Nano Banana, Ideogram",
    why: "A layout map plus \"render exactly\" is how you get spelling right inside an image.",
    json: `{
  "description": "Minimal poster announcing a live AI workshop",
  "layout": {
    "top": "small label 'LIVE WORKSHOP'",
    "center": "large headline 'Stop using AI. Start orchestrating it.'",
    "bottom": "date line 'Thursday · 7 PM IST · Online'"
  },
  "text_render": "render all text exactly as written, correct spelling, no extra words",
  "typography": "bold modern serif headline, clean sans-serif labels, generous spacing",
  "background": "deep black with a soft purple glow rising from the bottom right",
  "color_palette": ["#0A0A0A", "#6B5DD3", "#FAFAF7"],
  "style": "editorial, premium, flat, no illustrations",
  "avoid": ["misspelled words", "stock photos", "clip art", "extra text"],
  "aspect_ratio": "4:5"
}`,
  },
  {
    id: "json-character",
    kind: "Image",
    title: "Same character, every image",
    tools: "Midjourney, Flux, GPT Image, Nano Banana",
    why: "Change only the scene. The locks keep her face, clothes, and look the same across a whole series.",
    json: `{
  "subject_lock": "Maya: short curly black hair, round tortoiseshell glasses, mustard yellow knit sweater, small silver nose ring",
  "style_lock": "warm film photography, Portra 400 look, soft grain",
  "scene": "sitting at a cafe window, laptop open, laughing at the screen",
  "shot": "medium shot, 50mm, natural depth of field",
  "lighting": "late afternoon sun through the window, warm side light",
  "avoid": ["different hairstyle", "different glasses", "other people in focus"],
  "aspect_ratio": "3:2",
  "next_image": "change only 'scene', keep every other field identical"
}`,
  },
  {
    id: "json-product-ad",
    kind: "Video",
    title: "8-second product ad",
    tools: "Veo, Sora, Kling",
    why: "Three timed beats, a camera move per beat, and sound designed as its own layer.",
    json: `{
  "duration": "8s",
  "aspect_ratio": "9:16",
  "subject_lock": "slim matte silver water bottle, one teal band near the cap",
  "style": "premium commercial, photoreal, crisp",
  "timeline": [
    { "t": "0-2s", "shot": "extreme close-up", "action": "condensation slides down the bottle in slow motion", "camera": "slow push in" },
    { "t": "2-5s", "shot": "medium", "action": "a hand grabs the bottle off a gym bench, runner exits frame", "camera": "whip pan following the hand" },
    { "t": "5-8s", "shot": "wide", "action": "bottle on a sunlit trail rock, runner small in the background", "camera": "locked off" }
  ],
  "lighting": "cool morning light, strong backlight on the bottle",
  "audio": {
    "sfx": ["drip", "cap twist", "footsteps on gravel"],
    "ambience": "birds, light wind",
    "music": "minimal pulsing beat, builds at 5s",
    "dialogue": "none"
  },
  "ending": "bottle in sharp focus, teal band catches the sun",
  "avoid": ["subtitles", "on-screen text", "logo distortion", "extra bottles"]
}`,
  },
  {
    id: "json-ugc",
    kind: "Video",
    title: "Talking-head UGC clip",
    tools: "Veo, Sora",
    why: "Dialogue in quotes with delivery notes is what makes the line sound human.",
    json: `{
  "duration": "8s",
  "aspect_ratio": "9:16",
  "subject_lock": "man with a short beard, grey hoodie, phone in hand",
  "setting": "small bedroom, ring light reflected in his eyes, messy desk behind",
  "camera": "handheld selfie angle at arm's length, slight natural shake",
  "style": "authentic phone footage, not polished",
  "audio": {
    "dialogue": [
      { "speaker": "man", "line": "Okay, I did not expect a notes app to save me three hours a week.", "delivery": "surprised, casual, a little fast" }
    ],
    "ambience": "quiet room tone",
    "music": "none"
  },
  "lip_sync": "exact",
  "avoid": ["subtitles", "studio lighting", "background music", "a second speaker"]
}`,
  },
  {
    id: "json-sequence",
    kind: "Video",
    title: "Three clips that match",
    tools: "Veo, Sora, Kling, Runway",
    why: "A shared global block keeps the character and look identical when you generate shots one by one.",
    json: `{
  "project": "Morning ritual, 3 clips",
  "global": {
    "subject_lock": "elderly man, white beard, navy cardigan, round wire glasses",
    "style_lock": "cinematic, soft natural light, 35mm film look, muted greens and browns",
    "aspect_ratio": "16:9",
    "avoid": ["subtitles", "text", "outfit changes"]
  },
  "shots": [
    { "id": 1, "duration": "6s", "action": "he opens wooden shutters, light floods the kitchen", "camera": "slow dolly in from the doorway", "audio": "shutters creak, distant bell" },
    { "id": 2, "duration": "6s", "action": "he pours tea into a chipped blue cup, steam rising", "camera": "close-up, static", "audio": "tea pouring, kettle settling" },
    { "id": 3, "duration": "6s", "action": "he sits by the window and smiles at a sparrow on the sill", "camera": "slow orbit left", "audio": "sparrow chirps, soft piano begins" }
  ],
  "how_to_use": "paste 'global' plus one shot at a time"
}`,
  },
];

export const jsonifierPrompt = `You design prompts for AI image and video tools.

Turn my idea into a JSON prompt for [Midjourney / Flux / GPT Image / Nano Banana / Veo / Sora / Kling].

My idea: [one or two sentences]
It is for: [an ad / a social post / a slide / a film scene]

Rules:
- Use the fields that apply: description, subject_lock, shot, camera, lighting, environment, color_palette (hex codes), style, timeline (video: timed beats), audio (video: dialogue, sfx, ambience, music), text_render, avoid, aspect_ratio.
- Be concrete: lens, light direction, materials, colors. No vague words like "beautiful" or "stunning".
- For video, use 3 beats or fewer per 8 seconds.
- Return only the JSON. Then give 3 variations that each change exactly one field.`;

// ── Official guides ────────────────────────────────────────────────────────

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
