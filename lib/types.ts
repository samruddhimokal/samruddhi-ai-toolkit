export type CategoryId =
  | "research-agents"
  | "llm-chat"
  | "model-infra"
  | "scraping-search"
  | "image-video"
  | "voice-audio"
  | "voice-agents"
  | "automation"
  | "app-builders"
  | "coding-assistants"
  | "local-models"
  | "sales-intel"
  | "cold-email"
  | "social-automation"
  | "meeting-notes"
  | "presentations"
  | "whiteboarding"
  | "backend-db"
  | "payments"
  | "project-mgmt"
  | "deploy-hosting"
  | "gpu-compute"
  | "mcp-skills"
  | "ai-security"
  | "ai-memory"
  | "vertical-ai"
  | "communities"
  | "accelerators"
  | "grants"
  | "agent-frameworks"
  | "resources";

export interface Category {
  id: CategoryId;
  /** Short label shown as the section header */
  label: string;
  /** One-line orientation for the section */
  blurb: string;
}

export interface Tool {
  name: string;
  url: string;
  /** <= 7 words, restraint voice, no fluff */
  blurb: string;
  category: CategoryId;
  /** Personally used and vouched for by Samruddhi */
  favorite?: boolean;
  /** Curated addition beyond the original list */
  added?: boolean;
}
