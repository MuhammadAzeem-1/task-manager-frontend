import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, getErrorMessage } from '@/lib/api-client';
import { ApiResponse, User, UpdateUserDto } from '@/lib/types';
import { toast } from 'sonner';

// Users API calls
const usersApi = {
  getUsers: async () => {
    const { data } = await apiClient.get<ApiResponse<User[]>>('/users');
    return data;
  },

  getUserById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return data;
  },

  updateUser: async ({ id, ...userData }: UpdateUserDto & { id: string }) => {
    const { data } = await apiClient.put<ApiResponse<User>>(
      `/users/${id}`,
      userData
    );
    return data;
  },

  deleteUser: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<User>>(`/users/${id}`);
    return data;
  },
};

// Get all users (Admin only)
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers,
    staleTime: 60 * 1000, // 1 minute
  });
}

// Get single user
export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
}

// Update user
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.updateUser,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(response.message || 'User updated successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to update user');
    },
  });
}

// Delete user (Admin only)
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(response.message || 'User deleted successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to delete user');
    },
  });
}

