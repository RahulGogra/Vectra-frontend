import { api } from '../../../lib/axios';
import type { Task, CreateTaskPayload, UpdateTaskPayload, BoardUpdateItem } from '../../../types';

/** GET /api/tasks/?project=<id> */
export const getTasks = async (projectId: string): Promise<Task[]> => {
  const { data } = await api.get<Task[]>('/tasks/', {
    params: { project: projectId },
  });
  return data;
};

/** POST /api/tasks/ */
export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const { data } = await api.post<Task>('/tasks/', payload);
  return data;
};

/** PATCH /api/tasks/:id/ */
export const updateTask = async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
  const { data } = await api.patch<Task>(`/tasks/${id}/`, payload);
  return data;
};

/** DELETE /api/tasks/:id/ */
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}/`);
};

/**
 * POST /api/tasks/update-board/
 * Bulk-update task statuses + order after drag-and-drop.
 */
export const updateBoard = async (items: BoardUpdateItem[]): Promise<void> => {
  await api.post('/tasks/update-board/', items);
};
