// Mock data for the Risk Scoring Dashboard

export interface RiskScore {
  total: number;
  subscores: {
    capacity: number;
    concentration: number;
    delivery: number;
    financial: number;
    strategicAlignment: number;
  };
  trend: 'up' | 'down' | 'stable';
  delta: number;
}

export interface RiskDriver {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  category: string;
}

export interface EntityRisk {
  id: string;
  name: string;
  type: 'company' | 'business_unit' | 'location' | 'technology' | 'client' | 'engineer';
  riskScore: RiskScore;
  drivers: RiskDriver[];
  metadata: Record<string, unknown>;
}

export interface TrendPoint {
  date: string;
  score: number;
  capacity: number;
  concentration: number;
  delivery: number;
  financial: number;
  strategicAlignment: number;
}

export interface HeatmapData {
  x: string;
  y: string;
  value: number;
}

export interface SimulationResult {
  previousScore: number;
  newScore: number;
  delta: number;
  subscoreChanges: {
    capacity: number;
    concentration: number;
    delivery: number;
    financial: number;
    strategicAlignment: number;
  };
  explanation: string;
  impacts: { dimension: string; change: number; reason: string }[];
}

// Organization Overview Data
export const organizationRisk: RiskScore = {
  total: 62,
  subscores: {
    capacity: 55,
    concentration: 78,
    delivery: 65,
    financial: 48,
    strategicAlignment: 64,
  },
  trend: 'up',
  delta: 3,
};

// Risk Drivers
export const topRiskDrivers: RiskDriver[] = [
  {
    id: '1',
    title: 'Python Skill Concentration',
    description: '80% of Python engineers are located in Bangalore',
    impact: 'critical',
    score: 92,
    category: 'Concentration',
  },
  {
    id: '2',
    title: 'Key Person Dependency',
    description: '3 critical projects depend on single senior engineers',
    impact: 'high',
    score: 78,
    category: 'Delivery',
  },
  {
    id: '3',
    title: 'Contract Expiry Risk',
    description: '5 major contracts expiring in Q1 2024',
    impact: 'high',
    score: 75,
    category: 'Financial',
  },
  {
    id: '4',
    title: 'Data Engineering Gap',
    description: 'Current capacity at 60% of forecasted demand',
    impact: 'medium',
    score: 68,
    category: 'Capacity',
  },
  {
    id: '5',
    title: 'Legacy Tech Overweight',
    description: '.NET/Java ratio exceeds strategic target by 15%',
    impact: 'medium',
    score: 62,
    category: 'Strategic Alignment',
  },
];

// Trend Data (Last 12 months)
export const trendData: TrendPoint[] = [
  { date: 'Jan', score: 58, capacity: 52, concentration: 72, delivery: 60, financial: 45, strategicAlignment: 60 },
  { date: 'Feb', score: 55, capacity: 50, concentration: 70, delivery: 58, financial: 42, strategicAlignment: 58 },
  { date: 'Mar', score: 57, capacity: 53, concentration: 73, delivery: 59, financial: 44, strategicAlignment: 59 },
  { date: 'Apr', score: 60, capacity: 55, concentration: 75, delivery: 62, financial: 46, strategicAlignment: 61 },
  { date: 'May', score: 58, capacity: 54, concentration: 74, delivery: 60, financial: 45, strategicAlignment: 60 },
  { date: 'Jun', score: 59, capacity: 54, concentration: 76, delivery: 61, financial: 46, strategicAlignment: 62 },
  { date: 'Jul', score: 61, capacity: 56, concentration: 77, delivery: 63, financial: 47, strategicAlignment: 63 },
  { date: 'Aug', score: 60, capacity: 55, concentration: 76, delivery: 62, financial: 47, strategicAlignment: 62 },
  { date: 'Sep', score: 59, capacity: 54, concentration: 75, delivery: 61, financial: 46, strategicAlignment: 61 },
  { date: 'Oct', score: 61, capacity: 55, concentration: 77, delivery: 64, financial: 47, strategicAlignment: 63 },
  { date: 'Nov', score: 60, capacity: 54, concentration: 76, delivery: 63, financial: 47, strategicAlignment: 62 },
  { date: 'Dec', score: 62, capacity: 55, concentration: 78, delivery: 65, financial: 48, strategicAlignment: 64 },
];

