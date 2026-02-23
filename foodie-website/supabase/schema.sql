-- Foodie: Supabase schema for database-backed demo
-- Run this in Supabase SQL Editor after creating a project

-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  bio text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Unique display name
create unique index if not exists idx_profiles_display_name on profiles(display_name);

-- Reviews
create table if not exists reviews (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  restaurant text not null,
  lat float not null,
  lng float not null,
  text text not null,
  rating int not null check (rating between 1 and 5),
  cuisine text default 'Various',
  price int default 2,
  photos jsonb default '[]',
  verified_visit boolean default false,
  would_go_again boolean default true,
  likes int default 0,
  created_at bigint not null
);

create index if not exists idx_reviews_user on reviews(user_id);
create index if not exists idx_reviews_location on reviews(lat, lng);
create index if not exists idx_reviews_created on reviews(created_at desc);

-- Connections (bidirectional: store once with user_a < user_b)
create table if not exists connections (
  user_a uuid references auth.users(id) on delete cascade,
  user_b uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_a, user_b),
  check (user_a < user_b)
);

-- Connection requests
create table if not exists connection_requests (
  id text primary key,
  from_user uuid not null references auth.users(id) on delete cascade,
  to_user uuid not null references auth.users(id) on delete cascade,
  status text default 'pending',
  created_at bigint not null default (extract(epoch from now()) * 1000)::bigint,
  unique (from_user, to_user)
);

create index if not exists idx_connection_requests_to on connection_requests(to_user, status);

-- Comments
create table if not exists comments (
  id text primary key,
  review_id text not null references reviews(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  created_at bigint not null
);

create index if not exists idx_comments_review on comments(review_id);

-- Review likes (who liked which review)
create table if not exists review_likes (
  review_id text references reviews(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  primary key (review_id, user_id)
);

-- Saved (user saves a restaurant key)
create table if not exists saved (
  user_id uuid references auth.users(id) on delete cascade,
  saved_key text not null,
  created_at timestamptz default now(),
  primary key (user_id, saved_key)
);

-- Group list items
create table if not exists group_list_items (
  user_id uuid references auth.users(id) on delete cascade,
  list_name text not null,
  saved_key text not null,
  created_at timestamptz default now(),
  primary key (user_id, list_name, saved_key)
);

-- Private notes (user's note on their own review)
create table if not exists private_notes (
  user_id uuid references auth.users(id) on delete cascade,
  review_id text references reviews(id) on delete cascade,
  note text,
  primary key (user_id, review_id)
);

-- Notifications
create table if not exists notifications (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  type text not null,
  text text not null,
  read boolean default false,
  recipient text,
  created_at bigint not null
);

create index if not exists idx_notifications_user on notifications(user_id);

-- Trigger: create profile on signup (display_name from metadata or email prefix)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(coalesce(new.email, 'user'), '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- View: reviews with author display_name (for easier querying)
create or replace view reviews_with_author as
  select r.*, p.display_name as author_name
  from reviews r
  left join profiles p on p.id = r.user_id;
