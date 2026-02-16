# Data Retention and Security Policy

**Last updated:** 2025-02-12

---

## 1. Groups

- **Creator-only delete:** A group and its data can only be deleted by the creator via the explicit "Delete group" action.
- **Account deletion:** If the creator deletes their account, the group **persists**. `created_by` is set to null; the group remains for members. No one can delete it after that (creator is gone).
- **Member removal:** When a member deletes their account, they are removed from the group. The group stays.

---

## 2. Reviews — 8-week retention

- **Soft delete:** When a user "deletes" a review, it is soft-deleted (`deleted_at` set). The row is not removed.
- **Retention:** Soft-deleted reviews remain visible to others for **8 weeks minimum**, because other people may rely on them.
- **After 8 weeks:** Reviews with `deleted_at` older than 8 weeks are excluded from the feed. A scheduled job can purge them later if desired.
- **Account deletion:** If a user deletes their account, their reviews are kept (`user_id` set to null). They remain visible for 8 weeks.

---

## 3. Migration

Run in Supabase SQL Editor (after `schema.sql` and `groups-schema.sql`):

```
supabase/migrations/001-data-retention-and-groups-persistence.sql
```

This migration:
- Changes `groups.created_by` to `ON DELETE SET NULL` (group persists when creator leaves)
- Adds `reviews.deleted_at` for soft delete
- Changes `reviews.user_id` to `ON DELETE SET NULL` (reviews persist when user leaves)
- Removes hard-delete policy on reviews (soft delete only)
