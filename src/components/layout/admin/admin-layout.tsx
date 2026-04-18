'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '@/src/lib/constants/routes';
import { useAdminSessionQuery } from '@/src/lib/api/auth/queries';
import { isAdminRole } from '@/src/lib/api/auth/types';
import { useAuthStore } from '@/src/store/auth-store';
import { Sidebar } from './sidebar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const localUser = useAuthStore((state) => state.user);
  const { data: session, isLoading } = useAdminSessionQuery();
  const effectiveUser = localUser ?? session?.user ?? null;
  const hasAdminAccess = isAdminRole(effectiveUser?.role);

  useEffect(() => {
    if (!isLoading && !hasAdminAccess) {
      router.replace(ROUTES.LOGIN);
    }
  }, [hasAdminAccess, isLoading, router]);

  if (!effectiveUser && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">Loading...</div>
    );
  }

  if (!hasAdminAccess) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-end border-b bg-white px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-slate-600">{effectiveUser.email}</span>
              <span className="text-xs text-slate-400 capitalize">
                {effectiveUser.role.replaceAll('_', ' ').toLowerCase()}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
