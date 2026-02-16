-- Foodie: Fix Security Advisor error — reviews_with_author
-- Run in Supabase SQL Editor
-- Recreates view with SECURITY INVOKER so it respects RLS (runs with caller's permissions)

drop view if exists public.reviews_with_author;

create view public.reviews_with_author
with (security_invoker = true)
as
  select r.*, p.display_name as author_name
  from reviews r
  left join profiles p on p.id = r.user_id;
