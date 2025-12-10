import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RiskGauge } from '@/components/charts/RiskGauge';
import { RiskRadar } from '@/components/charts/RiskRadar';
import { TrendChart } from '@/components/charts/TrendChart';
import { RiskHeatmap } from '@/components/charts/RiskHeatmap';
import { DriverChart } from '@/components/charts/DriverChart';
import { RiskAlert } from '@/components/dashboard/RiskAlert';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchRiskOverview, type RiskOverview } from '@/lib/api';
import { Users, Building2, MapPin, Code, AlertTriangle } from 'lucide-react';

export default function Overview() {
  const [data, setData] = useState<RiskOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskOverview().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <DashboardLayout title="Overview" subtitle="Organization-wide risk state">
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Risk Overview" subtitle="Organization-wide risk state at a glance">
      <div className="space-y-6">
        {/* Top Stats Row */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Total Headcount"
            value="1,300"
            change={45}
            trend="up"
            icon={Users}
          />
          <StatCard
            title="Business Units"
            value="3"
            icon={Building2}
          />
          <StatCard
            title="Locations"
            value="4"
            icon={MapPin}
          />
          <StatCard
            title="Active Alerts"
            value={data.drivers.filter(d => d.impact === 'critical' || d.impact === 'high').length}
            variant="danger"
            icon={AlertTriangle}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Risk Gauge - Large */}
          <Card className="col-span-4 glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Organization Risk Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <RiskGauge score={data.score.total} size="lg" />
              <div className="flex items-center gap-2 mt-4">
                <span className={`text-sm ${data.score.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                  {data.score.delta > 0 ? '+' : ''}{data.score.delta} points
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card className="col-span-4 glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Risk Dimensions</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskRadar subscores={data.score.subscores} />
            </CardContent>
          </Card>

          {/* Top Alerts */}
          <Card className="col-span-4 glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Top Risk Drivers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[340px] overflow-y-auto">
              {data.drivers.slice(0, 4).map((driver) => (
                <RiskAlert key={driver.id} driver={driver} />
              ))}
            </CardContent>
          </Card>

          {/* Trend Chart */}
          <Card className="col-span-8 glass-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Risk Score Trend (12 Months)</CardTitle>
              <Tabs defaultValue="total" className="w-auto">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="total">Total</TabsTrigger>
                  <TabsTrigger value="all">All Dimensions</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TrendChart data={data.trend} showSubscores={false} />
            </CardContent>
          </Card>

          {/* Driver Breakdown */}
          <Card className="col-span-4 glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Risk Driver Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <DriverChart drivers={data.drivers} />
            </CardContent>
          </Card>

          {/* Heatmaps */}
          <Card className="col-span-6 glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Technology × Location Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskHeatmap data={data.techLocationHeatmap} />
            </CardContent>
          </Card>

          <Card className="col-span-6 glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Client × Technology Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskHeatmap data={data.clientTechHeatmap} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
