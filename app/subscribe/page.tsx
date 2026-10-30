import type { Metadata } from "next";
import { PageHeader, PageBody } from "@/components/ui";
import { SubscribeForm } from "@/components/Subscribe";

export const metadata: Metadata = {
  title: "Get regular AI updates",
  description: "Regular emails: new tools worth adding, the best new videos, and what actually changed in AI.",
};

export default function SubscribePage() {
  return (
    <>
      <PageHeader
        eyebrow="Regular AI updates"
        title="Only what matters in AI."
        blurb="New tools worth adding to your stack, the best new videos and courses, and what actually changed in AI. No daily noise. Unsubscribe anytime."
      />
      <PageBody>
        <SubscribeForm />
      </PageBody>
    </>
  );
}
