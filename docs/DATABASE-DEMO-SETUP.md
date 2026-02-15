# Foodie: Database-Backed Demo Setup

**Goal:** Deploy Foodie with a real database so multiple people can sign up, connect, and see each other's reviews.

---

## Overview

| Mode | Data | Auth | Use case |
|------|------|------|----------|
| **Local** (default) | localStorage | Pick a name | Solo demo, no setup |
| **Database** | Supabase | Email signup | Shared demo with friends |

When `config.js` has Supabase URL + key, the app uses the database. Otherwise it uses localStorage.

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. **New project** → name it (e.g. `foodie-demo`) → set a database password
3. Wait for the project to be ready
4. Go to **Settings → API** and copy:
   - **Project URL** (e.g. `https://xxxx.supabase.co`)
   - **anon public** key

---

## Step 2: Run Schema and RLS

1. In Supabase, open **SQL Editor**
2. Run `foodie-website/supabase/schema.sql` (creates tables, trigger)
3. Run `foodie-website/supabase/rls.sql` (enables RLS and policies)

---

## Step 3: Configure Auth

1. In Supabase: **Authentication → Providers**
2. Enable **Email** (default)
3. Optional: enable **Google** or **GitHub** for social login
4. Under **URL Configuration**, add your app URL (e.g. `https://your-app.vercel.app`) to **Site URL** and **Redirect URLs**

---

## Step 4: Add Config to Your App

1. Copy `config.example.js` to `config.js` (or edit `config.js` if it exists)
2. Fill in your values:

```javascript
window.FOODIE_CONFIG = {
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key-here'
};
```

3. **Important:** Add `config.js` to `.gitignore` if it contains secrets, or use Vercel env vars (see Step 6)

---

## Step 5: Deploy with Config

The app loads `config.js` from the same origin. For Vercel:

**Option A – Commit config.js (simplest for demo)**  
- Put your Supabase URL and anon key in `config.js`  
- Commit and push (anon key is safe to expose; RLS protects data)

**Option B – Env vars (no secrets in repo)**  
- In Vercel: **Settings → Environment Variables**  
- Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`  
- Add a build step that injects them into `config.js`, or use a serverless function that serves config

For a quick demo, Option A is fine.

---

## Step 6: Sync PWA and Deploy

```bash
cp foodie-website/foodie.html foodie-website/pwa/public/index.html
cp foodie-website/config.js foodie-website/pwa/public/
cp foodie-website/foodie-api.js foodie-website/pwa/public/
# Ensure Supabase script is in index.html (see integration section)
git add .
git commit -m "Database demo setup"
git push
```

---

## Demo Flow (Database Mode)

1. **You** deploy the app with Supabase config
2. **Friends** open the URL → see signup/login
3. **Sign up** with email + password (and display name)
4. **Connect** by sending requests (by display name)
5. **Post reviews** → they appear in each other's feeds
6. **Map, network score, etc.** work with shared data

---

## File Checklist

| File | Purpose |
|------|---------|
| `supabase/schema.sql` | Tables, indexes, trigger |
| `supabase/rls.sql` | Row Level Security |
| `config.example.js` | Template for config |
| `config.js` | Your Supabase URL + key |
| `foodie-api.js` | Supabase data layer |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Supabase init failed" | Check URL and key in config.js; ensure no typos |
| Blank page | Open console; check for CORS or script load errors |
| Auth redirect fails | Add your app URL to Supabase Auth redirect URLs |
| RLS blocks reads | Verify RLS policies; anon key has limited access |

---

## Current Integration Status

| Component | Status |
|-----------|--------|
| Schema + RLS | ✓ Ready to run in Supabase |
| Config + API | ✓ `config.js`, `foodie-api.js` |
| Load path | ✓ App uses `FOODIE_API.loadData()` when config has Supabase keys |
| Auth UI | ✓ Supabase signup/login when API enabled |
| Save path | ✓ Reviews, comments, connections, saved, lists, private notes, profile updates |

**With empty config:** App works in localStorage mode (default).  
**With Supabase config:** Full database mode – sign up, connect, post reviews, see friends' feeds.

## Live Deployment

1. Add your Vercel URL to **Supabase → Authentication → URL Configuration** (Site URL and Redirect URLs).
2. Run `./setup.sh` in `foodie-website` to sync PWA files.
3. Commit and push; Vercel auto-deploys.
