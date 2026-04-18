'use client';

import { useChangeUserStatus, useUsers } from '@/src/lib/api/admin-queries';
import { isAdminRole } from '@/src/lib/api/auth/types';
import type { UpdatableUserStatus } from '@/src/lib/api/users/types';
import { Badge } from '@/src/components/shadcn/badge';
import { Button } from '@/src/components/shadcn/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/src/components/ui/page-header';

export default function UsersPage() {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: users, isLoading, error } = useUsers();
  const { mutateAsync: changeUserStatus, isPending } = useChangeUserStatus();

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setUpdatingId(id);
    const newStatus: UpdatableUserStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

    try {
      await changeUserStatus({ id, status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update user status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Users Management" description="View and manage system users." />

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : error ? (
        <div className="rounded-md bg-red-50 p-4 text-red-500">
          Failed to load users. Please try again.
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="border-b border-slate-200 px-6 py-4 font-medium">Email</th>
                <th className="border-b border-slate-200 px-6 py-4 font-medium">Role</th>
                <th className="border-b border-slate-200 px-6 py-4 font-medium">Status</th>
                <th className="border-b border-slate-200 px-6 py-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="font-mono">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        user.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }
                      variant="secondary"
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {!isAdminRole(user.role) && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isPending && updatingId === user.id}
                        onClick={() => handleToggleStatus(user.id, user.status)}
                      >
                        {isPending && updatingId === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : user.status === 'ACTIVE' ? (
                          'Suspend'
                        ) : (
                          'Activate'
                        )}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {users?.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No users found.
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
