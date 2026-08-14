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
        'glass-premium rounded-xl p-4 border cursor-pointer',
        'hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.2)]',
        isDragging ? 'ring-2 ring-primary shadow-[0_0_40px_rgba(99,102,241,0.4)] z-50 rotate-3 scale-105' : 'border-white/5',
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
            className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-accent border border-white/20 flex items-center justify-center shadow-lg"
          >
            <span className="text-[10px] font-bold text-white tracking-wider">{initials}</span>
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