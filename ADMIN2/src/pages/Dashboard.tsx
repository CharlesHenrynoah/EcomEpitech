import { Package, AlertTriangle, ShoppingCart, Clock, Plus, Eye, Play, Euro, Users, Download } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { StockChart } from '@/components/dashboard/StockChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDashboard } from '@/hooks/useDashboard';
import { GenderDistributionChart } from '@/components/dashboard/GenderDistributionChart';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
const Dashboard = () => {
  const {
    stats,
    loading,
    error,
    fetchSalesData,
    fetchTopProducts,
    fetchCategoriesDistribution,
    refetch
  } = useDashboard();
  const [salesData, setSalesData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  useEffect(() => {
    const loadChartData = async () => {
      try {
        const [sales, products, categories] = await Promise.all([fetchSalesData(7),
        // Last 7 days
        fetchTopProducts(5), fetchCategoriesDistribution()]);

        // Format sales data for chart
        const formattedSales = sales.map((item, index) => ({
          name: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index] || `J${index + 1}`,
          value: Math.round(item.revenue),
          orders: item.orders
        }));
        setSalesData(formattedSales);

        // Format top products for pie chart
        const totalQuantity = products.reduce((sum, p) => sum + p.total_quantity, 0);
        const colors = ['hsl(var(--primary))', 'hsl(var(--info))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--muted))'];
        const formattedProducts = products.map((product, index) => ({
          name: product.name,
          value: totalQuantity > 0 ? Math.round(product.total_quantity / totalQuantity * 100) : 0,
          quantity: product.total_quantity,
          revenue: product.total_revenue,
          color: colors[index] || 'hsl(var(--muted))'
        }));
        setTopProducts(formattedProducts);
        setCategoriesData(categories);
      } catch (err) {
        console.error('Error loading chart data:', err);
      }
    };
    if (!loading) {
      loadChartData();
    }
    // Realtime: mettre à jour dès qu'une table clé change
    const channel = supabase.channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        refetch();
        loadChartData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, () => {
        loadChartData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        refetch();
        loadChartData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'product_variants' }, () => {
        refetch();
        loadChartData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
        loadChartData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loading, fetchSalesData, fetchTopProducts, fetchCategoriesDistribution]);

  const manualRefresh = async () => {
    refetch();
    try {
      const [sales, products, categories] = await Promise.all([fetchSalesData(7), fetchTopProducts(5), fetchCategoriesDistribution()]);
      const formattedSales = sales.map((item, index) => ({
        name: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index] || `J${index + 1}`,
        value: Math.round(item.revenue),
        orders: item.orders
      }));
      setSalesData(formattedSales);
      const totalQuantity = products.reduce((sum, p) => sum + p.total_quantity, 0);
      const colors = ['hsl(var(--primary))', 'hsl(var(--info))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--muted))'];
      const formattedProducts = products.map((product, index) => ({
        name: product.name,
        value: totalQuantity > 0 ? Math.round(product.total_quantity / totalQuantity * 100) : 0,
        quantity: product.total_quantity,
        revenue: product.total_revenue,
        color: colors[index] || 'hsl(var(--muted))'
      }));
      setTopProducts(formattedProducts);
      setCategoriesData(categories);
    } catch (err) {
      console.error('Error refreshing charts:', err);
    }
  };
  const exportToCSV = () => {
    // Prepare CSV data
    const csvData = [];
    
    // Add headers
    csvData.push(['Type', 'Nom', 'Valeur', 'Détails']);
    
    // Add KPI data
    csvData.push(['KPI', 'Produits Actifs', stats.totalProducts, '']);
    csvData.push(['KPI', 'Stock Bas', stats.lowStockProducts, '']);
    csvData.push(['KPI', 'Commandes Aujourd\'hui', stats.todayOrders, '']);
    csvData.push(['KPI', 'Commandes en Attente', stats.pendingOrders, '']);
    csvData.push(['KPI', 'CA Total', stats.totalRevenue.toFixed(2) + '€', '']);
    csvData.push(['KPI', 'CA ce Mois', stats.monthlyRevenue.toFixed(2) + '€', '']);
    
    // Add sales data
    salesData.forEach(item => {
      csvData.push(['Ventes', item.name, item.value + '€', item.orders + ' commandes']);
    });
    
    // Add top products data
    topProducts.forEach(product => {
      csvData.push(['Produit', product.name, product.value + '%', 'Qté: ' + product.quantity + ', CA: ' + product.revenue + '€']);
    });
    
    // Add categories data
    categoriesData.forEach(category => {
      csvData.push(['Catégorie', category.name, category.value + ' produits', '']);
    });
    
    // Convert to CSV string
    const csvContent = csvData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    // Create and download file
    const dataBlob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  if (loading) {
    return <div className="flex items-center justify-center h-64">
        <div className="text-center">Chargement du dashboard...</div>
      </div>;
  }
  if (error) {
    return <div className="flex items-center justify-center h-64">
        <div className="text-center text-destructive">
          Erreur lors du chargement: {error}
        </div>
      </div>;
  }
  const kpiData = [{
    title: 'Produits Actifs',
    value: stats.totalProducts.toString(),
    change: {
      value: 0,
      type: 'increase' as const
    },
    icon: Package,
    onClick: () => console.log('Navigate to products')
  }, {
    title: 'Stock Bas',
    value: stats.lowStockProducts.toString(),
    change: {
      value: stats.lowStockProducts,
      type: stats.lowStockProducts > 0 ? 'increase' as const : 'decrease' as const
    },
    icon: AlertTriangle,
    onClick: () => console.log('Navigate to low stock')
  }, {
    title: "Commandes Aujourd'hui",
    value: stats.todayOrders.toString(),
    change: {
      value: stats.todayOrders,
      type: 'increase' as const
    },
    icon: ShoppingCart,
    onClick: () => console.log('Navigate to today orders')
  }, {
    title: 'Commandes en Attente',
    value: stats.pendingOrders.toString(),
    change: {
      value: stats.pendingOrders,
      type: stats.pendingOrders > 0 ? 'increase' as const : 'decrease' as const
    },
    icon: Clock,
    onClick: () => console.log('Navigate to pending orders')
  }, {
    title: 'Chiffre d\'Affaire Total',
    value: `${stats.totalRevenue.toFixed(2)}€`,
    change: {
      value: Math.round(stats.totalRevenue),
      type: 'increase' as const
    },
    icon: Euro,
    onClick: () => console.log('Navigate to revenue')
  }, {
    title: 'CA ce Mois',
    value: `${stats.monthlyRevenue.toFixed(2)}€`,
    change: {
      value: Math.round(stats.monthlyRevenue),
      type: 'increase' as const
    },
    icon: Euro,
    onClick: () => console.log('Navigate to monthly revenue')
  }];
  return <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre boutique en ligne
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button onClick={manualRefresh} variant="outline">Actualiser</Button>
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="h-4 w-4" />
            Exporter CSV
          </Button>
        </div>
        
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiData.map((kpi, index) => <div key={kpi.title} className="animate-scale-in" style={{
        animationDelay: `${index * 100}ms`
      }}>
            <KPICard {...kpi} />
          </div>)}
      </div>

      {/* Stock Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart />
        <StockChart />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Sales Chart */}
        <Card className="p-6 animate-slide-up">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Ventes par Jour</h3>
              <p className="text-sm text-muted-foreground">
                Évolution des ventes cette semaine
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs text-muted-foreground" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs text-muted-foreground" />
                  <Tooltip content={({
                  active,
                  payload,
                  label
                }) => {
                  if (active && payload && payload.length) {
                    return <div className="rounded-lg border bg-background p-3 shadow-md">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-primary">
                              {payload[0].value}€ de ventes
                            </p>
                          </div>;
                  }
                  return null;
                }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{
                  fill: 'hsl(var(--primary))',
                  strokeWidth: 2,
                  r: 4
                }} activeDot={{
                  r: 6,
                  stroke: 'hsl(var(--primary))',
                  strokeWidth: 2
                }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Top Products Chart */}
        <Card className="p-6 animate-slide-up" style={{
        animationDelay: '200ms'
      }}>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Top Produits</h3>
              <p className="text-sm text-muted-foreground">
                Répartition des ventes par produit
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topProducts} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
                    {topProducts.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={({
                  active,
                  payload
                }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return <div className="rounded-lg border bg-background p-3 shadow-md">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.value}% des ventes
                            </p>
                          </div>;
                  }
                  return null;
                }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {topProducts.map((product, index) => <div key={index} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{
                backgroundColor: product.color
              }} />
                  <span className="text-muted-foreground">{product.name}</span>
                </div>)}
            </div>
          </div>
        </Card>

        {/* Categories Distribution Chart */}
        <Card className="p-6 animate-slide-up" style={{
        animationDelay: '400ms'
      }}>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Répartition des Catégories</h3>
              <p className="text-sm text-muted-foreground">
                Nombre de produits par catégorie
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoriesData} margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60
              }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs text-muted-foreground" angle={-45} textAnchor="end" height={80} />
                  <YAxis axisLine={false} tickLine={false} className="text-xs text-muted-foreground" />
                  <Tooltip content={({
                  active,
                  payload,
                  label
                }) => {
                  if (active && payload && payload.length) {
                    const value = Number(payload[0].value) || 0;
                    return <div className="rounded-lg border bg-background p-3 shadow-md">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-primary">
                              {value} produit{value > 1 ? 's' : ''}
                            </p>
                          </div>;
                  }
                  return null;
                }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Gender Distribution Chart */}
        <GenderDistributionChart />
      </div>
    </div>;
};
export default Dashboard;