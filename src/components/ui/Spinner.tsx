import { Loader2 } from 'lucide-react'
import { cn } from '@/utils'

const sizeMap = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
} as const

export interface SpinnerProps {
  size?: keyof typeof sizeMap
  className?: string
  /** Accessible label; rendered for screen readers. */
  label?: string
}

/** Indeterminate loading indicator. Animation is transform-only (GPU-friendly). */
export function Spinner({
  size = 'md',
  className,
  label = 'Loading',
}: SpinnerProps) {
  return (
    <span role="status" className="inline-flex items-center">
      <Loader2
        className={cn('animate-spin text-current', sizeMap[size], className)}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}
