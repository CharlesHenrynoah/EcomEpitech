import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderInsert, OrderUpdate, OrderFilters } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useOrders = (filters?: OrderFilters) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('orders')
        .select(`
          *,
          customer:customers(*),
          cart:carts(*),
          items:order_items(
            *,
            product:products(*),
            variant:product_variants(*)
          )
        `);

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.payment_status) {
        query = query.eq('payment_status', filters.payment_status);
      }
      
      if (filters?.customer_id) {
        query = query.eq('customer_id', filters.customer_id);
      }
      
      if (filters?.date_from) {
        query = query.gte('created_at', filters.date_from);
      }
      
      if (filters?.date_to) {
        query = query.lte('created_at', filters.date_to);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data as Order[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des commandes');
      toast({
        title: "Erreur",
        description: "Impossible de charger les commandes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Statut de la commande mis à jour",
      });

      fetchOrders();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updatePaymentStatus = async (id: string, payment_status: Order['payment_status']) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ payment_status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Statut de paiement mis à jour",
      });

      fetchOrders();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le paiement",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    updateOrderStatus,
    updatePaymentStatus,
  };
};

export const useOrder = (id: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            customer:customers(*),
            cart:carts(*),
            items:order_items(
              *,
              product:products(*),
              variant:product_variants(*)
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setOrder(data as Order);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la commande');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  return { order, loading, error };
};