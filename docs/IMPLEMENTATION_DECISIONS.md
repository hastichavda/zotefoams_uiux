# Implementation Decisions

A decision log: each entry is the choice made, the alternatives considered, and
the reasoning — so every line of the prototype is easy to justify.

## Tooling & build

- **Vite + React 18 + strict TypeScript.** Fast HMR, first-class TS, no `any`.
- **Tailwind CSS v4 with `@theme`.** Tokens live in CSS as the single source of
  truth and drive utilities directly. `src/theme/tokens.ts` mirrors token
  _names_ for the rare non-Tailwind consumer.
  - _Alternative:_ CSS-in-JS — rejected for runtime cost and weaker token story.
- **OKLCH colors.** Perceptually even steps and clean light/dark flipping from a
  single semantic palette.

## Design system

- **Semantic, paired tokens** (`--primary`, `-subtle`/`-foreground`) instead of
  literal scales, so theming is centralised and contrast-safe.
- **`cn()` = `clsx` + extended `tailwind-merge`.** The merge config registers the
  custom type scale so `text-h2` (font-size) and `text-foreground` (color) never
  collide — a subtle bug that a naive merge would introduce.
- **Generic vs. domain split.** `LoadingState` (spinner/skeleton) stays generic;
  the AI "thinking" affordance is a domain concept and lives in the feature as
  `ThinkingIndicator`.

## Conversation engine

- **Reducer + orchestrator split.** Pure reducer for _what_, a timer hook for
  _when_. Keeps transitions testable and side effects in one place. See
  [STATE_MANAGEMENT](STATE_MANAGEMENT.md).
- **`runId` cancellation token** rather than `AbortController`/promises — the
  simplest correct way to make stop/retry/new-session race-free with timers.
- **Word-by-word streaming (~45ms).** Tuned to feel alive without flooding React
  with per-character re-renders.
- **Sequential agents.** Mirrors how specialists build on each other and keeps
  the timeline readable; parallel streaming would be visually noisy.

## Rendering & performance

- **`React.memo` on message components** + identity-preserving reducer updates →
  only the actively streaming card re-renders mid-stream.
- **Transform/opacity-only animation**; no animated geometry, no layout thrash.
- **Single-`requestAnimationFrame` auto-scroll** after layout settles, fixing an
  earlier bug where the summary card could land off-screen.

## Accessibility

- **Phase-level live region.** Announces "X is responding" / "All responses
  complete" rather than every streamed word, so screen readers aren't spammed.
- **Reduced motion handled twice on purpose:** the CSS media query (for CSS
  transitions) _and_ `<MotionConfig reducedMotion="user">` (for JS-driven Framer
  Motion, which the media query can't reach).
- **Drawer focus management:** focus moves in on open, returns to the trigger on
  close, `inert` when hidden, never trapped.

## Scope discipline

- **No backend, router, auth, or persistence.** A single-page presentation
  prototype; mock data and simulated streaming keep the focus on craft.
- **No premature abstraction.** Components stay small and single-purpose;
  abstractions were added only where reuse was real.
