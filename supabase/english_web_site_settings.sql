-- English Web public editable site settings.
-- Run this in Supabase SQL Editor so admin edits can be saved online
-- and public visitors can read the latest homepage content.

create table if not exists public.app_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;

grant select on public.app_settings to anon, authenticated;
grant insert, update, delete on public.app_settings to authenticated;

drop policy if exists english_web_settings_public_select on public.app_settings;
drop policy if exists english_web_settings_owner_insert on public.app_settings;
drop policy if exists english_web_settings_owner_update on public.app_settings;
drop policy if exists english_web_settings_owner_delete on public.app_settings;

create policy english_web_settings_public_select
on public.app_settings
for select
to anon, authenticated
using (key = 'english_web_site_content');

create policy english_web_settings_owner_insert
on public.app_settings
for insert
to authenticated
with check (
  key = 'english_web_site_content'
  and public.current_user_is_owner()
);

create policy english_web_settings_owner_update
on public.app_settings
for update
to authenticated
using (
  key = 'english_web_site_content'
  and public.current_user_is_owner()
)
with check (
  key = 'english_web_site_content'
  and public.current_user_is_owner()
);

create policy english_web_settings_owner_delete
on public.app_settings
for delete
to authenticated
using (
  key = 'english_web_site_content'
  and public.current_user_is_owner()
);
