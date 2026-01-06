import { CheckCircle2, Circle, XCircle, Clock } from 'lucide-react';
import type { WorkflowState } from '@/types/workflow';
import { STATE_ORDER, STATE_LABELS } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface WorkflowTimelineProps {
  currentState: WorkflowState;
}

export function WorkflowTimeline({ currentState }: WorkflowTimelineProps) {
  const currentIndex = STATE_ORDER.indexOf(currentState);
  const isError = currentState.startsWith('ERROR');

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-thin">
      {STATE_ORDER.map((state, index) => {
        const isPast = index < currentIndex;
        const isCurrent = state === currentState || (isError && index === currentIndex);
        const isFuture = index > currentIndex;

        return (
          <div key={state} className="flex items-center">
            <div className="flex flex-col items-center min-w-[80px]">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                  isPast && 'bg-success/20 text-success',
                  isCurrent && !isError && 'bg-primary/20 text-primary ring-2 ring-primary',
                  isCurrent && isError && 'bg-destructive/20 text-destructive ring-2 ring-destructive',
                  isFuture && 'bg-muted text-muted-foreground'
                )}
              >
                {isPast ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isCurrent && isError ? (
                  <XCircle className="w-4 h-4" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </div>
              <span
                className={cn(
                  'text-xs mt-1.5 text-center leading-tight',
                  isPast && 'text-success',
                  isCurrent && !isError && 'text-primary font-medium',
                  isCurrent && isError && 'text-destructive font-medium',
                  isFuture && 'text-muted-foreground'
                )}
              >
                {STATE_LABELS[state]}
              </span>
            </div>
            {index < STATE_ORDER.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 mx-1',
                  index < currentIndex ? 'bg-success' : 'bg-border'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