// Tech x Location Heatmap
export const techLocationHeatmap: HeatmapData[] = [
  { x: 'Python', y: 'Bangalore', value: 92 },
  { x: 'Python', y: 'Chennai', value: 45 },
  { x: 'Python', y: 'Pune', value: 38 },
  { x: 'Python', y: 'Hyderabad', value: 52 },
  { x: '.NET', y: 'Bangalore', value: 55 },
  { x: '.NET', y: 'Chennai', value: 78 },
  { x: '.NET', y: 'Pune', value: 42 },
  { x: '.NET', y: 'Hyderabad', value: 35 },
  { x: 'Java', y: 'Bangalore', value: 48 },
  { x: 'Java', y: 'Chennai', value: 52 },
  { x: 'Java', y: 'Pune', value: 68 },
  { x: 'Java', y: 'Hyderabad', value: 45 },
  { x: 'React', y: 'Bangalore', value: 62 },
  { x: 'React', y: 'Chennai', value: 48 },
  { x: 'React', y: 'Pune', value: 55 },
  { x: 'React', y: 'Hyderabad', value: 72 },
  { x: 'AWS', y: 'Bangalore', value: 75 },
  { x: 'AWS', y: 'Chennai', value: 42 },
  { x: 'AWS', y: 'Pune', value: 38 },
  { x: 'AWS', y: 'Hyderabad', value: 58 },
];

// Client x Tech Heatmap
export const clientTechHeatmap: HeatmapData[] = [
  { x: 'Client A', y: 'Python', value: 85 },
  { x: 'Client A', y: '.NET', value: 32 },
  { x: 'Client A', y: 'Java', value: 45 },
  { x: 'Client A', y: 'React', value: 68 },
  { x: 'Client B', y: 'Python', value: 42 },
  { x: 'Client B', y: '.NET', value: 88 },
  { x: 'Client B', y: 'Java', value: 55 },
  { x: 'Client B', y: 'React', value: 35 },
  { x: 'Client C', y: 'Python', value: 55 },
  { x: 'Client C', y: '.NET', value: 48 },
  { x: 'Client C', y: 'Java', value: 72 },
  { x: 'Client C', y: 'React', value: 62 },
  { x: 'Client D', y: 'Python', value: 38 },
  { x: 'Client D', y: '.NET', value: 65 },
  { x: 'Client D', y: 'Java', value: 82 },
  { x: 'Client D', y: 'React', value: 45 },
];

// Entity Data for Explorer
export const businessUnits: EntityRisk[] = [
  {
    id: 'bu-1',
    name: 'Info Services',
    type: 'business_unit',
    riskScore: { total: 68, subscores: { capacity: 62, concentration: 82, delivery: 70, financial: 52, strategicAlignment: 68 }, trend: 'up', delta: 5 },
    drivers: [
      { id: 'd1', title: 'Python concentration in single location', description: '85% in Bangalore', impact: 'critical', score: 92, category: 'Concentration' },
      { id: 'd2', title: 'Senior engineer dependency', description: '4 key persons on critical path', impact: 'high', score: 78, category: 'Delivery' },
    ],
    metadata: { headcount: 450, billable: 420, bench: 30, locations: ['Bangalore', 'Chennai', 'Pune'] },
  },
  {
    id: 'bu-2',
    name: 'Digital Solutions',
    type: 'business_unit',
    riskScore: { total: 55, subscores: { capacity: 48, concentration: 65, delivery: 58, financial: 45, strategicAlignment: 52 }, trend: 'down', delta: -3 },
    drivers: [
      { id: 'd3', title: 'Contract renewal pending', description: '2 major contracts in Q1', impact: 'medium', score: 65, category: 'Financial' },
    ],
    metadata: { headcount: 320, billable: 295, bench: 25, locations: ['Hyderabad', 'Pune'] },
  },
  {
    id: 'bu-3',
    name: 'Cloud & Infrastructure',
    type: 'business_unit',
    riskScore: { total: 72, subscores: { capacity: 75, concentration: 78, delivery: 72, financial: 58, strategicAlignment: 75 }, trend: 'stable', delta: 0 },
    drivers: [
      { id: 'd4', title: 'AWS skill shortage', description: 'Only 65% of required capacity', impact: 'high', score: 82, category: 'Capacity' },
      { id: 'd5', title: 'Single client dependency', description: '40% revenue from Client A', impact: 'high', score: 75, category: 'Concentration' },
    ],
    metadata: { headcount: 280, billable: 260, bench: 20, locations: ['Bangalore', 'Hyderabad'] },
  },
];

