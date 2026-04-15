'use client';

import { AuthCard } from '@/src/components/auth/auth-card';
import { AdminLoginForm } from '@/src/components/auth/admin-login-form';

export function AdminLoginPageContent() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.14),transparent_45%),linear-gradient(160deg,#f8fafc,#eef2ff_55%,#e2e8f0)]" />
      <section className="relative z-10 w-full max-w-md">
        <AuthCard description="Access the NTI admin console" title="Sign In">
          <AdminLoginForm />
        </AuthCard>
      </section>
    </main>
  );
}
