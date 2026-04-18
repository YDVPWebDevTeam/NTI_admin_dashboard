export const adminQueryKeys = {
  all: ['admin'] as const,
  users: () => [...adminQueryKeys.all, 'users'] as const,
  organizationInvites: () => [...adminQueryKeys.all, 'organization-invites'] as const,
} as const;
