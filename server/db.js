const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.warn('[db] DATABASE_URL is not set. Database features will be disabled.');
}

const pool = DATABASE_URL ? new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}) : null;

// Test database connection
if (pool) {
  pool.connect()
    .then(client => {
      console.log('Database connected successfully');
      client.release();
    })
    .catch(err => {
      console.error('Database connection failed:', err);
    });
}

async function initSchema(){
  if (!pool) return;
  const sql = `
  create table if not exists users (
    id bigserial primary key,
    tg_id bigint unique,
    tg_username text,
    name text,
    balance_q integer not null default 0,
    games_played integer not null default 0,
    invited_count integer not null default 0,
    ref_by bigint references users(id),
    created_at timestamptz not null default now()
  );

  create table if not exists referrals (
    id bigserial primary key,
    inviter_user_id bigint not null references users(id),
    invited_user_id bigint not null unique references users(id),
    bonus_q integer not null default 10,
    granted boolean not null default false,
    created_at timestamptz not null default now(),
    granted_at timestamptz
  );

  do $$ begin
    create type tx_type as enum ('deposit','bonus','withdraw','adjust');
  exception when duplicate_object then null; end $$;

  create table if not exists transactions (
    id bigserial primary key,
    user_id bigint not null references users(id),
    type tx_type not null,
    amount_q integer not null,
    meta jsonb not null default '{}',
    created_at timestamptz not null default now()
  );

  do $$ begin
    create type withdraw_method as enum ('card');
  exception when duplicate_object then null; end $$;
  do $$ begin
    create type withdraw_status as enum ('pending','approved','declined');
  exception when duplicate_object then null; end $$;

  create table if not exists withdraw_requests (
    id bigserial primary key,
    user_id bigint not null references users(id),
    amount_q integer not null,
    method withdraw_method not null,
    card_number text,
    status withdraw_status not null default 'pending',
    admin_comment text,
    created_at timestamptz not null default now(),
    decided_at timestamptz
  );
  `;
  await pool.query(sql);
}

async function query(text, params){
  if (!pool) throw new Error('DB not configured');
  return pool.query(text, params);
}

async function getClient(){
  if (!pool) throw new Error('DB not configured');
  return pool.connect();
}

module.exports = { pool, initSchema, query, getClient };
