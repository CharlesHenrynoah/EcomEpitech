-- Create fictional carts for customers
INSERT INTO public.carts (customer_id, status) VALUES
((SELECT id FROM customers WHERE email = 'marie.dupont@email.com'), 'open'),
((SELECT id FROM customers WHERE email = 'jean.martin@email.com'), 'abandoned'),
((SELECT id FROM customers WHERE email = 'sophie.bernard@email.com'), 'open'),
((SELECT id FROM customers WHERE email = 'thomas.petit@email.com'), 'completed'),
((SELECT id FROM customers WHERE email = 'claire.moreau@email.com'), 'open');

-- Create fictional orders for customers
INSERT INTO public.orders (customer_id, status, payment_status, total_amount) VALUES
((SELECT id FROM customers WHERE email = 'marie.dupont@email.com'), 'delivered', 'paid', 120.50),
((SELECT id FROM customers WHERE email = 'jean.martin@email.com'), 'shipped', 'paid', 89.99),
((SELECT id FROM customers WHERE email = 'sophie.bernard@email.com'), 'confirmed', 'paid', 156.75),
((SELECT id FROM customers WHERE email = 'thomas.petit@email.com'), 'pending', 'pending', 67.20),
((SELECT id FROM customers WHERE email = 'claire.moreau@email.com'), 'delivered', 'paid', 234.80),
((SELECT id FROM customers WHERE email = 'pierre.leroy@email.com'), 'cancelled', 'refunded', 45.30),
((SELECT id FROM customers WHERE email = 'julie.simon@email.com'), 'delivered', 'paid', 178.95),
((SELECT id FROM customers WHERE email = 'antoine.michel@email.com'), 'shipped', 'paid', 92.40);

-- Create fictional cart items
INSERT INTO public.cart_items (cart_id, product_id, quantity) VALUES
((SELECT id FROM carts WHERE customer_id = (SELECT id FROM customers WHERE email = 'marie.dupont@email.com')), '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 2),
((SELECT id FROM carts WHERE customer_id = (SELECT id FROM customers WHERE email = 'jean.martin@email.com')), '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 1),
((SELECT id FROM carts WHERE customer_id = (SELECT id FROM customers WHERE email = 'sophie.bernard@email.com')), '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 3);

-- Create fictional order items
INSERT INTO public.order_items (order_id, product_id, quantity, unit_price) VALUES
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'marie.dupont@email.com')), '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 1, 120.50),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'jean.martin@email.com')), '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 1, 89.99),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'sophie.bernard@email.com')), '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 2, 78.38),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'thomas.petit@email.com')), '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 1, 67.20),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'claire.moreau@email.com')), '9d7f690c-0f11-4a47-9539-d81f7c2b040e', 3, 78.27);

-- Create fictional reviews
INSERT INTO public.reviews (product_id, customer_id, rating, comment) VALUES
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', (SELECT id FROM customers WHERE email = 'marie.dupont@email.com'), 5, 'Excellent produit, très satisfaite de mon achat !'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', (SELECT id FROM customers WHERE email = 'jean.martin@email.com'), 4, 'Bonne qualité, livraison rapide.'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', (SELECT id FROM customers WHERE email = 'sophie.bernard@email.com'), 5, 'Parfait ! Correspond exactement à mes attentes.'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', (SELECT id FROM customers WHERE email = 'claire.moreau@email.com'), 3, 'Correct mais sans plus, prix un peu élevé.'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', (SELECT id FROM customers WHERE email = 'julie.simon@email.com'), 4, 'Très bon produit, je recommande !'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', (SELECT id FROM customers WHERE email = 'lucas.rodriguez@email.com'), 5, 'Top qualité, rien à redire !'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', (SELECT id FROM customers WHERE email = 'emma.lopez@email.com'), 2, 'Pas terrible, déçue de cet achat.');