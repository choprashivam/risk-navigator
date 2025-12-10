import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface RiskRadarProps {
  subscores: {
    capacity: number;
    concentration: number;
    delivery: number;
    financial: number;
    strategicAlignment: number;
  };
}

export function RiskRadar({ subscores }: RiskRadarProps) {
  const data = [
    { dimension: 'Capacity', value: subscores.capacity, fullMark: 100 },
    { dimension: 'Concentration', value: subscores.concentration, fullMark: 100 },
    { dimension: 'Delivery', value: subscores.delivery, fullMark: 100 },
    { dimension: 'Financial', value: subscores.financial, fullMark: 100 },
    { dimension: 'Strategic', value: subscores.strategicAlignment, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid 
          stroke="hsl(var(--border))" 
          strokeOpacity={0.5}
        />
        <PolarAngleAxis 
          dataKey="dimension" 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          tickCount={5}
        />
        <Radar
          name="Risk Score"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))',
          }}
          formatter={(value: number) => [`${value}`, 'Score']}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
