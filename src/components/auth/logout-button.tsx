'use client';

import { LogOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button } from '@/src/components/shadcn/button';
import { ROUTES } from '@/src/lib/constants/routes';
import { useAuthStore } from '@/src/store/auth-store';

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = useAuthStore((state) => state.logout);
  const setErrorMessage = useAuthStore((state) => state.setErrorMessage);

  const handleLogout = async () => {
    await logout();
    queryClient.setQueryData(['auth', 'session'], null);
    await queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
    setErrorMessage(null);
    router.replace(ROUTES.LOGIN);
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="hover:none cursor-pointer gap-2 text-white"
    >
      <LogOut className="h-4 w-4" />
      Log out
    </Button>
  );
}
