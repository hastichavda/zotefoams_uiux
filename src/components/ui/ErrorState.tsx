import { type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/utils'
import { Button } from './Button'

export type ErrorVariant = 'inline' | 'block' | 'full'

export interface ErrorStateProps {
  title?: string
  description?: ReactNode
  /** Renders a retry button when provided. */
  onRetry?: () => void
  retryLabel?: string
  icon?: ReactNode
  variant?: ErrorVariant
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
  retryLabel = 'Try again',
  icon,
  variant = 'block',
  className,
}: ErrorStateProps) {
  if (variant === 'inline') {
    return (
      <div
        role="alert"
        className={cn(
          'inline-flex items-center gap-2 rounded-md bg-error-subtle px-3 py-2 text-body-sm text-error-foreground',
          className,
        )}
      >
        <span className="[&_svg]:size-4" aria-hidden>
          {icon ?? <AlertTriangle />}
        </span>
        <span>{description ?? title}</span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="ml-1 font-medium underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {retryLabel}
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-center',
        variant === 'full' ? 'min-h-64 p-8' : 'p-6',
        className,
      )}
    >
      <div
        className="flex size-12 items-center justify-center rounded-full bg-error-subtle text-error [&_svg]:size-6"
        aria-hidden
      >
        {icon ?? <AlertTriangle />}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-body font-medium text-foreground">{title}</p>
        {description && (
          <p className="max-w-sm text-body-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  )
}
