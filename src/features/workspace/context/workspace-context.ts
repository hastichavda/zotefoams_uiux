import { createContext, useContext, type RefObject } from 'react'
import type {
  AgentRun,
  ConversationStatus,
  SummaryModel,
  UserMessageModel,
} from '../types'

/**
 * Presentation + interaction state for the workspace. Components read from here;
 * the orchestration/streaming logic lives in the conversation engine.
 */
export interface WorkspaceContextValue {
  // Conversation state
  status: ConversationStatus
  isProcessing: boolean
  isEmpty: boolean
  userMessage: UserMessageModel | null
  agents: AgentRun[]
  summary: SummaryModel | null
  showSummary: boolean
  canRetry: boolean

  // Composer
  composerValue: string
  composerRef: RefObject<HTMLTextAreaElement>
  setComposerValue: (value: string) => void
  applySuggestion: (prompt: string) => void

  // Actions
  submit: (prompt?: string) => void
  stop: () => void
  retry: () => void
  newSession: () => void
}

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(
  null,
)

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return ctx
}
