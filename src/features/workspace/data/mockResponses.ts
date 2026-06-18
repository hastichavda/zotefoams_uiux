import type { Citation } from '../types'

export interface AgentResponseContent {
  agentId: string
  summary: string
  highlights: string[]
  citations: Citation[]
}

export interface ConversationScript {
  agents: AgentResponseContent[]
  summary: {
    title: string
    content: string
    keyPoints: string[]
  }
}

/**
 * Canned, locally-mocked response set. Returned for any prompt — there is no
 * real model. Order matches the AGENTS registry so agents run sequentially.
 */
const DEFAULT_SCRIPT: ConversationScript = {
  agents: [
    {
      agentId: 'product-strategist',
      summary:
        'Activation should be defined around the first moment of real value — not account creation. Focus onboarding on reaching that milestone quickly and defer everything else.',
      highlights: [
        'Define a single activation milestone (e.g. first project created).',
        'Remove non-essential setup steps from the initial flow.',
        'Prioritise time-to-value over feature completeness.',
      ],
      citations: [
        {
          id: 'a1c1',
          label: 'Activation Benchmark Report',
          source: 'Strategy Deck',
        },
        {
          id: 'a1c2',
          label: 'North Star Metric Framework',
          source: 'Product Playbook',
        },
      ],
    },
    {
      agentId: 'ux-researcher',
      summary:
        'Recent usability sessions show new users abandon onboarding at empty states with unclear next steps. They need guidance and a visible sense of progress.',
      highlights: [
        'Add contextual empty states that suggest the next action.',
        'Show a lightweight progress indicator during setup.',
        'Replace jargon in tooltips with task-oriented language.',
      ],
      citations: [
        {
          id: 'a2c1',
          label: 'Usability Test — Cohort 12',
          source: 'Research Repository',
        },
        {
          id: 'a2c2',
          label: 'Onboarding Drop-off Analysis',
          source: 'Analytics Review',
        },
      ],
    },
    {
      agentId: 'software-architect',
      summary:
        'The current onboarding is a single monolithic flow. A modular, step-based architecture would let us reorder, skip, and measure individual steps without large rewrites.',
      highlights: [
        'Model onboarding as composable, independent steps.',
        'Emit analytics events per step to locate drop-off.',
        'Use feature flags to A/B test step ordering safely.',
      ],
      citations: [
        {
          id: 'a3c1',
          label: 'Onboarding Service RFC',
          source: 'Architecture Docs',
        },
        {
          id: 'a3c2',
          label: 'Feature Flag Guidelines',
          source: 'Engineering Handbook',
        },
      ],
    },
  ],
  summary: {
    title: 'Combined Summary',
    content:
      'Redefine activation around first real value, then redesign onboarding as a guided, modular flow that removes friction, communicates progress, and is instrumented to reveal where users drop off.',
    keyPoints: [
      'Anchor onboarding on one clear activation milestone.',
      'Guide users with contextual empty states and visible progress.',
      'Rebuild the flow as measurable, independently testable steps.',
    ],
  },
}

export function createConversationScript(): ConversationScript {
  return DEFAULT_SCRIPT
}
