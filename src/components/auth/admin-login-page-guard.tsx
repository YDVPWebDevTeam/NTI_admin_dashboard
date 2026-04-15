'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '@/src/lib/constants/routes';
import { useAdminSessionQuery } from '@/src/lib/api/auth/queries';
import { UserRole } from '@/src/lib/api/auth/types';
import { AdminLoginPageContent } from '@/src/components/auth/admin-login-page-content';
import { useAuthStore } from '@/src/store/auth-store';

export function AdminLoginPageGuard() {
  const router = useRouter();
  const localUser = useAuthStore((state) => state.user);
  const { data: session, isLoading } = useAdminSessionQuery();
  const effectiveRole = localUser?.role ?? session?.user?.role;
  const hasAdminAccess = effectiveRole === UserRole.ADMIN || effectiveRole === UserRole.SUPER_ADMIN;

  useEffect(() => {
    if (!isLoading && hasAdminAccess) {
      router.replace(ROUTES.ROOT);
    }
  }, [hasAdminAccess, isLoading, router]);

  if (!localUser && isLoading) {
    return <main className="min-h-screen bg-slate-50" />;
  }

  if (hasAdminAccess) {
    return null;
  }

  return <AdminLoginPageContent />;
}
