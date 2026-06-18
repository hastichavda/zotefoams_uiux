import { Sparkles } from 'lucide-react'
import { SuggestedPrompts } from './SuggestedPrompts'

export function ConversationEmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-10 text-center sm:gap-8 sm:py-16">
      <div className="flex flex-col items-center gap-3">
        <span className="grid size-12 place-items-center rounded-full bg-primary-subtle text-primary">
          <Sparkles className="size-6" />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-h4 text-foreground">Ask your AI team</h2>
          <p className="max-w-md text-body-sm text-muted-foreground">
            Pose a question and three specialists — strategy, research, and
            architecture — will weigh in, then synthesise a combined
            recommendation.
          </p>
        </div>
      </div>
      <SuggestedPrompts />
    </div>
  )
}
