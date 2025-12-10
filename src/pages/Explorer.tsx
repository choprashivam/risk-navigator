import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EntityCard } from '@/components/dashboard/EntityCard';
import { RiskGauge } from '@/components/charts/RiskGauge';
import { RiskRadar } from '@/components/charts/RiskRadar';
import { DriverChart } from '@/components/charts/DriverChart';
import { RiskAlert } from '@/components/dashboard/RiskAlert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { fetchEntityRisk, type EntityRisk, type EntityType } from '@/lib/api';
import { Building2, MapPin, Code, Users, Briefcase } from 'lucide-react';

const entityTabs: { type: EntityType; label: string; icon: typeof Building2 }[] = [
  { type: 'business_unit', label: 'Business Units', icon: Building2 },
  { type: 'location', label: 'Locations', icon: MapPin },
  { type: 'technology', label: 'Technologies', icon: Code },
  { type: 'client', label: 'Clients', icon: Briefcase },
];

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<EntityType>('business_unit');
  const [entities, setEntities] = useState<EntityRisk[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<EntityRisk | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchEntityRisk(activeTab).then((result) => {
      setEntities(result);
      setLoading(false);
    });
  }, [activeTab]);

  return (
    <DashboardLayout title="Risk Explorer" subtitle="Deep-dive into risk by entity">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as EntityType)}>
        <TabsList className="bg-muted/50 mb-6">
          {entityTabs.map((tab) => (
            <TabsTrigger key={tab.type} value={tab.type} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {entityTabs.map((tab) => (
          <TabsContent key={tab.type} value={tab.type}>
            {loading ? (
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-xl bg-muted/30 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {entities.map((entity) => (
                  <EntityCard
                    key={entity.id}
                    entity={entity}
                    onClick={() => setSelectedEntity(entity)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Entity Detail Sheet */}
      <Sheet open={!!selectedEntity} onOpenChange={() => setSelectedEntity(null)}>
        <SheetContent className="w-[600px] sm:max-w-[600px] bg-background border-border overflow-y-auto">
          {selectedEntity && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">{selectedEntity.name}</SheetTitle>
                <p className="text-muted-foreground capitalize">
                  {selectedEntity.type.replace('_', ' ')}
                </p>
              </SheetHeader>

              <div className="space-y-6">
                {/* Score */}
                <Card className="glass-card border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-8">
                      <RiskGauge score={selectedEntity.riskScore.total} size="md" />
                      <div className="flex-1">
                        <h3 className="font-medium mb-4">Subscores</h3>
                        <div className="space-y-2">
                          {Object.entries(selectedEntity.riskScore.subscores).map(([key, value]) => {
                            const label = key === 'strategicAlignment' ? 'Strategic Alignment' : key.charAt(0).toUpperCase() + key.slice(1);
                            return (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">{label}</span>
                                <span className="font-mono text-sm">{value}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Radar */}
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base">Risk Dimensions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RiskRadar subscores={selectedEntity.riskScore.subscores} />
                  </CardContent>
                </Card>

                {/* Drivers */}
                {selectedEntity.drivers.length > 0 && (
                  <Card className="glass-card border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base">Risk Drivers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedEntity.drivers.map((driver) => (
                        <RiskAlert key={driver.id} driver={driver} />
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Metadata */}
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base">Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedEntity.metadata).map(([key, value]) => (
                        <div key={key} className="p-3 rounded-lg bg-muted/30">
                          <p className="text-xs text-muted-foreground capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="font-medium">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