export const locations: EntityRisk[] = [
  {
    id: 'loc-1',
    name: 'Bangalore',
    type: 'location',
    riskScore: { total: 74, subscores: { capacity: 68, concentration: 88, delivery: 72, financial: 55, strategicAlignment: 70 }, trend: 'up', delta: 4 },
    drivers: [
      { id: 'ld1', title: 'High Python concentration', description: '80% of org Python skills here', impact: 'critical', score: 92, category: 'Concentration' },
      { id: 'ld2', title: 'Attrition risk', description: 'Above industry average', impact: 'medium', score: 65, category: 'Delivery' },
    ],
    metadata: { headcount: 580, technologies: ['Python', 'AWS', 'React', 'Java'], avgTenure: 2.8 },
  },
  {
    id: 'loc-2',
    name: 'Chennai',
    type: 'location',
    riskScore: { total: 58, subscores: { capacity: 52, concentration: 72, delivery: 55, financial: 48, strategicAlignment: 58 }, trend: 'down', delta: -2 },
    drivers: [
      { id: 'ld3', title: '.NET heavy portfolio', description: '65% .NET work', impact: 'medium', score: 62, category: 'Strategic Alignment' },
    ],
    metadata: { headcount: 320, technologies: ['.NET', 'Java', 'React'], avgTenure: 3.5 },
  },
  {
    id: 'loc-3',
    name: 'Pune',
    type: 'location',
    riskScore: { total: 52, subscores: { capacity: 48, concentration: 58, delivery: 52, financial: 45, strategicAlignment: 55 }, trend: 'stable', delta: 0 },
    drivers: [],
    metadata: { headcount: 180, technologies: ['Java', '.NET', 'Python'], avgTenure: 4.2 },
  },
  {
    id: 'loc-4',
    name: 'Hyderabad',
    type: 'location',
    riskScore: { total: 48, subscores: { capacity: 45, concentration: 52, delivery: 48, financial: 42, strategicAlignment: 52 }, trend: 'down', delta: -3 },
    drivers: [],
    metadata: { headcount: 220, technologies: ['React', 'Java', 'AWS'], avgTenure: 3.1 },
  },
];

export const technologies: EntityRisk[] = [
  {
    id: 'tech-1',
    name: 'Python',
    type: 'technology',
    riskScore: { total: 78, subscores: { capacity: 72, concentration: 92, delivery: 75, financial: 55, strategicAlignment: 82 }, trend: 'up', delta: 6 },
    drivers: [
      { id: 'td1', title: 'Geographic concentration', description: '80% in Bangalore', impact: 'critical', score: 92, category: 'Concentration' },
      { id: 'td2', title: 'High strategic importance', description: 'Core to AI/ML initiatives', impact: 'high', score: 85, category: 'Strategic Alignment' },
    ],
    metadata: { headcount: 180, demand: 220, gap: 40, growth: '+25%' },
  },
  {
    id: 'tech-2',
    name: '.NET',
    type: 'technology',
    riskScore: { total: 55, subscores: { capacity: 42, concentration: 68, delivery: 52, financial: 48, strategicAlignment: 45 }, trend: 'down', delta: -4 },
    drivers: [
      { id: 'td3', title: 'Declining demand', description: 'Strategic shift to cloud-native', impact: 'medium', score: 62, category: 'Strategic Alignment' },
    ],
    metadata: { headcount: 240, demand: 200, gap: -40, growth: '-12%' },
  },
  {
    id: 'tech-3',
    name: 'AWS',
    type: 'technology',
    riskScore: { total: 72, subscores: { capacity: 82, concentration: 75, delivery: 68, financial: 52, strategicAlignment: 78 }, trend: 'up', delta: 5 },
    drivers: [
      { id: 'td4', title: 'Skill shortage', description: 'Only 65% of required capacity', impact: 'high', score: 82, category: 'Capacity' },
    ],
    metadata: { headcount: 120, demand: 180, gap: 60, growth: '+35%' },
  },
  {
    id: 'tech-4',
    name: 'React',
    type: 'technology',
    riskScore: { total: 48, subscores: { capacity: 45, concentration: 55, delivery: 48, financial: 42, strategicAlignment: 52 }, trend: 'stable', delta: 0 },
    drivers: [],
    metadata: { headcount: 150, demand: 160, gap: 10, growth: '+8%' },
  },
  {
    id: 'tech-5',
    name: 'Java',
    type: 'technology',
    riskScore: { total: 52, subscores: { capacity: 48, concentration: 58, delivery: 52, financial: 45, strategicAlignment: 48 }, trend: 'down', delta: -2 },
    drivers: [],
    metadata: { headcount: 200, demand: 180, gap: -20, growth: '-5%' },
  },
];

