-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.portfolio_drafts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  site_slug text not null,
  project_key text not null,
  title text not null,
  description text not null,
  link text not null,
  status text not null,
  status_color text not null,
  media_type text not null,
  media_src text not null,
  media_alt text not null,
  media_poster text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  constraint portfolio_drafts_owner_key unique (owner_id, site_slug, project_key)
);

create table if not exists public.portfolio_published (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  site_slug text not null,
  project_key text not null,
  title text not null,
  description text not null,
  link text not null,
  status text not null,
  status_color text not null,
  media_type text not null,
  media_src text not null,
  media_alt text not null,
  media_poster text not null default '',
  sort_order integer not null default 0,
  published_at timestamptz not null default now(),
  constraint portfolio_published_owner_key unique (owner_id, site_slug, project_key)
);

create index if not exists portfolio_drafts_site_order_idx
  on public.portfolio_drafts (site_slug, sort_order, updated_at desc);

create index if not exists portfolio_published_site_order_idx
  on public.portfolio_published (site_slug, sort_order, published_at desc);

alter table public.portfolio_drafts enable row level security;
alter table public.portfolio_published enable row level security;

-- Drafts: only logged-in owner can access their own rows.
drop policy if exists drafts_select_own on public.portfolio_drafts;
create policy drafts_select_own on public.portfolio_drafts
for select using (auth.uid() = owner_id);

drop policy if exists drafts_insert_own on public.portfolio_drafts;
create policy drafts_insert_own on public.portfolio_drafts
for insert with check (auth.uid() = owner_id);

drop policy if exists drafts_update_own on public.portfolio_drafts;
create policy drafts_update_own on public.portfolio_drafts
for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists drafts_delete_own on public.portfolio_drafts;
create policy drafts_delete_own on public.portfolio_drafts
for delete using (auth.uid() = owner_id);

-- Published: public read, owner write.
drop policy if exists published_select_public on public.portfolio_published;
create policy published_select_public on public.portfolio_published
for select using (true);

drop policy if exists published_insert_own on public.portfolio_published;
create policy published_insert_own on public.portfolio_published
for insert with check (auth.uid() = owner_id);

drop policy if exists published_update_own on public.portfolio_published;
create policy published_update_own on public.portfolio_published
for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists published_delete_own on public.portfolio_published;
create policy published_delete_own on public.portfolio_published
for delete using (auth.uid() = owner_id);
