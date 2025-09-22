import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';
import { useStockChart, TimeFrame } from '@/hooks/useStockChart';
import { Package, AlertTriangle } from 'lucide-react';

export const StockChart: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');
  const { data, loading, error, fetchStockData } = useStockChart();

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
    fetchStockData(timeFrame, points);
  }, [timeFrame]);

  // Calculer les statistiques
  const currentStock = data.length > 0 ? data[data.length - 1].totalStock : 0;
  const previousStock = data.length > 1 ? data[data.length - 2].totalStock : currentStock;
  const stockChange = currentStock - previousStock;
  const stockChangePercent = previousStock !== 0 ? (stockChange / previousStock) * 100 : 0;
  const currentLowStock = data.length > 0 ? data[data.length - 1].lowStockProducts : 0;

  return (
    <Card className="p-6 animate-slide-up">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Stock Total</h3>
              <p className="text-sm text-muted-foreground">
                Évolution du stock en temps réel
              </p>
            </div>
          </div>
          
          {/* Stock actuel */}
          <div className="text-right">
            <div className="text-2xl font-bold">
              {currentStock} unités
            </div>
            <div className={`text-sm flex items-center gap-1 ${
              stockChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{stockChange >= 0 ? '↗' : '↘'}</span>
              <span>{Math.abs(stockChange)} ({stockChangePercent.toFixed(1)}%)</span>
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
                  <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor="hsl(270, 91%, 60%)" 
                      stopOpacity={0.3}
                    />
                    <stop 
                      offset="95%" 
                      stopColor="hsl(270, 91%, 60%)" 
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
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-md">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-purple-600">
                            Stock: {data.totalStock} unités
                          </p>
                          <p className="text-sm text-orange-600">
                            Stock bas: {data.lowStockProducts} produits
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="totalStock"
                  stroke="hsl(270, 91%, 60%)"
                  strokeWidth={2}
                  fill="url(#stockGradient)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    stroke: "hsl(270, 91%, 60%)",
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
            <div className="text-xs text-muted-foreground">Stock Actuel</div>
            <div className="font-medium">{currentStock} unités</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Stock Bas</div>
            <div className="font-medium text-orange-600">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              {currentLowStock}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Variation</div>
            <div className={`font-medium ${stockChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stockChange >= 0 ? '+' : ''}{stockChange}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};