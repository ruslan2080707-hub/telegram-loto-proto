# Lotto Mini-app Prototype

Demo Telegram WebApp lottery with rooms, bots, i18n, tasks, referrals, withdrawals and Neon (Postgres).

## Stack
- Node.js (no framework), HTTP server in `server/server.js`
- Postgres (Neon) via `pg`
- Telegram Bot API (notifications, webhook for inline buttons)
- Vanilla JS frontend (`public/`)

## Run locally
1. Create `.env` in `server/` or project root:
```
TELEGRAM_BOT_TOKEN=YOUR_TOKEN
ADMIN_CHAT_ID=5649983054
DATABASE_URL=postgresql://... (Neon, sslmode=require)
WEBAPP_URL=http://localhost:5173
MIN_WITHDRAW_AZN=10
REF_BONUS_Q=10
```
2. Install deps and start:
```
npm i
npm start
```
App: http://localhost:5173

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

## Deploy (Railway)
1. Push to GitHub.
2. Create Railway service from repo.
3. Set ENV: `TELEGRAM_BOT_TOKEN`, `ADMIN_CHAT_ID`, `DATABASE_URL`, `WEBAPP_URL`, `MIN_WITHDRAW_AZN`, `REF_BONUS_Q`.
4. Set Telegram webhook after deploy (replace domain and token):
```
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook?url=https://<railway-domain>/tg/webhook"
```

## Notes
- Money stored in qepik (integer cents). UI shows AZN with 2 decimals.
- Referral bonus = 0.10 AZN (10 qepik) on first entry of invited user.
- Withdraw uses admin inline buttons in Telegram for approval.
