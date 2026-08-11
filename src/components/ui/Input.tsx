import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightElement, className = '', id, ...rest }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-main">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-xl border bg-surface-2 text-main placeholder:text-subtle',
              'py-2.5 text-sm transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              error
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-border hover:border-border-strong',
              icon ? 'pl-10' : 'pl-3.5',
              rightElement ? 'pr-10' : 'pr-3.5',
              className,
            ].join(' ')}
            {...rest}
          />
          {rightElement && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {rightElement}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ── Textarea variant ───────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...rest }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-main">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={[
            'w-full rounded-xl border bg-surface-2 text-main placeholder:text-subtle',
            'px-3.5 py-2.5 text-sm transition-all duration-200 resize-none',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            error
              ? 'border-red-500/50 focus:ring-red-500'
              : 'border-border hover:border-border-strong',
            className,
          ].join(' ')}
          {...rest}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
