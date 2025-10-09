import { api } from './api';
import { UserProgress, ApiResponse } from '@/types/api.types';

class ProgressService {
  /**
   * Obter progresso do usuário
   */
  async getUserProgress(): Promise<ApiResponse<UserProgress>> {
    const response = await api.get<ApiResponse<UserProgress>>('/progress');
    return response.data;
  }

  /**
   * Atualizar progresso específico
   */
  async updateProgress(data: Partial<UserProgress>): Promise<ApiResponse<UserProgress>> {
    const response = await api.put<ApiResponse<UserProgress>>('/progress', data);
    return response.data;
  }

  /**
   * Obter histórico de progresso
   */
  async getProgressHistory(): Promise<ApiResponse<UserProgress[]>> {
    const response = await api.get<ApiResponse<UserProgress[]>>('/progress/history');
    return response.data;
  }
}

export const progressService = new ProgressService();
