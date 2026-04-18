import { api } from '@/src/lib/api/base-client';

import { adminSystemInvitesEndpoints } from './endpoints';

import type { CreateSystemInviteRequest, SystemInvite } from './types';

export const adminSystemInvitesService = {
  createSystemInvite(payload: CreateSystemInviteRequest) {
    return api.post<SystemInvite, CreateSystemInviteRequest>(
      adminSystemInvitesEndpoints.invites,
      payload,
    );
  },
};
