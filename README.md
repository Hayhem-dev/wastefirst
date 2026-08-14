# 🗑️ Dati

> Lagos Waste Management Super-App — connecting households, PSP operators, and LAWMA

**Team Nova · EA Nigeria Summit 2026**

---

## Project Structure

```
dati/
├── frontend/          ← React app (deploy on Vercel)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Auth.jsx
│   │   ├── main.jsx
│   │   └── apps/
│   │       ├── HouseholdApp.jsx
│   │       └── PSPApp.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── backend/           ← Node.js API (deploy on Render)
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── render.yaml
│
├── render.yaml        ← Render auto-deploy config
└── README.md
```

---

## Quick Start

### Run the backend
```bash
cd backend
npm install
cp .env.example .env
node server.js
# API running at http://localhost:3001
```

### Run the frontend
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:3000
```

---

## Deploy

### Backend → Render
1. Go to [render.com](https://render.com)
2. New → Web Service → connect this repo
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add env vars from `backend/.env.example`

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import this repo
3. Root Directory: `frontend`
4. Framework: Vite
5. Deploy

---

## Features

| Feature | Description |
|---|---|
| 🚛 Household–PSP Link | Schedule pickups, track trucks, rate collectors |
| ♻️ SortPay | Earn cash for sorting recyclables |
| 🚨 WhistleBlower | Report illegal dumps, earn % of fines |
| 🗺️ WasteMap | Find PSPs, dumpsites and hotspots |
| 📱 USSD Mode | Access via `*483*1#` — no internet needed |
| 💳 Add Funds | Top up wallet via card, bank, USSD or airtime |
| 🏛️ LAWMA Portal | Enforcement dashboard and analytics |
