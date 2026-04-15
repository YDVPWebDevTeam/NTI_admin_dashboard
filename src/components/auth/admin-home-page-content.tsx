'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '@/src/lib/constants/routes';
import { useAdminSessionQuery } from '@/src/lib/api/auth/queries';
import { UserRole } from '@/src/lib/api/auth/types';
import { LogoutButton } from '@/src/components/auth/logout-button';
import { useAuthStore } from '@/src/store/auth-store';

export function AdminHomePageContent() {
  const router = useRouter();
  const localUser = useAuthStore((state) => state.user);
  const { data: session, isLoading } = useAdminSessionQuery();
  const effectiveUser = localUser ?? session?.user ?? null;
  const hasAdminAccess =
    effectiveUser?.role === UserRole.ADMIN || effectiveUser?.role === UserRole.SUPER_ADMIN;

  useEffect(() => {
    if (!isLoading && !hasAdminAccess) {
      router.replace(ROUTES.LOGIN);
    }
  }, [hasAdminAccess, isLoading, router]);

  if (!effectiveUser && isLoading) {
    return <main className="min-h-screen bg-slate-50" />;
  }

  if (!hasAdminAccess) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-5">
        <div>
          <h1 className="text-xl font-semibold">NTI Admin Portal</h1>
          <p className="text-sm text-slate-600">Signed in as {effectiveUser.email}</p>
        </div>
        <LogoutButton />
      </div>
    </main>
  );
}
