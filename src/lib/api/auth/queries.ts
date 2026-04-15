'use client';

import { useQuery } from '@tanstack/react-query';
import { UserRole } from './types';
import { authService } from '@/src/lib/api/auth/service';

export function isAdminRole(role?: UserRole): role is UserRole.ADMIN | UserRole.SUPER_ADMIN {
  return role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;
}

export function useAuthSessionQuery() {
  return useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      try {
        return await authService.refresh();
      } catch {
        return null;
      }
    },
  });
}

export function useAdminSessionQuery() {
  const query = useAuthSessionQuery();
  const role = query.data?.user?.role;

  return {
    ...query,
    isAdmin: isAdminRole(role),
  };
}
