export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = { sm: 'h-4 w-4 border-2', md: 'h-6 w-6 border-2', lg: 'h-10 w-10 border-[3px]' };
  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        'inline-block rounded-full border-current border-t-transparent animate-spin-custom text-primary',
        sizeMap[size],
        className,
      ].join(' ')}
    />
  );
};

export const PageLoader: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-base">
    <div className="flex flex-col items-center gap-4">
      <Spinner size="lg" />
      <p className="text-sm text-muted animate-pulse">Loading Vectra…</p>
    </div>
  </div>
);
