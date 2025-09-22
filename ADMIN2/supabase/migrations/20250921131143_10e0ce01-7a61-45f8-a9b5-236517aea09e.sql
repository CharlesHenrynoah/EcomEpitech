-- Créer un bucket pour les images de catégories
INSERT INTO storage.buckets (id, name, public) VALUES ('category-images', 'category-images', true);

-- Créer les politiques RLS pour le bucket category-images
CREATE POLICY "Authenticated users can upload category images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view category images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'category-images');

CREATE POLICY "Authenticated users can update category images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete category images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);