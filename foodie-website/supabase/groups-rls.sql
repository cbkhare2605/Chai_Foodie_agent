-- Foodie: RLS for groups - only members can see
-- Run after groups-schema.sql

alter table groups enable row level security;
alter table group_members enable row level security;

-- Groups: only members can see
create policy "Group members can view group" on groups for select using (
  exists (
    select 1 from group_members gm
    where gm.group_id = groups.id and gm.user_id = (select auth.uid())
  )
);
create policy "Authenticated users can create groups" on groups for insert with check ((select auth.uid()) = created_by);
create policy "Creator can update own group" on groups for update using (
  created_by = (select auth.uid())
);
create policy "Creator can delete own group" on groups for delete using (
  created_by = (select auth.uid())
);

-- Group members: only members can see who's in the group
create policy "Group members can view members" on group_members for select using (
  exists (
    select 1 from group_members gm
    where gm.group_id = group_members.group_id and gm.user_id = (select auth.uid())
  )
);
create policy "Creator can add members" on group_members for insert with check (
  exists (select 1 from groups g where g.id = group_id and g.created_by = (select auth.uid()))
);
create policy "Creator or self can remove member" on group_members for delete using (
  (select auth.uid()) = user_id
  or exists (select 1 from groups g where g.id = group_id and g.created_by = (select auth.uid()))
);
