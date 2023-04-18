CREATE TYPE user_role AS ENUM('user', 'moderator', 'admin');
CREATE TYPE grant_mode AS ENUM('read', 'write');

CREATE TABLE IF NOT EXISTS users (
  id uuid NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  role user_role NOT NULL DEFAULT 'user'::user_role,

  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey 
    FOREIGN KEY (id) 
    REFERENCES auth.users (id) 
    MATCH SIMPLE 
    ON UPDATE CASCADE 
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS grant_users_events (
  user_id uuid REFERENCES users (id),
  event_id TEXT REFERENCES events (id),
  mode grant_mode NOT NULL DEFAULT 'read'::grant_mode
);

CREATE OR REPLACE FUNCTION get_granted_events (user_id UUID, mode grant_mode default 'read')
RETURNS TEXT[]
LANGUAGE SQL
SECURITY DEFINER
AS
$$
  SELECT role FROM users WHERE id = $1;

  IF role = 'admin' THEN
    RETURN SELECT id FROM events;
  ELSE IF role = 'moderator' THEN
    RETURN SELECT event_id FROM grant_users_events WHERE id = $1
  ELSE
    RETURN [];
  END IF
$$;