export const clients: EntityRisk[] = [
  {
    id: 'client-1',
    name: 'Client A - Global Bank',
    type: 'client',
    riskScore: { total: 72, subscores: { capacity: 65, concentration: 85, delivery: 70, financial: 58, strategicAlignment: 72 }, trend: 'up', delta: 4 },
    drivers: [
      { id: 'cd1', title: 'Revenue concentration', description: '25% of total revenue', impact: 'high', score: 85, category: 'Concentration' },
      { id: 'cd2', title: 'Contract renewal Q2', description: 'Major renewal pending', impact: 'medium', score: 68, category: 'Financial' },
    ],
    metadata: { revenue: '$12M', headcount: 120, margin: '28%', contractEnd: 'Q2 2024' },
  },
  {
    id: 'client-2',
    name: 'Client B - Insurance Corp',
    type: 'client',
    riskScore: { total: 58, subscores: { capacity: 52, concentration: 65, delivery: 58, financial: 52, strategicAlignment: 62 }, trend: 'stable', delta: 0 },
    drivers: [
      { id: 'cd3', title: 'Legacy tech dependency', description: 'Heavy .NET portfolio', impact: 'medium', score: 62, category: 'Strategic Alignment' },
    ],
    metadata: { revenue: '$8M', headcount: 85, margin: '32%', contractEnd: 'Q4 2024' },
  },
  {
    id: 'client-3',
    name: 'Client C - Retail Giant',
    type: 'client',
    riskScore: { total: 45, subscores: { capacity: 42, concentration: 48, delivery: 45, financial: 38, strategicAlignment: 48 }, trend: 'down', delta: -5 },
    drivers: [],
    metadata: { revenue: '$6M', headcount: 65, margin: '35%', contractEnd: 'Q3 2025' },
  },
];

// Simulation helper
export function simulateChanges(changes: {
  hireEngineers?: number;
  hireTechnology?: string;
  projectDelayed?: boolean;
  delayDays?: number;
  clientContractEnded?: boolean;
  moveEngineers?: boolean;
  engineerCount?: number;
  attritionRate?: number;
}): SimulationResult {
  // Mock simulation - in production this would call the backend
  const baseScore = organizationRisk.total;
  let newScore = baseScore;
  const impacts: SimulationResult['impacts'] = [];
  const subscoreChanges = { capacity: 0, concentration: 0, delivery: 0, financial: 0, strategicAlignment: 0 };

  if (changes.hireEngineers) {
    const count = changes.hireEngineers as number;
    const tech = changes.hireTechnology as string || 'General';
    subscoreChanges.capacity -= Math.floor(count / 3);
    impacts.push({ dimension: 'Capacity', change: -Math.floor(count / 3), reason: `Hiring ${count} ${tech} engineers reduces capacity risk` });
  }

  if (changes.projectDelayed) {
    const days = changes.delayDays as number || 30;
    subscoreChanges.delivery += Math.floor(days / 15);
    impacts.push({ dimension: 'Delivery', change: Math.floor(days / 15), reason: `Project delay of ${days} days increases delivery risk` });
  }

  if (changes.clientContractEnded) {
    subscoreChanges.financial += 8;
    subscoreChanges.concentration -= 5;
    impacts.push({ dimension: 'Financial', change: 8, reason: 'Contract end increases financial risk' });
    impacts.push({ dimension: 'Concentration', change: -5, reason: 'Client exit reduces concentration risk' });
  }

  if (changes.moveEngineers) {
    const count = changes.engineerCount as number || 0;
    subscoreChanges.concentration -= Math.floor(count / 5);
    impacts.push({ dimension: 'Concentration', change: -Math.floor(count / 5), reason: `Moving ${count} engineers improves distribution` });
  }

  if (changes.attritionRate) {
    const rate = changes.attritionRate as number;
    const change = Math.floor((rate - 15) / 2);
    subscoreChanges.capacity += change;
    subscoreChanges.delivery += Math.floor(change / 2);
    impacts.push({ dimension: 'Capacity', change, reason: `Attrition rate of ${rate}% affects capacity` });
  }

  // Calculate new total
  const totalChange = Object.values(subscoreChanges).reduce((a, b) => a + b, 0) / 5;
  newScore = Math.round(baseScore + totalChange);
  newScore = Math.max(0, Math.min(100, newScore));

  const explanations = impacts.map(i => `${i.dimension}: ${i.change > 0 ? '+' : ''}${i.change} (${i.reason})`);

  return {
    previousScore: baseScore,
    newScore,
    delta: newScore - baseScore,
    subscoreChanges,
    explanation: explanations.join('; '),
    impacts,
  };
}
