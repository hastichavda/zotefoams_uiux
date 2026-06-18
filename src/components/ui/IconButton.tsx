import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils'
import { Spinner } from './Spinner'

export type IconButtonVariant = 'default' | 'ghost' | 'subtle' | 'primary'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required accessible name for the icon-only control. */
  label: string
  icon: ReactNode
  variant?: IconButtonVariant
  size?: IconButtonSize
  isLoading?: boolean
}

const base =
  'inline-flex items-center justify-center rounded-md select-none ' +
  'transition-[background-color,border-color,color,opacity,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] ' +
  'active:scale-[0.92] disabled:active:scale-100 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<IconButtonVariant, string> = {
  default:
    'border border-border bg-surface text-foreground hover:bg-surface-muted',
  ghost: 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
  subtle: 'bg-surface-muted text-foreground hover:bg-border',
  primary:
    'bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover ' +
    'disabled:hover:bg-primary',
}

const sizes: Record<IconButtonSize, string> = {
  sm: 'size-8 [&_svg]:size-4',
  md: 'size-10 [&_svg]:size-5',
  lg: 'size-12 [&_svg]:size-5',
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      icon,
      variant = 'default',
      size = 'md',
      isLoading = false,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? <Spinner size="sm" label={label} /> : icon}
      </button>
    )
  },
)
