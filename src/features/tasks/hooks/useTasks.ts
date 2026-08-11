import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask, updateBoard } from '../api/tasksApi';
import type { CreateTaskPayload, UpdateTaskPayload, BoardUpdateItem } from '../../../types';

export const taskKeys = {
  all:       ['tasks'] as const,
  byProject: (projectId: string) => ['tasks', projectId] as const,
};

// ── Tasks for a project ───────────────────────────────────────────────────
export const useTasks = (projectId: string | null) =>
  useQuery({
    queryKey: taskKeys.byProject(projectId ?? ''),
    queryFn: () => getTasks(projectId!),
    enabled: !!projectId,
  });

// ── Create task ───────────────────────────────────────────────────────────
export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: taskKeys.byProject(variables.project) });
    },
  });
};

// ── Update single task ────────────────────────────────────────────────────
export const useUpdateTask = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      updateTask(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: taskKeys.byProject(projectId) }),
  });
};

// ── Delete task ───────────────────────────────────────────────────────────
export const useDeleteTask = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: taskKeys.byProject(projectId) }),
  });
};

// ── Bulk board update (after DnD) ─────────────────────────────────────────
export const useUpdateBoard = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (items: BoardUpdateItem[]) => updateBoard(items),
    onSuccess: () => qc.invalidateQueries({ queryKey: taskKeys.byProject(projectId) }),
  });
};
