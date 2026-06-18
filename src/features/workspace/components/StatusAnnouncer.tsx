import { AGENT_MAP } from '@/constants'
import { useWorkspace } from '../context'

/**
 * Visually-hidden live region announcing high-level lifecycle transitions to
 * assistive tech. Announces phase changes only — not every streamed chunk — to
 * avoid overwhelming screen readers.
 */
export function StatusAnnouncer() {
  const { status, agents } = useWorkspace()

  const active = [...agents]
    .reverse()
    .find((a) => a.status === 'thinking' || a.status === 'streaming')
  const name = active ? AGENT_MAP[active.agentId]?.name : undefined

  let message = ''
  switch (status) {
    case 'submitting':
      message = 'Sending your message'
      break
    case 'thinking':
      message = name ? `${name} is thinking` : 'An agent is thinking'
      break
    case 'streaming':
      message = name ? `${name} is responding` : 'An agent is responding'
      break
    case 'summarizing':
      message = 'Preparing the combined summary'
      break
    case 'completed':
      message = 'All responses complete'
      break
  }

  return (
    <p className="sr-only" role="status" aria-live="polite">
      {message}
    </p>
  )
}
