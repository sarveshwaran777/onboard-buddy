import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Briefcase, MapPin, Calendar, Clock, Building } from 'lucide-react';
import type { Workflow } from '@/types/workflow';
import { STATE_LABELS } from '@/types/workflow';
import { WorkflowTimeline } from './WorkflowTimeline';
import { cn } from '@/lib/utils';

interface WorkflowDetailProps {
  workflow: Workflow;
}

export function WorkflowDetail({ workflow }: WorkflowDetailProps) {
  const isError = workflow.current_state.startsWith('ERROR');
  const isComplete = workflow.current_state === 'COMPLETED';

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{workflow.employee_name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {workflow.employee_email}
            </p>
          </div>
          <Badge
            className={cn(
              'text-sm',
              isError && 'bg-destructive/20 text-destructive border-destructive',
              isComplete && 'bg-success/20 text-success border-success',
              !isError && !isComplete && 'bg-primary/20 text-primary border-primary'
            )}
            variant="outline"
          >
            {STATE_LABELS[workflow.current_state]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <WorkflowTimeline currentState={workflow.current_state} />

        <Separator className="bg-border/50" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Role</p>
              <p className="font-medium">{workflow.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Team</p>
              <p className="font-medium">{workflow.team}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-info" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Location</p>
              <p className="font-medium">{workflow.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Start Date</p>
              <p className="font-medium">
                {new Date(workflow.start_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span className="capitalize">{workflow.employment_type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Created {new Date(workflow.created_at).toLocaleString()}</span>
            </div>
          </div>
          <code className="font-mono text-xs opacity-50">
            {workflow.id.slice(0, 8)}...
          </code>
        </div>
      </CardContent>
    </Card>
  );
}
