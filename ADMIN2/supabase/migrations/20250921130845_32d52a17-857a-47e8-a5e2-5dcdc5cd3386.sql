-- Accorder les permissions sur la table categories pour les utilisateurs authentifiés
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.categories TO authenticated;

-- Créer des politiques RLS pour la table categories
DROP POLICY IF EXISTS "p_select_auth" ON public.categories;
DROP POLICY IF EXISTS "p_insert_auth" ON public.categories;
DROP POLICY IF EXISTS "p_update_auth" ON public.categories;
DROP POLICY IF EXISTS "p_delete_auth" ON public.categories;

CREATE POLICY "p_select_auth" ON public.categories
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "p_insert_auth" ON public.categories
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "p_update_auth" ON public.categories
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "p_delete_auth" ON public.categories
FOR DELETE USING (auth.role() = 'authenticated');