-- Insérer les documents légaux de base s'ils n'existent pas déjà
INSERT INTO public.legal_documents (document_type, title, content, last_updated_by)
SELECT 
  document_type,
  title,
  content,
  (SELECT id FROM auth.users WHERE email = 'admin1@yopmail.com' LIMIT 1)
FROM (
  VALUES 
    ('mentions', 'Mentions Légales', 'Contenu des mentions légales à personnaliser...'),
    ('privacy', 'Politique de Confidentialité', 'Contenu de la politique de confidentialité à personnaliser...'),
    ('cookies', 'Politique des Cookies', 'Contenu de la politique des cookies à personnaliser...'),
    ('terms', 'Conditions Générales d''Utilisation', 'Contenu des CGU à personnaliser...'),
    ('dpo', 'Contact DPO', 'Informations de contact du Délégué à la Protection des Données...')
) AS new_docs(document_type, title, content)
WHERE NOT EXISTS (
  SELECT 1 FROM public.legal_documents 
  WHERE legal_documents.document_type = new_docs.document_type
);