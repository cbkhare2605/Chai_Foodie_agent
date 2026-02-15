-- Foodie: Row Level Security policies
-- Run after schema.sql. Enables RLS and defines who can read/write what.

alter table profiles enable row level security;
alter table reviews enable row level security;
alter table connections enable row level security;
alter table connection_requests enable row level security;
alter table comments enable row level security;
alter table review_likes enable row level security;
alter table saved enable row level security;
alter table group_list_items enable row level security;
alter table private_notes enable row level security;
alter table notifications enable row level security;

-- Profiles: anyone can read; only own profile can update
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Reviews: users see own + 1st-level + 2nd-level connections (enforced via RPC or view in app)
-- For demo: allow read all, write own
create policy "Reviews viewable by authenticated" on reviews for select using (auth.role() = 'authenticated');
create policy "Users can insert own reviews" on reviews for insert with check (auth.uid() = user_id);
create policy "Users can update own reviews" on reviews for update using (auth.uid() = user_id);
create policy "Users can delete own reviews" on reviews for delete using (auth.uid() = user_id);

-- Connections: users can read connections involving them
create policy "Users can view own connections" on connections for select using (
  auth.uid() = user_a or auth.uid() = user_b
);
create policy "Users can insert connections" on connections for insert with check (
  auth.uid() = user_a or auth.uid() = user_b
);

-- Connection requests: from_user and to_user can read
create policy "Users can view relevant requests" on connection_requests for select using (
  auth.uid() = from_user or auth.uid() = to_user
);
create policy "Users can create requests" on connection_requests for insert with check (auth.uid() = from_user);
create policy "Users can update requests they received" on connection_requests for update using (auth.uid() = to_user);

-- Comments: anyone authenticated can read; insert own
create policy "Comments viewable by authenticated" on comments for select using (auth.role() = 'authenticated');
create policy "Users can insert own comments" on comments for insert with check (auth.uid() = user_id);
create policy "Users can delete own comments" on comments for delete using (auth.uid() = user_id);

-- Review likes
create policy "Likes viewable by authenticated" on review_likes for select using (auth.role() = 'authenticated');
create policy "Users can manage own likes" on review_likes for all using (auth.uid() = user_id);

-- Saved: own only
create policy "Users can manage own saved" on saved for all using (auth.uid() = user_id);

-- Group list items: own only
create policy "Users can manage own list items" on group_list_items for all using (auth.uid() = user_id);

-- Private notes: own only
create policy "Users can manage own private notes" on private_notes for all using (auth.uid() = user_id);

-- Notifications: own only
create policy "Users can view own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on notifications for update using (auth.uid() = user_id);
create policy "System can insert notifications" on notifications for insert with check (true);
