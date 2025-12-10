import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import type { EntityRisk } from '@/lib/api';
import { RiskGauge } from '@/components/charts/RiskGauge';

interface EntityCardProps {
  entity: EntityRisk;
  onClick?: () => void;
  className?: string;
}

export function EntityCard({ entity, onClick, className }: EntityCardProps) {
  const TrendIcon = entity.riskScore.trend === 'up' 
    ? TrendingUp 
    : entity.riskScore.trend === 'down' 
      ? TrendingDown 
      : Minus;
  
  const trendColor = entity.riskScore.trend === 'up' 
    ? 'text-red-400' 
    : entity.riskScore.trend === 'down' 
      ? 'text-green-400' 
      : 'text-muted-foreground';

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card p-6 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:glow-primary group',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{entity.name}</h3>
          <p className="text-sm text-muted-foreground capitalize">{entity.type.replace('_', ' ')}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      <div className="flex items-center gap-6">
        <RiskGauge score={entity.riskScore.total} size="sm" showLabel={false} animated={false} />
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Capacity</span>
            <span className="text-xs font-mono">{entity.riskScore.subscores.capacity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Concentration</span>
            <span className="text-xs font-mono">{entity.riskScore.subscores.concentration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Delivery</span>
            <span className="text-xs font-mono">{entity.riskScore.subscores.delivery}</span>
          </div>
        </div>
      </div>

      <div className={cn('flex items-center gap-1 mt-4 pt-4 border-t border-border/50', trendColor)}>
        <TrendIcon className="h-4 w-4" />
        <span className="text-sm font-medium">
          {entity.riskScore.delta > 0 ? '+' : ''}{entity.riskScore.delta}
        </span>
        <span className="text-xs text-muted-foreground ml-1">vs last period</span>
      </div>

      {entity.drivers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">{entity.drivers.length} active risk driver(s)</p>
          <p className="text-xs text-foreground truncate">{entity.drivers[0]?.title}</p>
        </div>
      )}
    </div>
  );
}
