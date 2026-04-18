'use client';

import { useChangeOrganizationStatus, useOrganizationInvites } from '@/src/lib/api/admin-queries';
import type { OrganizationReviewStatus } from '@/src/lib/api/organizations/types';
import { Badge } from '@/src/components/shadcn/badge';
import { Button } from '@/src/components/shadcn/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/src/components/ui/page-header';

export default function OrganizationsPage() {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: invites, isLoading, error } = useOrganizationInvites();
  const { mutateAsync: changeOrganizationStatus, isPending } = useChangeOrganizationStatus();

  const handleUpdateStatus = async (orgId: string, status: OrganizationReviewStatus) => {
    setUpdatingId(orgId);

    try {
      await changeOrganizationStatus({ id: orgId, status });
      toast.success(`Organization status updated to ${status}`);
    } catch {
      toast.error('Failed to update organization status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Organizations"
        description="View and review organization status (via invites data)."
      />

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : error ? (
        <div className="rounded-md bg-red-50 p-4 text-red-500">
          Failed to load organizations. Please try again.
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="border-b border-slate-200 px-6 py-4 font-medium">Email</th>
                <th className="border-b border-slate-200 px-6 py-4 font-medium">Organization ID</th>
                <th className="border-b border-slate-200 px-6 py-4 font-medium">Role To Assign</th>
                <th className="border-b border-slate-200 px-6 py-4 font-medium">Status</th>
                <th className="border-b border-slate-200 px-6 py-4 text-right font-medium">
                  Org Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invites?.map((invite) => (
                <tr key={invite.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{invite.email}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">
                    {invite.organizationId}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{invite.roleToAssign}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary">{invite.status}</Badge>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPending && updatingId === invite.organizationId}
                      onClick={() => handleUpdateStatus(invite.organizationId, 'ACTIVE')}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      {isPending && updatingId === invite.organizationId ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Approve Org'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPending && updatingId === invite.organizationId}
                      onClick={() => handleUpdateStatus(invite.organizationId, 'REJECTED')}
                      className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    >
                      {isPending && updatingId === invite.organizationId ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Reject Org'
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
              {invites?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
