-- Fix: Multiple Permissive Policies on groups (SELECT)
-- Merge "Group members can view group" and "Creators can view own groups" into one

drop policy if exists "Group members can view group" on groups;
drop policy if exists "Creators can view own groups" on groups;

create policy "Members or creators can view groups" on groups for select using (
  public.is_group_member(id, (select auth.uid()))
  or created_by = (select auth.uid())
);
