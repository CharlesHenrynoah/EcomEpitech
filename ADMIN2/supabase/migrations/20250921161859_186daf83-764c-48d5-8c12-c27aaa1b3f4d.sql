-- Ensure RLS and policies for legal_documents
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;

-- Ensure everyone can SELECT
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
END$$;

-- Ensure real admin can manage (INSERT/UPDATE/DELETE)
DO $$
BEGIN
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