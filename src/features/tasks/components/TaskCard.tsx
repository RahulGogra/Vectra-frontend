import { Calendar, User2, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PriorityBadge } from '../../../components/ui/Badge';
import type { Task } from '../../../types';

interface Props {
  task: Task;
  onClick: (task: Task) => void;
}

export const TaskCard: React.FC<Props> = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const dueDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : null;

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done';

  const initials = task.assignee_details
    ? `${task.assignee_details.first_name?.[0] ?? ''}${task.assignee_details.last_name?.[0] ?? ''}`.toUpperCase()
      || task.assignee_details.email[0].toUpperCase()
    : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        'glass rounded-xl p-4 border border-border cursor-pointer',
        'hover:border-border-strong hover:shadow-card transition-all duration-200 group',
        isDragging ? 'ring-2 ring-primary shadow-glow z-50' : '',
      ].join(' ')}
      onClick={() => onClick(task)}
    >
      {/* Drag handle + Priority */}
      <div className="flex items-center justify-between mb-2">
        <PriorityBadge priority={task.priority} />
        <span
          {...attributes}
          {...listeners}
          className="text-subtle cursor-grab active:cursor-grabbing hover:text-muted transition-colors opacity-0 group-hover:opacity-100 p-0.5"
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag task"
        >
          <GripVertical className="h-4 w-4" />
        </span>
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-main leading-snug line-clamp-2">{task.title}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        {dueDate ? (
          <span
            className={[
              'flex items-center gap-1 text-xs',
              isOverdue ? 'text-danger' : 'text-muted',
            ].join(' ')}
          >
            <Calendar className="h-3 w-3" />
            {dueDate}
          </span>
        ) : (
          <span />
        )}

        {initials ? (
          <div
            title={`${task.assignee_details!.first_name} ${task.assignee_details!.last_name}`}
            className="h-6 w-6 rounded-full bg-primary/25 border border-primary/40 flex items-center justify-center"
          >
            <span className="text-[10px] font-bold text-primary">{initials}</span>
          </div>
        ) : (
          <span className="flex items-center gap-1 text-xs text-subtle">
            <User2 className="h-3 w-3" /> Unassigned
          </span>
        )}
      </div>
    </div>
  );
};