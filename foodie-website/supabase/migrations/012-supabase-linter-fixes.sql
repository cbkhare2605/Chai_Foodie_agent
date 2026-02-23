-- Foodie: Supabase Security/Performance Advisor fixes (Splinter linter)
-- Addresses common issues: unindexed FKs (0001), missing RLS policies (0008)
-- Run in Supabase SQL Editor or via supabase db push

-- ============================================================
-- 1. UNINDEXED FOREIGN KEYS (0001)
--    Add indexes on FK columns used in lookups/joins
-- ============================================================

-- comments.user_id: used when fetching comments by user
create index if not exists idx_comments_user_id on comments(user_id);

-- connection_requests.from_user: used when listing "sent" requests
create index if not exists idx_connection_requests_from on connection_requests(from_user);

-- group_members.group_id: used when listing members of a group
create index if not exists idx_group_members_group_id on group_members(group_id);

-- ============================================================
-- 2. MISSING RLS POLICIES (0008)
--    Ensure all tables have policies for operations the app uses
-- ============================================================

-- connections: app removes connections via delete (removeConnection)
create policy "Users can delete own connections" on connections for delete using (
  auth.uid() = user_a or auth.uid() = user_b
);

-- ============================================================
-- 3. NOTIFICATIONS INSERT (0008 / security)
--    Restrict to authenticated users (prevents anon from spamming)
--    Note: user_id is recipient; inserter is auth.uid() in connection flows
-- ============================================================

drop policy if exists "System can insert notifications" on notifications;
create policy "Authenticated users can insert notifications" on notifications for insert with check (
  auth.role() = 'authenticated'
);
