-- Grant read access to authenticated role for detail page joins
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON TABLE public.orders TO authenticated;
GRANT SELECT ON TABLE public.order_items TO authenticated;
GRANT SELECT ON TABLE public.carts TO authenticated;
GRANT SELECT ON TABLE public.cart_items TO authenticated;
GRANT SELECT ON TABLE public.products TO authenticated;
GRANT SELECT ON TABLE public.product_variants TO authenticated;
GRANT SELECT ON TABLE public.product_images TO authenticated;