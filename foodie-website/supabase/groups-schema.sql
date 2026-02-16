-- Foodie: Groups feature - private invite-only groups
-- Run in Supabase SQL Editor after schema.sql

-- Groups (private, invite-only)
create table if not exists groups (
  id text primary key,
  name text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create index if not exists idx_groups_created_by on groups(created_by);

-- Group members (who is in each group)
create table if not exists group_members (
  group_id text not null references groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  added_at timestamptz default now(),
  primary key (group_id, user_id)
);

create index if not exists idx_group_members_user on group_members(user_id);
