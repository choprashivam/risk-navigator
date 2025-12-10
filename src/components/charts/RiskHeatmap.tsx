import { useMemo } from 'react';
import type { HeatmapData } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface RiskHeatmapProps {
  data: HeatmapData[];
  title?: string;
}

function getRiskColor(value: number): string {
  if (value <= 30) return 'bg-green-500/70 hover:bg-green-500';
  if (value <= 50) return 'bg-yellow-500/70 hover:bg-yellow-500';
  if (value <= 70) return 'bg-orange-500/70 hover:bg-orange-500';
  return 'bg-red-500/70 hover:bg-red-500';
}

export function RiskHeatmap({ data, title }: RiskHeatmapProps) {
  const { xLabels, yLabels, matrix } = useMemo(() => {
    const xSet = new Set<string>();
    const ySet = new Set<string>();
    data.forEach(d => {
      xSet.add(d.x);
      ySet.add(d.y);
    });
    
    const xLabels = Array.from(xSet);
    const yLabels = Array.from(ySet);
    
    const matrix: Map<string, number> = new Map();
    data.forEach(d => {
      matrix.set(`${d.x}-${d.y}`, d.value);
    });
    
    return { xLabels, yLabels, matrix };
  }, [data]);

  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>}
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header row */}
          <div className="flex">
            <div className="w-24 shrink-0" />
            {yLabels.map(y => (
              <div key={y} className="w-16 shrink-0 text-center text-xs text-muted-foreground truncate px-1">
                {y}
              </div>
            ))}
          </div>
          
          {/* Data rows */}
          {xLabels.map(x => (
            <div key={x} className="flex items-center mt-1">
              <div className="w-24 shrink-0 text-xs text-muted-foreground truncate pr-2">
                {x}
              </div>
              {yLabels.map(y => {
                const value = matrix.get(`${x}-${y}`) ?? 0;
                return (
                  <Tooltip key={`${x}-${y}`}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          'w-16 h-10 shrink-0 mx-0.5 rounded cursor-pointer transition-all duration-200 heatmap-cell flex items-center justify-center',
                          getRiskColor(value)
                        )}
                      >
                        <span className="text-xs font-mono font-medium text-white/90">
                          {value}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{x} × {y}</p>
                      <p className="text-muted-foreground">Risk Score: {value}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span className="text-xs text-muted-foreground">Low (0-30)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500" />
          <span className="text-xs text-muted-foreground">Medium (31-50)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-orange-500" />
          <span className="text-xs text-muted-foreground">High (51-70)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-xs text-muted-foreground">Critical (71+)</span>
        </div>
      </div>
    </div>
  );
}
