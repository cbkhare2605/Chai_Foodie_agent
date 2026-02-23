# Production Transition Plan

**Purpose:** Plan for transitioning Foodie from current usage to full production without affecting existing users. The transition should be seamless.

**Last updated:** 2025-02-12

---

## Guiding principle

**Current users must not be disrupted.** All changes should be additive or transparent. No forced re-login, no broken links, no data loss.

---

## What “full production” means

| Area | Current | Production |
|------|---------|------------|
| **Scale** | Early adopters | Many users, higher traffic |
| **Reliability** | Good enough | Uptime, backups, monitoring |
| **Domain** | Vercel subdomain | Optional: custom domain (e.g. foodie.app) |
| **Costs** | Free tiers | Paid plans when limits hit |
| **Features** | Core features | Optional: paid tiers, compliance, etc. |

---

## Seamless transition principles

### 1. No breaking changes for existing users

- **Auth:** Keep Supabase Auth. Same JWT flow, same refresh. No forced re-login.
- **Data:** All user data stays in Supabase. Migrations must be additive (new columns, new tables), not destructive.
- **API:** Existing endpoints and behavior stay. Add new ones alongside; do not remove or change existing ones in a breaking way.

### 2. URL continuity

If moving from `chai-foodie-agent.vercel.app` to a custom domain (e.g. `foodie.app`):

- Set up **301 redirects** from old URLs to new ones.
- PWA installs and bookmarks will continue to work via redirects.
- Deep links (`?connect=Name`, `?review=id`) must be preserved in redirects.

### 3. App / PWA

- Same app code for everyone; no separate “beta” vs “production” app.
- Version bumps (`?v=9`, `foodie-v9`) already handle cache invalidation.
- New deploys roll out to all users; no separate “production app” to install.

### 4. Infrastructure upgrades

- **Supabase:** Upgrade plan when limits are approached (DB size, bandwidth, MAU). Same project, same URLs, same API.
- **Vercel:** Upgrade plan when needed. Same deployment flow; no change for users.
- **Domain:** Add custom domain in Vercel; point DNS. Redirect old domain to new.

---

## Checklist: before going to production

| Area | Action | User impact |
|------|--------|-------------|
| **Supabase** | Monitor usage; upgrade plan before limits | None if upgraded in time |
| **Vercel** | Same | None |
| **Custom domain** | Add domain + redirects | None if redirects correct |
| **Schema changes** | Additive migrations only | None if backward compatible |
| **New features** | Ship behind feature flags if needed | Gradual, controlled rollout |

---

## What does not need to change

- **Auth flow** — Supabase Auth is production-ready.
- **Data model** — Reviews, connections, profiles are suitable for production.
- **Deploy flow** — Git push → Vercel is standard.
- **PWA setup** — Manifest, service worker, icons are in place.

---

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Breaking auth | Do not change Supabase Auth config or JWT handling |
| Breaking links | Use 301 redirects when changing domain |
| Breaking data | Use additive migrations only; test rollbacks |
| Cache issues | Use version bumps (`?v=`, `foodie-v`) for cache invalidation |
| Sudden scale | Monitor Supabase/Vercel usage; upgrade before limits |

---

## Summary

The transition is mainly about:

1. **Scaling** — Upgrade Supabase/Vercel when usage grows.
2. **Domain** — Add custom domain and redirect old URLs.
3. **Stability** — Backups, monitoring, error handling.
4. **Compatibility** — Keep APIs and schema backward compatible.

Avoid breaking auth, URLs, or data. Add and scale; do not replace core flows.

---

## Related docs

- [Deployment next steps](./DEPLOYMENT-NEXT-STEPS.md)
- [Deployment safety](./DEPLOYMENT-SAFETY.md)
- [Project context](./PROJECT-CONTEXT.md)
