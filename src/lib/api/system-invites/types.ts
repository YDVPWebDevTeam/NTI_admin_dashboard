import { type UserRole, userRoles } from '@/src/lib/api/auth/types';

export const systemInviteRoles = [...userRoles] as const;
export type SystemInviteRole = (typeof systemInviteRoles)[number];

export interface CreateSystemInviteRequest {
  email: string;
  roleToAssign: SystemInviteRole;
}

export interface SystemInvite {
  id: string;
  email: string;
  roleToAssign: UserRole;
  status: string;
  createdAt: string;
  expiresAt: string;
}
