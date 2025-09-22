-- Grants so RLS policies can apply on users_gestion
GRANT SELECT, INSERT, UPDATE ON TABLE public.users_gestion TO authenticated;
-- Optional but safe: allow usage on the table for anon to avoid metadata issues (no data access without policies)
GRANT USAGE, SELECT ON SEQUENCE public.users_gestion_id_seq TO authenticated;