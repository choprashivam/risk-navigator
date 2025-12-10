import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info, XCircle } from 'lucide-react';
import type { RiskDriver } from '@/lib/api';

interface RiskAlertProps {
  driver: RiskDriver;
  className?: string;
}

export function RiskAlert({ driver, className }: RiskAlertProps) {
  const impactConfig = {
    low: {
      icon: Info,
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      badge: 'bg-green-500/20 text-green-400',
    },
    medium: {
      icon: AlertCircle,
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      badge: 'bg-yellow-500/20 text-yellow-400',
    },
    high: {
      icon: AlertTriangle,
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      badge: 'bg-orange-500/20 text-orange-400',
    },
    critical: {
      icon: XCircle,
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      badge: 'bg-red-500/20 text-red-400',
    },
  };

  const config = impactConfig[driver.impact];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02]',
        config.bg,
        config.border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', config.text)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-foreground truncate">{driver.title}</h4>
            <span className={cn('px-2 py-0.5 rounded text-xs font-medium', config.badge)}>
              {driver.impact.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{driver.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">{driver.category}</span>
            <span className={cn('font-mono font-medium', config.text)}>{driver.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
