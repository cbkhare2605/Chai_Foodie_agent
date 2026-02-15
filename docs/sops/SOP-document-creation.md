# SOP: Document creation

**Version:** 1.1  
**Last updated:** 2025-02-12  
**Owner:** Document creator agent

---

## 1. Purpose

Ensure every new or updated project document is created in a consistent way, stored in the right place, and recorded in the docs index so the team and agents stay on top of what exists.

## 2. Scope

- **In scope:** All project documentation (SOPs, guides, quality docs, runbooks, specs).
- **Who follows:** Document creator agent; any agent or human creating docs.
- **Out of scope:** Code-only changes; external or client-owned docs (unless we're mirroring them).

## 3. Prerequisites

- Access to the repo/workspace `docs/` area.
- Read: [Document index](../README.md), [Quality standards](../quality/QUALITY-STANDARDS.md).
- For new SOPs: read [SOP template](./SOP-template.md).

## 4. Procedure

### Step 1: Decide type and location

- **SOP** → `docs/sops/`; name: `SOP-<short-name>.md`.
- **Quality / standards** → `docs/quality/`; name: descriptive, e.g. `QUALITY-STANDARDS.md`.
- **General project doc** → `docs/` or a subfolder; name: clear and consistent (e.g. `AGENTS-DOCUMENT-CREATOR.md`).

### Step 2: Create or update the document

- Use the [SOP template](./SOP-template.md) for new SOPs.
- Apply [Quality standards](../quality/QUALITY-STANDARDS.md): clear title, purpose, structure, and last-updated date.
- For updates: change "Last updated" (and version if applicable) inside the doc.

### Step 3: Pass through the user (required)

- **All documentation must be passed through the user before it is final.**
- Present the new or updated doc to the user for review (e.g. show path, summary, and key changes).
- Do **not** mark the doc as **Current** in the index until the user has reviewed and approved it.
- Until then: use status **Draft** or **In review** as appropriate.

### Step 4: Register in the index

- Add or update the row in [Document index](../README.md) with:
  - Document name and path
  - Status: **Draft** or **In review** until user approval; **Current** only after the user approves.
  - Owner or related SOP

### Step 5: Update related indexes (if applicable)

- New SOP → add to [SOPs index](./README.md).
- No other doc types need a second index unless we add one later.

## 5. Checklist

- [ ] Doc type and folder chosen
- [ ] Doc created/updated with title, purpose, and last-updated date
- [ ] Quality checklist (structure, clarity) satisfied
- [ ] **Doc presented to user for review; status left as Draft/In review until user approves**
- [ ] Entry in `docs/README.md` added or updated (status = Current only after user approval)
- [ ] If SOP: entry in `docs/sops/README.md` added

## 6. References

- [Document index](../README.md)
- [Quality standards](../quality/QUALITY-STANDARDS.md)
- [SOP template](./SOP-template.md)
- [Agent coordination (Document creator)](../AGENTS-DOCUMENT-CREATOR.md)

## 7. Revision history

| Version | Date       | Change   |
|---------|------------|----------|
| 1.0     | 2025-02-12 | Initial  |
| 1.1     | 2025-02-12 | Added Step 3: all documentation must pass through the user before marking as Current; checklist and step numbering updated. |
