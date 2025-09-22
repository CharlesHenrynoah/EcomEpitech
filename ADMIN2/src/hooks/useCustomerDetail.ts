import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Customer, Order, Cart, CartItem, OrderItem } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

interface ProductInfo {
  id: string;
  brand: string;
  model_name: string;
  price: number;
}

interface VariantInfo {
  id: string;
  size: string;
}

export interface CustomerDetail extends Customer {
  orders: (Order & { 
    items: (OrderItem & { 
      product: ProductInfo; 
      variant?: VariantInfo 
    })[] 
  })[];
  activeCart?: Cart & { 
    items: (CartItem & { 
      product: ProductInfo; 
      variant?: VariantInfo 
    })[] 
  };
  stats: {
    totalOrders: number;
    totalSpent: number;
    lastOrderDate?: string;
  };
}

export interface CustomerGDPRData {
  consentCookies: boolean;
  consentMarketing: boolean;
  dataExported?: string;
  dataRectified?: string;
  dataDeleted?: string;
}

export const useCustomerDetail = (customerId: string) => {
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [gdprData, setGdprData] = useState<CustomerGDPRData>({
    consentCookies: false,
    consentMarketing: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCustomerDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch customer basic info - this is critical and must succeed
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single();

      if (customerError) throw customerError;

      // Initialize default values
      let ordersData: any[] = [];
      let cartsData: any = null;

      // Fetch orders with items and products - non-critical, allow to fail gracefully
      try {
        const { data, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items(
              *,
              product:products(id, brand, model_name, price),
              variant:product_variants(id, size)
            )
          `)
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false });

        if (!ordersError && data) {
          ordersData = data;
        } else if (ordersError) {
          console.warn('Erreur lors du chargement des commandes:', ordersError);
        }
      } catch (err) {
        console.warn('Erreur lors du chargement des commandes:', err);
      }

      // Fetch active cart - non-critical, allow to fail gracefully
      try {
        const { data, error: cartsError } = await supabase
          .from('carts')
          .select(`
            *,
            items:cart_items(
              *,
              product:products(id, brand, model_name, price),
              variant:product_variants(id, size)
            )
          `)
          .eq('customer_id', customerId)
          .eq('status', 'open')
          .maybeSingle();

        if (!cartsError && data) {
          cartsData = data;
        } else if (cartsError) {
          console.warn('Erreur lors du chargement du panier:', cartsError);
        }
      } catch (err) {
        console.warn('Erreur lors du chargement du panier:', err);
      }

      // Calculate stats
      const totalOrders = ordersData?.length || 0;
      const totalSpent = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const lastOrderDate = ordersData?.[0]?.created_at;

      const customerDetail: CustomerDetail = {
        ...customerData,
        orders: (ordersData || []) as CustomerDetail['orders'],
        activeCart: cartsData as CustomerDetail['activeCart'],
        stats: {
          totalOrders,
          totalSpent,
          lastOrderDate,
        },
      };

      setCustomer(customerDetail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des détails client');
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du client",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (updates: Partial<Customer>) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', customerId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Client mis à jour",
      });

      fetchCustomerDetail();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le client",
        variant: "destructive",
      });
      throw err;
    }
  };

  const exportCustomerData = async (): Promise<string> => {
    try {
      if (!customer) throw new Error('Aucun client chargé');

      const exportData = {
        personalData: {
          id: customer.id,
          email: customer.email,
          firstName: customer.first_name,
          lastName: customer.last_name,
          phone: customer.phone,
          createdAt: customer.created_at,
        },
        orders: customer.orders.map(order => ({
          id: order.id,
          date: order.created_at,
          status: order.status,
          paymentStatus: order.payment_status,
          totalAmount: order.total_amount,
          items: order.items.map(item => ({
            product: `${item.product.brand} ${item.product.model_name}`,
            variant: item.variant?.size,
            quantity: item.quantity,
            unitPrice: item.unit_price,
          })),
        })),
        activeCart: customer.activeCart ? {
          items: customer.activeCart.items.map(item => ({
            product: `${item.product.brand} ${item.product.model_name}`,
            variant: item.variant?.size,
            quantity: item.quantity,
          })),
        } : null,
        gdprData,
        exportedAt: new Date().toISOString(),
      };

      const jsonData = JSON.stringify(exportData, null, 2);
      
      // Update GDPR data
      setGdprData(prev => ({
        ...prev,
        dataExported: new Date().toISOString(),
      }));

      toast({
        title: "Export réussi",
        description: "Données exportées avec succès",
      });

      return jsonData;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible d'exporter les données",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteCustomerData = async () => {
    try {
      // Use the database function to delete customer and all related data
      const { error } = await supabase.rpc('delete_customer_cascade', {
        p_customer_id: customerId
      });

      if (error) {
        console.error('Erreur lors de la suppression du client:', error);
        throw error;
      }

      // Update GDPR data
      setGdprData(prev => ({
        ...prev,
        dataDeleted: new Date().toISOString(),
      }));

      toast({
        title: "Suppression réussie",
        description: "Toutes les données du client ont été supprimées définitivement",
      });

      return true;
    } catch (err) {
      console.error('Erreur complète lors de la suppression:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      
      toast({
        title: "Erreur de suppression",
        description: `Impossible de supprimer les données: ${errorMessage}`,
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateGDPRConsent = async (type: 'cookies' | 'marketing', consent: boolean) => {
    try {
      setGdprData(prev => ({
        ...prev,
        [`consent${type.charAt(0).toUpperCase() + type.slice(1)}`]: consent,
      }));

      toast({
        title: "Consentement mis à jour",
        description: `Consentement ${type} ${consent ? 'accordé' : 'retiré'}`,
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le consentement",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchCustomerDetail();
    }
  }, [customerId]);

  return {
    customer,
    gdprData,
    loading,
    error,
    refetch: fetchCustomerDetail,
    updateCustomer,
    exportCustomerData,
    deleteCustomerData,
    updateGDPRConsent,
  };
};