-- Ensure PostgREST role has privileges on customers
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON TABLE public.customers TO authenticated;