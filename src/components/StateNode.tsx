import { ReactNode } from 'react';

interface StateNodeProps {
  name: string;
  variant?: 'default' | 'active' | 'error' | 'success';
  children?: ReactNode;
}

export const StateNode = ({ name, variant = 'default', children }: StateNodeProps) => {
  const variants = {
    default: 'bg-secondary border-border text-secondary-foreground',
    active: 'bg-primary/20 border-primary text-primary animate-pulse-glow',
    error: 'bg-destructive/20 border-destructive text-destructive',
    success: 'bg-success/20 border-success text-success',
  };

  return (
    <div className={`px-4 py-2 rounded-lg border ${variants[variant]} text-sm font-medium font-mono`}>
      {name}
      {children}
    </div>
  );
};

interface StateFlowProps {
  states: Array<{
    name: string;
    variant?: 'default' | 'active' | 'error' | 'success';
  }>;
}

export const StateFlow = ({ states }: StateFlowProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {states.map((state, index) => (
        <div key={state.name} className="flex items-center gap-2">
          <StateNode name={state.name} variant={state.variant} />
          {index < states.length - 1 && (
            <div className="text-muted-foreground">→</div>
          )}
        </div>
      ))}
    </div>
  );
};
