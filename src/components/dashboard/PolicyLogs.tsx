import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import type { PolicyLog, PolicyDecision } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface PolicyLogsProps {
  logs: PolicyLog[];
  isLoading?: boolean;
}

function DecisionIcon({ decision }: { decision: PolicyDecision }) {
  switch (decision) {
    case 'allow':
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case 'deny':
      return <XCircle className="w-4 h-4 text-destructive" />;
    case 'needs_approval':
      return <AlertTriangle className="w-4 h-4 text-warning" />;
  }
}

export function PolicyLogs({ logs, isLoading }: PolicyLogsProps) {
  if (isLoading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileCheck className="w-5 h-5 text-accent" />
            Policy Decisions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-muted-foreground">
            Loading policy logs...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileCheck className="w-5 h-5 text-accent" />
          Policy Decisions
          <Badge variant="secondary" className="ml-2">
            {logs.length} evaluations
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <FileCheck className="w-10 h-10 mb-2 opacity-50" />
            <p>No policy decisions yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={cn(
                    'p-3 rounded-lg border transition-colors',
                    log.decision === 'allow' && 'bg-success/5 border-success/20',
                    log.decision === 'deny' && 'bg-destructive/5 border-destructive/20',
                    log.decision === 'needs_approval' && 'bg-warning/5 border-warning/20'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <DecisionIcon decision={log.decision} />
                      <div>
                        <code className="text-sm font-medium">{log.tool_name}</code>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {log.requested_action}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs shrink-0',
                        log.decision === 'allow' && 'border-success text-success',
                        log.decision === 'deny' && 'border-destructive text-destructive',
                        log.decision === 'needs_approval' && 'border-warning text-warning'
                      )}
                    >
                      {log.decision}
                    </Badge>
                  </div>
                  {log.reason && (
                    <p className="mt-2 text-xs text-muted-foreground pl-6">
                      {log.reason}
                    </p>
                  )}
                  {log.policy_bundle && (
                    <div className="mt-2 pl-6">
                      <code className="text-xs text-muted-foreground">
                        Bundle: {log.policy_bundle}
                      </code>
                    </div>
                  )}
                  <div className="mt-2 pl-6 text-xs text-muted-foreground">
                    {new Date(log.evaluated_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
