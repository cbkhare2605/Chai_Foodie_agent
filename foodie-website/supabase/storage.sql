-- Foodie: Supabase Storage for avatars
-- Run in Supabase SQL Editor after creating a project
-- First create the bucket in Dashboard: Storage → New bucket → name: avatars, Public: Yes

-- Policy: Users can upload their own avatar (path: {user_id}/avatar.jpg)
create policy "Users can upload own avatar"
on storage.objects for insert
to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update own avatar"
on storage.objects for update
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete own avatar"
on storage.objects for delete
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Public read (bucket must be created as Public)
create policy "Avatar images are publicly readable"
on storage.objects for select
to public
using (bucket_id = 'avatars');
