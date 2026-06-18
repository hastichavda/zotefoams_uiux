import { useState, type ReactNode } from 'react'
import { cn } from '@/utils'

export type AvatarSize = 'sm' | 'md' | 'lg'
export type AvatarStatus = 'online' | 'busy' | 'offline'

export interface AvatarProps {
  /** Image URL. Falls back to initials/icon if missing or it fails to load. */
  src?: string
  /** Used for alt text and to derive initials. */
  name?: string
  /** Explicit fallback icon (used when no image and no name). */
  icon?: ReactNode
  size?: AvatarSize
  status?: AvatarStatus
  className?: string
}

const sizes: Record<AvatarSize, string> = {
  sm: 'size-8 text-caption',
  md: 'size-10 text-body-sm',
  lg: 'size-12 text-body',
}

const statusColor: Record<AvatarStatus, string> = {
  online: 'bg-success',
  busy: 'bg-warning',
  offline: 'bg-muted-foreground',
}

const statusSize: Record<AvatarSize, string> = {
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-3',
}

function initialsFrom(name?: string) {
  if (!name) return ''
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({
  src,
  name,
  icon,
  size = 'md',
  status,
  className,
}: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const initials = initialsFrom(name)
  const showImage = src && !failed

  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={cn(
          'inline-flex items-center justify-center overflow-hidden rounded-full ' +
            'bg-primary-subtle font-medium text-primary select-none [&_svg]:size-1/2',
          sizes[size],
          className,
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={name ? `${name} avatar` : ''}
            className="size-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : initials ? (
          <span aria-hidden>{initials}</span>
        ) : (
          icon
        )}
      </span>
      {status && (
        <span
          className={cn(
            'absolute right-0 bottom-0 rounded-full ring-2 ring-surface',
            statusColor[status],
            statusSize[size],
          )}
          role="status"
          aria-label={status}
        />
      )}
    </span>
  )
}
