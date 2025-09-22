import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GenderDistributionItem {
  gender: 'homme' | 'femme' | 'enfant' | 'unisexe' | 'inconnu';
  stock: number;
  ordered: number;
}

export const useGenderDistribution = () => {
  const [data, setData] = useState<GenderDistributionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGenderDistribution = async () => {
    try {
      setLoading(true);
      setError(null);

      // Stock par genre: joindre products -> product_variants et sommer stock
      const { data: stockRows, error: stockError } = await supabase
        .from('product_variants')
        .select('stock, products:products ( gender )');

      if (stockError) throw stockError;

      const stockByGender: Record<string, number> = {};
      (stockRows || []).forEach((row: any) => {
        const g = row.products?.gender || 'inconnu';
        const s = Number(row.stock) || 0;
        stockByGender[g] = (stockByGender[g] || 0) + s;
      });

      // Commandes par genre: joindre order_items -> products et sommer quantity
      const { data: orderRows, error: orderError } = await supabase
        .from('order_items')
        .select('quantity, products:products ( gender )');

      if (orderError) throw orderError;

      const ordersByGender: Record<string, number> = {};
      (orderRows || []).forEach((row: any) => {
        const g = row.products?.gender || 'inconnu';
        const q = Number(row.quantity) || 0;
        ordersByGender[g] = (ordersByGender[g] || 0) + q;
      });

      const genders: Array<GenderDistributionItem['gender']> = ['homme', 'femme', 'enfant', 'unisexe', 'inconnu'];
      const result: GenderDistributionItem[] = genders.map(g => ({
        gender: g,
        stock: stockByGender[g] || 0,
        ordered: ordersByGender[g] || 0,
      }));

      // Ne garder que ceux qui ont des valeurs
      setData(result.filter(item => item.stock > 0 || item.ordered > 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la répartition par genre');
      console.error('Error fetching gender distribution:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchGenderDistribution };
};


