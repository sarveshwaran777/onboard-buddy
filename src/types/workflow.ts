export type WorkflowState =
  | 'INTENT_PARSED'
  | 'HR_VALIDATED'
  | 'POLICY_RESOLVED'
  | 'APPROVALS_PENDING'
  | 'APPROVALS_COMPLETED'
  | 'ERROR_APPROVAL_DENIED'
  | 'ITSM_CREATED'
  | 'IDENTITY_PROVISIONED'
  | 'ERROR_IDENTITY_PROVISION'
  | 'COMMS_SCHEDULED'
  | 'VERIFIED'
  | 'COMPLETED'
  | 'ERROR';

export type PolicyDecision = 'allow' | 'deny' | 'needs_approval';

export type EmploymentType = 'fte' | 'contractor' | 'intern';

export interface Workflow {
  id: string;
  employee_email: string;
  employee_name: string;
  role: string;
  team: string;
  location: string;
  employment_type: EmploymentType;
  start_date: string;
  current_state: WorkflowState;
  context: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AuditReceipt {
  id: string;
  workflow_id: string;
  previous_state: WorkflowState | null;
  new_state: WorkflowState;
  tool_name: string;
  input_hash: string;
  output_hash: string;
  policy_decision: PolicyDecision;
  policy_rule: string | null;
  executor_id: string | null;
  chain_hash: string | null;
  timestamp: string;
}

export interface PolicyLog {
  id: string;
  workflow_id: string;
  tool_name: string;
  requested_action: string;
  decision: PolicyDecision;
  reason: string | null;
  policy_bundle: string | null;
  evaluated_at: string;
}

export interface Approval {
  id: string;
  workflow_id: string;
  approver_email: string;
  approval_type: string;
  status: string;
  requested_at: string;
  responded_at: string | null;
  response_notes: string | null;
}

export const STATE_ORDER: WorkflowState[] = [
  'INTENT_PARSED',
  'HR_VALIDATED',
  'POLICY_RESOLVED',
  'APPROVALS_PENDING',
  'APPROVALS_COMPLETED',
  'ITSM_CREATED',
  'IDENTITY_PROVISIONED',
  'COMMS_SCHEDULED',
  'VERIFIED',
  'COMPLETED',
];

export const STATE_LABELS: Record<WorkflowState, string> = {
  INTENT_PARSED: 'Intent Parsed',
  HR_VALIDATED: 'HR Validated',
  POLICY_RESOLVED: 'Policy Resolved',
  APPROVALS_PENDING: 'Awaiting Approvals',
  APPROVALS_COMPLETED: 'Approvals Done',
  ERROR_APPROVAL_DENIED: 'Approval Denied',
  ITSM_CREATED: 'ITSM Created',
  IDENTITY_PROVISIONED: 'Identity Ready',
  ERROR_IDENTITY_PROVISION: 'Identity Error',
  COMMS_SCHEDULED: 'Comms Scheduled',
  VERIFIED: 'Verified',
  COMPLETED: 'Completed',
  ERROR: 'Error',
};
