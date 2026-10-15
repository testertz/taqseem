import { cn } from '@/lib/utils';

export function PatternBackground({
  className,
  variant = 'star',
}: {
  className?: string;
  variant?: 'star' | 'girih' | 'arabesque' | 'grid';
}) {
  const patterns: Record<string, string> = {
    star: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='currentColor' stroke-opacity='0.06' stroke-width='1'%3E%3Cpath d='M30 0L37 23L60 30L37 37L30 60L23 37L0 30L23 23Z'/%3E%3C/g%3E%3C/svg%3E")`,
    girih: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='currentColor' stroke-opacity='0.05' stroke-width='1'%3E%3Cpath d='M40 5L55 20L55 60L40 75L25 60L25 20Z'/%3E%3Cpath d='M25 20L40 35L55 20'/%3E%3Cpath d='M25 60L40 45L55 60'/%3E%3C/g%3E%3C/svg%3E")`,
    arabesque: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='currentColor' stroke-opacity='0.05' stroke-width='0.8'%3E%3Ccircle cx='50' cy='50' r='40'/%3E%3Ccircle cx='50' cy='50' r='28'/%3E%3Ccircle cx='50' cy='50' r='16'/%3E%3Cpath d='M50 10L50 90M10 50L90 50M22 22L78 78M78 22L22 78'/%3E%3C/g%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='currentColor' stroke-opacity='0.04' stroke-width='1'%3E%3Cpath d='M0 20L40 20M20 0L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
  };

  return (
    <div
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage: patterns[variant],
        backgroundSize: variant === 'arabesque' ? '100px 100px' : '60px 60px',
      }}
      aria-hidden="true"
    />
  );
}

export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center gap-3 py-2', className)}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="text-primary/40"
      >
        <path
          d="M14 2L18 10L26 14L18 18L14 26L10 18L2 14L10 10Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
    </div>
  );
}

export function ArchFrame({
  children,
  className,
  imgClassName,
}: {
  children: React.ReactNode;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{
        clipPath:
          'path("M 0 100% L 0 30% Q 0 0 50% 0 Q 100% 0 100% 30% L 100% 100% Z")',
        borderRadius: '0 0 var(--radius) var(--radius)',
      }}
    >
      <div className={cn('h-full w-full', imgClassName)}>{children}</div>
    </div>
  );
}

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        className="shrink-0"
      >
        <rect width="36" height="36" rx="8" fill="hsl(var(--primary))" />
        <path
          d="M18 7L21 15L29 18L21 21L18 29L15 21L7 18L15 15Z"
          fill="hsl(var(--primary-foreground))"
          fillOpacity="0.95"
        />
        <circle
          cx="18"
          cy="18"
          r="3.5"
          fill="hsl(var(--accent))"
          fillOpacity="0.8"
        />
      </svg>
      {showText && (
        <span className="font-display text-xl font-semibold tracking-tight text-foreground">
          Taqseem
        </span>
      )}
    </div>
  );
}
