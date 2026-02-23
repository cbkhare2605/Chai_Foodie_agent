-- Fix: Multiple Permissive Policies on connection_requests (UPDATE)
-- Merge two UPDATE policies into one to avoid evaluating both per query

drop policy if exists "Users can update requests they received" on connection_requests;
drop policy if exists "Users can cancel requests they sent" on connection_requests;

create policy "Users can update requests they sent or received" on connection_requests for update using (
  (select auth.uid()) = from_user or (select auth.uid()) = to_user
);
