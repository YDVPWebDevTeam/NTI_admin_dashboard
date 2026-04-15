export enum UserRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  STUDENT = 'STUDENT',
  COMPANY_PARTNER = 'COMPANY_PARTNER',
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  status: string;
  refreshTokenId?: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  user?: AuthUser;
  requiresPasswordChange: boolean;
}

export interface ForceChangePasswordRequest {
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthSessionResponse {
  user: AuthUser;
}

export interface LogoutResponse {
  success: boolean;
}
