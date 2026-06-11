-- English Web full Supabase setup for a NEW project.
-- Run this once in Supabase SQL Editor after creating the new project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'viewer' check (role in ('owner', 'admin', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    case
      when lower(new.email) = 'lethuhien211094@gmail.com' then 'owner'
      else 'viewer'
    end
  )
  on conflict (id) do update
  set email = excluded.email,
      updated_at = now();

  return new;
end;
$$;

create or replace function public.current_user_is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'owner'
  );
$$;

create or replace function public.current_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('owner', 'admin')
  );
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_app_settings_updated_at on public.app_settings;
create trigger set_app_settings_updated_at
before update on public.app_settings
for each row execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.app_settings enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.app_settings to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant insert, update, delete on public.app_settings to authenticated;
grant execute on function public.current_user_is_owner() to authenticated;
grant execute on function public.current_user_is_admin() to authenticated;

drop policy if exists profiles_select_self on public.profiles;
drop policy if exists profiles_owner_select_all on public.profiles;
drop policy if exists profiles_owner_update_roles on public.profiles;
drop policy if exists english_web_settings_public_select on public.app_settings;
drop policy if exists english_web_settings_owner_insert on public.app_settings;
drop policy if exists english_web_settings_owner_update on public.app_settings;
drop policy if exists english_web_settings_owner_delete on public.app_settings;

create policy profiles_select_self
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy profiles_owner_select_all
on public.profiles
for select
to authenticated
using (public.current_user_is_owner());

create policy profiles_owner_update_roles
on public.profiles
for update
to authenticated
using (public.current_user_is_owner())
with check (public.current_user_is_owner());

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

insert into public.app_settings (key, value)
values (
  'english_web_site_content',
  '{"eyebrow":"Học tiếng Anh online cho bé","title":"Tự tin giao tiếp với thế giới","subtitle":"English Web giúp bé luyện Super Kids qua video giới thiệu, vòng tự luyện, bài thi thử và báo cáo kết quả sau mỗi lần nộp bài.","videoUrl":"","statYears":"3","statCountries":"30+","statTeachers":"8"}'
)
on conflict (key) do nothing;
