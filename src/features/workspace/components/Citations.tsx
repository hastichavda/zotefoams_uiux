import { FileText } from 'lucide-react'
import type { Citation } from '../types'

interface CitationsProps {
  citations: Citation[]
}

/** Mocked citation references. Presentation only — no links or fetching. */
export function Citations({ citations }: CitationsProps) {
  if (citations.length === 0) return null

  return (
    <footer className="mt-3 border-t border-border pt-3">
      <p className="mb-2 text-caption font-medium tracking-wide text-muted-foreground uppercase">
        Sources
      </p>
      <ul className="flex flex-wrap gap-2">
        {citations.map((citation) => (
          <li
            key={citation.id}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-muted px-2 py-1 text-caption text-muted-foreground"
          >
            <FileText className="size-3.5 shrink-0" aria-hidden />
            <span className="font-medium text-foreground">
              {citation.label}
            </span>
            <span aria-hidden>·</span>
            <span>{citation.source}</span>
          </li>
        ))}
      </ul>
    </footer>
  )
}
