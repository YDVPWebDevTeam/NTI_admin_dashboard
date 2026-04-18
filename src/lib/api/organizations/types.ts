import { type UserRole } from '@/src/lib/api/auth/types';

export const organizationReviewStatuses = ['ACTIVE', 'REJECTED'] as const;
export type OrganizationReviewStatus = (typeof organizationReviewStatuses)[number];

export interface UpdateOrganizationStatusRequest {
  status: OrganizationReviewStatus;
  rejectionReason?: string;
}

export interface OrganizationSummary {
  id: string;
  name: string;
  status: string;
  website: string | null;
  sector: string | null;
  description: string | null;
  logoUrl: string | null;
  ico: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationInvite {
  id: string;
  email: string;
  roleToAssign: UserRole;
  status: string;
  organizationId: string;
  revokedById: unknown;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  acceptedAt: string | null;
  revokedAt: string | null;
}
