import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { transitions } from '@/animations'

type AppProvidersProps = {
  children: ReactNode
}

/**
 * Composes global providers. `MotionConfig` applies a consistent default
 * transition and makes every Framer Motion animation honour the user's
 * reduced-motion preference (CSS media queries only cover CSS animations).
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig reducedMotion="user" transition={transitions.normal}>
      {children}
    </MotionConfig>
  )
}
