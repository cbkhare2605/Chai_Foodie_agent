# Option C: GitHub + Vercel – Step-by-Step

Get a **shareable link** that auto-updates when you push to GitHub.

---

## Step 1: Initialize Git (if not done)

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
git init
git add .
git commit -m "Initial commit: Foodie PWA demo"
```

---

## Step 2: Create GitHub repo and push

1. Go to **https://github.com/new**
2. Repository name: `Chai_Foodie_agent` (or any name)
3. Choose **Public**
4. **Do not** add README, .gitignore, or license (you already have them)
5. Click **Create repository**

6. Run (replace `YOUR-USERNAME` and `YOUR-REPO` with your values):

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy with Vercel

1. Go to **https://vercel.com** and sign in (or sign up with GitHub).

2. Click **Add New** → **Project**.

3. **Import** your GitHub repo (`Chai_Foodie_agent` or whatever you named it).

4. **Configure:**
   - **Root Directory:** Click **Edit** → set to `foodie-website/pwa`
   - **Output Directory:** Leave empty, or set to `public` (Vercel serves from `public` for static sites)
   - **Framework Preset:** Other (or leave default)
   - **Build Command:** Leave empty (static site)
   - **Output Directory:** Leave empty

5. Click **Deploy**.

6. Wait ~30 seconds. Vercel will show your live URL, e.g.:
   ```
   https://chai-foodie-agent-xxx.vercel.app
   ```

---

## Step 4: Your shareable link

After deploy, your link will look like:

- `https://YOUR-PROJECT-NAME.vercel.app`  
  or  
- `https://chai-foodie-agent-xxxx.vercel.app`

**Copy this URL** – it’s the link to share. Anyone can open it and add Foodie to their home screen.

---

## Step 5: Auto-updates

From now on, every time you run:

```bash
git add .
git commit -m "Your message"
git push
```

Vercel will redeploy automatically. The same URL stays the same; the app updates.

---

## Development workflow

**Edit** `foodie.html` (main app) → **Sync & test** → **Deploy**

```bash
cd foodie-website
./dev-pwa.sh
# Or: npm run dev:pwa
```

This copies `foodie.html` to `pwa/public/index.html` and starts a local server at http://localhost:8080.

When ready to deploy:
```bash
git add .
git commit -m "Your changes"
git push
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Root directory not found" | Set Root Directory to `foodie-website` |
| Blank page | Check that `foodie-website` contains `foodie.html`, `manifest.json`, `icons/` |
| 404 on root | `vercel.json` should redirect / to /foodie.html – it’s already configured |
