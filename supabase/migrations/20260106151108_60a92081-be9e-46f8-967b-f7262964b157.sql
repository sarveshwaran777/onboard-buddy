-- Create enum types for workflow states and policy decisions
CREATE TYPE public.workflow_state AS ENUM (
  'INTENT_PARSED',
  'HR_VALIDATED', 
  'POLICY_RESOLVED',
  'APPROVALS_PENDING',
  'APPROVALS_COMPLETED',
  'ERROR_APPROVAL_DENIED',
  'ITSM_CREATED',
  'IDENTITY_PROVISIONED',
  'ERROR_IDENTITY_PROVISION',
  'COMMS_SCHEDULED',
  'VERIFIED',
  'COMPLETED',
  'ERROR'
);

CREATE TYPE public.policy_decision AS ENUM ('allow', 'deny', 'needs_approval');

CREATE TYPE public.employment_type AS ENUM ('fte', 'contractor', 'intern');

-- Create workflows table for tracking onboarding requests
CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_email TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  role TEXT NOT NULL,
  team TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type employment_type NOT NULL DEFAULT 'fte',
  start_date DATE NOT NULL,
  current_state workflow_state NOT NULL DEFAULT 'INTENT_PARSED',
  context JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create audit_receipts table for on-chain auditability
CREATE TABLE public.audit_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  previous_state workflow_state,
  new_state workflow_state NOT NULL,
  tool_name TEXT NOT NULL,
  input_hash TEXT NOT NULL,
  output_hash TEXT NOT NULL,
  policy_decision policy_decision NOT NULL,
  policy_rule TEXT,
  executor_id TEXT,
  chain_hash TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create policy_logs table for policy enforcement tracking
CREATE TABLE public.policy_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  requested_action TEXT NOT NULL,
  decision policy_decision NOT NULL,
  reason TEXT,
  policy_bundle TEXT,
  evaluated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create approvals table for tracking approval requests
CREATE TABLE public.approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  approver_email TEXT NOT NULL,
  approval_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  responded_at TIMESTAMPTZ,
  response_notes TEXT
);

-- Enable RLS on all tables
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (dashboard monitoring)
CREATE POLICY "Allow public read access to workflows"
  ON public.workflows FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to audit_receipts"
  ON public.audit_receipts FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to policy_logs"
  ON public.policy_logs FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to approvals"
  ON public.approvals FOR SELECT
  USING (true);

-- Allow insert for demo purposes (in production, restrict to service role)
CREATE POLICY "Allow insert to workflows"
  ON public.workflows FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert to audit_receipts"
  ON public.audit_receipts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert to policy_logs"
  ON public.policy_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert to approvals"
  ON public.approvals FOR INSERT
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for workflows
CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON public.workflows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for audit_receipts
ALTER PUBLICATION supabase_realtime ADD TABLE public.audit_receipts;

-- Create indexes for better query performance
CREATE INDEX idx_audit_receipts_workflow_id ON public.audit_receipts(workflow_id);
CREATE INDEX idx_audit_receipts_timestamp ON public.audit_receipts(timestamp DESC);
CREATE INDEX idx_policy_logs_workflow_id ON public.policy_logs(workflow_id);
CREATE INDEX idx_workflows_current_state ON public.workflows(current_state);
CREATE INDEX idx_workflows_created_at ON public.workflows(created_at DESC);