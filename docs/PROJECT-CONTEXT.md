# Project context — cross-agent awareness

**Purpose:** Single place for recent work, decisions, and touchpoints so all agents (and the user) can stay aware of each other's contributions.  
**Maintained by:** Software Integrator (see `docs/AGENTS-INTEGRATOR.md`).  
**Last updated:** 2025-02-12

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

---

## Active areas and owners

| Area | Owner / primary agent | Coordination doc |
|------|------------------------|-------------------|
| Accountability, project control | Executive | `docs/AGENTS-EXECUTIVE.md` |
| Documentation, SOPs, quality | Document creator | `docs/AGENTS-DOCUMENT-CREATOR.md` |
| Cross-agent context and integration | Software Integrator | `docs/AGENTS-INTEGRATOR.md` |
| Chemical plant design, analysis, feasibility | Chemical Engineer | `docs/AGENTS-CHEMICAL-ENGINEER.md` |

---

## Current situation summary (for all agents)

1. **Project status:** Chai_Foodie_agent integration structure is in place. Coordination docs exist; agents can now read context, report work, and hand off correctly.
2. **Next steps:** Agents can begin domain-specific work. When doing so, read `docs/PROJECT-CONTEXT.md` first and report outcomes here when done.
3. **Documentation flow:** All new docs go through Document creator; SOP-document-creation and quality standards apply; user approval required before marking docs Current.
4. **Integration flow:** Software Integrator compiles PROJECT-CONTEXT, maintains registry, and resolves conflicts. Executive requests compilations and directs handoffs.

---

*Add new entries above under "Recent work and decisions". Use the entry format in `docs/AGENTS-INTEGRATOR.md` § 5.*
