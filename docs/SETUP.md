# Foodie Setup Guide

Choose your path:

---

## Path A: Local Demo (No Database)

**Use when:** You want to try the app quickly on your machine.

```bash
cd foodie-website
./setup.sh run
```

Then open **http://localhost:8080** in your browser. Click "Sign up / Login" and pick a name. Data stays in your browser (localStorage).

---

## Path B: Deploy to Web (Still localStorage)

**Use when:** You want a shareable link; data is still per-device.

### 1. Sync and test locally

```bash
cd foodie-website
./setup.sh run
```

Test at http://localhost:8080, then Ctrl+C to stop.

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. **Add New** → **Project** → import your repo
3. **Root Directory:** `.` (repo root)
4. **Output Directory:** `foodie-website/pwa/public`
5. **Deploy**

### 3. Push your code

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
./foodie-website/setup.sh
git add foodie-website/foodie.html foodie-website/pwa/public/
git commit -m "Deploy Foodie"
git push
```

Vercel will redeploy automatically. Share your URL (e.g. `https://chai-foodie-agent-xxx.vercel.app`).

---

## Path C: Database Demo (Supabase)

**Use when:** You want multiple people to share data (reviews, connections).

### 1. Create Supabase project

1. [supabase.com](https://supabase.com) → **New project**
2. Name: `foodie-demo` (or any)
3. Set a database password and wait for setup

### 2. Run schema in Supabase

1. Supabase dashboard → **SQL Editor**
2. Open `foodie-website/supabase/schema.sql` in your editor
3. Copy all → paste in SQL Editor → **Run**
4. Open `foodie-website/supabase/rls.sql` → copy all → paste → **Run**

### 3. Get your keys

1. Supabase → **Settings** → **API**
2. Copy **Project URL** and **anon public** key

### 4. Add keys to config

Edit `foodie-website/config.js`:

```javascript
window.FOODIE_CONFIG = {
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key-here'
};
```

### 5. Sync and test

```bash
cd foodie-website
./setup.sh run
```

Open http://localhost:8080. With Supabase keys set, the app will try to load from the database. **Note:** Auth (email signup/login) is not yet wired—so you'll see empty data until that's implemented. For now, leave config empty to use localStorage, or use the keys to test the load path.

### 6. Deploy

Same as Path B—push to GitHub; Vercel deploys. Ensure `config.js` (with your keys) is in `pwa/public/` and committed.

---

## Quick Commands

| Task | Command |
|------|---------|
| Sync files only | `cd foodie-website && ./setup.sh` |
| Sync + run locally | `cd foodie-website && ./setup.sh run` |
| Full deploy | `./foodie-website/setup.sh` then `git add . && git commit -m "Deploy" && git push` |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `setup.sh: Permission denied` | `chmod +x foodie-website/setup.sh` |
| Blank page | Run `./setup.sh` to sync; refresh |
| Camera not working | Use https or localhost (not file://) |
| Supabase errors | Check URL and key in config.js; run schema + RLS |
