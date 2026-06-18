/** Mocked recent conversations — static data only (no logic). */

export interface RecentConversation {
  id: string
  title: string
}

export const RECENT_CONVERSATIONS: RecentConversation[] = [
  { id: 'c1', title: 'Onboarding flow redesign' },
  { id: 'c2', title: 'Pricing page positioning' },
  { id: 'c3', title: 'Mobile navigation audit' },
  { id: 'c4', title: 'API rate limit strategy' },
  { id: 'c5', title: 'Q3 roadmap themes' },
]
