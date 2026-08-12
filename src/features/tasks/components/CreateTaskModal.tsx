import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Input';
import { useCreateTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { useWorkspaceMembers } from '../../workspaces/hooks/useWorkspaces';
import type { Task, TaskStatus, TaskPriority } from '../../../types';

interface Props {
  open: boolean;
  onClose: () => void;
  projectId: string;
  workspaceId: string;
  task?: Task | null;            // if editing existing task
  defaultStatus?: TaskStatus;    // pre-select column
}

const STATUSES: { value: TaskStatus; label: string }[] = [
  { value: 'todo',        label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review',      label: 'Review' },
  { value: 'done',        label: 'Done' },
];

const PRIORITIES: { value: TaskPriority; label: string }[] = [
  { value: 'low',    label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high',   label: 'High' },
];

export const CreateTaskModal: React.FC<Props> = ({
  open, onClose, projectId, workspaceId, task, defaultStatus = 'todo',
}) => {
  const isEditing = !!task;

  const [title, setTitle]           = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [status, setStatus]         = useState<TaskStatus>(task?.status ?? defaultStatus);
  const [priority, setPriority]     = useState<TaskPriority>(task?.priority ?? 'medium');
  const [assignee, setAssignee]     = useState<string>(task?.assignee ?? '');
  const [dueDate, setDueDate]       = useState(task?.due_date ?? '');

  const { mutate: create, isPending: creating } = useCreateTask();
  const { mutate: update, isPending: updating } = useUpdateTask(projectId);
  const { mutate: del,    isPending: deleting } = useDeleteTask(projectId);
  const { data: members = [] } = useWorkspaceMembers(workspaceId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      status,
      priority,
      assignee: assignee || null,
      due_date: dueDate || null,
    };

    if (isEditing && task) {
      update({ id: task.id, payload }, { onSuccess: onClose });
    } else {
      create({ ...payload, project: projectId }, { onSuccess: onClose });
    }
  };

  const handleDelete = () => {
    if (task) del(task.id, { onSuccess: onClose });
  };

  const reset = () => {
    setTitle(''); setDescription(''); setStatus(defaultStatus);
    setPriority('medium'); setAssignee(''); setDueDate('');
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isEditing ? 'Edit task' : 'Create task'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="task-title"
          label="Task title"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />

        <Textarea
          id="task-description"
          label="Description (optional)"
          placeholder="Add details, context, or acceptance criteria…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-status" className="text-sm font-medium text-main">Status</label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="rounded-xl border border-border bg-surface-2 text-main px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-priority" className="text-sm font-medium text-main">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="rounded-xl border border-border bg-surface-2 text-main px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Assignee */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-assignee" className="text-sm font-medium text-main">Assignee</label>
            <select
              id="task-assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="rounded-xl border border-border bg-surface-2 text-main px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">Unassigned</option>
              {members.map((m) => (
                <option key={m.user.id} value={m.user.id}>
                  {`${m.user.first_name} ${m.user.last_name}`.trim() || m.user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Due date */}
          <Input
            id="task-due-date"
            type="date"
            label="Due date (optional)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {isEditing ? (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleDelete}
              loading={deleting}
            >
              Delete task
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
            <Button type="submit" loading={creating || updating}>
              {isEditing ? 'Save changes' : 'Create task'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
