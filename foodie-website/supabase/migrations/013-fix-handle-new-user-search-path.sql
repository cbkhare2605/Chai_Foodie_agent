-- Fix: Function Search Path Mutable (handle_new_user)
-- Sets explicit search_path to prevent search path injection

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
