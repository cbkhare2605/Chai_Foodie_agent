# Deployment Next Steps

**Purpose:** Concrete checklist to get Foodie live and keep it updated.

---

## Current Status

| Item | Status |
|------|--------|
| Git repo | ✓ Initialized, connected to origin |
| Vercel config | ✓ `vercel.json` at repo root |
| PWA assets | ✓ `foodie-website/pwa/public/` (manifest, sw, icons) |
| Security | ✓ Headers, XSS protection, input limits (see DEPLOYMENT-SAFETY.md) |

**Uncommitted changes:** `foodie.html`, `pwa/public/index.html`, `vercel.json` — include these before deploy.

---

## Step 1: Sync PWA and Test Locally

```bash
cd foodie-website
npm run dev:pwa
```

This copies `foodie.html` → `pwa/public/index.html` and serves at http://localhost:8080.

- Test: Add review, camera, restaurant search (location-aware), map.
- Stop server when done (Ctrl+C).

---

## Step 2: Commit and Push

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"

# Sync PWA (copy foodie.html and ensure config/api are in pwa/public)
cp foodie-website/foodie.html foodie-website/pwa/public/index.html
cp foodie-website/config.js foodie-website/pwa/public/
cp foodie-website/foodie-api.js foodie-website/pwa/public/

git add foodie-website/foodie.html foodie-website/pwa/public/index.html foodie-website/pwa/public/config.js foodie-website/pwa/public/foodie-api.js vercel.json
git add docs/DEPLOYMENT-SAFETY.md docs/SECURITY-STATUS.md docs/BACKEND-ROADMAP.md  # optional
git status   # verify
git commit -m "Deploy: camera capture, location-aware search, security updates"
git push
```

---

## Step 3: Vercel Setup (First Time Only)

If you haven’t connected Vercel yet:

1. Go to **https://vercel.com** and sign in (GitHub recommended).
2. **Add New** → **Project** → Import your repo (`Chai_Foodie_agent`).
3. **Configure:**
   - **Root Directory:** Leave as repo root (`.`)
   - **Output Directory:** `foodie-website/pwa/public` (from `vercel.json`)
   - **Build Command:** Leave empty
4. **Deploy.**

Your live URL will look like: `https://chai-foodie-agent-xxx.vercel.app`

---

## Step 4: Ongoing Deployments

After the first deploy, every push to `main` triggers a new deployment:

```bash
cd foodie-website
npm run dev:pwa   # sync foodie.html → pwa/public/index.html, test locally
# Ctrl+C when done testing

cd ..
git add .
git commit -m "Your change description"
git push
```

Vercel redeploys automatically; the URL stays the same.

---

## Quick Reference

| Action | Command |
|--------|---------|
| Sync + test locally | `cd foodie-website && npm run dev:pwa` |
| Deploy (after sync) | `git add . && git commit -m "..." && git push` |
| Check Vercel | https://vercel.com/dashboard |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page | Ensure `pwa/public/index.html` exists and is up to date. Run `npm run dev:pwa` in foodie-website. |
| Camera not working | Must be served over HTTPS (Vercel) or localhost. |
| 404 on root | `vercel.json` should point output to `foodie-website/pwa/public`. |
| Stale content | Run `npm run dev:pwa` before pushing so `pwa/public/index.html` is synced. |
