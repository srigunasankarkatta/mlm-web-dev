// Export all API services
export { default as CustomerAuthService } from './auth-service';
export { default as customerPackageService } from './package-service';
export { defaultApiService, generalApiService, createCustomApiService } from './api-service-factory';
export { API_CONFIG, getBaseURL, getCustomerBaseURL, buildApiUrl, buildCustomerApiUrl } from './api-config';

// Export types
export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  OtpRequest,
  OtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ProfileResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from './auth-service';

export type {
  MLMPackage,
  PackageDetail,
  PackagesListParams,
  PackagesListResponse,
  PurchasePackageRequest,
  PurchasePackageResponse,
  UserPackagesResponse,
  UpgradePackageRequest,
  UpgradePackageResponse,
  PackageComparisonResponse,
} from './package-service';
