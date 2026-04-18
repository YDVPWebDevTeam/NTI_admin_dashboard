import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="text-slate-500">{description}</p>
    </div>
  );
}
