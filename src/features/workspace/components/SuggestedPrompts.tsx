import { SUGGESTED_PROMPTS } from '../data/suggestedPrompts'
import { useWorkspace } from '../context'

/** Realistic starter prompts shown in the empty workspace. */
export function SuggestedPrompts() {
  const { applySuggestion } = useWorkspace()

  return (
    <div className="w-full">
      <p className="mb-3 text-center text-caption font-medium tracking-wide text-muted-foreground uppercase">
        Try one of these
      </p>
      <ul className="grid w-full gap-3 sm:grid-cols-2">
        {SUGGESTED_PROMPTS.map((suggestion) => {
          const Icon = suggestion.icon
          return (
            <li key={suggestion.id}>
              <button
                type="button"
                onClick={() => applySuggestion(suggestion.prompt)}
                className="group flex w-full items-start gap-3 rounded-lg border border-border bg-surface p-3 text-left transition-[transform,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary-subtle text-primary transition-[transform,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-4" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-body-sm font-medium text-foreground">
                    {suggestion.title}
                  </span>
                  <span className="line-clamp-2 text-caption text-muted-foreground">
                    {suggestion.prompt}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
