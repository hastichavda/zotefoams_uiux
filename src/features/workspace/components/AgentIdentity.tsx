import type { Agent } from '@/constants'
import { Avatar, Badge, type BadgeProps } from '@/components/ui'
import { cn } from '@/utils'
import type { AgentStatus } from '../types'

interface AgentIdentityProps {
  agent: Agent
  status?: AgentStatus
  /** id applied to the agent name heading for aria-labelledby. */
  headingId?: string
}

function statusBadge(
  status: AgentStatus,
): { tone: BadgeProps['tone']; label: string } | null {
  switch (status) {
    case 'thinking':
      return { tone: 'neutral', label: 'Thinking' }
    case 'streaming':
      return { tone: 'info', label: 'Responding' }
    case 'completed':
      return { tone: 'success', label: 'Complete' }
    default:
      return null
  }
}

/** Reusable agent identity block: avatar, name, role, and status badge. */
export function AgentIdentity({
  agent,
  status,
  headingId,
}: AgentIdentityProps) {
  const Icon = agent.icon
  const badge = status ? statusBadge(status) : null
  return (
    <div className="flex items-center gap-3">
      <Avatar
        icon={<Icon />}
        size="md"
        className={cn(agent.iconBg, agent.iconFg)}
      />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2
            id={headingId}
            className="truncate text-body-sm font-semibold text-foreground"
          >
            {agent.name}
          </h2>
          {badge && <Badge tone={badge.tone}>{badge.label}</Badge>}
        </div>
        <p className="truncate text-caption text-muted-foreground">
          {agent.role}
        </p>
      </div>
    </div>
  )
}
