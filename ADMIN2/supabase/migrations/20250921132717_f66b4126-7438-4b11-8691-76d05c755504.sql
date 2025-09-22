-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to view all products
CREATE POLICY "Everyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Policy to allow authenticated users to insert products
CREATE POLICY "Authenticated users can insert products" 
ON public.products 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy to allow authenticated users to update products
CREATE POLICY "Authenticated users can update products" 
ON public.products 
FOR UPDATE 
TO authenticated
USING (true);

-- Policy to allow authenticated users to delete products
CREATE POLICY "Authenticated users can delete products" 
ON public.products 
FOR DELETE 
TO authenticated
USING (true);

-- Enable RLS on product_variants table
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to view product variants
CREATE POLICY "Everyone can view product variants" 
ON public.product_variants 
FOR SELECT 
USING (true);

-- Policy to allow authenticated users to manage variants
CREATE POLICY "Authenticated users can manage product variants" 
ON public.product_variants 
FOR ALL 
TO authenticated
USING (true);

-- Enable RLS on product_images table  
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to view product images
CREATE POLICY "Everyone can view product images" 
ON public.product_images 
FOR SELECT 
USING (true);

-- Policy to allow authenticated users to manage images
CREATE POLICY "Authenticated users can manage product images" 
ON public.product_images 
FOR ALL 
TO authenticated
USING (true);