'use client';

import { create } from 'zustand';
import {
  AuthStatus,
  type AdminLoginRequest,
  type AuthUser,
  type ForceChangePasswordRequest,
  isAdminRole,
  UserRole,
} from '@/src/lib/api/auth/types';
import { authService } from '@/src/lib/api/auth/service';

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;
  isBusy: boolean;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
  loginAdmin: (
    payload: AdminLoginRequest,
  ) => Promise<AuthStatus.AUTHENTICATED | AuthStatus.REQUIRES_PASSWORD_CHANGE>;
  forceChangePassword: (payload: ForceChangePasswordRequest) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
}

function hasRequiredRole(userRole: UserRole, requiredRole: UserRole): boolean {
  if (userRole === requiredRole) {
    return true;
  }

  return userRole === UserRole.SUPER_ADMIN && requiredRole === UserRole.ADMIN;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: AuthStatus.IDLE,
  isBusy: false,
  errorMessage: null,

  setErrorMessage: (message) => set({ errorMessage: message }),

  async loginAdmin(payload) {
    set({ errorMessage: null, isBusy: true, status: AuthStatus.LOADING });

    try {
      const response = await authService.loginAdmin(payload);

      if (response.requiresPasswordChange) {
        set({
          user: null,
          status: AuthStatus.REQUIRES_PASSWORD_CHANGE,
          isBusy: false,
        });

        return AuthStatus.REQUIRES_PASSWORD_CHANGE;
      }

      if (!response.user || !isAdminRole(response.user.role)) {
        throw new Error('Admin access is required.');
      }

      set({
        user: response.user,
        status: AuthStatus.AUTHENTICATED,
        isBusy: false,
      });

      return AuthStatus.AUTHENTICATED;
    } catch (error) {
      set({
        user: null,
        status: AuthStatus.ANONYMOUS,
        errorMessage: error instanceof Error ? error.message : 'Unable to log in.',
        isBusy: false,
      });
      throw error;
    }
  },

  async forceChangePassword(payload) {
    set({ errorMessage: null, isBusy: true, status: AuthStatus.LOADING });

    try {
      const response = await authService.forceChangePassword(payload);

      if (!response.user || !isAdminRole(response.user.role)) {
        throw new Error('Admin access is required.');
      }

      set({
        user: response.user,
        status: AuthStatus.AUTHENTICATED,
        isBusy: false,
      });
    } catch (error) {
      set({
        user: null,
        status: AuthStatus.ANONYMOUS,
        errorMessage: error instanceof Error ? error.message : 'Unable to change password.',
        isBusy: false,
      });
      throw error;
    }
  },

  async logout() {
    set({ isBusy: true, errorMessage: null });

    try {
      await authService.logout();
    } finally {
      set({
        user: null,
        status: AuthStatus.ANONYMOUS,
        isBusy: false,
      });
    }
  },

  hasRole(roles) {
    const role = get().user?.role;

    if (!role) {
      return false;
    }

    return roles.some((requiredRole) => hasRequiredRole(role, requiredRole));
  },
}));
