import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils'
import { Spinner } from './Spinner'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Shows a spinner, disables interaction, and sets aria-busy. */
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium select-none ' +
  'transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] ' +
  'active:scale-[0.98] disabled:active:scale-100 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  secondary:
    'border border-border bg-surface text-foreground hover:bg-surface-muted',
  ghost: 'text-foreground hover:bg-surface-muted',
  destructive: 'bg-error text-white hover:opacity-90',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-body-sm',
  md: 'h-10 px-4 text-body-sm',
  lg: 'h-12 px-6 text-body',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
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
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size === 'lg' ? 'md' : 'sm'} />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    )
  },
)
