import { ConversationView } from '@/features/workspace'

/** Scrollable layout region that hosts the conversation experience. */
export function ConversationContainer() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <ConversationView />
    </div>
  )
}
