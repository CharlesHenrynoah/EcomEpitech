import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DashboardStats } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockProducts: 0,
    todayOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Execute all queries in parallel for better performance
      const [
        productsResult,
        lowStockResult,
        todayOrdersResult,
        pendingOrdersResult,
        revenueResult,
        monthlyRevenueResult
      ] = await Promise.allSettled([
        // Total products
        supabase.from('products').select('*', { count: 'exact', head: true }),
        
        // Low stock products (stock <= 10 or no variants)
        supabase.from('product_variants').select('product_id, stock'),
        
        // Today's orders
        supabase.from('orders').select('*', { count: 'exact', head: true })
          .gte('created_at', new Date().toISOString().split('T')[0]),
        
        // Pending orders
        supabase.from('orders').select('*', { count: 'exact', head: true })
          .eq('status', 'pending'),
        
        // Total revenue (from completed orders)
        supabase.from('orders').select('total_amount')
          .in('status', ['confirmed', 'shipped', 'delivered']),
        
        // Monthly revenue
        supabase.from('orders').select('total_amount')
          .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
          .in('status', ['confirmed', 'shipped', 'delivered'])
      ]);

      // Process results safely
      const totalProducts = productsResult.status === 'fulfilled' ? (productsResult.value.count || 0) : 0;
      
      let lowStockProducts = 0;
      if (lowStockResult.status === 'fulfilled' && lowStockResult.value.data) {
        const stockData = lowStockResult.value.data;
        // Group by product_id and find minimum stock per product
        const productStocks = stockData.reduce((acc: Record<string, number>, variant: any) => {
          const productId = variant.product_id;
          const stock = variant.stock || 0;
          if (!acc[productId] || acc[productId] > stock) {
            acc[productId] = stock;
          }
          return acc;
        }, {});
        
        // Count products with stock <= 10
        lowStockProducts = Object.values(productStocks).filter(stock => stock <= 10).length;
        
        // Also count products without any variants as low stock
        const productsWithVariants = new Set(Object.keys(productStocks));
        const productsWithoutVariants = totalProducts - productsWithVariants.size;
        lowStockProducts += productsWithoutVariants;
      }

      const todayOrders = todayOrdersResult.status === 'fulfilled' ? (todayOrdersResult.value.count || 0) : 0;
      const pendingOrders = pendingOrdersResult.status === 'fulfilled' ? (pendingOrdersResult.value.count || 0) : 0;
      
      const totalRevenue = revenueResult.status === 'fulfilled' && revenueResult.value.data 
        ? revenueResult.value.data.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) 
        : 0;
      
      const monthlyRevenue = monthlyRevenueResult.status === 'fulfilled' && monthlyRevenueResult.value.data
        ? monthlyRevenueResult.value.data.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0)
        : 0;

      setStats({
        totalProducts,
        lowStockProducts,
        todayOrders,
        pendingOrders,
        totalRevenue,
        monthlyRevenue,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des statistiques');
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques du dashboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch sales data for charts
  const fetchSalesData = async (days: number = 30) => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const { data, error } = await supabase
        .from('orders')
        .select('created_at, total_amount')
        .gte('created_at', startDate.toISOString())
        .in('status', ['confirmed', 'shipped', 'delivered'])
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Group by date
      const salesByDate = data.reduce((acc, order) => {
        const date = order.created_at.split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, revenue: 0, orders: 0 };
        }
        acc[date].revenue += order.total_amount;
        acc[date].orders += 1;
        return acc;
      }, {} as Record<string, { date: string; revenue: number; orders: number }>);

      return Object.values(salesByDate);
    } catch (err) {
      console.error('Error fetching sales data:', err);
      return [];
    }
  };

  // Fetch top products
  const fetchTopProducts = async (limit: number = 10) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select(`
          product_id,
          quantity,
          product:products(brand, model_name, price)
        `);

      if (error) throw error;

      // Group by product and sum quantities
      const productSales = data.reduce((acc, item) => {
        const productId = item.product_id;
        if (!acc[productId]) {
          acc[productId] = {
            product_id: productId,
            name: `${item.product?.brand || ''} ${item.product?.model_name || ''}`.trim() || 'Produit inconnu',
            price: item.product?.price || 0,
            total_quantity: 0,
            total_revenue: 0,
          };
        }
        acc[productId].total_quantity += item.quantity;
        acc[productId].total_revenue += item.quantity * (item.product?.price || 0);
        return acc;
      }, {} as Record<string, any>);

      return Object.values(productSales)
        .sort((a, b) => b.total_quantity - a.total_quantity)
        .slice(0, limit);
    } catch (err) {
      console.error('Error fetching top products:', err);
      return [];
    }
  };

  // Fetch categories distribution
  const fetchCategoriesDistribution = async () => {
    try {
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name');

      if (categoriesError) throw categoriesError;

      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('category_id');

      if (productsError) throw productsError;

      // Count products by category
      const productsByCategory = products.reduce((acc, product) => {
        const categoryId = product.category_id;
        acc[categoryId] = (acc[categoryId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Map categories with product counts
      const distribution = categories.map(category => ({
        name: category.name,
        value: productsByCategory[category.id] || 0,
        categoryId: category.id
      }));

      return distribution.sort((a, b) => b.value - a.value);
    } catch (err) {
      console.error('Error fetching categories distribution:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchDashboardStats,
    fetchSalesData,
    fetchTopProducts,
    fetchCategoriesDistribution,
  };
};