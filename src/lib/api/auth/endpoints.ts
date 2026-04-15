export const authEndpoints = {
  loginAdmin: '/v1/auth/admin/login',
  forceChangePassword: '/v1/auth/force-change-password',
  refresh: '/v1/auth/refresh',
  logout: '/v1/auth/logout',
} as const;
