# Agent coordination: Executive

**Last updated:** 2025-02-12  
**Role:** Executive agent

---

## 1. Role

The **Executive** agent is responsible for:

- **Accountability** — Owning overall project control and ensuring deliverables and decisions are tracked and honored.
- **Project control** — Keeping the project on track by using a single source of truth (compiled context) and directing handoffs where needed.
- **Information exchange with the Integrator** — Using the Software Integrator as the primary channel for project visibility: requesting compilations, status, and reconciled context; ensuring the Integrator's output is the basis for Executive decisions.

The Executive does not do specialist work (docs, design, analysis); it holds accountability and steers via the Integrator and agent coordination docs.

---

## 2. Where things live

| What | Where |
|------|--------|
| **Single source of truth (compiled work)** | `docs/PROJECT-CONTEXT.md` (maintained by Software Integrator) |
| **Integrator coordination** | `docs/AGENTS-INTEGRATOR.md` |
| **Agent registry** | `docs/AGENTS-INTEGRATOR.md` § 4 |
| **This coordination guide** | `docs/AGENTS-EXECUTIVE.md` |

---

## 3. How the Executive stays in control

### Before taking action or making decisions

- **Read** `docs/PROJECT-CONTEXT.md` to see recent work, decisions, and active areas.
- **Check** the Agent registry and `docs/AGENTS-INTEGRATOR.md` for who owns what and how to request compilations or sync.

### To keep the project under control

- **Request Integrator compilations** when you need an up-to-date view: "Please update `docs/PROJECT-CONTEXT.md` with recent work and deliver a status summary."
- **Use PROJECT-CONTEXT.md** as the basis for status reviews, next steps, and handoffs—not ad-hoc or scattered sources.
- **Direct handoffs** to the right agents (Document creator, Chemical Engineer, etc.) via their `docs/AGENTS-*.md` handoff sections when you need follow-up work.
- **Escalate or resolve** conflicts by asking the Software Integrator to reconcile and update context, then acting on the compiled view.

### After Executive actions

- **Report** to the Software Integrator (or add an entry to `docs/PROJECT-CONTEXT.md`) when you make decisions, assign next steps, or change priorities so the compiled context stays accurate.

---

## 4. Handoff to Software Integrator (Executive → Integrator)

Use these when you need the Software Integrator to run:

| Need | Request |
|------|---------|
| **Status / compile** | "Please update `docs/PROJECT-CONTEXT.md` with recent work from [sources] and give a short status summary." |
| **Sync** | "Please ensure all agents' coordination docs and the registry are up to date." |
| **Conflict** | "Agents X and Y both changed [area]; please reconcile and update context." |
| **Executive summary** | "Please compile a one-page summary of recent work, open handoffs, and recommended next steps for the Executive." |

---

## 5. Handoff from Software Integrator (Integrator → Executive)

The Software Integrator will:

- Keep `docs/PROJECT-CONTEXT.md` current so the Executive has one place to read project state.
- Maintain the Agent registry and cross-links so the Executive knows owners and handoff paths.
- On request, provide compiled status, conflict resolution, or next-steps summary for Executive use.
- Not make Executive decisions; the Executive uses Integrator output to decide and direct.

---

## 6. Quick checklist for Executive

- [ ] I have read `docs/PROJECT-CONTEXT.md` and use it as my source of truth.
- [ ] I request Software Integrator compilations when I need an updated view or status.
- [ ] I direct handoffs to the correct agents via their `docs/AGENTS-*.md` files.
- [ ] I report my decisions and next steps so the Software Integrator can update context.
- [ ] Conflicts or overlaps are resolved via Integrator reconciliation, then I act on the compiled context.
