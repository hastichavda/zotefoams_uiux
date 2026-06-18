import { type ReactNode } from 'react'
import { cn } from '@/utils'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  /** Optional centered label (horizontal only). */
  label?: ReactNode
  className?: string
}

export function Divider({
  orientation = 'horizontal',
  label,
  className,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('w-px self-stretch bg-border', className)}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center gap-3', className)}
      >
        <span className="h-px flex-1 bg-border" />
        <span className="text-caption text-muted-foreground">{label}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
    )
  }

  return (
    <hr
      className={cn('h-px w-full border-0 bg-border', className)}
      aria-orientation="horizontal"
    />
  )
}
