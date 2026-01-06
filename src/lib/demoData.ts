import { supabase } from '@/integrations/supabase/client';
import type { WorkflowState, PolicyDecision, EmploymentType } from '@/types/workflow';

const DEMO_NAMES = [
  'Alice Chen', 'Bob Martinez', 'Carol Johnson', 'David Kim', 
  'Emma Williams', 'Frank Brown', 'Grace Lee', 'Henry Davis'
];

const DEMO_ROLES = [
  'Backend Engineer', 'Frontend Developer', 'Product Manager',
  'Data Scientist', 'DevOps Engineer', 'UX Designer'
];

const DEMO_TEAMS = ['Payments', 'Platform', 'Growth', 'Infrastructure', 'AI/ML'];
const DEMO_LOCATIONS = ['San Francisco', 'New York', 'London', 'Berlin', 'Singapore'];

const TOOLS = [
  'hr_lookup_candidate',
  'policy_resolve_access',
  'send_approval_email',
  'itsm_create_ticket',
  'id_provision_account',
  'calendar_create_event',
  'email_send'
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateHash(): string {
  return Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

export async function createDemoWorkflow() {
  const name = randomElement(DEMO_NAMES);
  const email = name.toLowerCase().replace(' ', '.') + '@example.com';
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 14) + 1);

  const { data: workflow, error: workflowError } = await supabase
    .from('workflows')
    .insert({
      employee_name: name,
      employee_email: email,
      role: randomElement(DEMO_ROLES),
      team: randomElement(DEMO_TEAMS),
      location: randomElement(DEMO_LOCATIONS),
      employment_type: randomElement(['fte', 'contractor', 'intern'] as EmploymentType[]),
      start_date: startDate.toISOString().split('T')[0],
      current_state: 'INTENT_PARSED' as WorkflowState,
      context: { source: 'demo', created_by: 'system' }
    })
    .select()
    .single();

  if (workflowError) throw workflowError;

  // Create initial audit receipt
  await supabase.from('audit_receipts').insert({
    workflow_id: workflow.id,
    previous_state: null,
    new_state: 'INTENT_PARSED' as WorkflowState,
    tool_name: 'intent_classifier',
    input_hash: generateHash(),
    output_hash: generateHash(),
    policy_decision: 'allow' as PolicyDecision,
    policy_rule: 'workflow.create.allowed',
    executor_id: 'system',
    chain_hash: generateHash()
  });

  // Create policy log
  await supabase.from('policy_logs').insert({
    workflow_id: workflow.id,
    tool_name: 'intent_classifier',
    requested_action: `Create onboarding workflow for ${name}`,
    decision: 'allow' as PolicyDecision,
    reason: 'Valid onboarding request from authorized source',
    policy_bundle: 'onboarding.v1'
  });

  return workflow;
}

export async function simulateWorkflowProgress(workflowId: string) {
  const states: WorkflowState[] = [
    'HR_VALIDATED',
    'POLICY_RESOLVED', 
    'APPROVALS_PENDING',
    'APPROVALS_COMPLETED',
    'ITSM_CREATED',
    'IDENTITY_PROVISIONED',
    'COMMS_SCHEDULED',
    'VERIFIED',
    'COMPLETED'
  ];

  const { data: workflow } = await supabase
    .from('workflows')
    .select('current_state')
    .eq('id', workflowId)
    .single();

  if (!workflow) return;

  const currentIndex = states.indexOf(workflow.current_state as WorkflowState);
  const nextState = states[currentIndex + 1];

  if (!nextState) return;

  const tool = randomElement(TOOLS);
  const decision: PolicyDecision = Math.random() > 0.1 ? 'allow' : 'needs_approval';

  // Update workflow state
  await supabase
    .from('workflows')
    .update({ current_state: nextState })
    .eq('id', workflowId);

  // Create audit receipt
  await supabase.from('audit_receipts').insert({
    workflow_id: workflowId,
    previous_state: workflow.current_state as WorkflowState,
    new_state: nextState,
    tool_name: tool,
    input_hash: generateHash(),
    output_hash: generateHash(),
    policy_decision: decision,
    policy_rule: `${tool}.execute`,
    executor_id: 'weilpod-' + Math.random().toString(36).slice(2, 8),
    chain_hash: generateHash()
  });

  // Create policy log
  await supabase.from('policy_logs').insert({
    workflow_id: workflowId,
    tool_name: tool,
    requested_action: `Execute ${tool} for state transition to ${nextState}`,
    decision: decision,
    reason: decision === 'allow' 
      ? 'Policy conditions met for automated execution' 
      : 'Requires manager approval for this action',
    policy_bundle: 'onboarding.v1'
  });

  return nextState;
}
