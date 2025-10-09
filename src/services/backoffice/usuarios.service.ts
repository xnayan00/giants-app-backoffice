import { backofficeApi } from '../api';
import { 
  BackofficeUser, 
  ApiResponse, 
  PaginatedResponse 
} from '@/types/api.types';

class BackofficeUsuariosService {
  /**
   * Listar usuários (com paginação)
   */
  async getUsuarios(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<BackofficeUser>> {
    const response = await backofficeApi.get<PaginatedResponse<BackofficeUser>>('/backoffice/usuarios', {
      params: { page, pageSize },
    });
    return response.data;
  }

  /**
   * Obter usuário por ID
   */
  async getUsuarioById(id: number): Promise<ApiResponse<BackofficeUser>> {
    const response = await backofficeApi.get<ApiResponse<BackofficeUser>>(`/backoffice/usuarios/${id}`);
    return response.data;
  }

  /**
   * Criar novo usuário
   */
  async createUsuario(data: Partial<BackofficeUser>): Promise<ApiResponse<BackofficeUser>> {
    const response = await backofficeApi.post<ApiResponse<BackofficeUser>>('/backoffice/usuarios', data);
    return response.data;
  }

  /**
   * Atualizar usuário
   */
  async updateUsuario(id: number, data: Partial<BackofficeUser>): Promise<ApiResponse<BackofficeUser>> {
    const response = await backofficeApi.put<ApiResponse<BackofficeUser>>(`/backoffice/usuarios/${id}`, data);
    return response.data;
  }

  /**
   * Deletar usuário
   */
  async deleteUsuario(id: number): Promise<ApiResponse<void>> {
    const response = await backofficeApi.delete<ApiResponse<void>>(`/backoffice/usuarios/${id}`);
    return response.data;
  }

  /**
   * Ativar/Desativar usuário
   */
  async toggleUsuarioStatus(id: number): Promise<ApiResponse<BackofficeUser>> {
    const response = await backofficeApi.patch<ApiResponse<BackofficeUser>>(`/backoffice/usuarios/${id}/toggle-status`);
    return response.data;
  }

  /**
   * Buscar usuários
   */
  async searchUsuarios(query: string): Promise<ApiResponse<BackofficeUser[]>> {
    const response = await backofficeApi.get<ApiResponse<BackofficeUser[]>>('/backoffice/usuarios/search', {
      params: { q: query },
    });
    return response.data;
  }
}

export const backofficeUsuariosService = new BackofficeUsuariosService();
