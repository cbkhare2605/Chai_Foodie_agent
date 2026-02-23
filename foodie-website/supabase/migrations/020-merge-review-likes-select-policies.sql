-- Fix: Multiple Permissive Policies on review_likes (SELECT)
-- "Likes viewable by authenticated" allows all authenticated to see all likes
-- "Users can manage own likes" (for ALL) also allows SELECT of own likes
-- Merge: keep single SELECT (authenticated see all); split INSERT/UPDATE/DELETE from ALL

drop policy if exists "Likes viewable by authenticated" on review_likes;
drop policy if exists "Users can manage own likes" on review_likes;

create policy "Likes viewable by authenticated" on review_likes for select using ((select auth.role()) = 'authenticated');
create policy "Users can insert own likes" on review_likes for insert with check ((select auth.uid()) = user_id);
create policy "Users can update own likes" on review_likes for update using ((select auth.uid()) = user_id);
create policy "Users can delete own likes" on review_likes for delete using ((select auth.uid()) = user_id);
