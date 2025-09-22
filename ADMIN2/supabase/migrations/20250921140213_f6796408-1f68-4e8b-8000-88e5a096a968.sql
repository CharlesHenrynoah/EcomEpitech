-- Ajouter quelques reviews de test pour tester l'affichage des étoiles
INSERT INTO reviews (product_id, rating, comment, created_at) VALUES 
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', 5, 'Produit excellent ! Très bonne qualité et livraison rapide.', now() - interval '2 days'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', 4, 'Bonne qualité, mais un peu cher. Satisfait de mon achat.', now() - interval '5 days'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', 5, 'Parfait ! Exactement ce que je cherchais.', now() - interval '1 week'),
('9d7f690c-0f11-4a47-9539-d81f7c2b040e', 3, 'Correct mais sans plus. La taille est un peu petite.', now() - interval '10 days');