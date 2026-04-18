import { buildPathWithId } from '../shared/path';

export const adminOrganizationsEndpoints = {
  updateOrganizationStatus: (id: string) =>
    buildPathWithId('/v1/admin/organizations', id) + '/status',
  organizationInvites: '/v1/admin/organizations/invites',
  organizationInvitesByOrganization: (id: string) =>
    buildPathWithId('/v1/admin/organizations', id) + '/invites',
} as const;
