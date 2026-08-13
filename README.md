# WasteFirst

Two React app prototypes in one project, switchable from a top bar:

- **Household app** — scheduled pickups, SortPay (get paid for sorted
  recyclables), WhistleBlower (report illegal dumping), and a USSD-mode
  simulator.
- **PSP interface** — the operator side: dashboard, incoming pickup
  requests, job detail, SortPay weight verification, earnings/payouts,
  and profile & coverage settings.

## Run locally

```bash
npm install
npm run dev
```

Opens on http://localhost:3000

## Deploy on Replit

1. Create a new Repl → **Import from GitHub** (or upload this folder directly).
2. Replit reads `.replit` automatically and will run `npm install && npm run dev`.
3. Click **Run** — the webview opens on port 3000.

## Deploy elsewhere (Vercel, Netlify, Render, etc.)

```bash
npm install
npm run build     # outputs static files to dist/
npm run preview   # sanity-check the production build locally
```

Point your host's build command at `npm run build` and its output/publish
directory at `dist`.

## Project structure

```
src/
  main.jsx            → mounts the app
  App.jsx             → top-bar switcher between Household / PSP views
  apps/
    HouseholdApp.jsx  → household-side screens + state
    PSPApp.jsx        → PSP (operator) screens + state
index.html            → HTML entry point, loads the Inter font
vite.config.js
```

## Notes

- **Sign up / log in is a client-side demo gate**, not real authentication.
  On sign-up, a 4-digit code is generated and shown directly on screen
  (labeled as a demo code) instead of being texted — there's no SMS/email
  service wired up yet. Accounts are stored in the browser's `localStorage`,
  so they're per-device only: a tester who signs up on their phone won't see
  that account on a laptop, and clearing browser storage resets it.
  This is enough to gate a small beta test; a real multi-device launch will
  need a backend (accounts in a database, real SMS/OTP or email verification).
- No UI kit or icon library — screens use inline styles and emoji, so there
  are no extra dependencies to install beyond React itself.
- All in-app data (PSPs, requests, wallet balances, reports) is mocked in
  component state and resets on refresh; wire up a backend/API before this
  goes further than a clickable prototype.
- The two apps are independent components sharing one design system
  (colors, spacing, card/button styles) — in a real build they'd likely
  ship as separate deployments (household app vs. PSP-facing web app),
  but living together here makes it easy to compare both sides.
