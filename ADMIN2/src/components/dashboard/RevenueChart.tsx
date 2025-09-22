import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useRevenueChart, TimeFrame } from '@/hooks/useRevenueChart';
import { Euro, TrendingUp } from 'lucide-react';

export const RevenueChart: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');
  const { data, loading, error, fetchRevenueData } = useRevenueChart();

  const timeFrameOptions = [
    { value: 'second' as const, label: '1s', points: 60 },
    { value: 'minute' as const, label: '1m', points: 60 },
    { value: 'hour' as const, label: '1h', points: 24 },
    { value: 'day' as const, label: '1j', points: 30 },
    { value: 'month' as const, label: '1M', points: 12 },
    { value: 'year' as const, label: '1A', points: 5 },
  ];

  useEffect(() => {
    const option = timeFrameOptions.find(opt => opt.value === timeFrame);
    const points = option?.points || 30;
    fetchRevenueData(timeFrame, points);
  }, [timeFrame]);

  // Calculer les statistiques
  const totalRevenue = data.reduce((sum, point) => sum + point.revenue, 0);
  const totalOrders = data.reduce((sum, point) => sum + point.orders, 0);
  const avgRevenuePerOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Calcul du changement par rapport à la période précédente
  const currentPeriodRevenue = data.slice(-Math.ceil(data.length / 2)).reduce((sum, point) => sum + point.revenue, 0);
  const previousPeriodRevenue = data.slice(0, Math.floor(data.length / 2)).reduce((sum, point) => sum + point.revenue, 0);
  const revenueChange = previousPeriodRevenue > 0 ? ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100 : 0;

  return (
    <Card className="p-6 animate-slide-up">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <Euro className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Chiffre d'Affaires</h3>
              <p className="text-sm text-muted-foreground">
                Évolution des revenus en temps réel
              </p>
            </div>
          </div>
          
          {/* Statistiques actuelles */}
          <div className="text-right">
            <div className="text-2xl font-bold">
              {totalRevenue.toFixed(2)}€
            </div>
            <div className={`text-sm flex items-center gap-1 ${
              revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="h-3 w-3" />
              <span>{revenueChange >= 0 ? '+' : ''}{revenueChange.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Time Frame Selector */}
        <div className="flex gap-2 flex-wrap">
          {timeFrameOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeFrame === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFrame(option.value)}
              className="text-xs px-3 py-1"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-80">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-sm text-muted-foreground">Chargement des données...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-sm text-red-500">Erreur: {error}</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor="hsl(142, 76%, 36%)" 
                      stopOpacity={0.3}
                    />
                    <stop 
                      offset="95%" 
                      stopColor="hsl(142, 76%, 36%)" 
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="timestamp" 
                  axisLine={false} 
                  tickLine={false} 
                  className="text-xs text-muted-foreground"
                  interval="preserveStartEnd"
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  className="text-xs text-muted-foreground"
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-md">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-green-600">
                            CA: {data.revenue.toFixed(2)}€
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Commandes: {data.orders}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    stroke: "hsl(142, 76%, 36%)",
                    strokeWidth: 2,
                    fill: "hsl(var(--background))"
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t text-center">
          <div>
            <div className="text-xs text-muted-foreground">Total Commandes</div>
            <div className="font-medium">{totalOrders}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">CA Moyen/Commande</div>
            <div className="font-medium">{avgRevenuePerOrder.toFixed(2)}€</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">CA Total</div>
            <div className="font-medium">{totalRevenue.toFixed(2)}€</div>
          </div>
        </div>
      </div>
    </Card>
  );
};