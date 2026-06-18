import type { Transition, Variants } from 'framer-motion'

/** GPU-friendly properties — avoid animating layout-triggering values. */
export const GPU_PROPS = ['opacity', 'transform', 'filter'] as const

/**
 * Shared timing. A single expressive ease keeps motion feeling like one
 * system; durations stay short so interactions feel immediate on mid-range
 * hardware.
 */
export const transitions = {
  fast: {
    duration: 0.15,
    ease: [0.16, 1, 0.3, 1],
  },
  normal: {
    duration: 0.25,
    ease: [0.16, 1, 0.3, 1],
  },
  slow: {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1],
  },
} satisfies Record<string, Transition>

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
}

/** Named entrance variants, addressable by key (used by the `Appear` helper). */
export const appearVariants = {
  fade,
  slideUp,
  scaleIn,
} satisfies Record<string, Variants>

export type AppearVariant = keyof typeof appearVariants
