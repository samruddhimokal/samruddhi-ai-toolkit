import type { Metadata } from "next";
import { PageHeader, PageBody, NextStep } from "@/components/ui";
import { StackBuilder } from "@/components/StackBuilder";

export const metadata: Metadata = {
  title: "Choose your stack: which AI tool for which task",
  description:
    "An interactive, six-step way to choose AI tools: map your tasks, fill four seats, check your data, score the candidates, size your paid seats, and review every quarter. One page at the end.",
};

export default function ChooseYourStackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Choose your stack"
        title="Hire your AI tools the way you hire people."
        blurb="Your stack is the few tools you actually use, and the job each one does. Six steps, one page at the end: which tool for which task, who gets a paid seat, and when you check it again. You do not need to know any AI tools to start. Your answers save in this browser."
      />
      <PageBody>
        <StackBuilder />
        <NextStep href="/stacks" label="See example stacks by role" />
      </PageBody>
    </>
  );
}
