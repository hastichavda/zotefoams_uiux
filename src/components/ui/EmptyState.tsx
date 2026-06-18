import { type ReactNode } from 'react'
import { cn } from '@/utils'

export type EmptyStateSize = 'compact' | 'default'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: ReactNode
  /** Optional primary action (e.g. a Button). */
  action?: ReactNode
  size?: EmptyStateSize
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'default',
  className,
}: EmptyStateProps) {
  const compact = size === 'compact'
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'gap-2 p-4' : 'gap-3 p-8',
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-surface-muted text-muted-foreground',
            compact ? 'size-9 [&_svg]:size-4' : 'size-12 [&_svg]:size-6',
          )}
          aria-hidden
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p
          className={cn(
            'font-medium text-foreground',
            compact ? 'text-body-sm' : 'text-body',
          )}
        >
          {title}
        </p>
        {description && (
          <p className="max-w-sm text-body-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
