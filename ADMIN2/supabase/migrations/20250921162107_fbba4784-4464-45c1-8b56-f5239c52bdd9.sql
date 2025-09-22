-- Re-enable secure, working access to legal_documents
BEGIN;

-- 1) Ensure RLS is enabled
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;

-- 2) Ensure grants (PostgREST also checks privileges in addition to RLS)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE public.legal_documents TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.legal_documents TO authenticated;

-- 3) Ensure policies exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='legal_documents' AND policyname='Everyone can read legal documents'
  ) THEN
    CREATE POLICY "Everyone can read legal documents"
    ON public.legal_documents
    FOR SELECT
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='legal_documents' AND policyname='Real admin can manage legal documents'
  ) THEN
    CREATE POLICY "Real admin can manage legal documents"
    ON public.legal_documents
    FOR ALL
    USING (public.is_real_admin());
  END IF;
END$$;

COMMIT;