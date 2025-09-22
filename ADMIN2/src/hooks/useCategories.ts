import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, CategoryInsert, CategoryUpdate } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useCategories = () => {
  const [categories, setCategories] = useState<(Category & { product_count?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories with product count
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          product_count:products(count)
        `)
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Transform the data to extract the count from the nested structure
      const categoriesWithCount = data?.map(category => ({
        ...category,
        product_count: category.product_count?.[0]?.count || 0
      })) || [];
      
      setCategories(categoriesWithCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des catégories');
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData: CategoryInsert) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert(categoryData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Catégorie créée avec succès",
      });

      fetchCategories();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la catégorie",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateCategory = async (id: string, categoryData: CategoryUpdate) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Catégorie modifiée avec succès",
      });

      fetchCategories();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la catégorie",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès",
      });

      fetchCategories();
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};