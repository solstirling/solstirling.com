-- Run this after initial schema.sql if your project already exists.

alter table public.portfolio_drafts
  add column if not exists content_blocks jsonb not null default '[]'::jsonb;

alter table public.portfolio_published
  add column if not exists content_blocks jsonb not null default '[]'::jsonb;

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

drop policy if exists portfolio_media_public_read on storage.objects;
create policy portfolio_media_public_read
on storage.objects
for select
using (bucket_id = 'portfolio-media');

drop policy if exists portfolio_media_auth_insert on storage.objects;
create policy portfolio_media_auth_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists portfolio_media_auth_update on storage.objects;
create policy portfolio_media_auth_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists portfolio_media_auth_delete on storage.objects;
create policy portfolio_media_auth_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);
