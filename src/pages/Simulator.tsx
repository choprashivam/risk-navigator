import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SimulatorForm } from '@/components/simulator/SimulatorForm';
import { SimulatorResult } from '@/components/simulator/SimulatorResult';
import { RiskGauge } from '@/components/charts/RiskGauge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { simulateChanges, type SimulationPayload, type SimulationResult } from '@/lib/api';
import { organizationRisk } from '@/lib/mockData';
import { FlaskConical, Lightbulb } from 'lucide-react';

const exampleScenarios = [
  {
    title: 'Hire 10 Data Engineers',
    description: 'What happens if we hire 10 Data Engineers in Bangalore?',
  },
  {
    title: 'Client Contract Ends',
    description: 'How does risk change if Client A ends next month?',
  },
  {
    title: 'Move .NET Engineers',
    description: 'Move 15 .NET engineers from Chennai to Pune',
  },
  {
    title: 'Project Delay',
    description: 'What if a major project is delayed by 60 days?',
  },
];

export default function Simulator() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = async (payload: SimulationPayload) => {
    setIsLoading(true);
    try {
      const simulationResult = await simulateChanges(payload);
      setResult(simulationResult);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="What-If Simulator" subtitle="Model business changes and their risk impact">
      <div className="grid grid-cols-12 gap-6">
        {/* Current State */}
        <div className="col-span-3">
          <Card className="glass-card border-border/50 sticky top-6">
            <CardHeader>
              <CardTitle className="text-base">Current State</CardTitle>
              <CardDescription>Organization baseline</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <RiskGauge score={organizationRisk.total} size="md" animated={false} />
              <div className="w-full mt-6 space-y-2">
                {Object.entries(organizationRisk.subscores).map(([key, value]) => {
                  const label = key === 'strategicAlignment' ? 'Strategic' : key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-mono">{value}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Example Scenarios */}
          <Card className="glass-card border-border/50 mt-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Example Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {exampleScenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium">{scenario.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Simulator Form */}
        <div className="col-span-4">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-primary" />
                Simulation Parameters
              </CardTitle>
              <CardDescription>
                Configure business changes to model their risk impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimulatorForm onSimulate={handleSimulate} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="col-span-5">
          {result ? (
            <SimulatorResult result={result} />
          ) : (
            <Card className="glass-card border-border/50 h-full flex flex-col items-center justify-center min-h-[600px]">
              <FlaskConical className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No Simulation Yet</h3>
              <p className="text-sm text-muted-foreground/70 mt-2 text-center max-w-xs">
                Configure your scenario parameters and click "Run Simulation" to see the impact on risk scores.
              </p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
