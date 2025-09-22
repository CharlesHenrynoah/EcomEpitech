import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, subHours, subMinutes, subSeconds, subMonths, subYears, startOfDay, startOfHour, startOfMinute, startOfSecond, startOfMonth, startOfYear } from 'date-fns';
import { fr } from 'date-fns/locale';

export type TimeFrame = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

interface RevenueDataPoint {
  timestamp: string;
  revenue: number;
  orders: number;
  period: Date;
}

export const useRevenueChart = () => {
  const [data, setData] = useState<RevenueDataPoint[]>([]);
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

  const groupDataByTimeFrame = (orders: any[], timeFrame: TimeFrame, points: number): RevenueDataPoint[] => {
    const { startDate, endDate } = getDateRange(timeFrame, points);
    const grouped: Record<string, { revenue: number; orders: number; period: Date }> = {};

    // Initialiser tous les intervalles avec des valeurs à 0
    for (let i = 0; i < points; i++) {
      let periodStart: Date;
      
      switch (timeFrame) {
        case 'second':
          periodStart = subSeconds(endDate, points - 1 - i);
          periodStart = startOfSecond(periodStart);
          break;
        case 'minute':
          periodStart = subMinutes(endDate, points - 1 - i);
          periodStart = startOfMinute(periodStart);
          break;
        case 'hour':
          periodStart = subHours(endDate, points - 1 - i);
          periodStart = startOfHour(periodStart);
          break;
        case 'day':
          periodStart = subDays(endDate, points - 1 - i);
          periodStart = startOfDay(periodStart);
          break;
        case 'month':
          periodStart = subMonths(endDate, points - 1 - i);
          periodStart = startOfMonth(periodStart);
          break;
        case 'year':
          periodStart = subYears(endDate, points - 1 - i);
          periodStart = startOfYear(periodStart);
          break;
        default:
          periodStart = subDays(endDate, points - 1 - i);
          periodStart = startOfDay(periodStart);
      }

      const key = getTimestampKey(periodStart, timeFrame);
      grouped[key] = { revenue: 0, orders: 0, period: periodStart };
    }

    // Ajouter les vraies données
    orders.forEach(order => {
      const orderDate = new Date(order.created_at);
      let periodStart: Date;

      switch (timeFrame) {
        case 'second':
          periodStart = startOfSecond(orderDate);
          break;
        case 'minute':
          periodStart = startOfMinute(orderDate);
          break;
        case 'hour':
          periodStart = startOfHour(orderDate);
          break;
        case 'day':
          periodStart = startOfDay(orderDate);
          break;
        case 'month':
          periodStart = startOfMonth(orderDate);
          break;
        case 'year':
          periodStart = startOfYear(orderDate);
          break;
        default:
          periodStart = startOfDay(orderDate);
      }

      const key = getTimestampKey(periodStart, timeFrame);
      if (grouped[key]) {
        grouped[key].revenue += parseFloat(order.total_amount) || 0;
        grouped[key].orders += 1;
      }
    });

    return Object.entries(grouped)
      .map(([key, data]) => ({
        timestamp: getFormattedTimestamp(data.period, timeFrame),
        revenue: Math.round(data.revenue * 100) / 100,
        orders: data.orders,
        period: data.period
      }))
      .sort((a, b) => a.period.getTime() - b.period.getTime());
  };

  const getTimestampKey = (date: Date, timeFrame: TimeFrame): string => {
    switch (timeFrame) {
      case 'second':
        return format(date, 'yyyy-MM-dd HH:mm:ss');
      case 'minute':
        return format(date, 'yyyy-MM-dd HH:mm');
      case 'hour':
        return format(date, 'yyyy-MM-dd HH');
      case 'day':
        return format(date, 'yyyy-MM-dd');
      case 'month':
        return format(date, 'yyyy-MM');
      case 'year':
        return format(date, 'yyyy');
      default:
        return format(date, 'yyyy-MM-dd');
    }
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

  const fetchRevenueData = async (timeFrame: TimeFrame, points: number = 30) => {
    try {
      setLoading(true);
      setError(null);

      const { startDate } = getDateRange(timeFrame, points);

      const { data: orders, error } = await supabase
        .from('orders')
        .select('created_at, total_amount, status')
        .gte('created_at', startDate.toISOString())
        .in('status', ['confirmed', 'shipped', 'delivered'])
        .order('created_at', { ascending: true });

      if (error) throw error;

      const groupedData = groupDataByTimeFrame(orders || [], timeFrame, points);
      setData(groupedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données de revenus');
      console.error('Error fetching revenue data:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchRevenueData,
  };
};