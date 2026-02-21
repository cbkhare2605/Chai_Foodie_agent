# Foodie — Version Tracking

**Single source of truth for current version.** Bump these together when deploying fixes that must invalidate caches.

---

## Current version: **9**

| Location | Value |
|----------|-------|
| `foodie.html` | `config.js?v=9`, `foodie-api.js?v=9`, `sw.js?v=9` |
| `pwa/public/sw.js` | `CACHE = 'foodie-v9'` |
| `package.json` | `"version": "1.0.0"` (semver; rarely changed) |
| `CHANGELOG.md` | Latest: v4.1 |

---

## Cache invalidation (force users to load latest)

When deploying a fix that users must get immediately:

1. **Bump version** in `foodie.html`: change `?v=9` to `?v=10` on `config.js`, `foodie-api.js`, and `sw.js`.
2. **Bump cache** in `pwa/public/sw.js`: change `CACHE = 'foodie-v9'` to `CACHE = 'foodie-v10'`.
3. **Update this file**: change "Current version" above to 10.
4. Run sync + push.

---

## Git tags (restore points)

| Tag | Purpose |
|-----|---------|
| `v1.0-working` | Stable baseline |
| `v1.1-test` | Test version (map, profile, etc.) |
| `v1.2-working` | Invite auto-connect, network search, groups, etc. |
| `v1.0.1` | **Current working**: feed level links, deduplication fix, My Reviews count, Roma Italian fix |

See `RESTORE-WORKING-VERSION.md` for restore commands.

---

## Deploy flow

Deploy via **git push** (Vercel auto-deploys). Never use `vercel` CLI.

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent/foodie-website" && ./setup.sh && cd .. && git add foodie-website/foodie.html foodie-website/foodie-api.js foodie-website/config.js foodie-website/pwa/public/ && git commit -m "Update Foodie app" && git push
```

---

*Last updated: 2025-02-12*
