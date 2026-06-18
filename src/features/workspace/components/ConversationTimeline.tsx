import { useEffect, useRef } from 'react'
import { useWorkspace } from '../context'
import { Appear } from './Appear'
import { AgentMessage } from './AgentMessage'
import { SummaryCard } from './SummaryCard'
import { ThinkingIndicator } from './ThinkingIndicator'
import { UserMessage } from './UserMessage'

/** Ordered conversation: user prompt → agent responses → combined summary. */
export function ConversationTimeline() {
  const { userMessage, agents, summary, showSummary, status } = useWorkspace()
  const endRef = useRef<HTMLDivElement>(null)

  // Agents only appear once they leave the idle state, so they reveal one-by-one.
  const visibleAgents = agents.filter((agent) => agent.status !== 'idle')
  const streamedLength = visibleAgents.reduce(
    (total, agent) => total + agent.streamedText.length,
    0,
  )

  // Keep the latest content in view as it streams. A rAF lets the just-mounted
  // node (e.g. the summary card) lay out before we scroll, so we reliably land
  // at the bottom. Instant scroll respects reduced-motion and avoids fighting
  // the chunk cadence.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ block: 'end' })
    })
    return () => cancelAnimationFrame(frame)
  }, [streamedLength, visibleAgents.length, showSummary, status])

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <ol className="flex list-none flex-col gap-4">
        {userMessage && (
          <li>
            <Appear>
              <UserMessage message={userMessage} />
            </Appear>
          </li>
        )}

        {visibleAgents.map((run) => (
          <li key={run.id}>
            <Appear>
              <AgentMessage run={run} />
            </Appear>
          </li>
        ))}

        {status === 'summarizing' && (
          <li>
            <Appear>
              <div className="rounded-lg border border-primary/30 bg-primary-subtle/60 p-4">
                <ThinkingIndicator label="Preparing the combined summary" />
              </div>
            </Appear>
          </li>
        )}

        {showSummary && summary && (
          <li>
            <Appear variant="scaleIn">
              <SummaryCard summary={summary} />
            </Appear>
          </li>
        )}
      </ol>
      <div ref={endRef} aria-hidden />
    </div>
  )
}
