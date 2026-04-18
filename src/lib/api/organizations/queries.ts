'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { adminQueryKeys } from '@/src/lib/api/admin-query-keys';
import { adminOrganizationsService } from './service';
import type { OrganizationReviewStatus } from './types';

type ChangeOrganizationStatusInput = {
  id: string;
  status: OrganizationReviewStatus;
  rejectionReason?: string;
};

export function useOrganizationInvites() {
  return useQuery({
    queryKey: adminQueryKeys.organizationInvites(),
    queryFn: () => adminOrganizationsService.getOrganizationInvites(),
  });
}

export function useChangeOrganizationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, rejectionReason }: ChangeOrganizationStatusInput) =>
      adminOrganizationsService.updateOrganizationStatus(id, {
        status,
        rejectionReason: status === 'REJECTED' ? (rejectionReason ?? 'Admin rejected') : undefined,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: adminQueryKeys.organizationInvites(),
      });
    },
  });
}
