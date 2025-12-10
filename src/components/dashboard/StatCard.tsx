import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon?: LucideIcon;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function StatCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  className,
  variant = 'default' 
}: StatCardProps) {
  const variantStyles = {
    default: 'border-border/50',
    success: 'border-green-500/30 glow-success',
    warning: 'border-yellow-500/30 glow-warning',
    danger: 'border-red-500/30 glow-danger',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-green-400' : 'text-muted-foreground';

  return (
    <div className={cn('stat-card', variantStyles[variant], className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-mono mt-1">{value}</p>
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
      
      {(change !== undefined || trend) && (
        <div className={cn('flex items-center gap-1 mt-3', trendColor)}>
          <TrendIcon className="h-4 w-4" />
          {change !== undefined && (
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{change}
            </span>
          )}
          <span className="text-xs text-muted-foreground ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
}
