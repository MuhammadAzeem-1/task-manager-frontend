import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, getErrorMessage } from '@/lib/api-client';
import { ApiResponse, Task, CreateTaskDto, UpdateTaskDto } from '@/lib/types';
import { toast } from 'sonner';

// Tasks API calls
const tasksApi = {
  getTasks: async () => {
    const { data } = await apiClient.get<ApiResponse<Task[]>>('/tasks');
    return data;
  },

  getTaskById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
    return data;
  },

  createTask: async (taskData: CreateTaskDto) => {
    const { data } = await apiClient.post<ApiResponse<Task>>('/tasks', taskData);
    return data;
  },

  updateTask: async ({ id, ...taskData }: UpdateTaskDto & { id: string }) => {
    const { data } = await apiClient.put<ApiResponse<Task>>(
      `/tasks/${id}`,
      taskData
    );
    return data;
  },

  deleteTask: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<Task>>(`/tasks/${id}`);
    return data;
  },
};

// Get all tasks
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: tasksApi.getTasks,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Get single task
export function useTask(id: string) {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => tasksApi.getTaskById(id),
    enabled: !!id,
  });
}

// Create task
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(response.message || 'Task created successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to create task');
    },
  });
}

// Update task
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.updateTask,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', variables.id] });
      toast.success(response.message || 'Task updated successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to update task');
    },
  });
}

// Delete task
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(response.message || 'Task deleted successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to delete task');
    },
  });
}

