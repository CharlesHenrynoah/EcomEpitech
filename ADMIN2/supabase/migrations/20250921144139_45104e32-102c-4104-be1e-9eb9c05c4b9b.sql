-- Get customer IDs first and create carts with specific customer IDs
DO $$
DECLARE
    marie_id uuid;
    jean_id uuid;
    sophie_id uuid;
    thomas_id uuid;
    claire_id uuid;
    pierre_id uuid;
    julie_id uuid;
    antoine_id uuid;
    lucas_id uuid;
    emma_id uuid;
BEGIN
    -- Get customer IDs
    SELECT id INTO marie_id FROM customers WHERE email = 'marie.dupont@email.com' LIMIT 1;
    SELECT id INTO jean_id FROM customers WHERE email = 'jean.martin@email.com' LIMIT 1;
    SELECT id INTO sophie_id FROM customers WHERE email = 'sophie.bernard@email.com' LIMIT 1;
    SELECT id INTO thomas_id FROM customers WHERE email = 'thomas.petit@email.com' LIMIT 1;
    SELECT id INTO claire_id FROM customers WHERE email = 'claire.moreau@email.com' LIMIT 1;
    SELECT id INTO pierre_id FROM customers WHERE email = 'pierre.leroy@email.com' LIMIT 1;
    SELECT id INTO julie_id FROM customers WHERE email = 'julie.simon@email.com' LIMIT 1;
    SELECT id INTO antoine_id FROM customers WHERE email = 'antoine.michel@email.com' LIMIT 1;
    SELECT id INTO lucas_id FROM customers WHERE email = 'lucas.rodriguez@email.com' LIMIT 1;
    SELECT id INTO emma_id FROM customers WHERE email = 'emma.lopez@email.com' LIMIT 1;

    -- Create carts
    INSERT INTO public.carts (customer_id, status) VALUES
    (marie_id, 'open'),
    (jean_id, 'abandoned'),
    (sophie_id, 'open'),
    (thomas_id, 'completed'),
    (claire_id, 'open');

    -- Create orders
    INSERT INTO public.orders (customer_id, status, payment_status, total_amount) VALUES
    (marie_id, 'delivered', 'paid', 120.50),
    (jean_id, 'shipped', 'paid', 89.99),
    (sophie_id, 'confirmed', 'paid', 156.75),
    (thomas_id, 'pending', 'pending', 67.20),
    (claire_id, 'delivered', 'paid', 234.80),
    (pierre_id, 'cancelled', 'refunded', 45.30),
    (julie_id, 'delivered', 'paid', 178.95),
    (antoine_id, 'shipped', 'paid', 92.40);

    -- Create reviews
    INSERT INTO public.reviews (product_id, customer_id, rating, comment) VALUES
    ('9d7f690c-0f11-4a47-9539-d81f7c2b040e', marie_id, 5, 'Excellent produit, très satisfaite de mon achat !'),
    ('9d7f690c-0f11-4a47-9539-d81f7c2b040e', jean_id, 4, 'Bonne qualité, livraison rapide.'),
    ('9d7f690c-0f11-4a47-9539-d81f7c2b040e', sophie_id, 5, 'Parfait ! Correspond exactement à mes attentes.'),
    ('9d7f690c-0f11-4a47-9539-d81f7c2b040e', claire_id, 3, 'Correct mais sans plus, prix un peu élevé.'),
    ('9d7f690c-0f11-4a47-9539-d81f7c2b040e', julie_id, 4, 'Très bon produit, je recommande !'),
    ('9d7f690c-0f11-4a47-9539-d81f7c2b040e', lucas_id, 5, 'Top qualité, rien à redire !'),
    ('9d7f690c-0f11-4a47-9539-d81f7c2b040e', emma_id, 2, 'Pas terrible, déçue de cet achat.');
END $$;