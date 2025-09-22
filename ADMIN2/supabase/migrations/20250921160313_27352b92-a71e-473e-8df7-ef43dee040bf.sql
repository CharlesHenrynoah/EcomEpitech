-- Create a SECURITY DEFINER function to delete a customer and all related data, bypassing RLS safely
CREATE OR REPLACE FUNCTION public.delete_customer_cascade(p_customer_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete order items for this customer's orders
  DELETE FROM public.order_items
  WHERE order_id IN (
    SELECT id FROM public.orders WHERE customer_id = p_customer_id
  );

  -- Delete orders
  DELETE FROM public.orders WHERE customer_id = p_customer_id;

  -- Delete cart items for this customer's carts
  DELETE FROM public.cart_items
  WHERE cart_id IN (
    SELECT id FROM public.carts WHERE customer_id = p_customer_id
  );

  -- Delete carts
  DELETE FROM public.carts WHERE customer_id = p_customer_id;

  -- Delete reviews
  DELETE FROM public.reviews WHERE customer_id = p_customer_id;

  -- Finally delete the customer
  DELETE FROM public.customers WHERE id = p_customer_id;
END;
$$;

-- Restrict and grant execution to authenticated users
REVOKE ALL ON FUNCTION public.delete_customer_cascade(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_customer_cascade(uuid) TO authenticated;