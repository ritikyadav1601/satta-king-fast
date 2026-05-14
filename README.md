# SattaKingFast Next.js + MongoDB

This is a JavaScript Next.js rebuild of the old Laravel site.

## Stack

- Next.js App Router
- JavaScript
- MongoDB with Mongoose
- Existing public CSS/assets copied from the Laravel project
- Cookie-based admin login

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

3. Put your MongoDB connection string in `MONGODB_URI`.

4. Import the old SQL data:

```bash
npm run import:sql -- /Users/ritikyadav/Downloads/sattakingfast.com_2026-05-12_09-33-40/murgan_kalkasatta.sql
```

5. Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin

- Login URL: `/admin/login`
- If imported SQL includes users, use the imported admin email/password.
- If no user exists, the login page lets you create the first admin.

## Deploy

Deploy the folder to Vercel and set:

- `MONGODB_URI`
- `SESSION_SECRET`
- `NEXT_PUBLIC_SITE_URL`
