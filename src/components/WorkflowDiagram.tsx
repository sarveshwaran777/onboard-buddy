const WorkflowDiagram = () => {
  const nodes = [
    { id: 'user', label: 'User Request', x: 50, y: 150, type: 'input' },
    { id: 'icarus', label: 'Icarus NL Interface', x: 200, y: 150, type: 'process' },
    { id: 'mcp', label: 'MCP Server', x: 350, y: 150, type: 'process' },
    { id: 'weil', label: 'Weil-SDK Engine', x: 500, y: 150, type: 'core' },
    { id: 'weilpod', label: 'Weilpod Runtime', x: 650, y: 150, type: 'core' },
    { id: 'chain', label: 'WeilChain', x: 800, y: 150, type: 'output' },
    
    { id: 'hris', label: 'HRIS', x: 500, y: 50, type: 'external' },
    { id: 'itsm', label: 'ITSM', x: 600, y: 50, type: 'external' },
    { id: 'identity', label: 'Identity', x: 700, y: 50, type: 'external' },
    { id: 'comms', label: 'Email/Calendar', x: 500, y: 250, type: 'external' },
    { id: 'policy', label: 'Policy Engine', x: 650, y: 250, type: 'external' },
  ];

  const connections = [
    { from: 'user', to: 'icarus' },
    { from: 'icarus', to: 'mcp' },
    { from: 'mcp', to: 'weil' },
    { from: 'weil', to: 'weilpod' },
    { from: 'weilpod', to: 'chain' },
    { from: 'weil', to: 'hris', dashed: true },
    { from: 'weil', to: 'itsm', dashed: true },
    { from: 'weil', to: 'identity', dashed: true },
    { from: 'weil', to: 'comms', dashed: true },
    { from: 'weil', to: 'policy', dashed: true },
  ];

  const getNodeStyle = (type: string) => {
    switch (type) {
      case 'input':
        return 'fill-primary/20 stroke-primary';
      case 'process':
        return 'fill-secondary stroke-border';
      case 'core':
        return 'fill-accent/20 stroke-accent';
      case 'external':
        return 'fill-info/20 stroke-info';
      case 'output':
        return 'fill-success/20 stroke-success';
      default:
        return 'fill-secondary stroke-border';
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-muted/20 p-4">
      <svg viewBox="0 0 900 320" className="w-full min-w-[800px] h-auto">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-muted-foreground" />
          </marker>
          <marker
            id="arrowhead-dashed"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-info/50" />
          </marker>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from);
          const to = nodes.find(n => n.id === conn.to);
          if (!from || !to) return null;

          const fromX = from.x + 60;
          const fromY = from.y;
          const toX = to.x - 10;
          const toY = to.y;

          return (
            <line
              key={i}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              className={conn.dashed ? 'stroke-info/40' : 'stroke-muted-foreground'}
              strokeWidth="1.5"
              strokeDasharray={conn.dashed ? '5,5' : undefined}
              markerEnd={conn.dashed ? 'url(#arrowhead-dashed)' : 'url(#arrowhead)'}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x - 50}, ${node.y - 20})`}>
            <rect
              width="100"
              height="40"
              rx="8"
              className={getNodeStyle(node.type)}
              strokeWidth="1.5"
            />
            <text
              x="50"
              y="25"
              textAnchor="middle"
              className="fill-foreground text-[10px] font-medium"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default WorkflowDiagram;
