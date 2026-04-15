'use client';

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

  return (
    <Button
      onClick={async () => {
        await logout();
        queryClient.setQueryData(['auth', 'session'], null);
        await queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
        setErrorMessage(null);
        router.replace(ROUTES.LOGIN);
      }}
      variant="outline"
    >
      Log out
    </Button>
  );
}
