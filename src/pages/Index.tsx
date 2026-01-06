import { Navigation } from '@/components/Navigation';
import { Section, SubSection } from '@/components/Section';
import { CodeBlock } from '@/components/CodeBlock';
import { InfoCard } from '@/components/InfoCard';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import StateMachineDiagram from '@/components/StateMachineDiagram';
import { ExternalLink, Zap, Database, Shield, GitBranch } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main content */}
      <main className="lg:ml-72 min-h-screen">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.02]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent" />
          
          <div className="relative px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Weil-SDK v2.0 Specification
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="gradient-text">Enterprise Onboarding</span>
                <br />
                <span className="text-foreground">Copilot</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A multi-service agentic workflow deployed on Icarus with full on-chain 
                auditability, policy enforcement, and robust error handling via WeilChain.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Database className="w-4 h-4 text-primary" />
                  <span className="text-sm">Multi-Service Orchestration</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="text-sm">On-Chain Audit Trail</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <GitBranch className="w-4 h-4 text-accent" />
                  <span className="text-sm">Deterministic Execution</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="px-6 lg:px-12 max-w-5xl">
          {/* Section 1: Problem Statement */}
          <Section
            id="overview"
            title="Problem Statement"
            subtitle="Why enterprises need multi-step agentic workflows"
          >
            <SubSection title="The Challenge">
              <p className="text-muted-foreground leading-relaxed">
                Modern enterprises operate across siloed systems: HR platforms (Workday, HiBob), 
                IT service management (Jira, ServiceNow), identity providers (Okta, Azure AD), 
                communication tools (Slack, Email), and internal policy engines. Employee onboarding 
                requires coordinating across all these systems—a process that is manual, error-prone, 
                and lacks auditability.
              </p>
            </SubSection>

            <SubSection title="Key Pain Points">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'Siloed Tools', desc: 'Each department uses different platforms with no unified orchestration' },
                  { title: 'Manual Handoffs', desc: 'HR creates tickets for IT, IT provisions accounts, etc.—all manually' },
                  { title: 'Compliance Gaps', desc: 'No single audit trail across systems for regulatory compliance' },
                  { title: 'Policy Drift', desc: 'Access policies are inconsistently applied across onboarding flows' },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-xl p-4">
                    <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="The Solution">
              <InfoCard type="success" title="Enterprise Onboarding Copilot">
                An AI copilot that, from a single natural-language request, orchestrates the complete 
                onboarding flow: HR validation → policy resolution → approvals → ITSM ticketing → 
                identity provisioning → communications scheduling—all with on-chain auditability 
                and deterministic execution guarantees.
              </InfoCard>
            </SubSection>
          </Section>

          {/* Section 2: Architecture */}
          <Section
            id="architecture"
            title="High-Level Architecture"
            subtitle="How the workflow runs on Icarus and WeilChain"
          >
            <SubSection title="System Overview">
              <WorkflowDiagram />
            </SubSection>

            <SubSection title="Component Breakdown">
              <div className="space-y-4">
                <div className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-primary mb-2">Icarus Front-End</h4>
                  <p className="text-sm text-muted-foreground">
                    Natural language chat interface + workflow visualizer. Users interact via prompts; 
                    Icarus handles intent classification, entity extraction, and routes to the appropriate 
                    workflow. The visualizer shows real-time state machine progression and event timeline.
                  </p>
                </div>
                
                <div className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-accent mb-2">MCP Server</h4>
                  <p className="text-sm text-muted-foreground">
                    Model Context Protocol server exposing tools as callable endpoints. Each tool 
                    (hr_lookup, itsm_create_ticket, id_provision, etc.) is registered with JSON schemas 
                    for input/output validation. Icarus discovers tools via the MCP manifest.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-info mb-2">Weil-SDK Workflow Engine</h4>
                  <p className="text-sm text-muted-foreground">
                    State machine executor with built-in policy enforcement. Each state transition 
                    produces a cryptographically signed receipt. Supports retry logic, conditional 
                    branching, and human-intervention states.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-success mb-2">Weilpods / Isolated Runtime</h4>
                  <p className="text-sm text-muted-foreground">
                    Sandboxed execution environment ensuring deterministic runs. Each workflow instance 
                    runs in an isolated Weilpod with resource limits, preventing side effects and 
                    guaranteeing reproducibility for audit purposes.
                  </p>
                </div>
              </div>
            </SubSection>

            <SubSection title="Data Flow">
              <CodeBlock
                language="text"
                title="Request → Response Flow"
                code={`1. User → Icarus: "Onboard Alice as backend engineer for Payments team"
2. Icarus → Intent Parser: Extract entities (name, role, team, email, start_date)
3. Intent Parser → Workflow Router: Match to "employee_onboarding" workflow
4. Workflow Engine → Weilpod: Spawn isolated execution context
5. Weilpod → MCP Tools: Execute state machine (HR → Policy → Approvals → ...)
6. Each Tool Call → WeilChain: Signed receipt with input/output hashes
7. Workflow Complete → Icarus: Return summary + receipt chain
8. Icarus → User: "Alice's onboarding is complete. [View Audit Trail]"`}
              />
            </SubSection>
          </Section>

          {/* Section 3: Workflow Specification */}
          <Section
            id="workflow"
            title="Workflow Specification"
            subtitle="Complete state machine definition"
          >
            <SubSection title="State Machine Diagram">
              <StateMachineDiagram />
            </SubSection>

            <SubSection title="State Definitions">
              <div className="space-y-4">
                {[
                  {
                    state: 'INTENT_PARSED',
                    entry: 'Natural language input received and parsed',
                    tools: ['intent_classify', 'entity_extract'],
                    data: 'candidate_email, role, team, location, employment_type, start_date',
                    policies: 'None (input validation only)',
                    errors: ['INVALID_INPUT → terminate with error'],
                    variant: 'info' as const,
                  },
                  {
                    state: 'HR_VALIDATED',
                    entry: 'Candidate exists in HRIS and is in "Offer Accepted" status',
                    tools: ['hr_lookup_candidate'],
                    data: 'hr_record_id, manager_id, department_id, compensation_band',
                    policies: 'requester must have HR_READ permission',
                    errors: ['CANDIDATE_NOT_FOUND → ERROR_HR_LOOKUP', 'WRONG_STATUS → ERROR_HR_STATUS'],
                    variant: 'info' as const,
                  },
                  {
                    state: 'POLICY_RESOLVED',
                    entry: 'HR validation complete',
                    tools: ['policy_resolve_access'],
                    data: 'access_groups[], software_licenses[], hardware_allocation, data_residency',
                    policies: 'Evaluate role + team + location against access policy bundle',
                    errors: ['POLICY_CONFLICT → ERROR_POLICY (requires manual resolution)'],
                    variant: 'info' as const,
                  },
                  {
                    state: 'APPROVALS_PENDING',
                    entry: 'Policy returns needs_approval for any access',
                    tools: ['send_approval_email', 'send_approval_slack', 'wait_for_approval'],
                    data: 'approval_requests[], pending_approvers[]',
                    policies: 'Approval routing based on access type (manager, security, legal)',
                    errors: ['TIMEOUT → auto-escalate', 'DENIED → ERROR_APPROVAL_DENIED'],
                    variant: 'warning' as const,
                  },
                  {
                    state: 'APPROVALS_COMPLETED',
                    entry: 'All required approvals received',
                    tools: [],
                    data: 'approval_receipts[], approved_access[]',
                    policies: 'Verify all receipts cryptographically',
                    errors: [],
                    variant: 'success' as const,
                  },
                  {
                    state: 'ITSM_CREATED',
                    entry: 'Approvals complete (or none required)',
                    tools: ['itsm_create_ticket', 'itsm_create_subtask'],
                    data: 'master_ticket_id, subtask_ids[], assigned_agents[]',
                    policies: 'ITSM_WRITE permission, ticket template validation',
                    errors: ['ITSM_UNAVAILABLE → retry with backoff', 'QUOTA_EXCEEDED → ERROR_ITSM'],
                    variant: 'info' as const,
                  },
                  {
                    state: 'IDENTITY_PROVISIONED',
                    entry: 'ITSM tickets created',
                    tools: ['id_provision_account', 'id_assign_group', 'id_set_mfa'],
                    data: 'user_id, provisioned_groups[], mfa_enrolled',
                    policies: 'IDENTITY_ADMIN permission, group membership validation',
                    errors: ['PROVISION_FAILED → ERROR_IDENTITY_PROVISION', 'GROUP_NOT_FOUND → ERROR_GROUP'],
                    variant: 'info' as const,
                  },
                  {
                    state: 'COMMS_SCHEDULED',
                    entry: 'Identity provisioned',
                    tools: ['calendar_create_event', 'email_send'],
                    data: 'welcome_email_id, calendar_event_ids[], meeting_links[]',
                    policies: 'CALENDAR_WRITE, EMAIL_SEND permissions',
                    errors: ['EMAIL_FAILED → retry', 'CALENDAR_CONFLICT → adjust time'],
                    variant: 'info' as const,
                  },
                  {
                    state: 'VERIFIED',
                    entry: 'All provisions and communications complete',
                    tools: ['id_verify_access', 'itsm_get_status'],
                    data: 'verification_results[], access_test_results[]',
                    policies: 'All provisions must pass verification',
                    errors: ['VERIFICATION_FAILED → rollback to IDENTITY_PROVISIONED'],
                    variant: 'success' as const,
                  },
                  {
                    state: 'COMPLETED',
                    entry: 'All verifications pass',
                    tools: ['generate_summary', 'archive_receipts'],
                    data: 'final_summary, receipt_chain_hash, audit_url',
                    policies: 'None',
                    errors: [],
                    variant: 'success' as const,
                  },
                ].map((s) => (
                  <details key={s.state} className="glass rounded-xl overflow-hidden group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`badge-${s.variant} font-mono text-xs`}>{s.state}</span>
                      </div>
                      <span className="text-muted-foreground text-sm group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 pt-0 border-t border-border space-y-3">
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Entry Condition</span>
                        <p className="text-sm">{s.entry}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">MCP Tools</span>
                        <p className="text-sm font-mono">{s.tools.length ? s.tools.join(', ') : 'None'}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Context Data</span>
                        <p className="text-sm font-mono">{s.data}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Policy Checks</span>
                        <p className="text-sm">{s.policies}</p>
                      </div>
                      {s.errors.length > 0 && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">Error Transitions</span>
                          <ul className="text-sm text-destructive font-mono">
                            {s.errors.map((e, i) => <li key={i}>• {e}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </SubSection>
          </Section>

          {/* Section 4: Tooling & Contracts */}
          <Section
            id="tooling"
            title="Tooling & Contracts"
            subtitle="MCP tool definitions via Weil-SDK"
          >
            <SubSection title="Tool Registration">
              <CodeBlock
                language="typescript"
                title="mcp-manifest.ts"
                code={`import { defineTools } from '@weil-sdk/mcp';

export const onboardingTools = defineTools({
  name: 'enterprise-onboarding',
  version: '1.0.0',
  tools: [
    hrLookupCandidate,
    policyResolveAccess,
    sendApprovalEmail,
    sendApprovalSlack,
    waitForApproval,
    itsmCreateTicket,
    itsmCreateSubtask,
    itsmGetStatus,
    idProvisionAccount,
    idAssignGroup,
    idVerifyAccess,
    calendarCreateEvent,
    emailSend,
  ],
});`}
              />
            </SubSection>

            <SubSection title="HR Tools">
              <CodeBlock
                language="typescript"
                title="hr_lookup_candidate"
                code={`interface HrLookupCandidateInput {
  email: string;  // required
}

interface HrLookupCandidateOutput {
  found: boolean;
  candidate?: {
    id: string;
    name: string;
    email: string;
    status: 'offer_sent' | 'offer_accepted' | 'onboarding' | 'active';
    manager_id: string;
    department: string;
    role: string;
    location: string;
    employment_type: 'fte' | 'contractor' | 'intern';
    start_date: string;  // ISO 8601
    compensation_band: string;
  };
  error?: {
    code: 'NOT_FOUND' | 'INVALID_STATUS' | 'SYSTEM_ERROR';
    message: string;
  };
}`}
              />
            </SubSection>

            <SubSection title="Policy Tools">
              <CodeBlock
                language="typescript"
                title="policy_resolve_access"
                code={`interface PolicyResolveAccessInput {
  role: string;
  team: string;
  location: string;
  employment_type: 'fte' | 'contractor' | 'intern';
}

interface PolicyResolveAccessOutput {
  decision: 'allow' | 'deny' | 'needs_approval';
  access_grants: {
    identity_groups: string[];
    software_licenses: string[];
    hardware_allocation: 'standard' | 'developer' | 'executive';
    data_residency: 'us' | 'eu' | 'apac';
    network_access: string[];
  };
  required_approvals?: {
    type: 'manager' | 'security' | 'legal' | 'finance';
    approver_id?: string;
    reason: string;
  }[];
  policy_ids: string[];  // for audit
}`}
              />
            </SubSection>

            <SubSection title="ITSM Tools">
              <CodeBlock
                language="typescript"
                title="itsm_create_ticket"
                code={`interface ItsmCreateTicketInput {
  type: 'onboarding' | 'offboarding' | 'access_request' | 'incident';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee_id?: string;
  labels: string[];
  custom_fields: Record<string, string>;
}

interface ItsmCreateTicketOutput {
  ticket_id: string;
  ticket_url: string;
  status: 'created' | 'assigned' | 'in_progress';
  assigned_to: string;
  sla_due: string;  // ISO 8601
}`}
              />
            </SubSection>

            <SubSection title="Identity Tools">
              <CodeBlock
                language="typescript"
                title="id_provision_account"
                code={`interface IdProvisionAccountInput {
  email: string;
  display_name: string;
  department: string;
  manager_id: string;
  initial_groups: string[];
  mfa_required: boolean;
  password_policy: 'standard' | 'privileged';
}

interface IdProvisionAccountOutput {
  user_id: string;
  username: string;
  email: string;
  status: 'provisioned' | 'pending_activation';
  provisioned_groups: string[];
  mfa_enrolled: boolean;
  temporary_password?: string;  // encrypted, one-time
  activation_url: string;
}`}
              />
            </SubSection>

            <SubSection title="Communication Tools">
              <CodeBlock
                language="typescript"
                title="calendar_create_event"
                code={`interface CalendarCreateEventInput {
  title: string;
  description: string;
  start_time: string;  // ISO 8601
  end_time: string;
  attendees: string[];  // email addresses
  location?: string;
  video_conference: boolean;
  reminder_minutes: number[];
}

interface CalendarCreateEventOutput {
  event_id: string;
  calendar_url: string;
  video_link?: string;
  ics_attachment: string;  // base64
}`}
              />
            </SubSection>
          </Section>

          {/* Section 5: Natural Language Interactions */}
          <Section
            id="interactions"
            title="Natural Language Interactions"
            subtitle="Example prompts and intent mapping"
          >
            <SubSection title="Example Prompts">
              <div className="space-y-4">
                <div className="glass rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">U</div>
                    <p className="text-foreground flex-1">
                      "Onboard a backend engineer for the Payments team starting next Monday. Email is alice@example.com."
                    </p>
                  </div>
                  <CodeBlock
                    language="json"
                    title="Extracted Intent"
                    code={`{
  "intent": "employee_onboarding",
  "confidence": 0.97,
  "entities": {
    "role": "backend engineer",
    "team": "Payments",
    "start_date": "2025-01-13",  // next Monday
    "email": "alice@example.com",
    "employment_type": "fte"  // inferred
  },
  "workflow_id": "onboarding_v1",
  "context_id": "ctx_abc123"
}`}
                  />
                </div>

                <div className="glass rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">U</div>
                    <p className="text-foreground flex-1">
                      "What's the status of Alice's onboarding?"
                    </p>
                  </div>
                  <CodeBlock
                    language="json"
                    title="Extracted Intent"
                    code={`{
  "intent": "workflow_status_query",
  "confidence": 0.94,
  "entities": {
    "subject": "Alice",
    "workflow_type": "onboarding"
  },
  "action": "lookup_by_name",
  "response_type": "status_summary"
}`}
                  />
                </div>

                <div className="glass rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">U</div>
                    <p className="text-foreground flex-1">
                      "Re-run only the calendar + communication part for Alice because her start date changed to Feb 1st."
                    </p>
                  </div>
                  <CodeBlock
                    language="json"
                    title="Extracted Intent"
                    code={`{
  "intent": "workflow_partial_rerun",
  "confidence": 0.91,
  "entities": {
    "subject": "Alice",
    "states_to_rerun": ["COMMS_SCHEDULED"],
    "updated_params": {
      "start_date": "2025-02-01"
    }
  },
  "action": "rerun_from_state",
  "preserve_prior_states": true
}`}
                  />
                </div>
              </div>
            </SubSection>

            <SubSection title="Intent Classification">
              <InfoCard type="info">
                The Icarus NL interface uses a fine-tuned classifier trained on enterprise 
                HR/IT terminology. Entity extraction leverages named entity recognition with 
                custom entity types: EMPLOYEE_NAME, ROLE, TEAM, DATE, EMAIL, EMPLOYMENT_TYPE. 
                All extracted parameters are validated against JSON schemas before workflow invocation.
              </InfoCard>
            </SubSection>
          </Section>

          {/* Section 6: On-Chain Audit */}
          <Section
            id="audit"
            title="On-Chain Auditability"
            subtitle="Cryptographic receipts and policy enforcement"
          >
            <SubSection title="Receipt Structure">
              <CodeBlock
                language="typescript"
                title="WorkflowReceipt"
                code={`interface WorkflowReceipt {
  // Unique identifiers
  receipt_id: string;         // UUID v7
  workflow_id: string;        // workflow instance
  workflow_run_id: string;    // this execution
  
  // State transition
  previous_state: string;
  new_state: string;
  transition_timestamp: string;  // ISO 8601
  
  // Tool execution
  tool_name: string;
  input_hash: string;         // SHA-256 of input JSON
  output_hash: string;        // SHA-256 of output JSON
  execution_duration_ms: number;
  
  // Policy enforcement
  policy_decision: 'allow' | 'deny' | 'needs_approval';
  policy_ids: string[];
  approver_ids?: string[];
  
  // Cryptographic proof
  weilpod_id: string;
  signature: string;          // Ed25519 signature
  previous_receipt_hash: string;  // chain linkage
  
  // Metadata
  requester_id: string;
  requester_ip_hash: string;
  environment: 'production' | 'staging';
}`}
              />
            </SubSection>

            <SubSection title="Receipt Chain">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-4 overflow-x-auto pb-4">
                  {['R₀', 'R₁', 'R₂', 'R₃', 'R₄'].map((r, i) => (
                    <div key={r} className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center font-mono text-primary">
                        {r}
                      </div>
                      {i < 4 && (
                        <span className="text-muted-foreground">→</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Each receipt Rₙ includes the hash of Rₙ₋₁, creating a tamper-evident chain. 
                  Auditors can verify the entire workflow history by traversing the chain and 
                  validating signatures.
                </p>
              </div>
            </SubSection>

            <SubSection title="Policy Model">
              <CodeBlock
                language="yaml"
                title="policy-bundle.yaml"
                code={`# Policy evaluation flow
policies:
  - name: hr_data_access
    description: Control access to HR records
    rules:
      - if:
          requester.role: [hr_admin, hr_manager, onboarding_bot]
        then: allow
      - if:
          requester.role: hiring_manager
          data.department: requester.department
        then: allow
      - else: deny

  - name: privileged_group_assignment
    description: Require approval for sensitive groups
    rules:
      - if:
          target_group: [admin, security, finance_ro]
        then: needs_approval
        approvers:
          - security_team
          - requester.manager
      - else: allow

  - name: eu_data_residency
    description: GDPR compliance for EU employees
    rules:
      - if:
          employee.location: [DE, FR, NL, ES, IT, ...]
        then:
          enforce:
            data_residency: eu
            additional_approvals: [dpo]`}
              />
            </SubSection>

            <SubSection title="Audit Reconstruction">
              <InfoCard type="success" title="Complete Auditability">
                Auditors can reconstruct the complete history of any onboarding workflow by:
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Querying WeilChain for all receipts with the workflow_id</li>
                  <li>Verifying the receipt chain integrity (hash linkage)</li>
                  <li>Validating each signature against the Weilpod public key</li>
                  <li>Reconstructing inputs/outputs from the hashes (stored off-chain)</li>
                  <li>Mapping policy decisions to the policy bundle version in effect</li>
                </ol>
              </InfoCard>
            </SubSection>
          </Section>

          {/* Section 7: Error Handling */}
          <Section
            id="errors"
            title="Error Handling & Retries"
            subtitle="Transient failures, permanent errors, and conditional flows"
          >
            <SubSection title="Retry Logic">
              <CodeBlock
                language="typescript"
                title="retry-config.ts"
                code={`const retryConfig: RetryConfig = {
  // Transient errors (network, rate limits)
  transient: {
    maxAttempts: 5,
    initialDelayMs: 1000,
    maxDelayMs: 30000,
    backoffMultiplier: 2,
    jitterPercent: 10,
    retryableErrors: [
      'NETWORK_TIMEOUT',
      'RATE_LIMITED',
      'SERVICE_UNAVAILABLE',
      'CONNECTION_RESET',
    ],
  },
  
  // Semi-transient (may recover)
  recoverable: {
    maxAttempts: 3,
    initialDelayMs: 5000,
    escalateAfter: 2,
    escalateTo: 'human_intervention',
    retryableErrors: [
      'ITSM_QUEUE_FULL',
      'CALENDAR_CONFLICT',
    ],
  },
  
  // Permanent errors (do not retry)
  permanent: [
    'CANDIDATE_NOT_FOUND',
    'APPROVAL_DENIED',
    'POLICY_VIOLATION',
    'INVALID_INPUT',
  ],
};`}
              />
            </SubSection>

            <SubSection title="Conditional Branching">
              <CodeBlock
                language="yaml"
                title="workflow-branches.yaml"
                code={`# Employment type branching
branches:
  employment_type:
    fte:
      - include: full_benefits_enrollment
      - include: stock_options_grant
      - hardware: developer_kit
      
    contractor:
      - skip: benefits_enrollment
      - skip: stock_options
      - hardware: standard_laptop
      - additional_policy: contractor_nda
      - max_access_duration: 12_months
      
    intern:
      - include: intern_program_enrollment
      - hardware: loaner_laptop
      - restricted_groups: [no_prod_access, no_customer_data]

# Location branching
branches:
  location:
    eu:
      - data_residency: eu
      - additional_approvals: [dpo]
      - calendar_timezone: CET
      - skip: us_tax_forms
      
    us:
      - data_residency: us
      - include: us_tax_forms
      - include: us_benefits
      
    apac:
      - data_residency: apac
      - calendar_timezone: SGT
      - include: apac_holidays`}
              />
            </SubSection>

            <SubSection title="Human Intervention States">
              <InfoCard type="warning" title="Escalation Flow">
                When a workflow enters a human intervention state:
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Notification sent via configured channels (Slack, email, PagerDuty)</li>
                  <li>Workflow pauses with state <code className="text-xs bg-muted px-1 rounded">AWAITING_INTERVENTION</code></li>
                  <li>Human resolves via Icarus UI or API</li>
                  <li>Resolution is recorded as a receipt with approver signature</li>
                  <li>Workflow resumes from the intervention point</li>
                </ol>
              </InfoCard>
            </SubSection>
          </Section>

          {/* Section 8: Deployment */}
          <Section
            id="deployment"
            title="Deployment & Visualization"
            subtitle="Packaging and deploying to Icarus"
          >
            <SubSection title="Applet Manifest">
              <CodeBlock
                language="yaml"
                title="icarus-applet.yaml"
                code={`apiVersion: icarus/v1
kind: Applet
metadata:
  name: enterprise-onboarding-copilot
  version: 1.0.0
  description: |
    AI copilot for orchestrating employee onboarding across
    HR, ITSM, Identity, and Communication systems.
  
spec:
  # Natural language routing
  intents:
    - employee_onboarding
    - onboarding_status_query
    - onboarding_rerun
  
  # Keywords for discovery
  keywords:
    - onboard
    - new employee
    - new hire
    - provision
    - access request
  
  # Required permissions
  scopes:
    - hr:read
    - itsm:write
    - identity:admin
    - calendar:write
    - email:send
    - policy:evaluate
  
  # MCP tools
  tools:
    manifest: ./mcp-manifest.ts
  
  # Workflow definition
  workflow:
    entrypoint: ./workflows/onboarding.weil
    states: ./workflows/states/
    policies: ./policies/
  
  # Visualization config
  visualization:
    graph:
      layout: dagre
      nodeStyles: ./ui/node-styles.css
    timeline:
      enabled: true
      showReceipts: true
    logs:
      verbosity: info
      searchable: true`}
              />
            </SubSection>

            <SubSection title="Icarus Visualization">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    Workflow Graph
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Interactive DAG showing states as nodes and transitions as edges. 
                    Current state is highlighted. Clicking a node shows its receipts, 
                    inputs/outputs, and policy decisions.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-info" />
                    Event Timeline
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Chronological list of all events with timestamps. Expandable 
                    to show tool inputs, outputs, errors, and retry attempts. 
                    Links to on-chain receipt for each event.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-success" />
                    Context Inspector
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Live view of the workflow context object as it evolves 
                    through states. Shows diffs between state transitions 
                    for easy debugging.
                  </p>
                </div>

                <div className="glass rounded-xl p-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    Audit Trail
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Dedicated view for compliance teams showing all receipts, 
                    policy decisions, and approvals. Exportable to PDF/CSV 
                    for external auditors.
                  </p>
                </div>
              </div>
            </SubSection>
          </Section>

          {/* Section 9: Security & Governance */}
          <Section
            id="security"
            title="Security & Governance"
            subtitle="Principles and extensibility"
          >
            <SubSection title="Security Principles">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Least Privilege',
                    desc: 'Each tool has scoped credentials. The onboarding workflow cannot access payroll data, only the specific HRIS fields needed.',
                  },
                  {
                    title: 'Zero-Trust Runtime',
                    desc: 'Weilpods are isolated. No network access except to explicitly allowlisted endpoints. No filesystem persistence.',
                  },
                  {
                    title: 'No Credentials in Prompts',
                    desc: 'API keys and secrets are injected by the MCP server at runtime, never visible in workflow definitions or logs.',
                  },
                  {
                    title: 'Signed Receipts',
                    desc: 'Every action is cryptographically signed. Tampering is detectable. Audit trail is immutable.',
                  },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-xl p-5">
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="Adding New Systems">
              <CodeBlock
                language="typescript"
                title="extending-workflow.ts"
                code={`// 1. Define new MCP tools
const payrollTools = defineTools({
  name: 'payroll-integration',
  tools: [
    payrollEnrollEmployee,
    payrollSetDirectDeposit,
    payrollVerifyTaxForms,
  ],
});

// 2. Update policy bundle
// policies/payroll-access.yaml
/*
policies:
  - name: payroll_data_access
    rules:
      - if:
          requester.role: [payroll_admin, onboarding_bot]
        then: allow
      - else: deny
*/

// 3. Extend workflow state machine
// workflows/onboarding.weil
/*
state PAYROLL_ENROLLED {
  entry: IDENTITY_PROVISIONED
  tools: [payrollEnrollEmployee, payrollSetDirectDeposit]
  next: COMMS_SCHEDULED
  on_error: ERROR_PAYROLL
}
*/

// 4. Register with MCP manifest
export const extendedTools = defineTools({
  name: 'enterprise-onboarding-extended',
  extends: 'enterprise-onboarding',
  tools: [...onboardingTools.tools, ...payrollTools.tools],
});`}
              />
            </SubSection>

            <SubSection title="Governance Checklist">
              <div className="glass rounded-xl p-5">
                <ul className="space-y-3">
                  {[
                    'All tools must have JSON schema validation for inputs/outputs',
                    'All tool calls must go through policy evaluation',
                    'All state transitions must produce signed receipts',
                    'All credentials must be rotated quarterly',
                    'All policy changes must be version-controlled and auditable',
                    'All workflow definitions must pass security linting',
                    'All external API calls must use mTLS',
                    'All PII must be encrypted at rest and in transit',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-success text-xs">✓</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SubSection>
          </Section>

          {/* Footer */}
          <footer className="py-12 border-t border-border mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Enterprise Onboarding Copilot Specification v1.0
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">Built for</span>
                <span className="font-semibold gradient-text">Icarus + WeilChain</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
