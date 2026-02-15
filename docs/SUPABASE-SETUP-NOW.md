# Supabase Setup — Do This Now

Follow these steps in order. You already have local + deploy working.

---

## Step 1: Create Supabase Project (≈2 min)

1. Open **https://supabase.com** and sign in (or create account)
2. Click **New project**
3. **Name:** `foodie-demo` (or any name)
4. **Database password:** Choose a strong password (save it)
5. **Region:** Pick one close to you
6. Click **Create new project**
7. Wait 1–2 minutes for the project to be ready

---

## Step 2: Run Schema (≈1 min)

1. In the Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open this file in your editor: `foodie-website/supabase/schema.sql`
4. **Copy the entire contents** (Cmd+A, Cmd+C)
5. **Paste** into the Supabase SQL Editor
6. Click **Run** (or Cmd+Enter)
7. You should see: "Success. No rows returned"

---

## Step 3: Run RLS (≈1 min)

1. In the same SQL Editor, click **New query** again
2. Open `foodie-website/supabase/rls.sql`
3. **Copy the entire contents**
4. **Paste** into the SQL Editor
5. Click **Run**
6. You should see: "Success. No rows returned"

---

## Step 4: Get Your Keys (≈30 sec)

1. In Supabase, click **Settings** (gear icon) in the left sidebar
2. Click **API** under Project Settings
3. Copy these two values:
   - **Project URL** (e.g. `https://abcdefgh.supabase.co`)
   - **anon public** key (under "Project API keys" — the long string)

---

## Step 5: Add Keys to Config

Tell me when you've completed Steps 1–4 and have your **Project URL** and **anon public** key. I'll update `config.js` for you.

Or do it yourself: edit `foodie-website/config.js` and replace the empty strings:

```javascript
window.FOODIE_CONFIG = {
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',   // paste your URL
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...'  // paste your anon key
};
```

---

## Step 6: Sync and Test

```bash
cd foodie-website
./setup.sh run
```

Open http://localhost:8080. The app will try to load from Supabase. Right now **auth is not wired** — so you'll see the signup page. When you use "pick a name" (demo login), data still goes to localStorage. The database load path is ready; we'll wire auth and save next.

---

## Step 7: Deploy (when ready)

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
./foodie-website/setup.sh
git add .
git commit -m "Add Supabase database config"
git push
```

Vercel will redeploy. Your live app will use the database once auth is wired.

---

## Checklist

- [ ] Step 1: Supabase project created
- [ ] Step 2: schema.sql run successfully
- [ ] Step 3: rls.sql run successfully
- [ ] Step 4: Project URL and anon key copied
- [ ] Step 5: config.js updated
- [ ] Step 6: Local test with `./setup.sh run`
- [ ] Step 7: Pushed to GitHub (Vercel redeploys)
