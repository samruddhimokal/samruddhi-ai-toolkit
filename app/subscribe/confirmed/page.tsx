import type { Metadata } from "next";
import { PageHeader, PageBody, NextStep } from "@/components/ui";

// Kit redirects here after someone clicks the confirm button in the double opt-in email.
export const metadata: Metadata = {
  title: "You're in",
  robots: { index: false },
};

export default function ConfirmedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Email confirmed"
        title="You're in. Thanks for confirming."
        blurb="You'll get regular AI updates from me: new tools worth adding, the best new videos, and what actually changed. It's free, and you can unsubscribe anytime."
      />
      <PageBody>
        <NextStep href="/start" label="While you wait, start here" />
      </PageBody>
    </>
  );
}
