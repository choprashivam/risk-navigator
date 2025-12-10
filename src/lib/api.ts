// API Layer for Risk Dashboard
// These functions will connect to the backend risk engine

import {
  organizationRisk,
  topRiskDrivers,
  trendData,
  techLocationHeatmap,
  clientTechHeatmap,
  businessUnits,
  locations,
  technologies,
  clients,
  simulateChanges as mockSimulate,
  type RiskScore,
  type RiskDriver,
  type TrendPoint,
  type HeatmapData,
  type EntityRisk,
  type SimulationResult,
} from './mockData';

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface RiskOverview {
  score: RiskScore;
  drivers: RiskDriver[];
  trend: TrendPoint[];
  techLocationHeatmap: HeatmapData[];
  clientTechHeatmap: HeatmapData[];
}

export async function fetchRiskOverview(): Promise<RiskOverview> {
  await delay(500); // Simulate network latency
  return {
    score: organizationRisk,
    drivers: topRiskDrivers,
    trend: trendData,
    techLocationHeatmap,
    clientTechHeatmap,
  };
}

export type EntityType = 'company' | 'business_unit' | 'location' | 'technology' | 'client' | 'engineer';

export async function fetchEntityRisk(entityType: EntityType, entityId?: string): Promise<EntityRisk[]> {
  await delay(300);
  
  switch (entityType) {
    case 'business_unit':
      return entityId ? businessUnits.filter(bu => bu.id === entityId) : businessUnits;
    case 'location':
      return entityId ? locations.filter(loc => loc.id === entityId) : locations;
    case 'technology':
      return entityId ? technologies.filter(tech => tech.id === entityId) : technologies;
    case 'client':
      return entityId ? clients.filter(c => c.id === entityId) : clients;
    case 'company':
      return [{
        id: 'company-1',
        name: 'Organization',
        type: 'company',
        riskScore: organizationRisk,
        drivers: topRiskDrivers,
        metadata: { headcount: 1300, revenue: '$48M', locations: 4, clients: 25 },
      }];
    default:
      return [];
  }
}

export interface SimulationPayload {
  hireEngineers?: number;
  hireTechnology?: string;
  hireLocation?: string;
  moveEngineers?: boolean;
  engineerCount?: number;
  fromLocation?: string;
  toLocation?: string;
  projectDelayed?: boolean;
  delayDays?: number;
  clientContractEnded?: boolean;
  clientId?: string;
  attritionRate?: number;
  addProject?: boolean;
  projectTechnology?: string;
  projectHeadcount?: number;
}

export async function simulateChanges(payload: SimulationPayload): Promise<SimulationResult> {
  await delay(800); // Simulate computation time
  return mockSimulate(payload);
}

// Export types for use in components
export type { RiskScore, RiskDriver, TrendPoint, HeatmapData, EntityRisk, SimulationResult };
