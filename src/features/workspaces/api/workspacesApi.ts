import { api } from '../../../lib/axios';
import type { Workspace, WorkspaceMember, CreateWorkspacePayload } from '../../../types';

/** GET /api/workspaces/ */
export const getWorkspaces = async (): Promise<Workspace[]> => {
  const { data } = await api.get<Workspace[]>('/workspaces/');
  return data;
};

/** POST /api/workspaces/ */
export const createWorkspace = async (payload: CreateWorkspacePayload): Promise<Workspace> => {
  const { data } = await api.post<Workspace>('/workspaces/', payload);
  return data;
};

/** PATCH /api/workspaces/:id/ */
export const updateWorkspace = async (id: string, payload: Partial<CreateWorkspacePayload>): Promise<Workspace> => {
  const { data } = await api.patch<Workspace>(`/workspaces/${id}/`, payload);
  return data;
};

/** DELETE /api/workspaces/:id/ */
export const deleteWorkspace = async (id: string): Promise<void> => {
  await api.delete(`/workspaces/${id}/`);
};

/** GET /api/workspace-members/?workspace=<id> */
export const getWorkspaceMembers = async (workspaceId: string): Promise<WorkspaceMember[]> => {
  const { data } = await api.get<WorkspaceMember[]>('/workspace-members/', {
    params: { workspace: workspaceId },
  });
  return data;
};
