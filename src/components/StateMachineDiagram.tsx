const StateMachineDiagram = () => {
  const states = [
    { id: 'intent', label: 'INTENT_PARSED', x: 100, y: 50, type: 'start' },
    { id: 'hr_valid', label: 'HR_VALIDATED', x: 300, y: 50, type: 'process' },
    { id: 'policy', label: 'POLICY_RESOLVED', x: 500, y: 50, type: 'process' },
    { id: 'approval_pending', label: 'APPROVALS_PENDING', x: 700, y: 50, type: 'waiting' },
    { id: 'approval_done', label: 'APPROVALS_COMPLETED', x: 500, y: 150, type: 'success' },
    { id: 'approval_deny', label: 'ERROR_APPROVAL_DENIED', x: 700, y: 150, type: 'error' },
    { id: 'itsm', label: 'ITSM_CREATED', x: 300, y: 150, type: 'process' },
    { id: 'identity', label: 'IDENTITY_PROVISIONED', x: 100, y: 150, type: 'process' },
    { id: 'identity_err', label: 'ERROR_IDENTITY', x: 100, y: 250, type: 'error' },
    { id: 'comms', label: 'COMMS_SCHEDULED', x: 300, y: 250, type: 'process' },
    { id: 'verified', label: 'VERIFIED', x: 500, y: 250, type: 'success' },
    { id: 'complete', label: 'COMPLETED', x: 700, y: 250, type: 'end' },
  ];

  const transitions = [
    { from: 'intent', to: 'hr_valid' },
    { from: 'hr_valid', to: 'policy' },
    { from: 'policy', to: 'approval_pending' },
    { from: 'approval_pending', to: 'approval_done', label: 'approved' },
    { from: 'approval_pending', to: 'approval_deny', label: 'denied' },
    { from: 'approval_done', to: 'itsm' },
    { from: 'itsm', to: 'identity' },
    { from: 'identity', to: 'identity_err', label: 'error' },
    { from: 'identity', to: 'comms', label: 'success' },
    { from: 'comms', to: 'verified' },
    { from: 'verified', to: 'complete' },
  ];

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'start':
        return { fill: 'fill-primary/30', stroke: 'stroke-primary', text: 'text-primary' };
      case 'process':
        return { fill: 'fill-secondary', stroke: 'stroke-border', text: 'text-foreground' };
      case 'waiting':
        return { fill: 'fill-warning/20', stroke: 'stroke-warning', text: 'text-warning' };
      case 'success':
        return { fill: 'fill-success/20', stroke: 'stroke-success', text: 'text-success' };
      case 'error':
        return { fill: 'fill-destructive/20', stroke: 'stroke-destructive', text: 'text-destructive' };
      case 'end':
        return { fill: 'fill-accent/20', stroke: 'stroke-accent', text: 'text-accent' };
      default:
        return { fill: 'fill-secondary', stroke: 'stroke-border', text: 'text-foreground' };
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-muted/20 p-4">
      <svg viewBox="0 0 850 320" className="w-full min-w-[800px] h-auto">
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" className="fill-muted-foreground" />
          </marker>
        </defs>

        {/* Transitions */}
        {transitions.map((t, i) => {
          const from = states.find(s => s.id === t.from);
          const to = states.find(s => s.id === t.to);
          if (!from || !to) return null;

          const fromX = from.x + 70;
          const fromY = from.y + 15;
          const toX = to.x - 10;
          const toY = to.y + 15;

          // Calculate control points for curved lines
          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;
          
          const dx = toX - fromX;
          const dy = toY - fromY;
          const isSameRow = Math.abs(dy) < 50;

          return (
            <g key={i}>
              {isSameRow ? (
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  className="stroke-muted-foreground"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                />
              ) : (
                <path
                  d={`M ${fromX} ${fromY} Q ${fromX + 30} ${midY} ${toX} ${toY}`}
                  className="stroke-muted-foreground"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrow)"
                />
              )}
              {t.label && (
                <text
                  x={midX}
                  y={midY - 5}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[8px] font-mono"
                >
                  {t.label}
                </text>
              )}
            </g>
          );
        })}

        {/* States */}
        {states.map((state) => {
          const colors = getNodeColor(state.type);
          return (
            <g key={state.id} transform={`translate(${state.x - 60}, ${state.y})`}>
              <rect
                width="120"
                height="30"
                rx="6"
                className={`${colors.fill} ${colors.stroke}`}
                strokeWidth="1.5"
              />
              <text
                x="60"
                y="19"
                textAnchor="middle"
                className={`${colors.text} text-[8px] font-mono font-medium`}
              >
                {state.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default StateMachineDiagram;
