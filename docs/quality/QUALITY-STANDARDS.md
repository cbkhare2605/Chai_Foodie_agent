# Quality standards for documentation

**Last updated:** 2025-02-12  
**Owner:** Document creator agent

---

## 1. Purpose

Define what "good" looks like for project documents so all agents and humans produce consistent, usable, and maintainable documentation.

---

## 2. Quality principles

| Principle | Meaning |
|-----------|---------|
| **Findable** | Documents live in the right folder and are listed in the docs index. |
| **Clear purpose** | Every doc states what it's for and who it's for in the first section. |
| **Structured** | Headings, lists, and tables are used so content is scannable. |
| **Current** | "Last updated" (and version for SOPs) is present and accurate. |
| **Actionable** | Procedures and checklists are stepwise and easy to follow. |
| **Linked** | Related docs and SOPs are linked; no orphan docs. |

---

## 3. Pre-publish checklist (every document)

**All documentation must be passed through the user before it is final.** Agents create or update docs, then present them to the user for review; only after user approval may a doc be marked **Current** in the index.

Before marking a doc as **Current** in the index, confirm:

- [ ] **Title** — Clear and consistent with naming (e.g. `SOP-<name>.md` for SOPs).
- [ ] **Purpose** — Stated in the first 1–2 paragraphs (what and why).
- [ ] **Last updated** — Date at top (YYYY-MM-DD).
- [ ] **Structure** — Logical headings (H1 → H2 → H3); no skipped levels.
- [ ] **Links** — Links to related docs work and are relative where possible.
- [ ] **Index** — Document is listed in `docs/README.md` with correct status (Draft/In review until user approval; Current only after user approves).
- [ ] **User review** — Doc has been presented to the user for review; status set to Current only after user approval.
- [ ] **Spelling/grammar** — Readable; no obvious errors in key instructions.

For **SOPs** additionally:

- [ ] **Version** — Version number at top.
- [ ] **Owner** — Role or agent named.
- [ ] **Procedure** — Numbered or ordered steps.
- [ ] **Checklist** — Completion checklist for the procedure.
- [ ] **SOP index** — Listed in `docs/sops/README.md`.

---

## 4. Naming conventions

| Type | Pattern | Example |
|------|---------|---------|
| SOP | `SOP-<short-name>.md` | `SOP-document-creation.md` |
| Quality / standards | `QUALITY-*.md` or descriptive | `QUALITY-STANDARDS.md` |
| Agent/role coordination | `AGENTS-*.md` or similar | `AGENTS-DOCUMENT-CREATOR.md` |
| General guide | Lowercase or Title-Case, descriptive | `README.md`, `onboarding.md` |

---

## 5. Review cycle

- **On change** — When a process or tool changes, the related doc is updated and "Last updated" (and version) is set.
- **Periodic** — At least every quarter, review the doc index and mark any outdated or missing docs (Draft / In review / Current).
- **Owner** — Document creator agent is responsible for keeping the index and this quality doc current; other agents follow SOP-document-creation when creating or changing docs.

---

## 6. References

- [Document index](../README.md)
- [SOP: Document creation](../sops/SOP-document-creation.md)
- [Agent coordination (Document creator)](../AGENTS-DOCUMENT-CREATOR.md)
