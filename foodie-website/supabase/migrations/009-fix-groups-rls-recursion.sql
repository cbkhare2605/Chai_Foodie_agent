-- Foodie: Fix groups ↔ group_members RLS recursion
-- Run in Supabase SQL Editor
-- "Group members can view group" queried group_members, which triggered group_members policies
-- that query groups → infinite cycle. Use is_group_member() to break it.

-- Ensure the helper exists (from 008)
create or replace function public.is_group_member(p_group_id text, p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.group_members gm
    where gm.group_id = p_group_id and gm.user_id = p_user_id
  );
$$;

-- Replace groups policy to use function (no direct group_members query = no recursion)
drop policy if exists "Group members can view group" on groups;
create policy "Group members can view group" on groups for select using (
  public.is_group_member(id, auth.uid())
);
