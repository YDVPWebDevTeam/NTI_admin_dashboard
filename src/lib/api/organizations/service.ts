import { api } from '@/src/lib/api/base-client';

import { adminOrganizationsEndpoints } from './endpoints';

import type {
  OrganizationInvite,
  OrganizationSummary,
  UpdateOrganizationStatusRequest,
} from './types';

export const adminOrganizationsService = {
  updateOrganizationStatus(id: string, payload: UpdateOrganizationStatusRequest) {
    return api.patch<OrganizationSummary, UpdateOrganizationStatusRequest>(
      adminOrganizationsEndpoints.updateOrganizationStatus(id),
      payload,
    );
  },

  getOrganizationInvites() {
    return api.get<OrganizationInvite[]>(adminOrganizationsEndpoints.organizationInvites);
  },

  getOrganizationInvitesByOrganization(id: string) {
    return api.get<OrganizationInvite[]>(
      adminOrganizationsEndpoints.organizationInvitesByOrganization(id),
    );
  },
};
