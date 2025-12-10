import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { RiskDriver } from '@/lib/api';

interface DriverChartProps {
  drivers: RiskDriver[];
}

function getBarColor(impact: string): string {
  switch (impact) {
    case 'critical': return 'hsl(var(--risk-critical))';
    case 'high': return 'hsl(var(--risk-high))';
    case 'medium': return 'hsl(var(--risk-medium))';
    default: return 'hsl(var(--risk-low))';
  }
}

export function DriverChart({ drivers }: DriverChartProps) {
  const data = drivers.map(d => ({
    name: d.title.length > 20 ? d.title.substring(0, 20) + '...' : d.title,
    fullName: d.title,
    score: d.score,
    impact: d.impact,
    category: d.category,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <XAxis 
          type="number" 
          domain={[0, 100]}
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          width={150}
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))',
          }}
          formatter={(value: number, name: string, props: { payload: { fullName: string; category: string } }) => [
            `Score: ${value}`,
            props.payload.fullName,
          ]}
          labelFormatter={(label, payload) => payload?.[0]?.payload?.category || label}
        />
        <Bar dataKey="score" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.impact)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
