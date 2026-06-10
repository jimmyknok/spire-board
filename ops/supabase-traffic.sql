create table if not exists public.spire_board_counters (
  key text primary key,
  value bigint not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.spire_board_sessions (
  session_id text primary key,
  path text not null default '/',
  last_seen_at timestamptz not null default now(),
  last_counted_at timestamptz
);

alter table public.spire_board_counters enable row level security;
alter table public.spire_board_sessions enable row level security;

revoke all on public.spire_board_counters from anon, authenticated;
revoke all on public.spire_board_sessions from anon, authenticated;

create or replace function public.track_spire_board_visit(
  p_session_id text,
  p_path text default '/',
  p_count_view boolean default true
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  today_key text := 'day:' || to_char(current_date, 'YYYY-MM-DD');
  previous_counted_at timestamptz;
  should_count boolean := false;
  today_views bigint := 0;
  total_views bigint := 0;
  online_users bigint := 0;
begin
  if p_session_id is null or length(trim(p_session_id)) < 8 then
    raise exception 'invalid session id';
  end if;

  select last_counted_at
    into previous_counted_at
    from public.spire_board_sessions
   where session_id = p_session_id;

  should_count := p_count_view and (
    previous_counted_at is null or previous_counted_at < now() - interval '30 minutes'
  );

  insert into public.spire_board_sessions (session_id, path, last_seen_at, last_counted_at)
  values (
    p_session_id,
    coalesce(nullif(left(p_path, 240), ''), '/'),
    now(),
    case when should_count then now() else previous_counted_at end
  )
  on conflict (session_id) do update
    set path = excluded.path,
        last_seen_at = now(),
        last_counted_at = case
          when should_count then now()
          else public.spire_board_sessions.last_counted_at
        end;

  if should_count then
    insert into public.spire_board_counters (key, value, updated_at)
    values ('total', 1, now()), (today_key, 1, now())
    on conflict (key) do update
      set value = public.spire_board_counters.value + 1,
          updated_at = now();
  end if;

  select value into total_views
    from public.spire_board_counters
   where key = 'total';

  select value into today_views
    from public.spire_board_counters
   where key = today_key;

  select count(*) into online_users
    from public.spire_board_sessions
   where last_seen_at > now() - interval '5 minutes';

  return jsonb_build_object(
    'total_views', coalesce(total_views, 0),
    'today_views', coalesce(today_views, 0),
    'online_users', coalesce(online_users, 0)
  );
end;
$$;

grant execute on function public.track_spire_board_visit(text, text, boolean) to anon;
