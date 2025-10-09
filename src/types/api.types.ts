// User types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  status: 'Ativo' | 'Inativo';
  company?: string;
  location?: string;
  state?: string;
  segment?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  requiresOtp?: boolean;
}

export interface OtpVerification {
  email: string;
  otp: string;
}

// Evento types
export interface Evento {
  id: number;
  name: string;
  time: string;
  location: string;
  address: string | null;
  participants: number;
  thumbnailUrl: string;
  type?: string;
  participantAvatars?: string[];
}

export interface EventoFilters {
  search?: string;
  upcoming?: boolean;
  participation?: string;
  period?: string;
}

// Palestra types
export interface Palestra {
  id: number;
  title: string;
  speaker: string;
  speakerAvatar: string;
  category: string;
  thumbnailUrl?: string;
}

export interface PalestraCategory {
  name: string;
  palestras: Palestra[];
}

// Network types
export interface NetworkUser {
  id: number;
  name: string;
  company: string;
  location: string;
  avatar: string;
  state?: string;
  segment?: string;
}

export interface NetworkFilters {
  search?: string;
  state?: string;
  segment?: string;
}

// Progress types
export interface UserProgress {
  name: string;
  cycle: string;
  message: string;
  stats: {
    label: string;
    value: string | number;
  }[];
}

// Backoffice types
export interface BackofficeUser extends User {
  createdAt?: string;
}

export interface Log {
  id: number;
  action: string;
  user: string;
  time: string;
  type: 'success' | 'error' | 'info';
}

export interface DashboardStats {
  totalUsers: number;
  activeEvents: number;
  lectures: number;
  connections: number;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}
