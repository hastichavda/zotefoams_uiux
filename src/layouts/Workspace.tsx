import { ConversationContainer } from './ConversationContainer'
import { PromptComposer } from './PromptComposer'
import { WorkspaceHeader } from './WorkspaceHeader'

/** The primary working area: header, conversation surface, and composer. */
export function Workspace() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <WorkspaceHeader />
      <main
        className="flex min-h-0 flex-1 flex-col"
        aria-label="Conversation workspace"
      >
        <ConversationContainer />
      </main>
      <PromptComposer />
    </div>
  )
}
