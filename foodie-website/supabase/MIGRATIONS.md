# Supabase migrations

Run migrations in order in the Supabase SQL Editor (or via `supabase db push` if using CLI).

## Migration index

| # | File | Purpose |
|---|------|---------|
| 001 | data-retention-and-groups-persistence | Groups persist when creator deletes; reviews soft-delete, 8-week retention |
| 002 | backfill-group-members-creators | Backfill group_members for existing group creators |
| 003 | delete-duplicate-groups | Remove duplicate groups |
| 004 | fix-reviews-with-author-security | View `reviews_with_author` with `security_invoker = true` |
| 005 | group-creator-auto-member-trigger | Auto-add creator to group_members on group create |
| 006 | creator-can-view-own-groups | Creators can view own groups even if missing from group_members |
| 007 | diagnose-and-fix-groups | Groups diagnostic fixes |
| 008 | fix-group-members-rls-recursion | Use `is_group_member()` to break RLS recursion on group_members |
| 009 | fix-groups-rls-recursion | Use `is_group_member()` to break RLS recursion on groups |
| 010 | sender-can-cancel-connection-request | Sender can cancel pending connection request |
| 011 | realtime-connection-requests | Add connection_requests to Realtime publication |
| 012 | supabase-linter-fixes | Unindexed FKs, connections DELETE policy, notifications insert |
| 013 | fix-handle-new-user-search-path | `handle_new_user` — set `search_path = ''` |
| 014 | fix-fix-review-location-search-path | `fix_review_location` — set `search_path = ''` |
| 015 | fix-rls-auth-initplan-profiles | profiles — `(select auth.uid())` for RLS initplan |
| 016 | fix-rls-auth-initplan-all-tables | All tables — wrap auth functions in `(select ...)` |
| 017 | merge-connection-requests-update-policies | Merge two UPDATE policies on connection_requests |
| 018 | merge-group-members-select-policies | Merge two SELECT policies on group_members |
| 019 | merge-groups-select-policies | Merge two SELECT policies on groups |
| 020 | merge-review-likes-select-policies | Merge SELECT policies on review_likes, split INSERT/UPDATE/DELETE |

## Version tracking

**Current working version (as of 2025-02-12):** Migrations 001–020 applied. Security and Performance Advisor issues resolved.
