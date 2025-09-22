-- Migration pour ajouter brand et model_name à la table products
-- Étape 1: Ajouter les nouvelles colonnes
ALTER TABLE public.products 
ADD COLUMN brand TEXT,
ADD COLUMN model_name TEXT;

-- Étape 2: Migrer les données existantes - diviser le nom actuel
-- On met une valeur par défaut pour brand et on copie name vers model_name
UPDATE public.products 
SET brand = 'Marque inconnue',
    model_name = name
WHERE brand IS NULL OR model_name IS NULL;

-- Étape 3: Rendre les nouvelles colonnes NOT NULL maintenant qu'elles ont des valeurs
ALTER TABLE public.products 
ALTER COLUMN brand SET NOT NULL,
ALTER COLUMN model_name SET NOT NULL;

-- Étape 4: Supprimer l'ancienne colonne name
ALTER TABLE public.products 
DROP COLUMN name;

-- Étape 5: Ajouter des contraintes par défaut pour les futures insertions
ALTER TABLE public.products 
ALTER COLUMN brand SET DEFAULT 'Marque inconnue';

-- Mettre à jour le trigger de log pour utiliser model_name au lieu de name
CREATE OR REPLACE FUNCTION public.log_product_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM public.log_audit_action(
      'product_created',
      NEW.brand || ' ' || NEW.model_name,
      'Nouveau produit créé avec prix ' || NEW.price || '€',
      'info'
    );
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Log price changes
    IF OLD.price != NEW.price THEN
      PERFORM public.log_audit_action(
        'price_updated',
        NEW.brand || ' ' || NEW.model_name,
        'Prix modifié: ' || OLD.price || '€ → ' || NEW.price || '€',
        'warning'
      );
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM public.log_audit_action(
      'product_deleted',
      OLD.brand || ' ' || OLD.model_name,
      'Produit supprimé définitivement',
      'critical'
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;