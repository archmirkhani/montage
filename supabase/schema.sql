-- 몽타주실 — shared gallery table for Supabase
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Visitors can VIEW and ADD drawings, but can never edit or delete anyone's drawing.

create table if not exists public.gallery (
  id         text primary key check (char_length(id) between 4 and 64),
  case_id    text not null check (case_id in ('001', '002')),
  suspect    text not null check (char_length(suspect) <= 40),
  score      smallint not null check (score between 0 and 100),
  success    boolean not null,
  visitor    text not null check (char_length(visitor) <= 16),
  thumb      text not null check (thumb like 'data:image/jpeg;base64,%' and char_length(thumb) <= 60000),
  full_img   text check (full_img like 'data:image/jpeg;base64,%' and char_length(full_img) <= 250000),
  created_at timestamptz not null default now(),
  constraint success_matches_score check (success = (score >= 80))
);

create index if not exists gallery_created_at_idx on public.gallery (created_at desc);
create index if not exists gallery_score_idx on public.gallery (score);

alter table public.gallery enable row level security;

grant select, insert on public.gallery to anon;
revoke update, delete on public.gallery from anon;

drop policy if exists "anyone can view drawings" on public.gallery;
create policy "anyone can view drawings" on public.gallery
  for select to anon using (true);

drop policy if exists "anyone can submit drawings" on public.gallery;
create policy "anyone can submit drawings" on public.gallery
  for insert to anon with check (true);

-- To delete an inappropriate drawing later, use the Supabase dashboard
-- (Table Editor → gallery → select the row → Delete). Only you can do this.
