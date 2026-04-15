'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  forceChangePasswordSchema,
  type ForceChangePasswordSchema,
} from '@/src/lib/api/auth/schemas';
import { ROUTES } from '@/src/lib/constants/routes';
import { useAuthStore } from '@/src/store/auth-store';

export function ForceChangePasswordForm() {
  const router = useRouter();
  const form = useForm<ForceChangePasswordSchema>({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(forceChangePasswordSchema),
  });

  const forceChangePassword = useAuthStore((state) => state.forceChangePassword);
  const isBusy = useAuthStore((state) => state.isBusy);

  const onSubmit = useCallback(
    async (values: ForceChangePasswordSchema) => {
      try {
        await forceChangePassword(values);
        toast.success('Password updated successfully.');
        router.push(ROUTES.ROOT);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to change password.');
      }
    },
    [forceChangePassword, router],
  );

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="new-password"
                  hideLabel="Hide new password"
                  placeholder="NewStrongPass123!"
                  showLabel="Show new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="new-password"
                  hideLabel="Hide confirm password"
                  showLabel="Show confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isBusy} type="submit">
          {isBusy ? 'Updating password...' : 'Update password'}
        </Button>
      </form>
    </Form>
  );
}
