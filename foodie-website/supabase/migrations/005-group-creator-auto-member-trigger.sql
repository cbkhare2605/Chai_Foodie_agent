-- Foodie: Auto-add creator to group_members when a group is created
-- Run in Supabase SQL Editor
-- Ensures creator is ALWAYS a member — no app bug can leave them out

create or replace function public.add_creator_to_group_members()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.created_by is not null then
    insert into public.group_members (group_id, user_id)
    values (new.id, new.created_by)
    on conflict (group_id, user_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_group_created_add_creator on public.groups;
create trigger on_group_created_add_creator
  after insert on public.groups
  for each row execute procedure public.add_creator_to_group_members();
