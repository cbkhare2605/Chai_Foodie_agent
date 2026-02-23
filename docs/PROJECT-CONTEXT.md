# Project context — cross-agent awareness

**Purpose:** Single place for recent work, decisions, and touchpoints so all agents (and the user) can stay aware of each other's contributions.  
**Maintained by:** Software Integrator (see `docs/AGENTS-INTEGRATOR.md`).  
**Last updated:** 2025-02-12

---

## Recent work (last few days)

### 2025-02-12 — Supabase linter and performance fixes (migrations 012–020)

- **What:** Full pass to resolve Supabase Security Advisor and Performance Advisor issues. Migrations 012–020 cover:
  - **012:** Unindexed FKs, missing RLS (connections DELETE), notifications insert tightened
  - **013:** `handle_new_user` — set `search_path = ''` (function search path mutable)
  - **014:** `fix_review_location` — set `search_path = ''`
  - **015:** profiles — `(select auth.uid())` for RLS initplan
  - **016:** All tables — wrap `auth.uid()`/`auth.role()` in `(select ...)` for RLS initplan
  - **017:** connection_requests — merge two UPDATE policies into one
  - **018:** group_members — merge two SELECT policies into one
  - **019:** groups — merge two SELECT policies into one
  - **020:** review_likes — merge SELECT policies, split INSERT/UPDATE/DELETE
- **Where:** `foodie-website/supabase/migrations/012-*.sql` through `020-*.sql`, `rls.sql`, `groups-rls.sql`, `schema.sql`, `fix-review-location.sql`.
- **Decisions / notes:** Run migrations 012–020 in Supabase SQL Editor (in order). Leaked password protection requires Pro plan. **Push code** after changes so migrations are versioned and available for deploy/recovery.

### 2025-02-12 — Future features backlog documented

- **What:** `docs/FUTURE-FEATURES.md` — backlog of features to implement. First entry: **Favorites** (with travel use case) — curated top picks distinct from Saved; location filter by country/city; useful when visiting different countries.
- **Where:** `docs/FUTURE-FEATURES.md`, `docs/README.md`.
- **Decisions / notes:** User requested keeping Favorites as a future feature list. Add new ideas to FUTURE-FEATURES.md when planning work.

### 2025-02-12 — Production transition plan documented

- **What:** `docs/PRODUCTION-TRANSITION-PLAN.md` — plan for moving to full production without affecting current users. Principles: no breaking auth/URLs/data; additive migrations; URL redirects if domain changes; scale Supabase/Vercel when needed.
- **Where:** `docs/PRODUCTION-TRANSITION-PLAN.md`, `docs/README.md`.
- **Decisions / notes:** User requested documentation for future production transition. Plan emphasizes seamless transition and backward compatibility.

### 2025-02-12 — Invite flow: auto-connect survives email confirmation

- **What:** Invitees who sign up via your link now auto-connect even when the email confirmation link opens in a different tab or browser. Previously, `pendingConnect` was lost because it lived in sessionStorage when the user left to confirm email. Now: (1) `pendingConnect` stored in localStorage; (2) Supabase `emailRedirectTo` includes `?connect=InviterName` so the redirect URL carries the inviter — no reliance on storage across contexts.
- **Where:** `foodie-website/foodie-api.js` (signUp with emailRedirectTo), `foodie-website/foodie.html` (handleSupabaseSignUp passes connectParam, handleDeepLink uses localStorage).
- **Decisions / notes:** Test invite flow in Network tab (collapsible "Test invite flow"). If auto-connect fails, ensure Supabase Dashboard → Authentication → URL Configuration → Redirect URLs includes your app URL (with or without query params, depending on Supabase version).

### 2025-02-12 — New user discovery and onboarding

- **What:** New users can now discover others on Foodie without knowing usernames. (1) **People on Foodie** — Network tab shows users who have written reviews; connect with one tap. (2) **Empty-state onboarding** — When feed and connections are empty, a "Get started" card explains how to connect (People on Foodie, Invite friends, Search by name) and links to Network.
- **Where:** `foodie-website/foodie-api.js` (`getSuggestedUsers`), `foodie-website/foodie.html` (Network panel, feed empty state).
- **Decisions / notes:** Invite link already includes `?connect=DisplayName` so invitees land on Network with inviter pre-filled. Search (min 2 chars) remains for users who know a name.

