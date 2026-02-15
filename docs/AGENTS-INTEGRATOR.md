# Agent coordination: Software Integrator

**Last updated:** 2025-02-12  
**Role:** Software Integrator agent

---

## 1. Role

The **Software Integrator** agent is responsible for:

- **Integrating all agents** — Ensuring every agent's work is visible and usable by others.
- **Compiling work** — Maintaining a single, up-to-date view of recent changes, decisions, and touchpoints across the project.
- **Cross-agent awareness** — Making sure agents (and users) can see what others have done and take that into account when needed.
- **Communication** — Creating and maintaining documentation that enables coordination between agents and keeps everyone aware of the current situation.

The Software Integrator does not replace specialist agents; it ties their outputs together so the project stays coherent.

---

## 2. Where things live

| What | Where |
|------|--------|
| **Project context (compiled work)** | `docs/PROJECT-CONTEXT.md` |
| **Agent registry** | This file, § 4 |
| **Document creator coordination** | `docs/AGENTS-DOCUMENT-CREATOR.md` |
| **This coordination guide** | `docs/AGENTS-INTEGRATOR.md` |

---

## 3. How agents stay aware of each other

### Before starting work

- **Read** `docs/PROJECT-CONTEXT.md` to see recent work, decisions, and areas other agents have touched.
- **Check** the Agent registry (§ 4) and any `docs/AGENTS-*.md` files relevant to your task so you know who owns what and how to hand off.

### After finishing work

- **Report** what you did so the Integrator can compile it: either add a short entry to `docs/PROJECT-CONTEXT.md` (see format below) or describe it in a handoff (e.g. in the chat or in a brief note the Integrator can use).
- **Hand off** to another agent when needed using that agent's `docs/AGENTS-*.md` handoff section.

### Integrator's compile cycle

The Software Integrator (or the user acting as Integrator) will:

- Periodically **review** `docs/PROJECT-CONTEXT.md` and any reported work.
- **Merge** new entries, trim or archive old ones so the file stays scannable.
- **Resolve** conflicts or overlaps (e.g. two agents touching the same area) by updating the context and, if needed, notifying or documenting next steps.
- **Keep** the Agent registry and cross-links in `docs/AGENTS-*.md` accurate.

---

## 4. Agent registry

| Agent | Coordination doc | Main responsibility |
|-------|-------------------|----------------------|
| **Executive** | `docs/AGENTS-EXECUTIVE.md` | Accountability; project control; information exchange with Integrator |
| **Software Integrator** | `docs/AGENTS-INTEGRATOR.md` (this file) | Integrate agents; maintain `PROJECT-CONTEXT.md`; cross-agent awareness |
| **Document creator** | `docs/AGENTS-DOCUMENT-CREATOR.md` | Docs, SOPs, quality standards, document index |
| **Chemical Engineer** | `docs/AGENTS-CHEMICAL-ENGINEER.md` | Design, analysis, feasibility of chemical plants; manufacturing intelligence |

When you add a new agent, add a row here and create (or link) its `docs/AGENTS-<NAME>.md`. Update `docs/README.md` so the new doc is in the index.

---

## 5. Format for PROJECT-CONTEXT.md entries

When you add or suggest an entry for `docs/PROJECT-CONTEXT.md`, use this format so the Integrator can compile consistently:

```markdown
### YYYY-MM-DD — [Agent name] — [Short title]
- **What:** One line summary.
- **Where:** Paths or areas touched.
- **Decisions / notes:** Anything other agents should take into account.
```

Keep entries brief. The Integrator may condense or merge them.

---

## 6. Handoff to Software Integrator

When you need the Software Integrator to run:

- **Compile:** "Please update `docs/PROJECT-CONTEXT.md` with recent work from [sources]."
- **Sync:** "Please make sure all agents' coordination docs and the registry are up to date."
- **Conflict:** "Agents X and Y both changed [area]; please reconcile and update context."
- **Executive request:** The Executive may ask for a status summary or compiled next steps; see `docs/AGENTS-EXECUTIVE.md` § 4.

---

## 7. Handoff from Software Integrator

The Software Integrator will:

- Keep `docs/PROJECT-CONTEXT.md` current and readable.
- Maintain the Agent registry and links between `docs/AGENTS-*.md` files.
- Point other agents (or the user) to the right coordination doc and context when asked.
- Not duplicate specialist work (e.g. the Document creator still owns doc creation); it only compiles and surfaces that work.
- **Executive:** On request, provide compiled status, conflict resolution, or next-steps summary; the Executive uses this as the basis for accountability and project control (see `docs/AGENTS-EXECUTIVE.md`).

---

## 8. Quick checklist for Software Integrator

- [ ] `docs/PROJECT-CONTEXT.md` reflects recent work and is not stale.
- [ ] Agent registry in this file lists all active agents and correct coordination doc paths.
- [ ] New agents are added to the registry and `docs/README.md`.
- [ ] Conflicting or overlapping work is noted in context and resolved or escalated.
- [ ] All agents are instructed (via rules/docs) to read context before work and report after work.
