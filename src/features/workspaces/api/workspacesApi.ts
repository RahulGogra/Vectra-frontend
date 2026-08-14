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

export const inviteWorkspaceMember = async (workspaceId: string, email: string): Promise<void> => {
  await api.post(`/workspaces/${workspaceId}/invite/`, { email });
};

export const acceptWorkspaceInvite = async (workspaceId: string): Promise<void> => {
  await api.post(`/workspaces/${workspaceId}/accept-invite/`);
};

export const declineWorkspaceInvite = async (workspaceId: string): Promise<void> => {
  await api.post(`/workspaces/${workspaceId}/decline-invite/`);
};

export const getWorkspaceInvites = async (): Promise<any[]> => {
  const { data } = await api.get('/workspaces/invites/');
  return data;
};
