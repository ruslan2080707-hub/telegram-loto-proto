# Lotto Mini-app Prototype

Demo Telegram WebApp lottery with rooms, bots, i18n, tasks, referrals, withdrawals and Neon (Postgres).

## Stack
- Node.js (no framework), HTTP server in `server/server.js`
- Postgres (Neon) via `pg`
- Telegram Bot API (notifications, webhook for inline buttons)
- Vanilla JS frontend (`public/`)
- Deployed on Railway

## Quick Deploy to Railway + Neon

### 1. Setup Neon Database
1. Go to [Neon Console](https://console.neon.tech/)
2. Create new project: `lotto-proto`
3. Copy the connection string (starts with `postgresql://`)

### 2. Setup Railway
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub account
3. Create new project from GitHub repo: `ruslan2080707-hub/telegram-loto-proto`
4. Railway will auto-deploy from main branch

### 3. Configure Environment Variables in Railway
In Railway dashboard → Variables tab, add:

```
DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require
TELEGRAM_BOT_TOKEN=your_bot_token_here
BOT_TOKEN=your_bot_token_here
ADMIN_CHAT_ID=your_admin_chat_id
PORT=3000
MIN_WITHDRAW_AZN=10
REF_BONUS_Q=10
PUBLIC_BASE_URL=https://your-app.railway.app
WEBAPP_URL=https://your-app.railway.app
STARS_TO_USD=0.02
USD_TO_AZN=1.70
TON_USD=2.13
TON_WALLET=UQB21lj7GGZIaYUcC_lifGsImy5qpsiKS1zJZwLypS-ZZnoG
```

### 4. Set Telegram Webhook
After Railway deployment, set webhook:
```bash
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook?url=https://your-app.railway.app/tg/webhook"
```

## Run locally
1. Copy `env.example` to `.env` and fill values
2. Install deps and start:
```bash
npm i
npm start
```
App: http://localhost:3000

## API (server)
- POST `/api/telegram/verify` — verify WebApp initData, upsert user, apply referral bonus.
- POST `/api/withdraw/request` — create withdraw to card (16 digits, min 10 AZN), notify admin.
- GET `/api/admin/withdraw/approve|decline?id=...` — approve/decline (fallback to webhook buttons).
- GET `/api/tasks` — list tasks (seed on first call). `?tg_id=` to include completion marks.
- POST `/api/tasks/complete` — complete task, grant bonus.
- GET `/api/profile?tg_id=` — profile summary.
- GET `/api/leaderboard` — top players.
- POST `/tg/webhook` — Telegram webhook for inline approve/decline.

## Frontend
- Tabs: Rooms, Tasks, Referral, Rating, Profile (footer).
- Click balance badge to open quick actions (deposit/withdraw).
- Referral link: `https://t.me/loto_onlinebot?startapp=ref_<tg_id>`.

## Notes
- Money stored in qepik (integer cents). UI shows AZN with 2 decimals.
- Referral bonus = 0.10 AZN (10 qepik) on first entry of invited user.
- Withdraw uses admin inline buttons in Telegram for approval. 
