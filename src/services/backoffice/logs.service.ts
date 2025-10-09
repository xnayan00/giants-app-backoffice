import { backofficeApi } from '../api';
import { 
  Log, 
  ApiResponse, 
  PaginatedResponse 
} from '@/types/api.types';

class BackofficeLogsService {
  /**
   * Listar logs do sistema
   */
  async getLogs(page: number = 1, pageSize: number = 20): Promise<PaginatedResponse<Log>> {
    const response = await backofficeApi.get<PaginatedResponse<Log>>('/backoffice/logs', {
      params: { page, pageSize },
    });
    return response.data;
  }

  /**
   * Filtrar logs por tipo
   */
  async getLogsByType(type: 'success' | 'error' | 'info'): Promise<ApiResponse<Log[]>> {
    const response = await backofficeApi.get<ApiResponse<Log[]>>('/backoffice/logs/type', {
      params: { type },
    });
    return response.data;
  }

  /**
   * Buscar logs
   */
  async searchLogs(query: string): Promise<ApiResponse<Log[]>> {
    const response = await backofficeApi.get<ApiResponse<Log[]>>('/backoffice/logs/search', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Obter logs de um usuário específico
   */
  async getLogsByUser(userId: number): Promise<ApiResponse<Log[]>> {
    const response = await backofficeApi.get<ApiResponse<Log[]>>(`/backoffice/logs/user/${userId}`);
    return response.data;
  }

  /**
   * Limpar logs antigos
   */
  async clearOldLogs(days: number = 30): Promise<ApiResponse<void>> {
    const response = await backofficeApi.delete<ApiResponse<void>>('/backoffice/logs/clear', {
      params: { days },
    });
    return response.data;
  }
}

export const backofficeLogsService = new BackofficeLogsService();
