import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/axios';

// TypeScript interface matching your Django Task model
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  order: number;
  due_date: string | null;
  assignee_details?: {
    first_name: string;
    last_name: string;
  };
}

// Hook to fetch tasks
export const useTasks = (projectId?: string) => {
  return useQuery({
    // The query key acts as the cache identifier. If projectId changes, it refetches.
    queryKey: ['tasks', projectId],
    queryFn: async (): Promise<Task[]> => {
      // If we are filtering by project, append it to the URL
      const url = projectId ? `/tasks/?project=${projectId}` : '/tasks/';
      const response = await api.get(url);
      return response.data;
    },
    // Don't run the query if we require a projectId but don't have one
    enabled: projectId !== undefined,
  });
};

// Hook to update task status/order (optimistic UI ready)
export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTasks: { id: string; status: string; order: number }[]) => {
      const response = await api.post('/tasks/update-board/', updatedTasks);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache to trigger a background refetch, ensuring UI matches DB
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};