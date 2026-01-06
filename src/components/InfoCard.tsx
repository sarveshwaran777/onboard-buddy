import { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface InfoCardProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: ReactNode;
}

export const InfoCard = ({ type = 'info', title, children }: InfoCardProps) => {
  const config = {
    info: {
      icon: Info,
      bg: 'bg-info/10',
      border: 'border-info/30',
      text: 'text-info',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      text: 'text-warning',
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-success/10',
      border: 'border-success/30',
      text: 'text-success',
    },
    error: {
      icon: XCircle,
      bg: 'bg-destructive/10',
      border: 'border-destructive/30',
      text: 'text-destructive',
    },
  };

  const { icon: Icon, bg, border, text } = config[type];

  return (
    <div className={`${bg} ${border} border rounded-xl p-4`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${text} flex-shrink-0 mt-0.5`} />
        <div className="space-y-1">
          {title && <p className={`font-medium ${text}`}>{title}</p>}
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
};
