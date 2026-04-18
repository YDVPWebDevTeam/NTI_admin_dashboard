'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Building2, Send, LayoutDashboard } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ROUTES } from '@/src/lib/constants/routes';
import { LogoutButton } from '@/src/components/auth/logout-button';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', href: ROUTES.ROOT, icon: LayoutDashboard },
  { name: 'Users', href: ROUTES.ADMIN_USERS, icon: Users },
  { name: 'Organizations', href: ROUTES.ADMIN_ORGANIZATIONS, icon: Building2 },
  { name: 'System Invites', href: ROUTES.ADMIN_SYSTEM_INVITES, icon: Send },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-64 flex-col border-r border-slate-800 bg-slate-900 text-slate-300">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold tracking-tight text-white">NTI Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white',
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-white',
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <LogoutButton />
    </div>
  );
}
