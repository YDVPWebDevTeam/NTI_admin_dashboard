import { adminOrganizationsService } from './organizations/service';
import { adminSystemInvitesService } from './system-invites/service';
import { adminUsersService } from './users/service';

export { adminUsersService } from './users/service';
export { adminSystemInvitesService } from './system-invites/service';
export { adminOrganizationsService } from './organizations/service';

export const adminService = {
  ...adminUsersService,
  ...adminSystemInvitesService,
  ...adminOrganizationsService,
};
