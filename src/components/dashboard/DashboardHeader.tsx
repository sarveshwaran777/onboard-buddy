import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Plus } from 'lucide-react';

interface DashboardHeaderProps {
  workflowCount: number;
  onRefresh: () => void;
  onCreateDemo: () => void;
  isRefreshing?: boolean;
}

export function DashboardHeader({
  workflowCount,
  onRefresh,
  onCreateDemo,
  isRefreshing,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight gradient-text">
                Onboarding Copilot
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Enterprise workflow monitoring & audit trail
              </p>
            </div>
            <Badge variant="outline" className="border-primary/50 text-primary">
              {workflowCount} workflows
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm" onClick={onCreateDemo} className="gap-2">
              <Plus className="w-4 h-4" />
              Demo Workflow
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
