import type { Metadata } from "next";
import { PageHeader, PageBody } from "@/components/ui";
import { SubscribeForm } from "@/components/Subscribe";

export const metadata: Metadata = {
  title: "Get the monthly AI update",
  description: "One email a month: new tools worth adding, the best new videos, and what actually changed in AI.",
};

export default function SubscribePage() {
  return (
    <>
      <PageHeader
        eyebrow="The monthly update"
        title="One email a month. Only what matters."
        blurb="New tools worth adding to your stack, the best new videos and courses, and what actually changed in AI that month. No daily noise. Unsubscribe anytime."
      />
      <PageBody>
        <SubscribeForm />
      </PageBody>
    </>
  );
}
