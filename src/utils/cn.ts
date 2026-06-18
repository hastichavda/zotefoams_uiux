import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge configured with our custom type-scale tokens.
 *
 * Without this, classes like `text-display` and `text-foreground` are both
 * seen as generic `text-*` utilities and merged into one. Registering the
 * type scale under the `font-size` group keeps size and color independent.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display',
            'h1',
            'h2',
            'h3',
            'h4',
            'body-lg',
            'body',
            'body-sm',
            'caption',
            'label',
          ],
        },
      ],
    },
  },
})

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
