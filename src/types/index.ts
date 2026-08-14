// ─── Core Entity Types ─────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  plan?: string;
}

export type WorkspaceRole = 'owner' | 'admin' | 'member';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMember {
  id: string;
  workspace: string;
  user: User;
  role: WorkspaceRole;
  joined_at: string;
  status?: string;
}

export interface Project {
  id: string;
  workspace: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type TaskStatus   = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  project: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  order: number;
  assignee: string | null;
  assignee_details: User | null;
  created_by: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Auth Types ────────────────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

// ─── API Payload Types ────────────────────────────────────────────────────

export interface CreateWorkspacePayload {
  name: string;
  slug: string;
}

export interface CreateProjectPayload {
  workspace: string;
  name: string;
  description?: string;
}

export interface CreateTaskPayload {
  project: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string | null;
  due_date?: string | null;
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {
  order?: number;
}

export interface BoardUpdateItem {
  id: string;
  status: TaskStatus;
  order: number;
}

// ─── UI Utility Types ─────────────────────────────────────────────────────

export type KanbanColumn = {
  id: TaskStatus;
  label: string;
  color: string;
  bg: string;
};
