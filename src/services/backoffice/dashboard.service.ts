import { backofficeApi } from '../api';
import { DashboardStats, ApiResponse } from '@/types/api.types';

class BackofficeDashboardService {
  /**
   * Obter estatísticas do dashboard
   */
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await backofficeApi.get<ApiResponse<DashboardStats>>('/backoffice/dashboard/stats');
    return response.data;
  }

  /**
   * Obter atividades recentes
   */
  async getRecentActivity(limit: number = 10): Promise<ApiResponse<any[]>> {
    const response = await backofficeApi.get<ApiResponse<any[]>>('/backoffice/dashboard/recent-activity', {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Obter dados de gráficos
   */
  async getChartData(type: 'users' | 'events' | 'lectures', period: string = '30d'): Promise<ApiResponse<any>> {
    const response = await backofficeApi.get<ApiResponse<any>>(`/backoffice/dashboard/charts/${type}`, {
      params: { period },
    });
    return response.data;
  }
}

export const backofficeDashboardService = new BackofficeDashboardService();
