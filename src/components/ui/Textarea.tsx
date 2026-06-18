import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visual + a11y error state (sets aria-invalid). */
  invalid?: boolean
  /** Allow vertical resize. Defaults to true. */
  resizable?: boolean
}

const base =
  'w-full rounded-md border bg-surface px-3 py-2 text-body-sm text-foreground ' +
  'placeholder:text-muted-foreground outline-none ' +
  'transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] ' +
  'focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { invalid = false, resizable = true, rows = 4, className, ...props },
    ref,
  ) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cn(
          base,
          resizable ? 'resize-y' : 'resize-none',
          invalid
            ? 'border-error focus:ring-error'
            : 'border-border focus:border-primary focus:ring-ring',
          className,
        )}
        {...props}
      />
    )
  },
)
