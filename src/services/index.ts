// Export all services for easy importing
export * from './auth.service';
export * from './eventos.service';
export * from './palestras.service';
export * from './network.service';
export * from './progress.service';

// Backoffice services
export * from './backoffice/auth.service';
export * from './backoffice/usuarios.service';
export * from './backoffice/eventos.service';
export * from './backoffice/logs.service';
export * from './backoffice/dashboard.service';

// API client
export { api, backofficeApi } from './api';
