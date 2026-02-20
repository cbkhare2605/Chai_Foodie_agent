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
git add foodie-website/foodie.html foodie-website/foodie-api.js foodie-website/config.js foodie-website/pwa/public/ foodie-website/VERSION.md
git commit -m "Update Foodie app"
git push
```

---

## All-in-one (sync + push)

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent/foodie-website" && ./setup.sh && cd .. && git add foodie-website/foodie.html foodie-website/foodie-api.js foodie-website/config.js foodie-website/pwa/public/ foodie-website/VERSION.md && git commit -m "Update Foodie app" && git push
```

---

## What gets pushed

| Path | Required |
|------|----------|
| `foodie-website/foodie.html` | Yes |
| `foodie-website/foodie-api.js` | Yes |
| `foodie-website/config.js` | Yes |
| `foodie-website/pwa/public/` | Yes (deploy output) |
| `foodie-website/VERSION.md` | Yes (version tracking) |

---

## Cache invalidation (force users to get latest)

When you fix bugs (e.g. search input) and need all users to load the new code:

1. **Bump version** in `foodie.html`: change `?v=9` to `?v=10` on `config.js`, `foodie-api.js`, and `sw.js`.
2. **Bump cache** in `pwa/public/sw.js`: change `CACHE = 'foodie-v9'` to `CACHE = 'foodie-v10'`.
3. **Update** `foodie-website/VERSION.md` with the new version number.
3. Run sync + push as above.

The new SW will activate, clear old caches, and users will get fresh assets on next load or when they revisit.
