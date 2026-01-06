import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MapPin, Briefcase, Calendar } from 'lucide-react';
import type { Workflow } from '@/types/workflow';
import { STATE_LABELS } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface WorkflowCardProps {
  workflow: Workflow;
  isSelected?: boolean;
  onClick?: () => void;
}

export function WorkflowCard({ workflow, isSelected, onClick }: WorkflowCardProps) {
  const isError = workflow.current_state.startsWith('ERROR');
  const isComplete = workflow.current_state === 'COMPLETED';

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 glass glass-hover',
        isSelected && 'ring-2 ring-primary border-primary/50',
        isError && 'border-destructive/50',
        isComplete && 'border-success/50'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-medium truncate">
            {workflow.employee_name}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn(
              'shrink-0 text-xs',
              isError && 'border-destructive text-destructive',
              isComplete && 'border-success text-success',
              !isError && !isComplete && 'border-primary text-primary'
            )}
          >
            {STATE_LABELS[workflow.current_state]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5" />
          <span className="truncate">{workflow.employee_email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span className="truncate">
            {workflow.role} · {workflow.team}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{workflow.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(workflow.start_date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
