import { memo, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { AGENT_MAP } from '@/constants'
import { Card } from '@/components/ui'
import { transitions } from '@/animations'
import type { AgentRun } from '../types'
import { AgentIdentity } from './AgentIdentity'
import { Citations } from './Citations'
import { ThinkingIndicator } from './ThinkingIndicator'

interface AgentMessageProps {
  run: AgentRun
}

/**
 * An agent's response card. Crossfades from a thinking indicator into the
 * incrementally streamed text, then gently reveals highlights and citations
 * once complete. Memoised so settled agents don't re-render mid-stream.
 */
export const AgentMessage = memo(function AgentMessage({
  run,
}: AgentMessageProps) {
  const agent = AGENT_MAP[run.agentId]
  const headingId = useId()

  if (!agent) return null

  const isThinking = run.status === 'thinking'
  const isStreaming = run.status === 'streaming'
  const showThinking = isThinking && run.streamedText.length === 0

  return (
    <article aria-labelledby={headingId} aria-busy={isThinking || isStreaming}>
      <Card>
        <AgentIdentity
          agent={agent}
          status={run.status}
          headingId={headingId}
        />

        <AnimatePresence mode="wait" initial={false}>
          {showThinking ? (
            <motion.div
              key="thinking"
              className="mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitions.fast}
            >
              <ThinkingIndicator label={`${agent.name} is thinking`} />
            </motion.div>
          ) : (
            <motion.p
              key="body"
              className="mt-3 text-body-sm text-foreground/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transitions.fast}
            >
              {run.streamedText}
              {isStreaming && (
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse rounded-[1px] bg-primary align-[-0.1em]"
                />
              )}
            </motion.p>
          )}
        </AnimatePresence>

        {run.showExtras && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitions.normal}
          >
            {run.highlights.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1.5">
                {run.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 text-body-sm text-foreground/90"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-success"
                      aria-hidden
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
            <Citations citations={run.citations} />
          </motion.div>
        )}
      </Card>
    </article>
  )
})
