-- Fix: Multiple Permissive Policies on group_members (SELECT)
-- Merge "Group members can view members" and "Creators can view members of own groups" into one

drop policy if exists "Group members can view members" on group_members;
drop policy if exists "Creators can view members of own groups" on group_members;

create policy "Members or creators can view group members" on group_members for select using (
  public.is_group_member(group_id, (select auth.uid()))
  or exists (select 1 from groups g where g.id = group_id and g.created_by = (select auth.uid()))
);
