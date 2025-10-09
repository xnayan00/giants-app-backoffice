import { api } from './api';
import { 
  NetworkUser, 
  NetworkFilters, 
  ApiResponse 
} from '@/types/api.types';

class NetworkService {
  /**
   * Listar usuários da rede com filtros
   */
  async getNetworkUsers(filters?: NetworkFilters): Promise<ApiResponse<NetworkUser[]>> {
    const response = await api.get<ApiResponse<NetworkUser[]>>('/network/users', {
      params: filters,
    });
    return response.data;
  }

  /**
   * Obter perfil de usuário da rede
   */
  async getUserProfile(userId: number): Promise<ApiResponse<NetworkUser>> {
    const response = await api.get<ApiResponse<NetworkUser>>(`/network/users/${userId}`);
    return response.data;
  }

  /**
   * Conectar com usuário
   */
  async connectWithUser(userId: number): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>(`/network/connect/${userId}`);
    return response.data;
  }

  /**
   * Desconectar de usuário
   */
  async disconnectFromUser(userId: number): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/network/connect/${userId}`);
    return response.data;
  }

  /**
   * Obter minhas conexões
   */
  async getMyConnections(): Promise<ApiResponse<NetworkUser[]>> {
    const response = await api.get<ApiResponse<NetworkUser[]>>('/network/my-connections');
    return response.data;
  }

  /**
   * Buscar usuários na rede
   */
  async searchUsers(query: string): Promise<ApiResponse<NetworkUser[]>> {
    const response = await api.get<ApiResponse<NetworkUser[]>>('/network/search', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Obter estados disponíveis
   */
  async getStates(): Promise<ApiResponse<string[]>> {
    const response = await api.get<ApiResponse<string[]>>('/network/states');
    return response.data;
  }

  /**
   * Obter segmentos disponíveis
   */
  async getSegments(): Promise<ApiResponse<string[]>> {
    const response = await api.get<ApiResponse<string[]>>('/network/segments');
    return response.data;
  }
}

export const networkService = new NetworkService();
