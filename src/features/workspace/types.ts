/** Conversation data models for the multi-agent workspace. */

export interface Citation {
  id: string
  label: string
  source: string
}

/** Per-agent lifecycle state. */
export type AgentStatus = 'idle' | 'thinking' | 'streaming' | 'completed'

/** Overall conversation lifecycle. */
export type ConversationStatus =
  | 'idle'
  | 'submitting'
  | 'thinking'
  | 'streaming'
  | 'summarizing'
  | 'completed'

export interface UserMessageModel {
  id: string
  content: string
}

/** Runtime model for an agent's response as it streams in. */
export interface AgentRun {
  id: string
  agentId: string
  status: AgentStatus
  /** Text revealed so far. */
  streamedText: string
  /** Full target text used by the streaming simulation. */
  fullText: string
  highlights: string[]
  citations: Citation[]
  /** Highlights + citations are shown once streaming completes. */
  showExtras: boolean
}

export interface SummaryModel {
  id: string
  title: string
  content: string
  keyPoints: string[]
}
