-- Foodie: Fix infinite recursion in group_members RLS
-- Run in Supabase SQL Editor
-- Error was: "infinite recursion detected in policy for relation group_members"
-- Cause: "Group members can view members" policy queried group_members to check access (self-reference)

-- 1. Create a SECURITY DEFINER function that bypasses RLS to check membership
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

-- 2. Drop the recursive policy
drop policy if exists "Group members can view members" on group_members;

-- 3. Recreate using the function (no recursion - function bypasses RLS)
create policy "Group members can view members" on group_members for select using (
  public.is_group_member(group_id, auth.uid())
);
