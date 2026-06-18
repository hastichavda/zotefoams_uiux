import { WorkspaceComposer } from '@/features/workspace'

/** Layout wrapper that positions the prompt composer at the workspace foot. */
export function PromptComposer() {
  return (
    <section
      aria-label="Prompt composer"
      className="shrink-0 border-t border-border bg-surface py-3 sm:py-4"
    >
      <WorkspaceComposer />
    </section>
  )
}
