import { type HTMLAttributes } from 'react'
import { cn } from '@/utils'

export type BadgeTone =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
export type BadgeVariant = 'subtle' | 'solid' | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  variant?: BadgeVariant
}

const subtle: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-muted-foreground',
  primary: 'bg-primary-subtle text-primary',
  success: 'bg-success-subtle text-success-foreground',
  warning: 'bg-warning-subtle text-warning-foreground',
  error: 'bg-error-subtle text-error-foreground',
  info: 'bg-info-subtle text-info-foreground',
}

const solid: Record<BadgeTone, string> = {
  neutral: 'bg-foreground text-background',
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  error: 'bg-error text-white',
  info: 'bg-info text-white',
}

const outline: Record<BadgeTone, string> = {
  neutral: 'border border-border text-muted-foreground',
  primary: 'border border-primary/40 text-primary',
  success: 'border border-success/40 text-success-foreground',
  warning: 'border border-warning/40 text-warning-foreground',
  error: 'border border-error/40 text-error-foreground',
  info: 'border border-info/40 text-info-foreground',
}

export function Badge({
  tone = 'neutral',
  variant = 'subtle',
  className,
  ...props
}: BadgeProps) {
  const toneMap =
    variant === 'solid' ? solid : variant === 'outline' ? outline : subtle
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption font-medium',
        toneMap[tone],
        className,
      )}
      {...props}
    />
  )
}
