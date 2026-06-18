import type {
  AgentRun,
  ConversationStatus,
  SummaryModel,
  UserMessageModel,
} from '../types'

export interface ConversationState {
  status: ConversationStatus
  userMessage: UserMessageModel | null
  agents: AgentRun[]
  summary: SummaryModel | null
  showSummary: boolean
  lastPrompt: string | null
}

export const initialState: ConversationState = {
  status: 'idle',
  userMessage: null,
  agents: [],
  summary: null,
  showSummary: false,
  lastPrompt: null,
}

export type ConversationAction =
  | { type: 'RESET' }
  | {
      type: 'SUBMIT'
      userMessage: UserMessageModel
      agents: AgentRun[]
      summary: SummaryModel
      prompt: string
    }
  | { type: 'AGENT_THINKING'; index: number }
  | { type: 'AGENT_STREAM_START'; index: number }
  | { type: 'AGENT_STREAM_CHUNK'; index: number; chunk: string }
  | { type: 'AGENT_COMPLETE'; index: number }
  | { type: 'SUMMARY_THINKING' }
  | { type: 'SUMMARY_SHOW' }
  | { type: 'STOP' }

/** Immutably patches a single agent, preserving identity of the others. */
function patchAgent(
  agents: AgentRun[],
  index: number,
  patch: Partial<AgentRun>,
): AgentRun[] {
  return agents.map((agent, i) =>
    i === index ? { ...agent, ...patch } : agent,
  )
}

export function conversationReducer(
  state: ConversationState,
  action: ConversationAction,
): ConversationState {
  switch (action.type) {
    case 'RESET':
      return initialState

    case 'SUBMIT':
      return {
        status: 'submitting',
        userMessage: action.userMessage,
        agents: action.agents,
        summary: action.summary,
        showSummary: false,
        lastPrompt: action.prompt,
      }

    case 'AGENT_THINKING':
      return {
        ...state,
        status: 'thinking',
        agents: patchAgent(state.agents, action.index, { status: 'thinking' }),
      }

    case 'AGENT_STREAM_START':
      return {
        ...state,
        status: 'streaming',
        agents: patchAgent(state.agents, action.index, { status: 'streaming' }),
      }

    case 'AGENT_STREAM_CHUNK':
      return {
        ...state,
        agents: patchAgent(state.agents, action.index, {
          streamedText: state.agents[action.index].streamedText + action.chunk,
        }),
      }

    case 'AGENT_COMPLETE':
      return {
        ...state,
        agents: patchAgent(state.agents, action.index, {
          status: 'completed',
          streamedText: state.agents[action.index].fullText,
          showExtras: true,
        }),
      }

    case 'SUMMARY_THINKING':
      return { ...state, status: 'summarizing' }

    case 'SUMMARY_SHOW':
      return { ...state, status: 'completed', showSummary: true }

    case 'STOP':
      return {
        ...state,
        status: 'completed',
        agents: state.agents.map((agent) =>
          agent.status === 'thinking' || agent.status === 'streaming'
            ? { ...agent, status: 'completed' }
            : agent,
        ),
      }

    default:
      return state
  }
}
