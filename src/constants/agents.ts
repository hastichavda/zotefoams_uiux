import { Boxes, Compass, Microscope, type LucideIcon } from 'lucide-react'

export interface Agent {
  id: string
  name: string
  /** Short description of the lens the agent brings. */
  role: string
  icon: LucideIcon
  /** Tailwind classes for the agent's identity chip (restrained, token-based). */
  iconBg: string
  iconFg: string
}

export const AGENTS: readonly Agent[] = [
  {
    id: 'product-strategist',
    name: 'Product Strategist',
    role: 'Business & outcomes',
    icon: Compass,
    iconBg: 'bg-primary-subtle',
    iconFg: 'text-primary',
  },
  {
    id: 'ux-researcher',
    name: 'UX Researcher',
    role: 'Users & validation',
    icon: Microscope,
    iconBg: 'bg-info-subtle',
    iconFg: 'text-info',
  },
  {
    id: 'software-architect',
    name: 'Software Architect',
    role: 'Feasibility & systems',
    icon: Boxes,
    iconBg: 'bg-success-subtle',
    iconFg: 'text-success',
  },
]

/** Lookup by id for resolving agent identities from message data. */
export const AGENT_MAP: Record<string, Agent> = Object.fromEntries(
  AGENTS.map((agent) => [agent.id, agent]),
)
