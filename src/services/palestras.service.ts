import { api } from './api';
import { 
  Palestra, 
  PalestraCategory, 
  ApiResponse 
} from '@/types/api.types';

class PalestrasService {
  /**
   * Listar todas as categorias de palestras
   */
  async getCategories(): Promise<ApiResponse<PalestraCategory[]>> {
    const response = await api.get<ApiResponse<PalestraCategory[]>>('/palestras/categories');
    return response.data;
  }

  /**
   * Listar palestras por categoria
   */
  async getPalestrasByCategory(category: string): Promise<ApiResponse<Palestra[]>> {
    const response = await api.get<ApiResponse<Palestra[]>>(`/palestras/category/${category}`);
    return response.data;
  }

  /**
   * Obter palestra por ID
   */
  async getPalestraById(id: number): Promise<ApiResponse<Palestra>> {
    const response = await api.get<ApiResponse<Palestra>>(`/palestras/${id}`);
    return response.data;
  }

  /**
   * Marcar palestra como assistida
   */
  async markAsWatched(palestraId: number): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>(`/palestras/${palestraId}/watched`);
    return response.data;
  }

  /**
   * Obter palestras assistidas
   */
  async getWatchedPalestras(): Promise<ApiResponse<Palestra[]>> {
    const response = await api.get<ApiResponse<Palestra[]>>('/palestras/watched');
    return response.data;
  }

  /**
   * Buscar palestras
   */
  async searchPalestras(query: string): Promise<ApiResponse<Palestra[]>> {
    const response = await api.get<ApiResponse<Palestra[]>>('/palestras/search', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Favoritar palestra
   */
  async toggleFavorite(palestraId: number): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>(`/palestras/${palestraId}/favorite`);
    return response.data;
  }
}

export const palestrasService = new PalestrasService();
