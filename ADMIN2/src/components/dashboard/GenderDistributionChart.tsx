import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useGenderDistribution } from '@/hooks/useGenderDistribution';

export const GenderDistributionChart: React.FC = () => {
  const { data, loading, error, fetchGenderDistribution } = useGenderDistribution();

  useEffect(() => {
    fetchGenderDistribution();
  }, []);

  const chartData = data.map(item => ({
    name: item.gender.charAt(0).toUpperCase() + item.gender.slice(1),
    Stock: item.stock,
    Commandes: item.ordered,
  }));

  return (
    <Card className="p-6 animate-slide-up">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Répartition par Genre</h3>
          <p className="text-sm text-muted-foreground">Stock et quantités commandées</p>
        </div>

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
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs text-muted-foreground" />
                <YAxis axisLine={false} tickLine={false} className="text-xs text-muted-foreground" />
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const stock = Number(payload.find(p => p.dataKey === 'Stock')?.value || 0);
                    const ordered = Number(payload.find(p => p.dataKey === 'Commandes')?.value || 0);
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-md">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-primary">Stock: {stock}</p>
                        <p className="text-sm text-green-600">Commandes: {ordered}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Legend />
                <Bar dataKey="Stock" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Commandes" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </Card>
  );
};


