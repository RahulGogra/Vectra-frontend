import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projectsApi';
import type { CreateProjectPayload } from '../../../types';

export const projectKeys = {
  all:     ['projects'] as const,
  byWorkspace: (wsId: string) => ['projects', wsId] as const,
};

// ── Projects list for a workspace ─────────────────────────────────────────
export const useProjects = (workspaceId: string | null) =>
  useQuery({
    queryKey: projectKeys.byWorkspace(workspaceId ?? ''),
    queryFn: () => getProjects(workspaceId!),
    enabled: !!workspaceId,
  });

// ── Create project ────────────────────────────────────────────────────────
export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: projectKeys.byWorkspace(variables.workspace) });
    },
  });
};

// ── Update project ────────────────────────────────────────────────────────
export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateProjectPayload> }) =>
      updateProject(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.all }),
  });
};

// ── Delete project ────────────────────────────────────────────────────────
export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.all }),
  });
};
