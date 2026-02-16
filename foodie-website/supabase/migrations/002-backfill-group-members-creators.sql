-- Foodie: Backfill group_members — add creator as member for any group where they're missing
-- Run in Supabase SQL Editor (as postgres, bypasses RLS)
-- Fixes: groups exist but don't show in app because creator wasn't in group_members

insert into group_members (group_id, user_id)
select g.id, g.created_by
from groups g
where g.created_by is not null
and not exists (
  select 1 from group_members gm
  where gm.group_id = g.id and gm.user_id = g.created_by
);
