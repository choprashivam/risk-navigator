import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import type { SimulationResult } from '@/lib/api';

interface ComparisonChartProps {
  result: SimulationResult;
}

export function ComparisonChart({ result }: ComparisonChartProps) {
  const data = [
    { 
      name: 'Total', 
      before: result.previousScore, 
      after: result.newScore,
      change: result.delta 
    },
    { 
      name: 'Capacity', 
      before: 55, 
      after: 55 + result.subscoreChanges.capacity,
      change: result.subscoreChanges.capacity 
    },
    { 
      name: 'Concentration', 
      before: 78, 
      after: 78 + result.subscoreChanges.concentration,
      change: result.subscoreChanges.concentration 
    },
    { 
      name: 'Delivery', 
      before: 65, 
      after: 65 + result.subscoreChanges.delivery,
      change: result.subscoreChanges.delivery 
    },
    { 
      name: 'Financial', 
      before: 48, 
      after: 48 + result.subscoreChanges.financial,
      change: result.subscoreChanges.financial 
    },
    { 
      name: 'Strategic', 
      before: 64, 
      after: 64 + result.subscoreChanges.strategicAlignment,
      change: result.subscoreChanges.strategicAlignment 
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis 
          dataKey="name" 
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <YAxis 
          domain={[0, 100]}
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))',
          }}
          formatter={(value: number, name: string) => [value, name === 'before' ? 'Before' : 'After']}
        />
        <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
        <Bar dataKey="before" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="Before" />
        <Bar dataKey="after" radius={[4, 4, 0, 0]} name="After">
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.change > 0 ? 'hsl(var(--risk-high))' : entry.change < 0 ? 'hsl(var(--success))' : 'hsl(var(--primary))'} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
