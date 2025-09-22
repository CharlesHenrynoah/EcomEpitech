import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  onClick?: () => void;
}

export function KPICard({ title, value, change, icon: Icon, onClick }: KPICardProps) {
  const changeColor = change.type === 'increase' ? 'text-success' : 'text-destructive';
  const changeSymbol = change.type === 'increase' ? '+' : '-';

  return (
    <Card className="kpi-card" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <div className="space-y-1">
            <p className="text-2xl font-bold tracking-tight">
              {value}
            </p>
            <p className={`text-xs font-medium ${changeColor}`}>
              {changeSymbol}{Math.abs(change.value)}% vs mois dernier
            </p>
          </div>
        </div>
        <div className="rounded-full bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  );
}