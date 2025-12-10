import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MapPin, Clock, FileX, TrendingDown, Plus } from 'lucide-react';
import type { SimulationPayload } from '@/lib/api';

interface SimulatorFormProps {
  onSimulate: (payload: SimulationPayload) => void;
  isLoading: boolean;
}

export function SimulatorForm({ onSimulate, isLoading }: SimulatorFormProps) {
  const [payload, setPayload] = useState<SimulationPayload>({
    hireEngineers: 0,
    hireTechnology: '',
    hireLocation: '',
    moveEngineers: false,
    engineerCount: 0,
    fromLocation: '',
    toLocation: '',
    projectDelayed: false,
    delayDays: 30,
    clientContractEnded: false,
    clientId: '',
    attritionRate: 15,
  });

  const handleSimulate = () => {
    onSimulate(payload);
  };

  const handleReset = () => {
    setPayload({
      hireEngineers: 0,
      hireTechnology: '',
      hireLocation: '',
      moveEngineers: false,
      engineerCount: 0,
      fromLocation: '',
      toLocation: '',
      projectDelayed: false,
      delayDays: 30,
      clientContractEnded: false,
      clientId: '',
      attritionRate: 15,
    });
  };

  return (
    <div className="space-y-6">
      {/* Hiring Scenario */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Hiring Scenario
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Engineers to Hire</Label>
              <Input
                type="number"
                min={0}
                value={payload.hireEngineers}
                onChange={(e) => setPayload({ ...payload, hireEngineers: parseInt(e.target.value) || 0 })}
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Technology</Label>
              <Select
                value={payload.hireTechnology}
                onValueChange={(v) => setPayload({ ...payload, hireTechnology: v })}
              >
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select tech" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="dotnet">.NET</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="data">Data Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Select
                value={payload.hireLocation}
                onValueChange={(v) => setPayload({ ...payload, hireLocation: v })}
              >
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Movement Scenario */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Engineer Movement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable engineer movement</Label>
            <Switch
              checked={payload.moveEngineers}
              onCheckedChange={(v) => setPayload({ ...payload, moveEngineers: v })}
            />
          </div>
          {payload.moveEngineers && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Number of Engineers</Label>
                <Input
                  type="number"
                  min={0}
                  value={payload.engineerCount}
                  onChange={(e) => setPayload({ ...payload, engineerCount: parseInt(e.target.value) || 0 })}
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label>From Location</Label>
                <Select
                  value={payload.fromLocation}
                  onValueChange={(v) => setPayload({ ...payload, fromLocation: v })}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>To Location</Label>
                <Select
                  value={payload.toLocation}
                  onValueChange={(v) => setPayload({ ...payload, toLocation: v })}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Delay */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Project delayed</Label>
            <Switch
              checked={payload.projectDelayed}
              onCheckedChange={(v) => setPayload({ ...payload, projectDelayed: v })}
            />
          </div>
          {payload.projectDelayed && (
            <div className="space-y-2">
              <Label>Delay (days): {payload.delayDays}</Label>
              <Slider
                value={[payload.delayDays || 30]}
                onValueChange={([v]) => setPayload({ ...payload, delayDays: v })}
                min={7}
                max={180}
                step={7}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Contract */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <FileX className="h-4 w-4 text-primary" />
            Client Scenario
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Client contract ended</Label>
            <Switch
              checked={payload.clientContractEnded}
              onCheckedChange={(v) => setPayload({ ...payload, clientContractEnded: v })}
            />
          </div>
          {payload.clientContractEnded && (
            <div className="space-y-2">
              <Label>Client</Label>
              <Select
                value={payload.clientId}
                onValueChange={(v) => setPayload({ ...payload, clientId: v })}
              >
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client-a">Client A - Global Bank</SelectItem>
                  <SelectItem value="client-b">Client B - Insurance Corp</SelectItem>
                  <SelectItem value="client-c">Client C - Retail Giant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attrition */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-primary" />
            Attrition Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Annual Attrition: {payload.attritionRate}%</Label>
            <Slider
              value={[payload.attritionRate || 15]}
              onValueChange={([v]) => setPayload({ ...payload, attritionRate: v })}
              min={5}
              max={40}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleSimulate}
          disabled={isLoading}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          {isLoading ? 'Simulating...' : 'Run Simulation'}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
