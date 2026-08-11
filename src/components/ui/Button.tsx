import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:   'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-glow',
  secondary: 'bg-surface-2 text-main border border-border hover:border-border-strong hover:bg-surface',
  ghost:     'text-muted hover:text-main hover:bg-surface-2',
  danger:    'bg-red-500/10 text-danger border border-red-500/20 hover:bg-red-500/20',
  outline:   'border border-border text-main hover:bg-surface-2',
};

const sizeStyles: Record<Size, string> = {
  sm:  'h-8  px-3   text-xs  gap-1.5 rounded-lg',
  md:  'h-9  px-4   text-sm  gap-2   rounded-xl',
  lg:  'h-11 px-5   text-sm  gap-2   rounded-xl',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, fullWidth, children, className = '', disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? 'w-full' : '',
          className,
        ].join(' ')}
        {...rest}
      >
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin-custom" />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
