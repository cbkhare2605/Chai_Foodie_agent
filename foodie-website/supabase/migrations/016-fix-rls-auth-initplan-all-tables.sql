-- Fix: Auth RLS Initialization Plan (all tables)
-- Wrap auth.uid() and auth.role() in (select ...) so evaluated once per query, not per row
-- See: https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select

-- ========== reviews ==========
drop policy if exists "Reviews viewable by authenticated" on reviews;
create policy "Reviews viewable by authenticated" on reviews for select using ((select auth.role()) = 'authenticated');
drop policy if exists "Users can insert own reviews" on reviews;
create policy "Users can insert own reviews" on reviews for insert with check ((select auth.uid()) = user_id);
drop policy if exists "Users can update own reviews" on reviews;
create policy "Users can update own reviews" on reviews for update using ((select auth.uid()) = user_id);

-- ========== connections ==========
drop policy if exists "Users can view connections for feed" on connections;
create policy "Users can view connections for feed" on connections for select using ((select auth.role()) = 'authenticated');
drop policy if exists "Users can insert connections" on connections;
create policy "Users can insert connections" on connections for insert with check (
  (select auth.uid()) = user_a or (select auth.uid()) = user_b
);
drop policy if exists "Users can delete own connections" on connections;
create policy "Users can delete own connections" on connections for delete using (
  (select auth.uid()) = user_a or (select auth.uid()) = user_b
);

-- ========== connection_requests ==========
drop policy if exists "Users can view relevant requests" on connection_requests;
create policy "Users can view relevant requests" on connection_requests for select using (
  (select auth.uid()) = from_user or (select auth.uid()) = to_user
);
drop policy if exists "Users can create requests" on connection_requests;
create policy "Users can create requests" on connection_requests for insert with check ((select auth.uid()) = from_user);
drop policy if exists "Users can update requests they received" on connection_requests;
create policy "Users can update requests they received" on connection_requests for update using ((select auth.uid()) = to_user);
drop policy if exists "Users can cancel requests they sent" on connection_requests;
create policy "Users can cancel requests they sent" on connection_requests for update using ((select auth.uid()) = from_user);

-- ========== comments ==========
drop policy if exists "Comments viewable by authenticated" on comments;
create policy "Comments viewable by authenticated" on comments for select using ((select auth.role()) = 'authenticated');
drop policy if exists "Users can insert own comments" on comments;
create policy "Users can insert own comments" on comments for insert with check ((select auth.uid()) = user_id);
drop policy if exists "Users can delete own comments" on comments;
create policy "Users can delete own comments" on comments for delete using ((select auth.uid()) = user_id);

-- ========== review_likes ==========
drop policy if exists "Likes viewable by authenticated" on review_likes;
create policy "Likes viewable by authenticated" on review_likes for select using ((select auth.role()) = 'authenticated');
drop policy if exists "Users can manage own likes" on review_likes;
create policy "Users can manage own likes" on review_likes for all using ((select auth.uid()) = user_id);

-- ========== saved ==========
drop policy if exists "Users can manage own saved" on saved;
create policy "Users can manage own saved" on saved for all using ((select auth.uid()) = user_id);

-- ========== group_list_items ==========
drop policy if exists "Users can manage own list items" on group_list_items;
create policy "Users can manage own list items" on group_list_items for all using ((select auth.uid()) = user_id);

-- ========== private_notes ==========
drop policy if exists "Users can manage own private notes" on private_notes;
create policy "Users can manage own private notes" on private_notes for all using ((select auth.uid()) = user_id);

-- ========== notifications ==========
drop policy if exists "Users can view own notifications" on notifications;
create policy "Users can view own notifications" on notifications for select using ((select auth.uid()) = user_id);
drop policy if exists "Users can update own notifications" on notifications;
create policy "Users can update own notifications" on notifications for update using ((select auth.uid()) = user_id);
drop policy if exists "Authenticated users can insert notifications" on notifications;
create policy "Authenticated users can insert notifications" on notifications for insert with check ((select auth.role()) = 'authenticated');

-- ========== groups ==========
drop policy if exists "Group members can view group" on groups;
create policy "Group members can view group" on groups for select using (
  public.is_group_member(id, (select auth.uid()))
);
drop policy if exists "Authenticated users can create groups" on groups;
create policy "Authenticated users can create groups" on groups for insert with check ((select auth.uid()) = created_by);
drop policy if exists "Creator can update own group" on groups;
create policy "Creator can update own group" on groups for update using ((select auth.uid()) = created_by);
drop policy if exists "Creator can delete own group" on groups;
create policy "Creator can delete own group" on groups for delete using ((select auth.uid()) = created_by);
drop policy if exists "Creators can view own groups" on groups;
create policy "Creators can view own groups" on groups for select using ((select auth.uid()) = created_by);

-- ========== group_members ==========
drop policy if exists "Group members can view members" on group_members;
create policy "Group members can view members" on group_members for select using (
  public.is_group_member(group_id, (select auth.uid()))
);
drop policy if exists "Creator can add members" on group_members;
create policy "Creator can add members" on group_members for insert with check (
  exists (select 1 from groups g where g.id = group_id and g.created_by = (select auth.uid()))
);
drop policy if exists "Creator or self can remove member" on group_members;
create policy "Creator or self can remove member" on group_members for delete using (
  (select auth.uid()) = user_id
  or exists (select 1 from groups g where g.id = group_id and g.created_by = (select auth.uid()))
);
drop policy if exists "Creators can view members of own groups" on group_members;
create policy "Creators can view members of own groups" on group_members for select using (
  exists (select 1 from groups g where g.id = group_members.group_id and g.created_by = (select auth.uid()))
);
