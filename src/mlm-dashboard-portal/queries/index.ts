// Export all authentication queries and types
export * from './auth';
export * from './types/auth';

// Export admin authentication queries and types
export * from './admin-auth';
export * from './types/admin-auth';

// Export example components
export { default as AuthExample } from './examples/AuthExample';
export { default as AdminLoginExample } from './examples/AdminLoginExample';

// Re-export React Query utilities for convenience
export { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
