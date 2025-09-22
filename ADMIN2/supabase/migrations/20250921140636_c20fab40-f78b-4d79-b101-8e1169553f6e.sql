-- Ajouter des variantes de tailles pour tester les pastilles de disponibilité
INSERT INTO product_variants (product_id, size, stock) VALUES 
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', '38', 0),   -- Indisponible (0)
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', '39', 3),   -- Critique (1-5)
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', '40', 12),  -- Modéré (6-15)
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', '41', 25),  -- Disponible (16+)
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', '42', 8),   -- Modéré (6-15)
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', '43', 2);   -- Critique (1-5)