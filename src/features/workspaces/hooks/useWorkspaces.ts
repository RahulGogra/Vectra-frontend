import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getWorkspaceMembers,
} from '../api/workspacesApi';
import { useWorkspaceStore } from '../../../store/useWorkspaceStore';
import type { CreateWorkspacePayload } from '../../../types';

export const workspaceKeys = {
  all:     ['workspaces'] as const,
  members: (id: string) => ['workspaces', id, 'members'] as const,
};

// ── List all workspaces the user belongs to ───────────────────────────────
export const useWorkspaces = () =>
  useQuery({ queryKey: workspaceKeys.all, queryFn: getWorkspaces });

// ── Members of a specific workspace ──────────────────────────────────────
export const useWorkspaceMembers = (workspaceId: string | null) =>
  useQuery({
    queryKey: workspaceKeys.members(workspaceId ?? ''),
    queryFn: () => getWorkspaceMembers(workspaceId!),
    enabled: !!workspaceId,
  });

// ── Create workspace ──────────────────────────────────────────────────────
export const useCreateWorkspace = () => {
  const qc = useQueryClient();
  const setActive = useWorkspaceStore((s) => s.setActiveWorkspaceId);

  return useMutation({
    mutationFn: (payload: CreateWorkspacePayload) => createWorkspace(payload),
    onSuccess: (ws) => {
      qc.invalidateQueries({ queryKey: workspaceKeys.all });
      setActive(ws.id);
    },
  });
};

// ── Update workspace ──────────────────────────────────────────────────────
export const useUpdateWorkspace = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateWorkspacePayload> }) =>
      updateWorkspace(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: workspaceKeys.all }),
  });
};

// ── Delete workspace ──────────────────────────────────────────────────────
export const useDeleteWorkspace = () => {
  const qc = useQueryClient();
  const clear = useWorkspaceStore((s) => s.clear);
  return useMutation({
    mutationFn: (id: string) => deleteWorkspace(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workspaceKeys.all });
      clear();
    },
  });
};
