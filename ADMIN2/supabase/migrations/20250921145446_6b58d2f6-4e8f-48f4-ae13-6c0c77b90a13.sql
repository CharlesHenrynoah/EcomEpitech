-- Ensure the PostgREST authenticated role can read required tables (RLS still enforced)
GRANT SELECT ON TABLE public.orders TO authenticated;
GRANT SELECT ON TABLE public.order_items TO authenticated;
GRANT SELECT ON TABLE public.carts TO authenticated;
GRANT SELECT ON TABLE public.cart_items TO authenticated;
GRANT SELECT ON TABLE public.products TO authenticated;
GRANT SELECT ON TABLE public.product_variants TO authenticated;
GRANT SELECT ON TABLE public.product_images TO authenticated;