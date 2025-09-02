import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, type User, type UsersListParams, type CreateUserRequest, type UpdateUserRequest } from '../api-services/user-service';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UsersListParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  stats: () => [...userKeys.all, 'stats'] as const,
  trees: () => [...userKeys.all, 'tree'] as const,
  tree: (id: number, maxLevel?: number) => [...userKeys.trees(), id, maxLevel] as const,
  incomes: () => [...userKeys.all, 'incomes'] as const,
  userIncomes: (id: number, perPage?: number) => [...userKeys.incomes(), id, perPage] as const,
};

// Get users list with pagination and filters
export const useUsers = (params: UsersListParams = {}) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const response = await userService.getUsers(params);
      return response.data; // Return the data part directly
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get user by ID
export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await userService.getUserById(id);
      return response.data; // Return the data part directly
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get user statistics
export const useUserStats = () => {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: async () => {
      const response = await userService.getUserStats();
      return response.data; // Return the data part directly
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserRequest) => userService.createUser(userData),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: UpdateUserRequest }) =>
      userService.updateUser(id, userData),
    onSuccess: (data, { id }) => {
      // Update user in cache
      queryClient.setQueryData(userKeys.detail(id), data.data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Delete user mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      // Invalidate and refetch users list and stats
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};

// Toggle user status mutation
export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      userService.toggleUserStatus(id, isActive),
    onSuccess: (data, { id }) => {
      // Update user in cache
      queryClient.setQueryData(userKeys.detail(id), data.data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      // Invalidate stats
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};

// Bulk operations
export const useBulkUpdateUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userIds, updates }: { userIds: number[]; updates: UpdateUserRequest }) => {
      const promises = userIds.map(id => userService.updateUser(id, updates));
      return Promise.all(promises);
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};

export const useBulkDeleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: number[]) => {
      const promises = userIds.map(id => userService.deleteUser(id));
      return Promise.all(promises);
    },
    onSuccess: () => {
      // Invalidate and refetch users list and stats
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};

export const useBulkToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userIds, isActive }: { userIds: number[]; isActive: boolean }) => {
      const promises = userIds.map(id => userService.toggleUserStatus(id, isActive));
      return Promise.all(promises);
    },
    onSuccess: () => {
      // Invalidate and refetch users list and stats
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};

// Get user's MLM tree (Admin View)
export const useUserTree = (id: number, maxLevel?: number) => {
  return useQuery({
    queryKey: userKeys.tree(id, maxLevel),
    queryFn: async () => {
      const response = await userService.getUserTree(id, maxLevel);
      return response.data; // Return the data part directly
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get user's income history (Admin View)
export const useUserIncomes = (id: number, perPage?: number) => {
  return useQuery({
    queryKey: userKeys.userIncomes(id, perPage),
    queryFn: async () => {
      const response = await userService.getUserIncomes(id, perPage);
      return response.data; // Return the data part directly
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
