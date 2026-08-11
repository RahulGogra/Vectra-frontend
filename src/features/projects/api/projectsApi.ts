import { api } from '../../../lib/axios';
import type { Project, CreateProjectPayload } from '../../../types';

/** GET /api/projects/?workspace=<id> */
export const getProjects = async (workspaceId: string): Promise<Project[]> => {
  const { data } = await api.get<Project[]>('/projects/', {
    params: { workspace: workspaceId },
  });
  return data;
};

/** POST /api/projects/ */
export const createProject = async (payload: CreateProjectPayload): Promise<Project> => {
  const { data } = await api.post<Project>('/projects/', payload);
  return data;
};

/** PATCH /api/projects/:id/ */
export const updateProject = async (id: string, payload: Partial<CreateProjectPayload>): Promise<Project> => {
  const { data } = await api.patch<Project>(`/projects/${id}/`, payload);
  return data;
};

/** DELETE /api/projects/:id/ */
export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}/`);
};
