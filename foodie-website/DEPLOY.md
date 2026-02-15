# Deploy Foodie – Share with Anyone, Anywhere

Deploy the app to get a **public URL** you can share with anyone (no same WiFi needed).

---

## Option 1: Vercel (fastest, ~2 min)

1. **Install Vercel CLI** (one-time):
   ```bash
   npm install -g vercel
   ```

2. **Deploy** from the project folder:
   ```bash
   cd foodie-website
   vercel
   ```

3. Follow the prompts:
   - Log in or sign up (free) at vercel.com
   - Accept defaults (link to existing project or create new)
   - You’ll get a URL like `https://foodie-xxx.vercel.app`

4. **Share** that URL. Anyone can open it and add to home screen.

---

## Option 2: Netlify Drop (no CLI)

1. Go to **https://app.netlify.com/drop**

2. **Drag and drop** the `foodie-website` folder onto the page.

3. Netlify will deploy and give you a URL like `https://random-name-xxx.netlify.app`.

4. **Share** that URL.

> **Tip:** Sign up (free) to keep the same URL and redeploy when you update.

---

## Option 3: Connect GitHub for auto-deploy

1. Push your project to **GitHub**.

2. Go to **vercel.com** or **netlify.com** and sign in with GitHub.

3. **Import** your repo and set the root directory to `foodie-website`.

4. Deploy. Every push to `main` will auto-update the live site.

5. Share the URL (e.g. `https://your-project.vercel.app`).

---

## After deployment

- **HTTPS** is automatic (required for PWA).
- **Add to Home Screen** works on iOS and Android.
- **Share** the URL by text, email, or link.

---

## Custom domain (optional)

On Vercel or Netlify you can add your own domain (e.g. `foodie.app`) in the project settings.
