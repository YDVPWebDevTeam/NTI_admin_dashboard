import { type UserRole } from '@/src/lib/api/auth/types';

export const updatableUserStatuses = ['ACTIVE', 'SUSPENDED'] as const;
export type UpdatableUserStatus = (typeof updatableUserStatuses)[number];

export type AdminUserRole = UserRole;

export interface AdminUser {
  id: string;
  email: string;
  role: AdminUserRole;
  status: string;
}

export interface UpdateUserStatusRequest {
  status: UpdatableUserStatus;
}
