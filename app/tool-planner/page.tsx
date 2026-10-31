import type { Metadata } from "next";
import { PageHeader, PageBody, NextStep } from "@/components/ui";
import { PlannerFilm } from "@/components/PlannerFilm";
import { StackBuilder } from "@/components/StackBuilder";

export const metadata: Metadata = {
  title: "AI Tool Planner: which AI tool for which task",
  description:
    "Watch the one-minute explainer, then plan your AI tools in six interactive steps: map your tasks, fill four seats, check your data, score the candidates, size your paid seats, and review every quarter.",
};

export default function ToolPlannerPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Tool Planner"
        title="Hire your AI tools the way you hire people."
        blurb="Watch the one-minute version first. Then build yours below: six steps, one page at the end. Your answers save in this browser."
      >
        <div className="mt-10">
          <PlannerFilm />
        </div>
      </PageHeader>
      <PageBody>
        <StackBuilder />
        <NextStep href="/stacks" label="See example stacks by role" />
      </PageBody>
    </>
  );
}
