-- Foodie: Diagnose and fix groups visibility
-- Run in Supabase SQL Editor (uses service role, bypasses RLS)
--
-- STEP 1: DIAGNOSE - Run this first to see current state
-- ============================================================

-- See all groups and who should be in them
select
  g.id,
  g.name,
  g.created_by,
  p_creator.display_name as creator_display_name,
  (select count(*) from group_members gm where gm.group_id = g.id) as member_count,
  (select string_agg(p.display_name, ', ') from group_members gm join profiles p on p.id = gm.user_id where gm.group_id = g.id) as current_members
from groups g
left join profiles p_creator on p_creator.id = g.created_by
order by g.created_at desc;

-- See if creator is in group_members for each group
select
  g.name,
  g.created_by,
  case when gm.user_id is not null then 'YES' else 'MISSING' end as creator_in_members
from groups g
left join group_members gm on gm.group_id = g.id and gm.user_id = g.created_by;

--
-- STEP 2: FIX - Add creator to group_members where missing
-- ============================================================
insert into group_members (group_id, user_id)
select g.id, g.created_by
from groups g
where g.created_by is not null
and not exists (
  select 1 from group_members gm
  where gm.group_id = g.id and gm.user_id = g.created_by
);

--
-- STEP 3: ADD MISSING MEMBERS - Replace 'DisplayName' with actual display names
-- Run once per person you want to add to a group
-- ============================================================
-- Example: Add "Alice" to group g_548cb00156004747ac5061c4bc2bf98b
-- insert into group_members (group_id, user_id)
-- select 'g_548cb00156004747ac5061c4bc2bf98b', p.id
-- from profiles p
-- where p.display_name = 'Alice'
-- and not exists (
--   select 1 from group_members gm
--   where gm.group_id = 'g_548cb00156004747ac5061c4bc2bf98b' and gm.user_id = p.id
-- );
