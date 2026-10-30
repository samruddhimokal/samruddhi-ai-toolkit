"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions";

const initial: SubscribeState = { status: "idle", message: "" };

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [state, action, pending] = useActionState(subscribe, initial);

  if (state.status === "ok") {
    return (
      <p role="status" className="rounded border border-amethyst/50 bg-panel px-5 py-4 text-[15px] text-bone">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="relative max-w-xl">
      <div className={`flex flex-col gap-3 ${compact ? "sm:flex-row" : ""}`}>
        {!compact && (
          <label className="block">
            <span className="sr-only">First name</span>
            <input
              name="first_name"
              type="text"
              autoComplete="given-name"
              placeholder="First name (optional)"
              className="w-full rounded border border-dark-border bg-panel px-4 py-3.5 text-[15px] text-bone placeholder:text-stone focus:border-amethyst"
            />
          </label>
        )}
        <label className="block flex-1">
          <span className="sr-only">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@work.com"
            className="w-full rounded border border-dark-border bg-panel px-4 py-3.5 text-[15px] text-bone placeholder:text-stone focus:border-amethyst"
          />
        </label>
        {/* Honeypot, hidden from people and screen readers */}
        <input
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded bg-amethyst px-5 py-3.5 text-[14px] font-medium text-bone transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Subscribing…" : "Get regular AI updates"}
        </button>
      </div>
      {state.status === "error" && (
        <p role="alert" className="mt-3 text-[13.5px] text-dusk">
          {state.message}
        </p>
      )}
      <p className="mt-3 text-[12.5px] text-stone">
        Always free, no card needed. New tools, best videos, and what changed. Unsubscribe anytime.
      </p>
    </form>
  );
}