### 2025-02-12 — Cache invalidation for all users

- **What:** Cache-busting added so users get latest code on laptop and mobile. `config.js?v=4`, `foodie-api.js?v=4`, `sw.js?v=4`; service worker cache bumped to `foodie-v4`.
- **Where:** `foodie-website/foodie.html`, `foodie-website/pwa/public/sw.js`, `foodie-website/SYNC-AND-PUSH.md`.
- **Decisions / notes:** Bump version in foodie.html and sw.js when deploying fixes that must invalidate old caches.

### 2025-02-12 — Cancel pending connection requests

- **What:** Users can cancel connection requests they sent (e.g. if recipient hasn't accepted). Cancel button in Network → Pending (sent). API: `cancelConnectionRequest(reqId)`; RLS policy for sender to update.
- **Where:** `foodie-website/foodie.html`, `foodie-website/foodie-api.js`, `supabase/migrations/010-sender-can-cancel-connection-request.sql`.
- **Decisions / notes:** Run migration 010 in Supabase SQL Editor if not using CLI.

### 2025-02-12 — Groups debug button removed

- **What:** Removed "Refresh & show debug" button from Groups page. `groupsDebug` removed from loadData and state.
- **Where:** `foodie-website/foodie.html`, `foodie-website/foodie-api.js`.
- **Decisions / notes:** Groups RLS and refresh issues resolved; debug UI no longer needed.

### 2025-02-12 — Groups RLS and visibility fixes (earlier)

- **What:** Migrations 002–009: creator backfill, auto-member trigger, RLS recursion fixes. Groups now visible to creators and members.
- **Where:** `foodie-website/supabase/migrations/002–009`.
- **Decisions / notes:** Run all migrations in order for groups to work correctly.

### 2025-02-12 — Pull-to-refresh, invite flow, people search

- **What:** Pull-to-refresh on all tabs; Network reorganized (Invite via link vs Connect with someone on Foodie); LinkedIn-style people search with debounced input.
- **Where:** `foodie-website/foodie.html`, `foodie-website/foodie-api.js`.
- **Decisions / notes:** Search input had focus/typing issues; cache invalidation (v4) should help users get fixed version.

### 2025-02-12 — QA pass: XSS and null-safety fixes

- **What:** QA / Bug Hunter pass. Fixed XSS in title attributes (display names, likedBy, alsoBy, cuisines) — now escaped with escapeHtml. Added null-safety guards for state.user in toggleLike, addComment, sendConnectionRequest, acceptConnectionRequest, ignoreConnectionRequest, removeConnection, addReview.
- **Where:** `foodie-website/foodie.html`.
- **Decisions / notes:** User-generated content in title attributes and map popups now escaped. Guards prevent crashes when session expires or user is null.

---

## How to use this file

- **Before starting work:** Read the entries below so you know what's been done and what to take into account.
- **After finishing work:** Add a short entry (see format in `docs/AGENTS-INTEGRATOR.md` § 5) or report to the Software Integrator so it can be compiled here.
- **Software Integrator:** Periodically trim or archive old entries so this stays scannable (e.g. keep last 2–4 weeks of detail).

**Project rule:** All documentation must be passed through the user before it is final. Do not mark any doc as **Current** in the index until the user has reviewed and approved it. See `docs/sops/SOP-document-creation.md` and `docs/AGENTS-DOCUMENT-CREATOR.md`.

---

## Project: Chai Foodie Agent

**Scope:** Food-related agent project (Chai/Foodie domain). Multi-agent coordination via Software Integrator, with specialist agents for documentation, chemical engineering, and executive control.

---

## Recent work and decisions

### 2025-02-12 — Software Integrator — Integration structure and cross-agent documentation

- **What:** Full integration structure created for Chai_Foodie_agent. Software Integrator role established; coordination docs for all agents; PROJECT-CONTEXT, SOPs, quality standards, and document index.
- **Where:** `docs/AGENTS-INTEGRATOR.md`, `docs/AGENTS-EXECUTIVE.md`, `docs/AGENTS-DOCUMENT-CREATOR.md`, `docs/AGENTS-CHEMICAL-ENGINEER.md`, `docs/PROJECT-CONTEXT.md`, `docs/README.md`, `docs/sops/`, `docs/quality/`.
- **Decisions / notes:** All agents should read `docs/PROJECT-CONTEXT.md` before starting work and report work (or add an entry here) when done. Document creator owns docs/SOPs/quality; Software Integrator compiles and surfaces work only.

### 2025-02-12 — Software Integrator — Agent registry and communication channels

- **What:** Agent registry established with Executive, Software Integrator, Document creator, and Chemical Engineer. Handoff paths and coordination flows documented.
- **Where:** `docs/AGENTS-INTEGRATOR.md` § 4, all `docs/AGENTS-*.md` files.
- **Decisions / notes:** New agents must be added to the registry and `docs/README.md`. Use `docs/AGENTS-INTEGRATOR.md` § 5 for PROJECT-CONTEXT entries.

### 2025-02-12 — Software Integrator — Foodie demo: Yelp-differentiating features

- **What:** Implemented discussed features in the demo app (`foodie-website/foodie.html`): mutual connections (“X friends also reviewed”), verified visit + would go again badges, private notes on reviews, trust score / taste match, group lists (Date night, Family favorites, Work lunch, etc.), restaurant alerts when a connection reviews a saved place, and demo signup UI (country + phone/email).
- **Where:** `foodie-website/foodie.html`.
- **Decisions / notes:** All data in localStorage; no backend. Signup UI is non-functional (demo only). Trust score computed from rating overlap on same restaurants.

### 2025-02-14 — Software Integrator — PWA setup for Add to Home Screen

- **What:** Completed PWA configuration: app icons (192×192, 512×512, Apple touch 180×180), updated manifest.json with icons and scope, iOS meta tags, improved service worker precache, favicon.
- **Where:** `foodie-website/manifest.json`, `foodie-website/sw.js`, `foodie-website/foodie.html`, `foodie-website/icons/`, `foodie-website/DEMO.md`.
- **Decisions / notes:** PWA works over HTTPS or localhost. Add to Home Screen on iOS (Safari) and Android (Chrome).

### 2025-02-14 — Software Integrator — Deployment and documentation

- **What:** Added deployment config (vercel.json, netlify.toml), DEPLOY.md, DEPLOY-OPTION-C.md for GitHub + Vercel. Created PROJECT-WORK-LOG.md (full work history), .gitignore.
- **Where:** `foodie-website/`, `docs/PROJECT-WORK-LOG.md`, `.gitignore`.
- **Decisions / notes:** Option C (GitHub + Vercel) recommended for shareable link and auto-deploy. User completes Steps 1–4 in DEPLOY-OPTION-C.md to get live URL.

### 2025-02-14 — Software Integrator — Network tab enhancements

- **What:** Enhanced Network with: (1) Invite by name – add anyone by typing their name, even if not on app yet; (2) People you might know – suggestions from 2nd-level connections (friends of friends) with mutual count; (3) Network as top-level tab. Reordered sections: Invite, Invitations, People you might know, Add from reviews, Your connections.
- **Where:** `foodie-website/foodie.html`.
- **Decisions / notes:** getPeopleYouMightKnow() returns friends-of-friends sorted by mutual connections.

### 2025-02-15 — Deployment next steps

- **What:** Created `docs/DEPLOYMENT-NEXT-STEPS.md` with concrete checklist: sync PWA, commit/push, Vercel setup, ongoing workflow.
- **Where:** `docs/DEPLOYMENT-NEXT-STEPS.md`.
- **Decisions / notes:** Repo root `vercel.json` serves from `foodie-website/pwa/public`. Run `cp foodie-website/foodie.html foodie-website/pwa/public/index.html` before deploy to sync latest changes.

### 2025-02-15 — Database-backed demo preparation

- **What:** Prepared for database deployment: Supabase schema, RLS, config, API layer (`foodie-api.js`), and async init in `foodie.html`. When `config.js` has Supabase URL + key, app loads from DB; otherwise uses localStorage.
- **Where:** `foodie-website/supabase/`, `foodie-website/config.js`, `foodie-website/foodie-api.js`, `docs/DATABASE-DEMO-SETUP.md`.
- **Decisions / notes:** Load path integrated. Auth UI and save mutations still need wiring. See `docs/DATABASE-DEMO-SETUP.md` for setup steps.

### 2025-02-15 — Live version: Supabase Auth and save path

- **What:** Wired Supabase Auth (signup/login) and full save path: reviews, comments, connections, saved, group lists, private notes, profile updates. Fixed loadData connections order bug. Profile save calls `updateProfile` when API enabled. Connection requests use client-generated id for accept flow.
- **Where:** `foodie-website/foodie.html`, `foodie-website/foodie-api.js`, `docs/DATABASE-DEMO-SETUP.md`.
- **Decisions / notes:** PWA synced via `./setup.sh`. Add Vercel URL to Supabase Auth redirect URLs for live deploy. See `docs/DATABASE-DEMO-SETUP.md` for deployment steps.

### 2025-02-15 — Live deployment confirmed

- **What:** Foodie site is live. User can create login (Supabase Auth) on the deployed app. Created `docs/PROJECT-SERVICES.md` to track external services (Supabase, Vercel, GitHub) where project has accounts—no passwords stored, credentials in password manager.
- **Where:** `docs/PROJECT-SERVICES.md`, `docs/PROJECT-CONTEXT.md`.
- **Decisions / notes:** Add your Vercel live URL to `docs/PROJECT-SERVICES.md` when you have it.

### 2025-02-12 — Data retention and groups persistence

- **What:** Groups persist when creator deletes account (created_by set null). Reviews use soft delete; kept 8 weeks for others who rely on them. Migration: `001-data-retention-and-groups-persistence.sql`. Policy doc: `foodie-website/docs/DATA-RETENTION-POLICY.md`.
- **Where:** `foodie-website/supabase/migrations/`, `foodie-website/foodie-api.js`, `foodie-website/docs/DATA-RETENTION-POLICY.md`.
- **Decisions / notes:** Run migration in Supabase SQL Editor after schema and groups-schema. Creator-only delete for groups; no hard delete for reviews.

### 2025-02-12 — All agents looped in

- **What:** Added `.cursor/rules/all-agents-loop.mdc` — every conversation reads PROJECT-CONTEXT, checks agent registry, considers which agents to involve, and reports/hands off when done.
- **Where:** `.cursor/rules/all-agents-loop.mdc`.
- **Decisions / notes:** Rule has `alwaysApply: true` so it runs in every chat. Keeps work integrated across Integrator, Document creator, Chemical Engineer, QA / Bug Hunter, Executive.

### 2025-02-12 — Groups feature (private, invite-only)

- **What:** Implemented Groups: create groups, add members from connections, group feed (reviews from members only), remove members, leave group, delete group (creator only). Groups are private and invite-only; only members see the group. API: `createGroup`, `addGroupMemberByName`, `removeGroupMember`, `leaveGroup`, `deleteGroup`. Schema: `groups`, `group_members`; RLS in `groups-rls.sql`.
- **Where:** `foodie-website/foodie.html`, `foodie-website/foodie-api.js`, `foodie-website/supabase/groups-schema.sql`, `foodie-website/supabase/groups-rls.sql`.
- **Decisions / notes:** Run `groups-schema.sql` and `groups-rls.sql` in Supabase SQL Editor before using. Groups appear in sidebar when Supabase enabled; members are added from connections only.

---

## Active areas and owners

| Area | Owner / primary agent | Coordination doc |
|------|------------------------|-------------------|
| Accountability, project control | Executive | `docs/AGENTS-EXECUTIVE.md` |
| Documentation, SOPs, quality | Document creator | `docs/AGENTS-DOCUMENT-CREATOR.md` |
| Cross-agent context and integration | Software Integrator | `docs/AGENTS-INTEGRATOR.md` |
| Chemical plant design, analysis, feasibility | Chemical Engineer | `docs/AGENTS-CHEMICAL-ENGINEER.md` |
| QA, bug finding, Foodie app robustness | QA / Bug Hunter | `docs/AGENTS-QA-BUG-HUNTER.md` |

---

## Current situation summary (for all agents)

1. **Project status:** Chai_Foodie_agent integration structure is in place. Coordination docs exist; agents can now read context, report work, and hand off correctly.
2. **Next steps:** Agents can begin domain-specific work. When doing so, read `docs/PROJECT-CONTEXT.md` first and report outcomes here when done.
3. **Documentation flow:** All new docs go through Document creator; SOP-document-creation and quality standards apply; user approval required before marking docs Current.
4. **Integration flow:** Software Integrator compiles PROJECT-CONTEXT, maintains registry, and resolves conflicts. Executive requests compilations and directs handoffs.

---

*Add new entries above under "Recent work and decisions". Use the entry format in `docs/AGENTS-INTEGRATOR.md` § 5.*
