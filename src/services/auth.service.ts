import { api } from './api';
import { 
  LoginCredentials, 
  LoginResponse, 
  OtpVerification, 
  ApiResponse,
  User 
} from '@/types/api.types';

class AuthService {
  /**
   * Login com credenciais (email e senha)
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return response.data;
  }

  /**
   * Verificar OTP após login
   */
  async verifyOtp(verification: OtpVerification): Promise<ApiResponse<LoginResponse>> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/verify-otp', verification);
    
    // Salvar token e dados do usuário
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user_data', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  /**
   * Obter dados do usuário atual
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data;
  }

  /**
   * Atualizar perfil do usuário
   */
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.put<ApiResponse<User>>('/auth/profile', data);
    
    // Atualizar dados locais
    if (response.data.success) {
      localStorage.setItem('user_data', JSON.stringify(response.data.data));
    }
    
    return response.data;
  }

  /**
   * Solicitar recuperação de senha
   */
  async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>('/auth/forgot-password', { email });
    return response.data;
  }

  /**
   * Redefinir senha com token
   */
  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  }
}

export const authService = new AuthService();
