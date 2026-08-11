import { useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { CreateTaskModal } from './CreateTaskModal';
import { useTasks, useUpdateBoard } from '../hooks/useTasks';
import { Spinner } from '../../../components/ui/Spinner';
import { Button } from '../../../components/ui/Button';
import { PriorityBadge } from '../../../components/ui/Badge';
import type { Task, TaskStatus, KanbanColumn as KanbanColType } from '../../../types';

const COLUMNS: KanbanColType[] = [
  { id: 'todo',        label: 'To Do',       color: 'bg-muted',    bg: 'text-muted bg-surface-2' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-primary',  bg: 'text-primary bg-primary/15' },
  { id: 'review',      label: 'Review',      color: 'bg-accent',   bg: 'text-accent bg-accent/15' },
  { id: 'done',        label: 'Done',        color: 'bg-success',  bg: 'text-success bg-success/15' },
];

interface Props {
  projectId: string;
  projectName: string;
  workspaceId: string;
  workspaceSlug: string;
}

export const KanbanBoard: React.FC<Props> = ({ projectId, projectName, workspaceId, workspaceSlug }) => {
  const navigate = useNavigate();
  const { data: tasks = [], isLoading } = useTasks(projectId);
  const { mutate: updateBoard } = useUpdateBoard(projectId);

  // Local optimistic state for drag-and-drop
  const [localTasks, setLocalTasks] = useState<Task[] | null>(null);
  const displayTasks = localTasks ?? tasks;

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => displayTasks.filter((t) => t.status === status).sort((a, b) => a.order - b.order),
    [displayTasks]
  );

  const handleDragStart = (e: DragStartEvent) => {
    const task = displayTasks.find((t) => t.id === e.active.id);
    if (task) setActiveTask(task);
    // Clone current tasks as local state for optimistic updates
    setLocalTasks([...displayTasks]);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over || !localTasks) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = localTasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if over a column droppable
    const overColumn = COLUMNS.find((c) => c.id === overId);
    if (overColumn && activeTask.status !== overColumn.id) {
      setLocalTasks((prev) =>
        (prev ?? []).map((t) =>
          t.id === activeId ? { ...t, status: overColumn.id } : t
        )
      );
      return;
    }

    // Over another task — reorder within or move between columns
    const overTask = localTasks.find((t) => t.id === overId);
    if (!overTask) return;

    if (activeTask.status !== overTask.status) {
      setLocalTasks((prev) =>
        (prev ?? []).map((t) =>
          t.id === activeId ? { ...t, status: overTask.status } : t
        )
      );
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveTask(null);

    if (!over || !localTasks) {
      setLocalTasks(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = localTasks.find((t) => t.id === activeId);
    if (!activeTask) { setLocalTasks(null); return; }

    let finalTasks = [...localTasks];

    // If dropped on a column header
    const overColumn = COLUMNS.find((c) => c.id === overId);
    if (overColumn && activeTask.status !== overColumn.id) {
      finalTasks = finalTasks.map((t) =>
        t.id === activeId ? { ...t, status: overColumn.id } : t
      );
    }

    // Reorder within column
    const overTask = finalTasks.find((t) => t.id === overId);
    if (overTask && activeId !== overId) {
      const colTasks = finalTasks
        .filter((t) => t.status === activeTask.status)
        .sort((a, b) => a.order - b.order);
      const oldIndex = colTasks.findIndex((t) => t.id === activeId);
      const newIndex = colTasks.findIndex((t) => t.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(colTasks, oldIndex, newIndex).map((t, i) => ({ ...t, order: i }));
        finalTasks = finalTasks.map((t) => {
          const updated = reordered.find((r) => r.id === t.id);
          return updated ?? t;
        });
      }
    }

    // Recalculate order for all tasks in the affected column
    const affectedStatus = activeTask.status;
    const affectedCol = finalTasks
      .filter((t) => t.status === affectedStatus)
      .map((t, i) => ({ ...t, order: i }));
    finalTasks = finalTasks.map((t) => affectedCol.find((a) => a.id === t.id) ?? t);

    setLocalTasks(finalTasks);

    // Persist to backend
    const boardPayload = finalTasks.map((t) => ({ id: t.id, status: t.status, order: t.order }));
    updateBoard(boardPayload, {
      onError: () => setLocalTasks(null), // roll back on error
    });
  };

  const openCreate = (status: TaskStatus) => {
    setEditTask(null);
    setDefaultStatus(status);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center py-32"><Spinner size="lg" /></div>
  );

  return (
    <div>
      {/* Board header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(`/app/${workspaceSlug}/projects`)}
          className="text-muted hover:text-main transition-colors"
          aria-label="Back to projects"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-main">{projectName}</h1>
          <p className="text-sm text-muted mt-0.5">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
        </div>
        <Button
          id="board-add-task"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => openCreate('todo')}
        >
          Add task
        </Button>
      </div>

      {/* Kanban board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-6">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              color={col.color}
              headerColor={col.bg}
              tasks={getTasksByStatus(col.id)}
              onAddTask={() => openCreate(col.id)}
              onTaskClick={openEdit}
            />
          ))}
        </div>

        {/* Drag overlay (ghost card while dragging) */}
        <DragOverlay>
          {activeTask && (
            <div className="ring-2 ring-primary rounded-xl shadow-glow opacity-90">
              <TaskCard task={activeTask} onClick={() => {}} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CreateTaskModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null); setLocalTasks(null); }}
        projectId={projectId}
        workspaceId={workspaceId}
        task={editTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
};

export default KanbanBoard;