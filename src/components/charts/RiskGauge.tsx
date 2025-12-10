import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function RiskGauge({ 
  score, 
  size = 'lg', 
  showLabel = true, 
  animated = true,
  className 
}: RiskGaugeProps) {
  const dimensions = {
    sm: { width: 120, height: 120, strokeWidth: 8, fontSize: 24 },
    md: { width: 180, height: 180, strokeWidth: 12, fontSize: 36 },
    lg: { width: 280, height: 280, strokeWidth: 16, fontSize: 56 },
  };

  const { width, height, strokeWidth, fontSize } = dimensions[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const riskLevel = useMemo(() => {
    if (score <= 30) return { label: 'Low', color: 'hsl(var(--risk-low))', class: 'text-green-400' };
    if (score <= 50) return { label: 'Medium', color: 'hsl(var(--risk-medium))', class: 'text-yellow-400' };
    if (score <= 70) return { label: 'High', color: 'hsl(var(--risk-high))', class: 'text-orange-400' };
    return { label: 'Critical', color: 'hsl(var(--risk-critical))', class: 'text-red-400' };
  }, [score]);

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          className="opacity-30"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke={riskLevel.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn('transition-all duration-1000 ease-out', animated && 'gauge-animated')}
          style={{
            filter: `drop-shadow(0 0 ${strokeWidth}px ${riskLevel.color})`,
          }}
        />
        {/* Gradient overlay */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={riskLevel.color} stopOpacity="1" />
            <stop offset="100%" stopColor={riskLevel.color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className={cn('font-mono font-bold', riskLevel.class)}
          style={{ fontSize }}
        >
          {score}
        </span>
        {showLabel && (
          <span className={cn('text-sm font-medium mt-1', riskLevel.class)}>
            {riskLevel.label} Risk
          </span>
        )}
      </div>
    </div>
  );
}
