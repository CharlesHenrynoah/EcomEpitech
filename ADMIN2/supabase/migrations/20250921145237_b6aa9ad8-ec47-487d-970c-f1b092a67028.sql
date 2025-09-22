-- Fix RLS policies for all customer related tables

-- Enable RLS on all tables and update policies for admin/moderator access
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY; 
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "p_select_auth" ON public.orders;
DROP POLICY IF EXISTS "p_insert_auth" ON public.orders;
DROP POLICY IF EXISTS "p_update_auth" ON public.orders;
DROP POLICY IF EXISTS "p_delete_auth" ON public.orders;

DROP POLICY IF EXISTS "p_select_auth" ON public.order_items;
DROP POLICY IF EXISTS "p_insert_auth" ON public.order_items;
DROP POLICY IF EXISTS "p_update_auth" ON public.order_items;
DROP POLICY IF EXISTS "p_delete_auth" ON public.order_items;

DROP POLICY IF EXISTS "p_select_auth" ON public.carts;
DROP POLICY IF EXISTS "p_insert_auth" ON public.carts;
DROP POLICY IF EXISTS "p_update_auth" ON public.carts;
DROP POLICY IF EXISTS "p_delete_auth" ON public.carts;

DROP POLICY IF EXISTS "p_select_auth" ON public.cart_items;
DROP POLICY IF EXISTS "p_insert_auth" ON public.cart_items;
DROP POLICY IF EXISTS "p_update_auth" ON public.cart_items;
DROP POLICY IF EXISTS "p_delete_auth" ON public.cart_items;

DROP POLICY IF EXISTS "p_select_auth" ON public.categories;
DROP POLICY IF EXISTS "p_insert_auth" ON public.categories;
DROP POLICY IF EXISTS "p_update_auth" ON public.categories;
DROP POLICY IF EXISTS "p_delete_auth" ON public.categories;

-- Create new policies for admin/moderator access to orders
CREATE POLICY "Real admins and moderators can manage orders" 
ON public.orders 
FOR ALL 
USING (is_moderator_or_admin());

-- Create new policies for admin/moderator access to order_items
CREATE POLICY "Real admins and moderators can manage order_items" 
ON public.order_items 
FOR ALL 
USING (is_moderator_or_admin());

-- Create new policies for admin/moderator access to carts
CREATE POLICY "Real admins and moderators can manage carts" 
ON public.carts 
FOR ALL 
USING (is_moderator_or_admin());

-- Create new policies for admin/moderator access to cart_items
CREATE POLICY "Real admins and moderators can manage cart_items" 
ON public.cart_items 
FOR ALL 
USING (is_moderator_or_admin());

-- Create new policies for admin/moderator access to categories
CREATE POLICY "Real admins and moderators can manage categories" 
ON public.categories 
FOR ALL 
USING (is_moderator_or_admin());

-- Create new policies for reviews (keep existing simple ones or update if needed)
DROP POLICY IF EXISTS "reviews_select_auth" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_auth" ON public.reviews;
DROP POLICY IF EXISTS "reviews_update_auth" ON public.reviews;
DROP POLICY IF EXISTS "reviews_delete_auth" ON public.reviews;

CREATE POLICY "Real admins and moderators can manage reviews" 
ON public.reviews 
FOR ALL 
USING (is_moderator_or_admin());

-- Update product_variants and product_images policies
DROP POLICY IF EXISTS "product_variants_all_auth" ON public.product_variants;
DROP POLICY IF EXISTS "product_images_all_auth" ON public.product_images;

CREATE POLICY "Real admins and moderators can manage product_variants" 
ON public.product_variants 
FOR ALL 
USING (is_moderator_or_admin());

CREATE POLICY "Real admins and moderators can manage product_images" 
ON public.product_images 
FOR ALL 
USING (is_moderator_or_admin());