import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  inputSize?: InputSize
  /** Visual + a11y error state (sets aria-invalid). */
  invalid?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const sizes: Record<InputSize, string> = {
  sm: 'h-8 text-body-sm',
  md: 'h-10 text-body-sm',
  lg: 'h-12 text-body',
}

const fieldBase =
  'flex w-full items-center gap-2 rounded-md border bg-surface px-3 ' +
  'transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] ' +
  'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    inputSize = 'md',
    invalid = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    ...props
  },
  ref,
) {
  return (
    <div
      className={cn(
        fieldBase,
        sizes[inputSize],
        invalid
          ? 'border-error focus-within:ring-error'
          : 'border-border focus-within:border-primary focus-within:ring-ring',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {leftIcon && (
        <span className="inline-flex shrink-0 text-muted-foreground [&_svg]:size-4">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className="h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        {...props}
      />
      {rightIcon && (
        <span className="inline-flex shrink-0 text-muted-foreground [&_svg]:size-4">
          {rightIcon}
        </span>
      )}
    </div>
  )
})
