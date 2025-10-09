import { api } from './api';
import { 
  Evento, 
  EventoFilters, 
  ApiResponse, 
  PaginatedResponse 
} from '@/types/api.types';

class EventosService {
  /**
   * Listar eventos com filtros
   */
  async getEventos(filters?: EventoFilters): Promise<ApiResponse<Evento[]>> {
    const response = await api.get<ApiResponse<Evento[]>>('/eventos', {
      params: filters,
    });
    return response.data;
  }

  /**
   * Obter evento por ID
   */
  async getEventoById(id: number): Promise<ApiResponse<Evento>> {
    const response = await api.get<ApiResponse<Evento>>(`/eventos/${id}`);
    return response.data;
  }

  /**
   * Participar de um evento
   */
  async participateEvento(eventoId: number): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>(`/eventos/${eventoId}/participate`);
    return response.data;
  }

  /**
   * Cancelar participação em evento
   */
  async cancelParticipation(eventoId: number): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/eventos/${eventoId}/participate`);
    return response.data;
  }

  /**
   * Obter eventos do usuário
   */
  async getMyEventos(): Promise<ApiResponse<Evento[]>> {
    const response = await api.get<ApiResponse<Evento[]>>('/eventos/my-events');
    return response.data;
  }

  /**
   * Buscar eventos
   */
  async searchEventos(query: string): Promise<ApiResponse<Evento[]>> {
    const response = await api.get<ApiResponse<Evento[]>>('/eventos/search', {
      params: { q: query },
    });
    return response.data;
  }
}

export const eventosService = new EventosService();
