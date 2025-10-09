import { AxiosError } from 'axios';
import { ApiError } from '@/types/api.types';
import { toast } from '@/hooks/use-toast';

/**
 * Converte um erro do Axios em um objeto ApiError padronizado
 */
export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    const code = error.response?.data?.code || error.code;

    return {
      message,
      code,
      status,
      details: error.response?.data,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'Ocorreu um erro desconhecido',
  };
}

/**
 * Exibe um toast de erro baseado no erro recebido
 */
export function showErrorToast(error: unknown, defaultMessage?: string): void {
  const apiError = handleApiError(error);
  
  toast({
    title: 'Erro',
    description: defaultMessage || apiError.message,
    variant: 'destructive',
  });
}

/**
 * Verifica se o erro é de autenticação (401)
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
}

/**
 * Verifica se o erro é de permissão (403)
 */
export function isPermissionError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 403;
  }
  return false;
}

/**
 * Verifica se o erro é de validação (400/422)
 */
export function isValidationError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status === 400 || status === 422;
  }
  return false;
}

/**
 * Extrai mensagens de validação do erro
 */
export function getValidationErrors(error: unknown): Record<string, string[]> | null {
  if (error instanceof AxiosError) {
    return error.response?.data?.errors || null;
  }
  return null;
}

/**
 * Handler genérico para retry de requisições
 */
export async function retryRequest<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
}
