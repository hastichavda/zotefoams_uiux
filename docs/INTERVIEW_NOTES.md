# Interview Notes

Concise, walkthrough-ready talking points. Each answer is a 20–30 second summary
with a pointer to where it lives in the code.

## Architecture

Layered, dependencies pointing inward: `app` → `layouts` → `features/workspace`,
all consuming domain-agnostic `components/ui`, `animations`, `hooks`, and
`theme`. Single-page workspace, no router. Presentation is separated from logic:
UI primitives and message cards are pure; orchestration lives in the conversation
engine. → `docs/ARCHITECTURE.md`

## Component strategy

Two tiers. **Primitives** (`components/ui`) are generic, variant-driven, typed,
and accessible — they know nothing about agents. **Feature components**
(`features/workspace/components`) compose primitives into the domain (agent
cards, timeline, composer). Composition over inheritance; small single-purpose
components; abstractions only where reuse is real. → `docs/DESIGN_SYSTEM.md`

## Accessibility

Baseline requirement. Semantic landmarks + heading order, real interactive
elements, consistent focus-visible ring, full keyboard support, drawer focus
restoration, a phase-level polite live region (not per-word), and
`prefers-reduced-motion` handled in both CSS and Framer Motion.
→ `docs/ACCESSIBILITY.md`

## Responsiveness

A single `Sidebar` adapts by breakpoint via a `useMediaQuery` hook: persistent
rail on desktop, collapsible on tablet, off-canvas drawer on mobile. The
conversation column is fluid with comfortable max-width; touch targets and
spacing scale up on small screens. Layout uses fl/grid, never fixed pixels.

## Motion

Motion communicates state only — entrance, transition, feedback. Short durations,
transform/opacity only (60 FPS, no reflow), centralised timing tokens shared by
CSS and Framer Motion, full reduced-motion fallbacks. → `docs/MOTION.md`

## State management

No external library. Two contexts: shell UI (sidebar) and the conversation
engine. The engine is a **pure reducer** (lifecycle + per-agent status) plus a
**timer orchestrator**; a `runId` token makes stop/retry/new-session race-free.
→ `docs/STATE_MANAGEMENT.md`

## Performance optimizations

`React.memo` on message components and an identity-preserving reducer mean only
the streaming card re-renders mid-stream. Streaming is word-chunked to bound
re-render volume. Animations are GPU-friendly; auto-scroll runs once per update
inside a single `requestAnimationFrame`. Timers are cleaned up on unmount.

## Likely follow-up questions

- **Why a reducer over `useState`?** Many coordinated transitions across the
  conversation and N agents — a reducer keeps them in one auditable place.
- **Why simulate streaming with timers?** No backend in scope; timers reproduce
  the perceived behaviour while keeping all logic on the frontend.
- **How would this connect to a real API?** Replace `createConversationScript`
  and the timer loop with a streaming transport (SSE/WebSocket); the reducer and
  components stay unchanged.
- **What would you do next?** See _Future improvements_ in the README.
