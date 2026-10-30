// Beginner AI glossary. Plain English, one or two sentences each.
// For formal definitions see the NIST AI glossary and Google's ML glossary.

export interface Term {
  term: string;
  definition: string;
  example?: string;
}

export interface TermGroup {
  label: string;
  terms: Term[];
}

export const glossaryGroups: TermGroup[] = [
  {
    label: "The basics",
    terms: [
      { term: "Artificial intelligence (AI)", definition: "Software that does tasks we usually associate with human thinking, such as understanding language, recognizing images, or making predictions." },
      { term: "Machine learning", definition: "A way of building AI where the system learns patterns from examples instead of following rules written by a person." },
      { term: "Deep learning", definition: "Machine learning that uses large neural networks with many layers. It powers most modern AI." },
      { term: "Neural network", definition: "A model loosely inspired by the brain: layers of simple units that pass numbers to each other and adjust as they learn." },
      { term: "Generative AI", definition: "AI that creates new content, such as text, images, audio, video, or code, rather than only sorting or predicting.", example: "ChatGPT writing an email, or Midjourney making an image." },
      { term: "Large language model (LLM)", definition: "A neural network trained on huge amounts of text to predict the next word. That simple skill, at scale, lets it write, summarize, and reason.", example: "GPT, Claude, Gemini, and Llama are LLMs." },
      { term: "Model", definition: "The trained system itself: the file of learned numbers that turns an input into an output." },
      { term: "Chatbot / assistant", definition: "An app that lets you talk to a model in conversation, often with extra features like file uploads and web search." },
    ],
  },
  {
    label: "How models work",
    terms: [
      { term: "Training", definition: "The process of showing a model huge amounts of data so it can learn patterns. It happens once, before you use the model, and is very expensive." },
      { term: "Parameters", definition: "The learned numbers inside a model. More parameters usually means more capability, and higher cost to run." },
      { term: "Token", definition: "The small chunk of text a model reads and writes. A token is roughly three quarters of an English word. Pricing and limits are counted in tokens." },
      { term: "Context window", definition: "How much text a model can consider at once, including your prompt, files, and its own reply. Beyond it, earlier content is dropped or ignored." },
      { term: "Transformer", definition: "The neural network design behind modern LLMs. Its key idea, attention, lets the model weigh which earlier words matter for the next one." },
      { term: "Fine-tuning", definition: "Extra training on a smaller, focused dataset to adapt a model to a specific style or task." },
      { term: "Reasoning model", definition: "A model that works through a problem step by step before answering. Slower and more expensive, but better at hard math, logic, and planning." },
      { term: "Multimodal", definition: "A model that can take in or produce more than one type of content, such as text, images, audio, and video." },
      { term: "Open-weight model", definition: "A model whose trained parameters are published so anyone can download and run it on their own hardware.", example: "Llama, Mistral, and DeepSeek." },
    ],
  },
  {
    label: "Using AI well",
    terms: [
      { term: "Prompt", definition: "The instruction or question you give a model. Clear prompts with context, examples, and a desired format get much better results." },
      { term: "System prompt", definition: "Background instructions set before a conversation that shape how the model behaves throughout it, such as its role, tone, and rules." },
      { term: "Temperature", definition: "A setting that controls randomness. Low gives focused, consistent answers. High gives more varied, creative ones." },
      { term: "Inference", definition: "Running a trained model to get an answer. Every message you send is an inference request." },
      { term: "Grounding", definition: "Tying a model's answer to specific, trusted sources, such as your documents or a web search, so it is less likely to make things up." },
      { term: "Custom GPT / Project / Gem", definition: "A saved setup inside an assistant with its own instructions and files, so you do not repeat context every time." },
      { term: "Benchmark", definition: "A standard test used to compare models. Useful as a signal, but real-world performance on your task matters more." },
    ],
  },
  {
    label: "Building blocks",
    terms: [
      { term: "API", definition: "A way for software to talk to a model directly, without a chat window. It is how apps and automations use AI." },
      { term: "Embedding", definition: "A list of numbers that represents the meaning of a piece of text, so similar ideas sit close together. It powers semantic search." },
      { term: "Vector database", definition: "A database built to store embeddings and quickly find the most similar ones.", example: "Pinecone, or Supabase with pgvector." },
      { term: "RAG (retrieval-augmented generation)", definition: "Looking up relevant information first, then giving it to the model with your question, so the answer is based on your own data." },
      { term: "AI agent", definition: "A model that can plan and take actions toward a goal, such as searching, using tools, and editing files, over several steps with limited supervision." },
      { term: "Tool use / function calling", definition: "A model's ability to call outside tools, like a calculator, a calendar, or a database, and use the results in its answer." },
      { term: "MCP (Model Context Protocol)", definition: "An open standard, introduced by Anthropic, that lets AI apps connect to tools and data sources in one consistent way. Think of it as a USB port for AI." },
      { term: "Workflow automation", definition: "Connecting apps so a trigger starts a fixed series of steps, some of which can call AI.", example: "A new form entry triggers an AI summary sent to Slack, built in n8n." },
    ],
  },
  {
    label: "Risks & responsibility",
    terms: [
      { term: "Hallucination", definition: "When a model states something false with confidence. Always check facts, numbers, quotes, and citations that matter." },
      { term: "Bias", definition: "When a model's outputs unfairly favor or disadvantage groups, often because of patterns in its training data." },
      { term: "Prompt injection", definition: "Hidden instructions in a web page, email, or file that try to hijack an AI tool into doing something you did not ask." },
      { term: "Data privacy", definition: "What happens to what you type. Check whether a tool trains on your data, and keep sensitive information out of tools that do." },
      { term: "Human in the loop", definition: "Keeping a person to review or approve important AI outputs and actions before they take effect." },
      { term: "AGI", definition: "Artificial general intelligence: a hypothetical AI that can do most cognitive work as well as a person. Experts disagree on when, or whether, it will arrive." },
    ],
  },
];

export const glossaryRefs = [
  { name: "NIST AI glossary", url: "https://airc.nist.gov/glossary/" },
  { name: "Google machine learning glossary", url: "https://developers.google.com/machine-learning/glossary" },
];
