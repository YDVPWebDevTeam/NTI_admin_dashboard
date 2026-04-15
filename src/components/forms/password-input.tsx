'use client';

import { Eye, EyeOff } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

import { Input } from '@/src/components/shadcn/input';
import { cn } from '@/src/lib/utils';

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type'> & {
  showLabel?: string;
  hideLabel?: string;
  toggleButtonClassName?: string;
};

export function PasswordInput({
  className,
  hideLabel = 'Hide password',
  showLabel = 'Show password',
  toggleButtonClassName,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input {...props} className={cn('pr-10', className)} type={isVisible ? 'text' : 'password'} />
      <button
        aria-label={isVisible ? hideLabel : showLabel}
        aria-pressed={isVisible}
        className={cn(
          'absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-700',
          toggleButtonClassName,
        )}
        onClick={() => setIsVisible((current) => !current)}
        type="button"
      >
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
