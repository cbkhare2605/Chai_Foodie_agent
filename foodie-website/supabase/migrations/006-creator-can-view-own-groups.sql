-- Foodie: Allow creators to see their groups even if missing from group_members
-- Run in Supabase SQL Editor
-- Fixes: groups exist in DB but don't show because creator wasn't in group_members (RLS filtered them out)

-- Groups: creators can always see their own groups
create policy "Creators can view own groups" on groups for select using (
  created_by = auth.uid()
);

-- Group members: creators can see who's in their groups (for correct member list in app)
create policy "Creators can view members of own groups" on group_members for select using (
  exists (select 1 from groups g where g.id = group_members.group_id and g.created_by = auth.uid())
);
