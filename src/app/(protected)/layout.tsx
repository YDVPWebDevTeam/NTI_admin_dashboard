import { AdminLayout } from '@/src/components/layout/admin/admin-layout';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
