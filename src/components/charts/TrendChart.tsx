import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { TrendPoint } from '@/lib/api';

interface TrendChartProps {
  data: TrendPoint[];
  showSubscores?: boolean;
}

export function TrendChart({ data, showSubscores = false }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
        <XAxis 
          dataKey="date" 
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
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
          name="Total Risk"
        />
        {showSubscores && (
          <>
            <Line type="monotone" dataKey="capacity" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="Capacity" />
            <Line type="monotone" dataKey="concentration" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} name="Concentration" />
            <Line type="monotone" dataKey="delivery" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} name="Delivery" />
            <Line type="monotone" dataKey="financial" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={false} name="Financial" />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
