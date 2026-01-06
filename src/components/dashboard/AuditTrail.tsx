import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Shield, ArrowRight, Hash, Clock, Link2 } from 'lucide-react';
import type { AuditReceipt, PolicyDecision } from '@/types/workflow';
import { STATE_LABELS } from '@/types/workflow';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface AuditTrailProps {
  receipts: AuditReceipt[];
  isLoading?: boolean;
}

function PolicyBadge({ decision }: { decision: PolicyDecision }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-mono',
        decision === 'allow' && 'border-success text-success bg-success/10',
        decision === 'deny' && 'border-destructive text-destructive bg-destructive/10',
        decision === 'needs_approval' && 'border-warning text-warning bg-warning/10'
      )}
    >
      {decision}
    </Badge>
  );
}

export function AuditTrail({ receipts: initialReceipts, isLoading }: AuditTrailProps) {
  const [receipts, setReceipts] = useState(initialReceipts);

  useEffect(() => {
    setReceipts(initialReceipts);
  }, [initialReceipts]);

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('audit-receipts-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_receipts',
        },
        (payload) => {
          setReceipts((prev) => [payload.new as AuditReceipt, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-primary" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-muted-foreground">
            Loading audit receipts...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="w-5 h-5 text-primary" />
          Audit Trail
          <Badge variant="secondary" className="ml-2">
            {receipts.length} receipts
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {receipts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <Shield className="w-10 h-10 mb-2 opacity-50" />
            <p>No audit receipts yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Timestamp</TableHead>
                  <TableHead>State Transition</TableHead>
                  <TableHead>Tool</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead className="w-[100px]">Chain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipts.map((receipt) => (
                  <TableRow key={receipt.id} className="group">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {new Date(receipt.timestamp).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        {receipt.previous_state && (
                          <>
                            <span className="text-muted-foreground">
                              {STATE_LABELS[receipt.previous_state]}
                            </span>
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          </>
                        )}
                        <span className="font-medium">
                          {STATE_LABELS[receipt.new_state]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="px-1.5 py-0.5 rounded bg-muted text-xs">
                        {receipt.tool_name}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <PolicyBadge decision={receipt.policy_decision} />
                        {receipt.policy_rule && (
                          <span className="text-xs text-muted-foreground">
                            {receipt.policy_rule}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 cursor-pointer">
                            {receipt.chain_hash ? (
                              <>
                                <Link2 className="w-3 h-3 text-primary" />
                                <span className="font-mono text-xs truncate max-w-[60px]">
                                  {receipt.chain_hash.slice(0, 8)}...
                                </span>
                              </>
                            ) : (
                              <>
                                <Hash className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  pending
                                </span>
                              </>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="font-mono text-xs">
                          <div className="space-y-1">
                            <div>Input: {receipt.input_hash.slice(0, 16)}...</div>
                            <div>Output: {receipt.output_hash.slice(0, 16)}...</div>
                            {receipt.chain_hash && (
                              <div>Chain: {receipt.chain_hash}</div>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
