import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils'

export type CardVariant = 'default' | 'interactive' | 'muted'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
}

const variants: Record<CardVariant, string> = {
  default: 'border border-border bg-surface shadow-xs',
  interactive:
    'border border-border bg-surface shadow-xs cursor-pointer ' +
    'transition-[box-shadow,transform,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] ' +
    'hover:-translate-y-px hover:shadow-md hover:border-primary/40 active:translate-y-0 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  muted: 'border border-border bg-surface-muted',
}

const paddings: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg',
        variants[variant],
        paddings[padding],
        className,
      )}
      {...props}
    />
  )
})

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1', className)} {...props} />
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) {
  return (
    <h3 className={cn('text-h4 text-foreground', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-body-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-body-sm', className)} {...props} />
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center gap-2', className)} {...props} />
}
