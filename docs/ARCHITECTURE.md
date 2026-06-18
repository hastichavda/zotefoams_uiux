# Architecture

## Principles

- **Composition over inheritance.** Small, single-responsibility components are
  composed into layouts and features.
- **Presentation / logic separation.** UI primitives and message components are
  pure and presentational; orchestration and state live in the conversation
  engine.
- **Strict typing.** Domain models (`features/workspace/types.ts`) are typed and
  shared; no `any`.
- **Single-page workspace.** No routing — one focused surface.

## Layering

```
app/            ── App + global providers (MotionConfig)
  └ layouts/    ── Structural shell (Sidebar, Workspace, header, containers)
      └ features/workspace/  ── The domain experience
          ├ components/      ── Presentational (message cards, composer, …)
          ├ context/         ── State + orchestration
          └ data/            ── Mocked content
  └ components/ui/  ── Design-system primitives (domain-agnostic)
```

Dependencies point inward: `features` and `layouts` consume `components/ui`,
`animations`, `hooks`, and `theme` — never the reverse.

## State management

Two small, independent React contexts — no external state library.

### `SidebarContext` (`src/context`)

App-shell UI state only: rail collapse and the mobile drawer. Intentionally
separate from domain state.

### Conversation engine (`src/features/workspace/context`)

- **`conversationReducer.ts`** — a pure reducer owning the lifecycle
  (`idle → submitting → thinking → streaming → summarizing → completed`) and
  per-agent status (`idle → thinking → streaming → completed`). It only
  transforms state; it performs no side effects.
- **`useConversationEngine.ts`** — drives the sequence with local timers.
  Sequential agent runs and word-by-word streaming are dispatched as actions.
  A monotonically increasing `runId` invalidates stale runs so **stop**,
  **retry**, and **new session** are race-free; timers are cleared on unmount.
- **`WorkspaceProvider.tsx`** — composes the engine with composer state and
  exposes a memoised context value.

### Data flow

```
submit(prompt)
  → engine builds runs from createConversationScript()
  → dispatch SUBMIT (user message + idle agents)
  → for each agent: AGENT_THINKING → AGENT_STREAM_START
       → AGENT_STREAM_CHUNK (per word) → AGENT_COMPLETE
  → SUMMARY_THINKING → SUMMARY_SHOW
```

## Rendering & performance

- Message components (`UserMessage`, `AgentMessage`, `SummaryCard`) are
  `React.memo`'d. The reducer preserves object identity for settled agents, so
  only the actively streaming card re-renders during a stream.
- Streaming is word-chunked (≈45 ms) to balance smoothness against re-render
  volume.
- All animation is transform/opacity only; auto-scroll runs in a single
  `requestAnimationFrame` after layout.

## Conventions

- PascalCase component files; camelCase hooks/utilities; kebab-case for
  context modules (`workspace-context.ts`).
- Barrel `index.ts` per folder for clean imports via the `@/` alias.
