-- Clear existing customers and insert fictional ones
DELETE FROM public.customers;

-- Insert fictional customers with complete data
INSERT INTO public.customers (email, first_name, last_name, phone, password, avatar_url) VALUES
('marie.dupont@email.com', 'Marie', 'Dupont', '+33 6 12 34 56 78', 'motdepasse123', NULL),
('jean.martin@email.com', 'Jean', 'Martin', '+33 6 23 45 67 89', 'password456', NULL),
('sophie.bernard@email.com', 'Sophie', 'Bernard', '+33 6 34 56 78 90', 'secret789', NULL),
('thomas.petit@email.com', 'Thomas', 'Petit', '+33 6 45 67 89 01', 'mypassword', NULL),
('claire.moreau@email.com', 'Claire', 'Moreau', '+33 6 56 78 90 12', 'password123', NULL),
('pierre.leroy@email.com', 'Pierre', 'Leroy', '+33 6 67 89 01 23', 'motdepasse', NULL),
('julie.simon@email.com', 'Julie', 'Simon', '+33 6 78 90 12 34', 'secret123', NULL),
('antoine.michel@email.com', 'Antoine', 'Michel', '+33 6 89 01 23 45', 'password789', NULL),
('camille.garcia@email.com', 'Camille', 'Garcia', '+33 6 90 12 34 56', 'mypassword123', NULL),
('lucas.rodriguez@email.com', 'Lucas', 'Rodriguez', '+33 6 01 23 45 67', 'secret456', NULL),
('emma.lopez@email.com', 'Emma', 'Lopez', '+33 6 12 34 56 78', 'password567', NULL),
('maxime.wilson@email.com', 'Maxime', 'Wilson', '+33 6 23 45 67 89', 'motdepasse789', NULL),
('lea.anderson@email.com', 'Léa', 'Anderson', '+33 6 34 56 78 90', 'secret123', NULL),
('hugo.taylor@email.com', 'Hugo', 'Taylor', '+33 6 45 67 89 01', 'password456', NULL),
('chloe.brown@email.com', 'Chloé', 'Brown', '+33 6 56 78 90 12', 'mypassword456', NULL);