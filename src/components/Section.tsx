import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const Section = ({ id, title, subtitle, children }: SectionProps) => {
  return (
    <section id={id} className="scroll-mt-8 py-12 border-b border-border last:border-0">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight gradient-text mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};

interface SubSectionProps {
  title: string;
  children: ReactNode;
}

export const SubSection = ({ title, children }: SubSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
};
