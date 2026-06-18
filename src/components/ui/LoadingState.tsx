import { cn } from '@/utils'
import { Spinner } from './Spinner'

export type LoadingVariant = 'spinner' | 'skeleton'

export interface LoadingStateProps {
  variant?: LoadingVariant
  /** Visible + screen-reader label for the spinner variant. */
  label?: string
  /** Number of skeleton lines (skeleton variant). */
  lines?: number
  className?: string
}

/** Skeleton placeholder. Pulse animation uses opacity only (GPU-friendly). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'block animate-pulse rounded-md bg-surface-muted',
        className,
      )}
      aria-hidden
    />
  )
}

export function LoadingState({
  variant = 'spinner',
  label = 'Loading',
  lines = 3,
  className,
}: LoadingStateProps) {
  if (variant === 'skeleton') {
    return (
      <div
        className={cn('flex w-full flex-col gap-2', className)}
        role="status"
        aria-label={label}
        aria-busy
      >
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn('h-3.5', i === lines - 1 ? 'w-2/3' : 'w-full')}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 text-muted-foreground',
        className,
      )}
    >
      <Spinner label={label} />
      <span className="text-body-sm">{label}</span>
    </div>
  )
}
