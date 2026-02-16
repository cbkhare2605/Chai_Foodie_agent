-- Foodie: Delete 3 duplicate groups (keep 1)
-- Run in Supabase SQL Editor
-- Keeps g_5e5a87c84a3548a7966a2ab381398d92, deletes the other 3

delete from groups where id in (
  'g_0210aa7e93fb4198a07767950f631578',
  'g_c13bc0e4d3aa402b911d4157c9dBBee3',
  'g_fdf86afcfbb64469beae945566adc6e0'
);
