-- Foodie: Data retention and groups persistence
-- Run in Supabase SQL Editor AFTER schema.sql and groups-schema.sql
-- Ensures: (1) Groups persist when creator deletes account; (2) Reviews soft-deleted, kept 8 weeks

-- ============================================================
-- 1. GROUPS: Prevent cascade delete when creator deletes account
--    Group and its data stay; only explicit creator "Delete group" removes it
-- ============================================================

-- Make created_by nullable so we can set null when creator deletes account
alter table groups alter column created_by drop not null;

-- Drop existing FK and recreate with SET NULL (group stays if creator leaves)
alter table groups drop constraint if exists groups_created_by_fkey;
alter table groups add constraint groups_created_by_fkey
  foreign key (created_by) references auth.users(id) on delete set null;

-- group_members: when a member deletes account, remove them from group (cascade ok)
-- group stays; only creator's explicit "Delete group" removes the group

-- ============================================================
-- 2. REVIEWS: Soft delete + 8-week retention
--    User "delete" = soft delete; data kept 8 weeks for others who rely on it
-- ============================================================

-- Add deleted_at for soft delete
alter table reviews add column if not exists deleted_at timestamptz default null;

-- When user deletes account, keep their reviews (set user_id null) for 8 weeks
alter table reviews alter column user_id drop not null;
alter table reviews drop constraint if exists reviews_user_id_fkey;
alter table reviews add constraint reviews_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete set null;

create index if not exists idx_reviews_deleted_at on reviews(deleted_at);

-- ============================================================
-- 3. RLS: Remove hard delete, keep update for soft delete
--    Users can only soft-delete (update deleted_at); no hard delete
-- ============================================================

drop policy if exists "Users can delete own reviews" on reviews;
