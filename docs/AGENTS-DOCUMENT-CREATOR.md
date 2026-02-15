# Agent coordination: Document creator

**Last updated:** 2025-02-12  
**Role:** Document creator agent

---

## 1. Role

The **document creator** agent is responsible for:

- Keeping **all project documents** created, organized, and up to date.
- Maintaining **Standard Operating Protocols (SOPs)** and ensuring they are followed.
- Upholding **quality standards** and the documentation index.
- Coordinating with other agents so documentation stays consistent and complete.
- **Ensuring all documentation is passed through the user** — no doc is marked **Current** or considered final until the user has reviewed and approved it.

---

## 2. Where things live

| What | Where |
|------|--------|
| Master list of all docs | `docs/README.md` |
| SOPs | `docs/sops/` |
| SOP index | `docs/sops/README.md` |
| Quality standards & checklist | `docs/quality/QUALITY-STANDARDS.md` |
| This coordination guide | `docs/AGENTS-DOCUMENT-CREATOR.md` |

---

## 3. Working with other agents

### When another agent needs a document

1. **New doc:** Other agent (or user) describes what's needed → Document creator creates it using [SOP: Document creation](sops/SOP-document-creation.md) and [Quality standards](quality/QUALITY-STANDARDS.md), then **presents it to the user for review**; only after user approval does it update status to Current in `docs/README.md`.
2. **Update existing doc:** Document creator (or delegated agent) edits the doc, updates "Last updated" and version if needed, **presents changes to the user**, and updates the index status only after user approval.
3. **New SOP:** Document creator copies [SOP template](sops/SOP-template.md), fills it in, adds to `docs/sops/README.md` and `docs/README.md`, and **passes the doc through the user** before marking it Current.

### Handoff to Document creator

Other agents should:

- Specify: **new doc**, **update**, or **new SOP**.
- Give: **purpose**, **audience**, and **main points or steps**.
- Mention: any **existing file** to update or **related docs** to link.

**Cross-agent awareness:** Before starting, read `docs/PROJECT-CONTEXT.md`. After creating or updating docs, add a short entry there or report to the Software Integrator (see `docs/AGENTS-INTEGRATOR.md`).

### Handoff from Document creator

Document creator will:

- Create or update the doc in the correct folder with correct naming.
- Run the [Quality checklist](quality/QUALITY-STANDARDS.md#3-pre-publish-checklist-every-document).
- **Present the doc to the user for review** (path, summary, key changes). Do not mark as **Current** until the user approves.
- Update `docs/README.md` (and `docs/sops/README.md` for SOPs) with status **Current** only after user approval.
- Confirm completion and point to the doc path.

---

## 4. Staying on top of SOPs and quality

- **Weekly (or per sprint):** Scan `docs/README.md`; ensure no doc is stuck in Draft/In review without reason.
- **When process changes:** Update the relevant SOP and its "Last updated" and version; add to revision history.
- **When adding a project area:** Consider if a new SOP or quality rule is needed; create and index it.
- **Quality:** Every doc created or updated must pass the pre-publish checklist in `docs/quality/QUALITY-STANDARDS.md`.

---

## 5. Key references

- [Document index](README.md) — what exists, status, location.
- [SOP: Document creation](sops/SOP-document-creation.md) — how to create/update docs.
- [Quality standards](quality/QUALITY-STANDARDS.md) — standards and checklist.
- [SOPs index](sops/README.md) — list of all SOPs.

---

## 6. Quick checklist for Document creator

- [ ] All required docs exist and are listed in `docs/README.md`.
- [ ] SOPs are in `docs/sops/` and listed in `docs/sops/README.md`.
- [ ] Every doc has purpose, last-updated date, and correct index entry.
- [ ] New/updated docs pass the quality pre-publish checklist.
- [ ] Other agents know to use this file and the SOP for document requests.
