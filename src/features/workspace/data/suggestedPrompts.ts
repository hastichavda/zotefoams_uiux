import {
  LineChart,
  Rocket,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

export interface SuggestedPrompt {
  id: string
  title: string
  prompt: string
  icon: LucideIcon
}

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'sp1',
    icon: Rocket,
    title: 'Improve onboarding activation',
    prompt: 'How should we improve new-user activation in our onboarding flow?',
  },
  {
    id: 'sp2',
    icon: LineChart,
    title: 'Evaluate usage-based pricing',
    prompt: 'Should we move from seat-based to usage-based pricing, and how?',
  },
  {
    id: 'sp3',
    icon: Smartphone,
    title: 'Audit mobile navigation',
    prompt: 'Audit our mobile navigation and recommend usability improvements.',
  },
  {
    id: 'sp4',
    icon: ShieldCheck,
    title: 'Design API rate limiting',
    prompt: 'Plan a fair rate-limiting strategy for our public API.',
  },
]
