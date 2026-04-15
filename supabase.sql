create table if not exists public.game_teams (
  id bigserial primary key,
  client_team_id text not null unique,
  session_id text not null,
  team_name text not null,
  team_color text not null,
  room_idx integer not null default 0,
  puzzle_idx integer not null default 0,
  phase text not null default 'story',
  total_seconds integer not null default 0,
  room_seconds integer not null default 0,
  collected_pieces jsonb not null default '[]',
  status text not null default 'active',
  last_event text not null default 'Esperando inicio',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- If you want strict security, enable Row Level Security from the Supabase dashboard
-- and add policies there after creating the table.
