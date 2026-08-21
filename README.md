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

## Brand

Colors, typography (Fraunces + Inter), and layout follow the Pace Labz brand system v2. Brand tokens are defined in `tailwind.config.ts` and `app/globals.css`.

## Structure

```
app/            layout, page, global styles
components/      Hero, Toolkit (search + filter), ToolCard, Footer, icons
data/           tools.ts (catalog), categories.ts (sections)
lib/            types.ts
```
