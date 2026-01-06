import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Workflow, AuditReceipt, PolicyLog, Approval } from '@/types/workflow';

export function useWorkflows() {
  return useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Workflow[];
    },
  });
}

export function useWorkflow(id: string | null) {
  return useQuery({
    queryKey: ['workflow', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Workflow | null;
    },
    enabled: !!id,
  });
}

export function useAuditReceipts(workflowId?: string) {
  return useQuery({
    queryKey: ['audit_receipts', workflowId],
    queryFn: async () => {
      let query = supabase
        .from('audit_receipts')
        .select('*')
        .order('timestamp', { ascending: false });

      if (workflowId) {
        query = query.eq('workflow_id', workflowId);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return data as AuditReceipt[];
    },
  });
}

export function usePolicyLogs(workflowId?: string) {
  return useQuery({
    queryKey: ['policy_logs', workflowId],
    queryFn: async () => {
      let query = supabase
        .from('policy_logs')
        .select('*')
        .order('evaluated_at', { ascending: false });

      if (workflowId) {
        query = query.eq('workflow_id', workflowId);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return data as PolicyLog[];
    },
  });
}

export function useApprovals(workflowId?: string) {
  return useQuery({
    queryKey: ['approvals', workflowId],
    queryFn: async () => {
      let query = supabase
        .from('approvals')
        .select('*')
        .order('requested_at', { ascending: false });

      if (workflowId) {
        query = query.eq('workflow_id', workflowId);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return data as Approval[];
    },
  });
}
