-- Create cart items and order items
DO $$
DECLARE
    marie_cart_id uuid;
    jean_cart_id uuid;
    sophie_cart_id uuid;
    marie_order_id uuid;
    jean_order_id uuid;
    sophie_order_id uuid;
    thomas_order_id uuid;
    claire_order_id uuid;
BEGIN
    -- Get cart IDs
    SELECT c.id INTO marie_cart_id FROM carts c 
    JOIN customers cu ON c.customer_id = cu.id 
    WHERE cu.email = 'marie.dupont@email.com' LIMIT 1;
    
    SELECT c.id INTO jean_cart_id FROM carts c 
    JOIN customers cu ON c.customer_id = cu.id 
    WHERE cu.email = 'jean.martin@email.com' LIMIT 1;
    
    SELECT c.id INTO sophie_cart_id FROM carts c 
    JOIN customers cu ON c.customer_id = cu.id 
    WHERE cu.email = 'sophie.bernard@email.com' LIMIT 1;

    -- Get order IDs  
    SELECT o.id INTO marie_order_id FROM orders o 
    JOIN customers cu ON o.customer_id = cu.id 
    WHERE cu.email = 'marie.dupont@email.com' LIMIT 1;
    
    SELECT o.id INTO jean_order_id FROM orders o 
    JOIN customers cu ON o.customer_id = cu.id 
    WHERE cu.email = 'jean.martin@email.com' LIMIT 1;
    
    SELECT o.id INTO sophie_order_id FROM orders o 
    JOIN customers cu ON o.customer_id = cu.id 
    WHERE cu.email = 'sophie.bernard@email.com' LIMIT 1;
    
    SELECT o.id INTO thomas_order_id FROM orders o 
    JOIN customers cu ON o.customer_id = cu.id 
    WHERE cu.email = 'thomas.petit@email.com' LIMIT 1;
    
    SELECT o.id INTO claire_order_id FROM orders o 
    JOIN customers cu ON o.customer_id = cu.id 
    WHERE cu.email = 'claire.moreau@email.com' LIMIT 1;

    -- Create cart items
    INSERT INTO public.cart_items (cart_id, product_id, quantity) VALUES
    (marie_cart_id, '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 2),
    (jean_cart_id, '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 1),
    (sophie_cart_id, '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 3);

    -- Create order items
    INSERT INTO public.order_items (order_id, product_id, quantity, unit_price) VALUES
    (marie_order_id, '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 1, 120.50),
    (jean_order_id, '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 1, 89.99),
    (sophie_order_id, '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 2, 78.38),
    (thomas_order_id, '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 1, 67.20),
    (claire_order_id, '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 3, 78.27);
END $$;