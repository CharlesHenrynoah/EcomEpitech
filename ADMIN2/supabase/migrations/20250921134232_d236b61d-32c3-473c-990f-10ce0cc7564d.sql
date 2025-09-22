-- Fix permissions for reviews table to allow product listing
GRANT SELECT ON TABLE public.reviews TO authenticated;

-- Also ensure RLS policies allow authenticated users to read reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "p_select_auth" ON public.reviews;
DROP POLICY IF EXISTS "p_insert_auth" ON public.reviews;
DROP POLICY IF EXISTS "p_update_auth" ON public.reviews;
DROP POLICY IF EXISTS "p_delete_auth" ON public.reviews;

-- Create more permissive policies for reviews
CREATE POLICY "reviews_select_auth"
ON public.reviews
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "reviews_insert_auth"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "reviews_update_auth"
ON public.reviews
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "reviews_delete_auth"
ON public.reviews
FOR DELETE
TO authenticated
USING (true);