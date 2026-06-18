# State Management

All state is local and frontend-only — no external library. State is split by
concern into two independent React contexts so UI-shell state never re-renders
the conversation, and vice versa.

## 1. Sidebar / shell state — `src/context`

A minimal context holding only presentation state: rail `collapsed` and mobile
`mobileOpen`. It owns no domain data, so the shell and the conversation evolve
independently.

## 2. Conversation engine — `src/features/workspace/context`

The interaction model is a small **reducer + orchestrator** pair. This is the
core of the prototype.

### Reducer (`conversationReducer.ts`) — _what_ the state is

A pure function: `(state, action) => state`. It performs no side effects, no
timers, no async — which makes every transition trivial to reason about and
test.

- **Conversation lifecycle:** `idle → submitting → thinking → streaming →
  summarizing → completed`.
- **Per-agent lifecycle:** each `AgentRun` independently moves `idle → thinking
  → streaming → completed`.
- **Identity preservation:** settled agents keep their object reference across
  dispatches (see `patchAgent`), so memoised cards don't re-render while a later
  agent streams.

### Orchestrator (`useConversationEngine.ts`) — _when_ it changes

The only place side effects live. It walks the script and dispatches actions on
local timers:

```
submit(prompt)
  → SUBMIT (user message + idle agents)
  → for each agent in sequence:
      AGENT_THINKING → AGENT_STREAM_START
        → AGENT_STREAM_CHUNK (per word, ~45ms) → AGENT_COMPLETE
  → SUMMARY_THINKING → SUMMARY_SHOW (→ completed)
```

### Race-free cancellation

A monotonically increasing `runId` (held in a ref) tags every active run. Each
timer callback checks `runId` before dispatching, so **stop**, **retry**, and
**new session** simply bump the id and any in-flight callbacks become no-ops. A
`timersRef` set is cleared on unmount, so no timer fires against an unmounted
tree.

| Action        | Effect                                                              |
| ------------- | ------------------------------------------------------------------- |
| `submit`      | Builds runs from `createConversationScript()`, starts the sequence. |
| `stop`        | Invalidates `runId`, freezes partially streamed text.               |
| `retry`       | Re-runs the last prompt from a clean slate.                         |
| `newSession`  | Invalidates `runId`, resets to `idle`/empty.                        |

## Provider boundary

`WorkspaceProvider` composes the engine with composer input state
(`composerValue`, `composerRef`) and exposes a single **memoised** context value
with derived flags (`isProcessing`, `isEmpty`, `canRetry`). Components read only
what they need.

## Why this shape

- **Predictable:** pure reducer = deterministic, snapshot-testable transitions.
- **Decoupled:** side effects isolated in one hook; UI stays declarative.
- **Performant:** identity-preserving updates + `React.memo` mean only the
  streaming card re-renders during a stream.
- **Right-sized:** Context/reducer is sufficient at this scale; Redux/Zustand
  would add ceremony without benefit.
