import { buildPathWithId } from '../shared/path';

export const adminUsersEndpoints = {
  users: '/v1/admin/users',
  userById: (id: string) => buildPathWithId('/v1/admin/users', id),
  updateUserStatus: (id: string) => buildPathWithId('/v1/admin/users', id) + '/status',
} as const;
