import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../../../types';

interface Props {
  id: TaskStatus;
  label: string;
  color: string;         // dot color class e.g. 'bg-muted'
  headerColor: string;   // badge bg class
  tasks: Task[];
  onAddTask: () => void;
  onTaskClick: (task: Task) => void;
}

export const KanbanColumn: React.FC<Props> = ({
  id, label, color, headerColor, tasks, onAddTask, onTaskClick,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="kanban-col flex flex-col gap-3">
      {/* Column header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${color}`} />
          <span className="text-sm font-semibold text-main">{label}</span>
          <span
            className={`inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-pill text-xs font-medium ${headerColor}`}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className="text-muted hover:text-primary transition-colors p-1 rounded-lg hover:bg-primary/10"
          aria-label={`Add task to ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={[
          'flex flex-col gap-3 rounded-2xl p-3 min-h-[400px] transition-all duration-300',
          isOver
            ? 'glass-premium border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.15)] scale-[1.01]'
            : 'bg-surface/30 border border-white/5 hover:border-white/10 hover:bg-surface/40',
        ].join(' ')}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-xs text-subtle text-center">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
};
