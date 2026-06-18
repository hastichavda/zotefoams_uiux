import { memo, useId } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { SummaryModel } from '../types'

interface SummaryCardProps {
  summary: SummaryModel
}

/** Synthesised recommendation across all agents — visually distinct. */
export const SummaryCard = memo(function SummaryCard({
  summary,
}: SummaryCardProps) {
  const headingId = useId()
  return (
    <article
      aria-labelledby={headingId}
      className="rounded-lg border border-primary/30 bg-primary-subtle/60 p-4 sm:p-5"
    >
      <header className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
          <Sparkles className="size-5" />
        </span>
        <div className="min-w-0">
          <h2
            id={headingId}
            className="text-body font-semibold text-foreground"
          >
            {summary.title}
          </h2>
          <p className="text-caption text-muted-foreground">
            Synthesis across all three agents
          </p>
        </div>
      </header>

      <p className="mt-3 text-body-sm text-foreground/90">{summary.content}</p>

      {summary.keyPoints.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {summary.keyPoints.map((point) => (
            <li
              key={point}
              className="flex gap-2 text-body-sm text-foreground/90"
            >
              <ArrowRight
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
})
