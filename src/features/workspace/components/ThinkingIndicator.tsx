import { useReducedMotion } from 'framer-motion'

interface ThinkingIndicatorProps {
  label?: string
}

/**
 * Subtle, non-blocking activity hint. Animated dots when motion is allowed,
 * a static label otherwise. Communicates state without a large spinner.
 */
export function ThinkingIndicator({
  label = 'Thinking',
}: ThinkingIndicatorProps) {
  const reduceMotion = useReducedMotion()

  return (
    <span
      role="status"
      aria-label={label}
      className="inline-flex items-center gap-1.5 text-muted-foreground"
    >
      {reduceMotion ? (
        <span className="text-body-sm">{label}…</span>
      ) : (
        [0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground/70"
            style={{ animationDelay: `${i * 140}ms` }}
          />
        ))
      )}
    </span>
  )
}
