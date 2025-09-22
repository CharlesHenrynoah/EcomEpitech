-- Ensure authenticated role has proper privileges to create products and related rows
DO $$ BEGIN
  -- Schema usage
  GRANT USAGE ON SCHEMA public TO authenticated;

  -- Table privileges
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.products TO authenticated;
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.product_variants TO authenticated;
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.product_images TO authenticated;

  -- Also allow reading categories to populate selects (non-sensitive)
  GRANT SELECT ON TABLE public.categories TO authenticated;

  -- Sequences (needed for bigint serial IDs like product_images.id)
  GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

  -- Make it future-proof for new tables/sequences
  ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO authenticated;
EXCEPTION WHEN others THEN
  -- Ignore errors if grants already exist
  NULL;
END $$;