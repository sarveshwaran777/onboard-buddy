import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { WorkflowCard } from '@/components/dashboard/WorkflowCard';
import { WorkflowDetail } from '@/components/dashboard/WorkflowDetail';
import { AuditTrail } from '@/components/dashboard/AuditTrail';
import { PolicyLogs } from '@/components/dashboard/PolicyLogs';
import {
  useWorkflows,
  useAuditReceipts,
  usePolicyLogs,
} from '@/hooks/useWorkflows';
import { createDemoWorkflow, simulateWorkflowProgress } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function Dashboard() {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const queryClient = useQueryClient();
  const { data: workflows = [], isLoading: workflowsLoading, refetch } = useWorkflows();
  const { data: receipts = [], isLoading: receiptsLoading } = useAuditReceipts(
    selectedWorkflowId || undefined
  );
  const { data: policyLogs = [], isLoading: policyLoading } = usePolicyLogs(
    selectedWorkflowId || undefined
  );

  const selectedWorkflow = workflows.find((w) => w.id === selectedWorkflowId);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['workflows'] });
    queryClient.invalidateQueries({ queryKey: ['audit_receipts'] });
    queryClient.invalidateQueries({ queryKey: ['policy_logs'] });
    toast.success('Data refreshed');
  };

  const handleCreateDemo = async () => {
    setIsCreating(true);
    try {
      const workflow = await createDemoWorkflow();
      await refetch();
      setSelectedWorkflowId(workflow.id);
      toast.success(`Created workflow for ${workflow.employee_name}`);
    } catch (error) {
      toast.error('Failed to create demo workflow');
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSimulateProgress = async () => {
    if (!selectedWorkflowId) return;
    setIsSimulating(true);
    try {
      const newState = await simulateWorkflowProgress(selectedWorkflowId);
      if (newState) {
        queryClient.invalidateQueries({ queryKey: ['workflows'] });
        queryClient.invalidateQueries({ queryKey: ['audit_receipts'] });
        queryClient.invalidateQueries({ queryKey: ['policy_logs'] });
        toast.success(`Advanced to ${newState}`);
      } else {
        toast.info('Workflow already completed');
      }
    } catch (error) {
      toast.error('Failed to simulate progress');
      console.error(error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        workflowCount={workflows.length}
        onRefresh={handleRefresh}
        onCreateDemo={handleCreateDemo}
        isRefreshing={isCreating}
      />

      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Workflow List */}
          <div className="col-span-12 lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Workflows</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {workflowsLoading ? (
                <div className="text-center text-muted-foreground py-8">
                  Loading workflows...
                </div>
              ) : workflows.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <p className="mb-4">No workflows yet</p>
                  <Button onClick={handleCreateDemo} size="sm">
                    Create Demo Workflow
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pr-4">
                  {workflows.map((workflow) => (
                    <WorkflowCard
                      key={workflow.id}
                      workflow={workflow}
                      isSelected={workflow.id === selectedWorkflowId}
                      onClick={() => setSelectedWorkflowId(workflow.id)}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {selectedWorkflow ? (
              <>
                <div className="flex items-center justify-between">
                  <WorkflowDetail workflow={selectedWorkflow} />
                  <div className="hidden lg:flex ml-4">
                    <Button
                      onClick={handleSimulateProgress}
                      disabled={isSimulating || selectedWorkflow.current_state === 'COMPLETED'}
                      className="gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {isSimulating ? 'Simulating...' : 'Simulate Step'}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <AuditTrail receipts={receipts} isLoading={receiptsLoading} />
                  <PolicyLogs logs={policyLogs} isLoading={policyLoading} />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-[400px] glass rounded-lg">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg mb-2">Select a workflow to view details</p>
                  <p className="text-sm">
                    Or create a demo workflow to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
