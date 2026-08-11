import React from 'react';
import type { TaskPriority, TaskStatus } from '../../types';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'muted' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary/15 text-primary border border-primary/20',
  success: 'bg-success/15 text-success border border-success/20',
  warning: 'bg-warning/15 text-warning border border-warning/20',
  danger:  'bg-danger/15  text-danger  border border-danger/20',
  muted:   'bg-surface-2 text-muted border border-border',
  purple:  'bg-purple-500/15 text-purple-400 border border-purple-500/20',
};

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger:  'bg-danger',
  muted:   'bg-muted',
  purple:  'bg-purple-400',
};

export const Badge: React.FC<BadgeProps> = ({
  children, variant = 'muted', size = 'sm', dot = false,
}) => (
  <span
    className={[
      'inline-flex items-center gap-1.5 rounded-pill font-medium',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
      variantStyles[variant],
    ].join(' ')}
  >
    {dot && <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
    {children}
  </span>
);

// ── Convenience helpers ────────────────────────────────────────────────────
const priorityMap: Record<TaskPriority, { label: string; variant: BadgeVariant }> = {
  low:    { label: 'Low',    variant: 'success' },
  medium: { label: 'Medium', variant: 'warning' },
  high:   { label: 'High',   variant: 'danger'  },
};

const statusMap: Record<TaskStatus, { label: string; variant: BadgeVariant }> = {
  todo:        { label: 'To Do',       variant: 'muted'   },
  in_progress: { label: 'In Progress', variant: 'primary' },
  review:      { label: 'Review',      variant: 'purple'  },
  done:        { label: 'Done',        variant: 'success' },
};

export const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const { label, variant } = priorityMap[priority];
  return <Badge variant={variant} dot>{label}</Badge>;
};

export const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const { label, variant } = statusMap[status];
  return <Badge variant={variant} dot>{label}</Badge>;
};
