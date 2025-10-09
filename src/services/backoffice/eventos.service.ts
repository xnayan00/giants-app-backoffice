import { backofficeApi } from '../api';
import { 
  Evento, 
  ApiResponse, 
  PaginatedResponse,
  User
} from '@/types/api.types';

class BackofficeEventosService {
  /**
   * Listar eventos (backoffice)
   */
  async getEventos(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Evento>> {
    const response = await backofficeApi.get<PaginatedResponse<Evento>>('/backoffice/eventos', {
      params: { page, pageSize },
    });
    return response.data;
  }

  /**
   * Obter evento por ID
   */
  async getEventoById(id: number): Promise<ApiResponse<Evento>> {
    const response = await backofficeApi.get<ApiResponse<Evento>>(`/backoffice/eventos/${id}`);
    return response.data;
  }

  /**
   * Criar novo evento
   */
  async createEvento(data: Partial<Evento>): Promise<ApiResponse<Evento>> {
    const response = await backofficeApi.post<ApiResponse<Evento>>('/backoffice/eventos', data);
    return response.data;
  }

  /**
   * Atualizar evento
   */
  async updateEvento(id: number, data: Partial<Evento>): Promise<ApiResponse<Evento>> {
    const response = await backofficeApi.put<ApiResponse<Evento>>(`/backoffice/eventos/${id}`, data);
    return response.data;
  }

  /**
   * Deletar evento
   */
  async deleteEvento(id: number): Promise<ApiResponse<void>> {
    const response = await backofficeApi.delete<ApiResponse<void>>(`/backoffice/eventos/${id}`);
    return response.data;
  }

  /**
   * Obter participantes do evento
   */
  async getEventoParticipants(eventoId: number): Promise<ApiResponse<User[]>> {
    const response = await backofficeApi.get<ApiResponse<User[]>>(`/backoffice/eventos/${eventoId}/participants`);
    return response.data;
  }

  /**
   * Upload de imagem do evento
   */
  async uploadEventoImage(eventoId: number, file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await backofficeApi.post<ApiResponse<{ url: string }>>(
      `/backoffice/eventos/${eventoId}/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }
}

export const backofficeEventosService = new BackofficeEventosService();
