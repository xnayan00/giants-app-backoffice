import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { handleApiError, isAuthError } from '@/utils/error-handler';

// Base URL da API - ajustar conforme necessário
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com/v1';

// Criar instância do axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição - adicionar token de autenticação
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta - tratamento de erros globais
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const apiError = handleApiError(error);

    // Se for erro de autenticação, fazer logout
    if (isAuthError(error)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      // Redirecionar para login se não estiver já na página de login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(apiError);
  }
);

// Instância separada para o backoffice
const backofficeApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para backoffice
backofficeApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('backoffice_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backofficeApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const apiError = handleApiError(error);

    if (isAuthError(error)) {
      localStorage.removeItem('backoffice_token');
      localStorage.removeItem('backoffice_auth');
      localStorage.removeItem('backoffice_role');
      localStorage.removeItem('backoffice_name');
      
      if (!window.location.pathname.includes('/backoffice/login')) {
        window.location.href = '/backoffice/login';
      }
    }

    return Promise.reject(apiError);
  }
);

export { api, backofficeApi };
