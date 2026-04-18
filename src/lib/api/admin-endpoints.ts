import { adminOrganizationsEndpoints } from './organizations/endpoints';
import { adminSystemInvitesEndpoints } from './system-invites/endpoints';
import { adminUsersEndpoints } from './users/endpoints';

export { adminUsersEndpoints } from './users/endpoints';
export { adminSystemInvitesEndpoints } from './system-invites/endpoints';
export { adminOrganizationsEndpoints } from './organizations/endpoints';

export const adminEndpoints = {
  users: adminUsersEndpoints.users,
  userById: adminUsersEndpoints.userById,
  updateUserStatus: adminUsersEndpoints.updateUserStatus,
  invites: adminSystemInvitesEndpoints.invites,
  updateOrganizationStatus: adminOrganizationsEndpoints.updateOrganizationStatus,
  organizationInvites: adminOrganizationsEndpoints.organizationInvites,
  organizationInvitesByOrganization: adminOrganizationsEndpoints.organizationInvitesByOrganization,
} as const;
