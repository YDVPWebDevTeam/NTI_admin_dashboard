'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { AuthCard } from '@/src/components/auth/auth-card';
import { ForceChangePasswordForm } from '@/src/components/auth/force-change-password-form';
import { AuthStatus } from '@/src/lib/api/auth/types';
import { ROUTES } from '@/src/lib/constants/routes';
import { useAuthStore } from '@/src/store/auth-store';

export default function ForceChangePasswordPage() {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    if (status === AuthStatus.AUTHENTICATED) {
      router.replace(ROUTES.ROOT);
    }
  }, [router, status]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.14),transparent_45%),linear-gradient(160deg,#f8fafc,#eef2ff_55%,#e2e8f0)]" />
      <section className="relative z-10 w-full max-w-md">
        <AuthCard
          description="Your account must rotate password before normal session tokens are issued."
          title="Set New Password"
        >
          <ForceChangePasswordForm />
          <p className="mt-5 text-center text-sm text-slate-600">
            Back to{' '}
            <Link className="font-medium text-blue-700 hover:text-blue-800" href={ROUTES.LOGIN}>
              admin login
            </Link>
          </p>
        </AuthCard>
      </section>
    </main>
  );
}
