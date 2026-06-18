import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { useConversationEngine } from './useConversationEngine'
import {
  WorkspaceContext,
  type WorkspaceContextValue,
} from './workspace-context'

const PROCESSING_STATUSES = new Set([
  'submitting',
  'thinking',
  'streaming',
  'summarizing',
])

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { state, submit, stop, retry, newSession } = useConversationEngine()
  const [composerValue, setComposerValue] = useState('')
  const composerRef = useRef<HTMLTextAreaElement>(null)

  const isProcessing = PROCESSING_STATUSES.has(state.status)
  const isEmpty = state.status === 'idle' && state.userMessage === null

  const applySuggestion = useCallback((prompt: string) => {
    setComposerValue(prompt)
    composerRef.current?.focus()
  }, [])

  const handleSubmit = useCallback(
    (prompt?: string) => {
      const text = (prompt ?? composerValue).trim()
      if (!text || isProcessing) return
      submit(text)
      setComposerValue('')
    },
    [composerValue, isProcessing, submit],
  )

  const handleNewSession = useCallback(() => {
    newSession()
    setComposerValue('')
    composerRef.current?.focus()
  }, [newSession])

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      status: state.status,
      isProcessing,
      isEmpty,
      userMessage: state.userMessage,
      agents: state.agents,
      summary: state.summary,
      showSummary: state.showSummary,
      canRetry: state.status === 'completed' && state.lastPrompt !== null,
      composerValue,
      composerRef,
      setComposerValue,
      applySuggestion,
      submit: handleSubmit,
      stop,
      retry,
      newSession: handleNewSession,
    }),
    [
      state,
      isProcessing,
      isEmpty,
      composerValue,
      applySuggestion,
      handleSubmit,
      handleNewSession,
      stop,
      retry,
    ],
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
