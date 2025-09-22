import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, subHours, subMinutes, subSeconds, subMonths, subYears } from 'date-fns';
import { fr } from 'date-fns/locale';

export type TimeFrame = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

interface StockDataPoint {
  timestamp: string;
  totalStock: number;
  lowStockProducts: number;
  period: Date;
}

export const useStockChart = () => {
  const [data, setData] = useState<StockDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDateRange = (timeFrame: TimeFrame, points: number) => {
    const now = new Date();
    let startDate: Date;

    switch (timeFrame) {
      case 'second':
        startDate = subSeconds(now, points);
        break;
      case 'minute':
        startDate = subMinutes(now, points);
        break;
      case 'hour':
        startDate = subHours(now, points);
        break;
      case 'day':
        startDate = subDays(now, points);
        break;
      case 'month':
        startDate = subMonths(now, points);
        break;
      case 'year':
        startDate = subYears(now, points);
        break;
      default:
        startDate = subDays(now, points);
    }

    return { startDate, endDate: now };
  };

  const getFormattedTimestamp = (date: Date, timeFrame: TimeFrame): string => {
    switch (timeFrame) {
      case 'second':
        return format(date, 'HH:mm:ss', { locale: fr });
      case 'minute':
        return format(date, 'HH:mm', { locale: fr });
      case 'hour':
        return format(date, 'HH:mm', { locale: fr });
      case 'day':
        return format(date, 'dd/MM', { locale: fr });
      case 'month':
        return format(date, 'MMM yy', { locale: fr });
      case 'year':
        return format(date, 'yyyy', { locale: fr });
      default:
        return format(date, 'dd/MM', { locale: fr });
    }
  };

  const generateStockHistory = (currentStock: number, timeFrame: TimeFrame, points: number): StockDataPoint[] => {
    const data: StockDataPoint[] = [];
    const now = new Date();
    
    // Simuler une évolution du stock basée sur les données actuelles
    let baseStock = currentStock;
    
    for (let i = points - 1; i >= 0; i--) {
      let timestamp = now;
      
      switch (timeFrame) {
        case 'second':
          timestamp = subSeconds(now, i);
          break;
        case 'minute':
          timestamp = subMinutes(now, i);
          break;
        case 'hour':
          timestamp = subHours(now, i);
          break;
        case 'day':
          timestamp = subDays(now, i);
          break;
        case 'month':
          timestamp = subMonths(now, i);
          break;
        case 'year':
          timestamp = subYears(now, i);
          break;
      }

      // Variation aléatoire du stock basée sur la période
      if (i < points - 1) {
        const variation = Math.floor(Math.random() * 20) - 10; // +/- 10 unités
        baseStock = Math.max(0, baseStock + variation);
      }

      const lowStockProducts = Math.floor(baseStock * 0.1); // 10% en stock bas

      data.push({
        timestamp: getFormattedTimestamp(timestamp, timeFrame),
        totalStock: baseStock,
        lowStockProducts,
        period: timestamp,
      });
    }
    
    return data;
  };

  const fetchStockData = async (timeFrame: TimeFrame, points: number = 30) => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer le stock total actuel
      const { data: variants, error } = await supabase
        .from('product_variants')
        .select('stock');

      if (error) throw error;

      const totalCurrentStock = variants?.reduce((sum, variant) => sum + (variant.stock || 0), 0) || 0;
      
      // Générer l'historique du stock
      const stockHistory = generateStockHistory(totalCurrentStock, timeFrame, points);
      setData(stockHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données de stock');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchStockData,
  };
};