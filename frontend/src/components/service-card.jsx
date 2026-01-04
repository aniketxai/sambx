import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Cpu, Zap, BarChart3 } from 'lucide-react';

const icons = {
  Eye: Eye,
  Cpu: Cpu,
  Zap: Zap,
  BarChart3: BarChart3,
};

export default function ServiceCard({ service }) {
  const Icon = icons[service.icon] || Eye;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">
            Problem
          </h4>
          <p className="text-sm">{service.problem}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">
            Solution
          </h4>
          <p className="text-sm">{service.solution}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">
            Use Cases
          </h4>
          <p className="text-sm">{service.useCase}</p>
        </div>
      </CardContent>
    </Card>
  );
}
