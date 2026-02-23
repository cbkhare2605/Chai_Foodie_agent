-- Fix: Auth RLS Initialization Plan (profiles)
-- Wrap auth.uid() in (select auth.uid()) so it's evaluated once per query, not per row
-- See: https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using ((select auth.uid()) = id);
