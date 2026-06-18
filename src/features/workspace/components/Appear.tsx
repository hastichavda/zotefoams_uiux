import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { appearVariants, transitions, type AppearVariant } from '@/animations'

interface AppearProps {
  children: ReactNode
  /** Entrance style. `slideUp` for thread items, `scaleIn` for emphasis. */
  variant?: AppearVariant
  /** Stagger delay in seconds. */
  delay?: number
  className?: string
}

/**
 * One-shot entrance animation (opacity + transform only). Respects the user's
 * reduced-motion preference by rendering in its final state immediately.
 */
export function Appear({
  children,
  variant = 'slideUp',
  delay = 0,
  className,
}: AppearProps) {
  const reduceMotion = useReducedMotion()
  const variants = appearVariants[variant]

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      transition={{ ...transitions.normal, delay }}
    >
      {children}
    </motion.div>
  )
}
