"use server";

import { headers } from "next/headers";

// Adds a learner to Kit (https://developers.kit.com, API v4).
// Env: KIT_API_KEY (V4 key from Kit > Settings > Developer) and KIT_FORM_ID.
// Turn on double opt-in for that form in Kit: adding the subscriber to the form
// sends Kit's confirmation email, and they only receive updates once confirmed.

export type SubscribeState = { status: "idle" | "ok" | "error"; message: string };

const KIT = "https://api.kit.com/v4";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort rate limit: 5 attempts per IP per 10 minutes, per server instance.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  // Honeypot: real people never see or fill this field.
  if (formData.get("company")) return { status: "ok", message: "Check your inbox to confirm." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const firstName = String(formData.get("first_name") ?? "").trim().slice(0, 60);
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "That email does not look right. Try again." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return { status: "error", message: "Too many attempts. Please try again in a few minutes." };
  }

  const key = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  if (!key || !formId) {
    return { status: "error", message: "Sign-ups open soon. Please check back." };
  }

  const kit = (path: string, body: object) =>
    fetch(`${KIT}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Kit-Api-Key": key },
      body: JSON.stringify(body),
      cache: "no-store",
    });

  try {
    // Upsert the subscriber as inactive, then add them to the form so Kit
    // sends its double opt-in confirmation.
    const created = await kit("/subscribers", {
      email_address: email,
      first_name: firstName || null,
      state: "inactive",
    });
    if (!created.ok) throw new Error(`create ${created.status}`);

    const added = await kit(`/forms/${formId}/subscribers`, {
      email_address: email,
      referrer: h.get("referer") ?? null,
    });
    if (!added.ok) throw new Error(`form ${added.status}`);

    return {
      status: "ok",
      message: "Almost done. Look for an email from me, Samruddhi Mokal, and click the button to confirm.",
    };
  } catch (err) {
    console.error("Kit subscribe failed:", err);
    return { status: "error", message: "Something went wrong on our side. Please try again." };
  }
}
