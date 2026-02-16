# Sync and Push — copy-paste commands

**Yes, PWA must be synced and pushed.** Deployment serves from `pwa/public/`. Run `setup.sh` first, then push.

---

## 1. Sync (run after editing foodie.html, foodie-api.js, config.js)

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent/foodie-website" && ./setup.sh
```

---

## 2. Push (run after sync)

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
git add foodie-website/foodie.html foodie-website/foodie-api.js foodie-website/config.js foodie-website/pwa/public/
git commit -m "Update Foodie app"
git push
```

---

## All-in-one (sync + push)

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent/foodie-website" && ./setup.sh && cd .. && git add foodie-website/foodie.html foodie-website/foodie-api.js foodie-website/config.js foodie-website/pwa/public/ && git commit -m "Update Foodie app" && git push
```

---

## What gets pushed

| Path | Required |
|------|----------|
| `foodie-website/foodie.html` | Yes |
| `foodie-website/foodie-api.js` | Yes |
| `foodie-website/config.js` | Yes |
| `foodie-website/pwa/public/` | Yes (deploy output) |
