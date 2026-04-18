'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/src/components/shadcn/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/shadcn/form';
import { PasswordInput } from '../forms/password-input';
import { Input } from '@/src/components/shadcn/input';
import { adminLoginSchema, type AdminLoginSchema } from '@/src/lib/api/auth/schemas';
import { AuthStatus } from '@/src/lib/api/auth/types';
import { ROUTES } from '@/src/lib/constants/routes';
import { useAuthStore } from '@/src/store/auth-store';

export function AdminLoginForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<AdminLoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(adminLoginSchema),
  });

  const loginAdmin = useAuthStore((state) => state.loginAdmin);
  const isBusy = useAuthStore((state) => state.isBusy);

  const onSubmit = useCallback(
    async (values: AdminLoginSchema) => {
      try {
        const result = await loginAdmin(values);

        if (result === AuthStatus.REQUIRES_PASSWORD_CHANGE) {
          toast.info('Password change is required to continue.');
          router.push(ROUTES.FORCE_CHANGE_PASSWORD);

          return;
        }

        toast.success('Welcome back.');
        await queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
        router.push(ROUTES.ROOT);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to log in.');
      }
    },
    [loginAdmin, queryClient, router],
  );

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoComplete="email" placeholder="admin@nti.sk" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isBusy} type="submit">
          {isBusy ? 'Signing in...' : 'Sign in as admin'}
        </Button>
      </form>
    </Form>
  );
}
