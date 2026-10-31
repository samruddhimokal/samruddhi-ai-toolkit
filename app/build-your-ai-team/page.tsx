import type { Metadata } from "next";
import { PageHeader, PageBody, NextStep } from "@/components/ui";
import { AiTeamFilm } from "@/components/AiTeamFilm";
import { AiTeamBuilder } from "@/components/AiTeamBuilder";

export const metadata: Metadata = {
  title: "Build Your AI Team: which AI tool for which task",
  description:
    "Watch the one-minute explainer, then build your AI team in six interactive steps: map your tasks, fill four seats, check your data, score the candidates, size your paid seats, and review every quarter.",
};

export default function BuildYourAiTeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Build Your AI Team"
        title="Hire your AI tools the way you hire people."
        blurb="Watch the one-minute version first. Then build yours below: six steps, one page at the end. Your answers save in this browser."
      >
        <div className="mt-10">
          <AiTeamFilm />
        </div>
      </PageHeader>
      <PageBody>
        <AiTeamBuilder />
        <NextStep href="/stacks" label="See example stacks by role" />
      </PageBody>
    </>
  );
}
