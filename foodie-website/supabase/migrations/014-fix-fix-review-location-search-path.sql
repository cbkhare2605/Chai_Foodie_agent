-- Fix: Function Search Path Mutable (fix_review_location)
-- Sets explicit search_path to prevent search path injection

create or replace function public.fix_review_location(p_review_id text, p_lat float, p_lng float)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.role() != 'authenticated' then
    raise exception 'Must be signed in to fix location';
  end if;
  update public.reviews set lat = p_lat, lng = p_lng where id = p_review_id;
end;
$$;

grant execute on function public.fix_review_location(text, float, float) to authenticated;
