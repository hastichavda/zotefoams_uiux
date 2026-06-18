import { createElement, type HTMLAttributes } from 'react'
import { cn } from '@/utils'

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label'

export type TextTone = 'default' | 'muted' | 'primary' | 'error'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  tone?: TextTone
  /** Override the rendered element; defaults to a sensible semantic tag. */
  as?: keyof HTMLElementTagNameMap
}

const variantClass: Record<TextVariant, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  'body-lg': 'text-body-lg',
  body: 'text-body',
  'body-sm': 'text-body-sm',
  caption: 'text-caption',
  label: 'text-label',
}

const defaultTag: Record<TextVariant, keyof HTMLElementTagNameMap> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  label: 'span',
}

const toneClass: Record<TextTone, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  primary: 'text-primary',
  error: 'text-error-foreground',
}

/**
 * Typography primitive. Maps the design system type scale to semantic
 * elements while keeping size/weight/tracking consistent.
 */
export function Text({
  variant = 'body',
  tone = 'default',
  as,
  className,
  ...props
}: TextProps) {
  const tag = as ?? defaultTag[variant]
  return createElement(tag, {
    className: cn(variantClass[variant], toneClass[tone], className),
    ...props,
  })
}
