-- Fix review location: allows any authenticated user to update lat/lng of any review.
-- Run this in Supabase SQL Editor. Needed because RLS only allows updating own reviews,
-- but we want anyone to be able to correct wrong locations (e.g. Palo Alto default).

create or replace function public.fix_review_location(p_review_id text, p_lat float, p_lng float)
returns void as $$
begin
  if auth.role() != 'authenticated' then
    raise exception 'Must be signed in to fix location';
  end if;
  update public.reviews set lat = p_lat, lng = p_lng where id = p_review_id;
end;
$$ language plpgsql security definer;

grant execute on function public.fix_review_location(text, float, float) to authenticated;
