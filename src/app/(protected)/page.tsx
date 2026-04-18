import { PageHeader } from '@/src/components/ui/page-header';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard Overview" description="Welcome to the NTI Admin dashboard." />
    </div>
  );
}
