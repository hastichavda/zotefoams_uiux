import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils'

export type PanelVariant = 'default' | 'floating'

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  variant?: PanelVariant
  /** Optional header title. */
  title?: ReactNode
  /** Optional actions rendered in the header's trailing edge. */
  actions?: ReactNode
  /** Optional footer region. */
  footer?: ReactNode
}

const variants: Record<PanelVariant, string> = {
  default: 'border border-border bg-surface',
  floating: 'border border-border bg-surface shadow-lg',
}

/**
 * Structural container for grouping content (e.g. sidebars, side panels,
 * sectioned regions). Presentation-only — collapse/resize behaviour belongs
 * to feature code that composes this primitive.
 */
export const Panel = forwardRef<HTMLElement, PanelProps>(function Panel(
  {
    variant = 'default',
    title,
    actions,
    footer,
    className,
    children,
    ...props
  },
  ref,
) {
  const hasHeader = title != null || actions != null
  return (
    <section
      ref={ref}
      className={cn(
        'flex flex-col overflow-hidden rounded-lg',
        variants[variant],
        className,
      )}
      {...props}
    >
      {hasHeader && (
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          {title != null &&
            (typeof title === 'string' ? (
              <h2 className="text-label text-foreground">{title}</h2>
            ) : (
              title
            ))}
          {actions != null && (
            <div className="flex items-center gap-1">{actions}</div>
          )}
        </header>
      )}
      <div className="min-h-0 flex-1">{children}</div>
      {footer != null && (
        <footer className="border-t border-border px-4 py-3">{footer}</footer>
      )}
    </section>
  )
})
