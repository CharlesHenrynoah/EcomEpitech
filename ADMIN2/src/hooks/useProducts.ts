import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product, ProductInsert, ProductUpdate, ProductFilters } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useProducts = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const lastErrorRef = useRef<string | null>(null);
  const filtersRef = useRef<ProductFilters | undefined>();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          variants:product_variants(*),
          images:product_images(*),
          reviews:reviews(*)
        `);

      // Apply filters
      if (filters?.search) {
        query = query.or(`brand.ilike.%${filters.search}%,model_name.ilike.%${filters.search}%`);
      }
      
      if (filters?.category_id) {
        query = query.eq('category_id', filters.category_id);
      }
      
      if (filters?.gender) {
        query = query.eq('gender', filters.gender);
      }
      
      if (filters?.min_price) {
        query = query.gte('price', filters.min_price);
      }
      
      if (filters?.max_price) {
        query = query.lte('price', filters.max_price);
      }

      if (filters?.in_stock) {
        query = query.gt('variants.stock', 0);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data as Product[]);
      lastErrorRef.current = null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des produits';
      setError(errorMessage);
      
      // Only show toast if it's a different error or first time
      if (lastErrorRef.current !== errorMessage) {
        lastErrorRef.current = errorMessage;
        // Don't show permission errors as toasts - they're handled at RLS level
        if (!errorMessage.includes('permission denied')) {
          toast({
            title: "Erreur",
            description: "Impossible de charger les produits",
            variant: "destructive",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  }, [filters, toast]);

  const createProduct = async (productData: ProductInsert) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Produit créé avec succès",
      });

      fetchProducts();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le produit",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateProduct = async (id: string, productData: ProductUpdate) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Produit modifié avec succès",
      });

      fetchProducts();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le produit",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Produit supprimé avec succès",
      });

      fetchProducts();
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    // Initial load or when filters change
    if (!filtersRef.current) {
      filtersRef.current = filters;
      fetchProducts();
    } else {
      // Deep compare filters to avoid unnecessary calls
      const filtersChanged = JSON.stringify(filtersRef.current) !== JSON.stringify(filters);
      if (filtersChanged) {
        filtersRef.current = filters;
        fetchProducts();
      }
    }
  }, [fetchProducts, filters]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(*),
            variants:product_variants(*),
            images:product_images(*),
            reviews:reviews(*)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data as Product);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du produit');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};