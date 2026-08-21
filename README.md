# The AI Toolkit — by Samruddhi Mokal / Pace Labz

A curated, categorized directory of the AI tools that actually earn their place. Built in the Pace Labz brand system with Next.js. Search, filter by category, and a "I use this" toggle for personally-vouched tools.

Live purpose: the go-to resource shared with training-session attendees.

---

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

---

## Deploy to Vercel (recommended)

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "The AI Toolkit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repo.
3. Vercel auto-detects Next.js. No configuration needed. Click **Deploy**.
4. You get a live URL. Every future `git push` redeploys automatically.

---

## Editing the content

Everything lives in two files. No code changes needed to update the guide.

- **`data/tools.ts`** — the full catalog. Each tool is one line:
  ```ts
  { name: "Tool", url: "https://...", category: "automation", blurb: "Short line.", favorite: true, added: true },
  ```
  - `favorite: true` shows the amethyst **"I use this"** badge. Add or remove it on any tool.
  - `added: true` shows the **"Added"** tag (curated additions beyond the original list).
  - `blurb` is the one-liner shown on the card. Keep it short and specific.
- **`data/categories.ts`** — the category list, their order on the page, and each section's one-line description. To add a new category, add an entry here and a matching `id` in `lib/types.ts`.
- **`data/toolDetails.ts`** — the rich content shown in each tool's detail card (description, bestFor, pricing, pros, cons, take), keyed by the exact tool name. Edit any field freely; missing tools fall back to the card blurb.

## Brand

Colors, typography (Fraunces + Inter), and layout follow the Pace Labz brand system v2. Brand tokens are defined in `tailwind.config.ts` and `app/globals.css`.

## Interactions

- **Detail cards**: clicking a tool opens a modal with what it is, best-for, pricing, strengths, watch-outs, a one-line take, and the visit link.
- **Search**: the hero search bar filters live; the sticky top bar mirrors it.
- **Command palette**: press `⌘K` / `Ctrl+K` or `/` anywhere to jump to any tool (arrow keys + Enter to open its detail card).
- **Category sidebar** (desktop): scrollspy highlights the section you're in; click to jump. On mobile it becomes a horizontal rail.
- **"I use this" toggle**: filters to Samruddhi's personally-used tools.
- Motion (scroll reveals, counters, marquee, rotating word) respects `prefers-reduced-motion`.

## Structure

```
app/            layout, page, global styles (dark theme + motion)
components/      Directory (layout + state), Hero, ToolCard,
                 CommandPalette (⌘K / "/"), Footer, icons
data/           tools.ts (catalog), categories.ts (sections)
lib/            types.ts
```
