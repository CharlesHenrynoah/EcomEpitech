-- Create table for legal documents (mentions légales, RGPD, CGU, CGV)
CREATE TABLE public.legal_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_type TEXT NOT NULL, -- 'mentions_legales', 'rgpd', 'cgu', 'cgv'
  title TEXT NOT NULL,
  content TEXT,
  last_updated_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;

-- Everyone can read legal documents
CREATE POLICY "Everyone can read legal documents" 
ON public.legal_documents 
FOR SELECT 
USING (true);

-- Only real admins can manage legal documents
CREATE POLICY "Real admin can manage legal documents" 
ON public.legal_documents 
FOR ALL 
USING (is_real_admin());

-- Add trigger for updated_at
CREATE TRIGGER update_legal_documents_updated_at
BEFORE UPDATE ON public.legal_documents
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Insert default legal documents
INSERT INTO public.legal_documents (document_type, title, content, last_updated_by) VALUES
('mentions_legales', 'Mentions Légales', 'Contenu des mentions légales à compléter...', '00000000-0000-0000-0000-000000000000'),
('rgpd', 'Politique de Confidentialité (RGPD)', 'Contenu de la politique RGPD à compléter...', '00000000-0000-0000-0000-000000000000'),
('cgu', 'Conditions Générales d''Utilisation', 'Contenu des CGU à compléter...', '00000000-0000-0000-0000-000000000000'),
('cgv', 'Conditions Générales de Vente', 'Contenu des CGV à compléter...', '00000000-0000-0000-0000-000000000000');