import { backofficeApi } from '../api';
import { 
  LoginCredentials, 
  LoginResponse, 
  OtpVerification, 
  ApiResponse,
  User 
} from '@/types/api.types';

class BackofficeAuthService {
  /**
   * Login no backoffice
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    const response = await backofficeApi.post<ApiResponse<LoginResponse>>('/backoffice/auth/login', credentials);
    return response.data;
  }

  /**
   * Verificar OTP do backoffice
   */
  async verifyOtp(verification: OtpVerification): Promise<ApiResponse<LoginResponse>> {
    const response = await backofficeApi.post<ApiResponse<LoginResponse>>('/backoffice/auth/verify-otp', verification);
    
    // Salvar token e dados do admin
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('backoffice_token', response.data.data.token);
      localStorage.setItem('backoffice_auth', 'true');
      localStorage.setItem('backoffice_role', response.data.data.user.role);
      localStorage.setItem('backoffice_name', response.data.data.user.name);
    }
    
    return response.data;
  }

  /**
   * Logout do backoffice
   */
  async logout(): Promise<void> {
    try {
      await backofficeApi.post('/backoffice/auth/logout');
    } finally {
      localStorage.removeItem('backoffice_token');
      localStorage.removeItem('backoffice_auth');
      localStorage.removeItem('backoffice_role');
      localStorage.removeItem('backoffice_name');
    }
  }

  /**
   * Obter dados do admin atual
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await backofficeApi.get<ApiResponse<User>>('/backoffice/auth/me');
    return response.data;
  }
}

export const backofficeAuthService = new BackofficeAuthService();
