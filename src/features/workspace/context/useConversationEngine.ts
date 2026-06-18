import { useCallback, useEffect, useReducer, useRef } from 'react'
import { createConversationScript } from '../data/mockResponses'
import type { AgentRun } from '../types'
import {
  conversationReducer,
  initialState,
  type ConversationState,
} from './conversationReducer'

/** Timing for the simulated lifecycle (ms). */
const TIMING = {
  submit: 350,
  thinking: 700,
  streamInterval: 45,
  betweenAgents: 250,
  summaryThinking: 750,
} as const

/** Split text into word-sized chunks (word + trailing whitespace). */
function toChunks(text: string): string[] {
  return text.match(/\S+\s*/g) ?? []
}

export interface ConversationEngine {
  state: ConversationState
  submit: (prompt: string) => void
  stop: () => void
  retry: () => void
  newSession: () => void
}

/**
 * Orchestrates the conversation lifecycle with local timers. The reducer stays
 * pure; all asynchronous sequencing lives here and is cancellable via a run id.
 */
export function useConversationEngine(): ConversationEngine {
  const [state, dispatch] = useReducer(conversationReducer, initialState)
  const runIdRef = useRef(0)
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current.clear()
  }, [])

  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
          timersRef.current.delete(timer)
          resolve()
        }, ms)
        timersRef.current.add(timer)
      }),
    [],
  )

  // Clean up any pending timers on unmount.
  useEffect(() => () => clearTimers(), [clearTimers])

  const run = useCallback(
    async (prompt: string) => {
      const runId = ++runIdRef.current
      const isActive = () => runId === runIdRef.current
      clearTimers()

      const script = createConversationScript()
      const agents: AgentRun[] = script.agents.map((response, index) => ({
        id: `a-${runId}-${index}`,
        agentId: response.agentId,
        status: 'idle',
        streamedText: '',
        fullText: response.summary,
        highlights: response.highlights,
        citations: response.citations,
        showExtras: false,
      }))

      dispatch({
        type: 'SUBMIT',
        prompt,
        userMessage: { id: `u-${runId}`, content: prompt },
        agents,
        summary: { id: `s-${runId}`, ...script.summary },
      })

      await sleep(TIMING.submit)
      if (!isActive()) return

      for (let index = 0; index < agents.length; index += 1) {
        dispatch({ type: 'AGENT_THINKING', index })
        await sleep(TIMING.thinking)
        if (!isActive()) return

        dispatch({ type: 'AGENT_STREAM_START', index })
        for (const chunk of toChunks(agents[index].fullText)) {
          await sleep(TIMING.streamInterval)
          if (!isActive()) return
          dispatch({ type: 'AGENT_STREAM_CHUNK', index, chunk })
        }

        dispatch({ type: 'AGENT_COMPLETE', index })
        await sleep(TIMING.betweenAgents)
        if (!isActive()) return
      }

      dispatch({ type: 'SUMMARY_THINKING' })
      await sleep(TIMING.summaryThinking)
      if (!isActive()) return
      dispatch({ type: 'SUMMARY_SHOW' })
    },
    [clearTimers, sleep],
  )

  const submit = useCallback(
    (prompt: string) => {
      const trimmed = prompt.trim()
      if (trimmed) void run(trimmed)
    },
    [run],
  )

  const stop = useCallback(() => {
    runIdRef.current += 1 // invalidate the active run
    clearTimers()
    dispatch({ type: 'STOP' })
  }, [clearTimers])

  const retry = useCallback(() => {
    if (state.lastPrompt) void run(state.lastPrompt)
  }, [run, state.lastPrompt])

  const newSession = useCallback(() => {
    runIdRef.current += 1
    clearTimers()
    dispatch({ type: 'RESET' })
  }, [clearTimers])

  return { state, submit, stop, retry, newSession }
}
