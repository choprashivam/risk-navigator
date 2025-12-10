import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import type { SimulationResult } from '@/lib/api';
import { ComparisonChart } from '@/components/charts/ComparisonChart';
import { RiskGauge } from '@/components/charts/RiskGauge';

interface SimulatorResultProps {
  result: SimulationResult;
}

export function SimulatorResult({ result }: SimulatorResultProps) {
  const deltaColor = result.delta > 0 ? 'text-red-400' : result.delta < 0 ? 'text-green-400' : 'text-muted-foreground';
  const DeltaIcon = result.delta > 0 ? ArrowUp : result.delta < 0 ? ArrowDown : Minus;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Score Comparison */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Previous Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <RiskGauge score={result.previousScore} size="sm" animated={false} />
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          'glass-card border-2',
          result.delta > 0 ? 'border-red-500/30' : result.delta < 0 ? 'border-green-500/30' : 'border-border/50'
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <DeltaIcon className={cn('h-12 w-12 mb-2', deltaColor)} />
              <span className={cn('text-4xl font-bold font-mono', deltaColor)}>
                {result.delta > 0 ? '+' : ''}{result.delta}
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                {result.delta > 0 ? 'Risk Increased' : result.delta < 0 ? 'Risk Decreased' : 'No Change'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">New Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <RiskGauge score={result.newScore} size="sm" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Chart */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Before / After Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ComparisonChart result={result} />
        </CardContent>
      </Card>

      {/* Subscore Changes */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Dimension Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(result.subscoreChanges).map(([key, value]) => {
              const label = key === 'strategicAlignment' ? 'Strategic' : key.charAt(0).toUpperCase() + key.slice(1);
              const color = value > 0 ? 'text-red-400' : value < 0 ? 'text-green-400' : 'text-muted-foreground';
              const Icon = value > 0 ? TrendingUp : value < 0 ? TrendingDown : Minus;
              
              return (
                <div key={key} className="text-center p-4 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">{label}</p>
                  <div className={cn('flex items-center justify-center gap-1', color)}>
                    <Icon className="h-4 w-4" />
                    <span className="text-lg font-mono font-medium">
                      {value > 0 ? '+' : ''}{value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Impact Analysis */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.impacts.map((impact, index) => {
              const color = impact.change > 0 ? 'border-red-500/30 bg-red-500/5' : 'border-green-500/30 bg-green-500/5';
              const textColor = impact.change > 0 ? 'text-red-400' : 'text-green-400';
              
              return (
                <div key={index} className={cn('p-4 rounded-lg border', color)}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{impact.dimension}</span>
                    <span className={cn('font-mono', textColor)}>
                      {impact.change > 0 ? '+' : ''}{impact.change}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{impact.reason}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Explanation */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{result.explanation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
