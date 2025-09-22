-- Reset RLS policies on products to allow authenticated users
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "p_select_auth" ON public.products;
DROP POLICY IF EXISTS "p_insert_auth" ON public.products;
DROP POLICY IF EXISTS "p_update_auth" ON public.products;
DROP POLICY IF EXISTS "p_delete_auth" ON public.products;
DROP POLICY IF EXISTS "Everyone can view products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;

-- Recreate clear permissive policies for authenticated users
CREATE POLICY "products_select_auth"
ON public.products
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "products_insert_auth"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "products_update_auth"
ON public.products
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "products_delete_auth"
ON public.products
FOR DELETE
TO authenticated
USING (true);

-- Ensure variants/images also allow authenticated access (needed right after product creation)
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "p_select_auth" ON public.product_variants;
DROP POLICY IF EXISTS "p_insert_auth" ON public.product_variants;
DROP POLICY IF EXISTS "p_update_auth" ON public.product_variants;
DROP POLICY IF EXISTS "p_delete_auth" ON public.product_variants;
DROP POLICY IF EXISTS "Everyone can view product variants" ON public.product_variants;
DROP POLICY IF EXISTS "Authenticated users can manage product variants" ON public.product_variants;

CREATE POLICY "product_variants_all_auth"
ON public.product_variants
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "p_select_auth" ON public.product_images;
DROP POLICY IF EXISTS "p_insert_auth" ON public.product_images;
DROP POLICY IF EXISTS "p_update_auth" ON public.product_images;
DROP POLICY IF EXISTS "p_delete_auth" ON public.product_images;
DROP POLICY IF EXISTS "Everyone can view product images" ON public.product_images;
DROP POLICY IF EXISTS "Authenticated users can manage product images" ON public.product_images;

CREATE POLICY "product_images_all_auth"
ON public.product_images
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Keep categories as-is (authenticated access), since we only reference the FK