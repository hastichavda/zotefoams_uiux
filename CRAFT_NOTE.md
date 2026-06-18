# Craft Note

A short reflection on how this Multi-Agent AI Workspace was built and why.

## Design decisions

I aimed for the restrained confidence of tools like Linear and Raycast: a quiet,
token-driven visual language where hierarchy comes from spacing, weight, and a
single accent — not decoration. Everything is semantic tokens (OKLCH color, an
Inter type scale, an 8-point grid) so the system is consistent and themes cleanly
between light and dark. The three agents share one identity pattern (avatar, name,
role, status) so collaboration reads instantly while each remains distinct.

## Interaction philosophy

One primary action at a time, no onboarding required. The workspace opens to an
empty state with realistic suggested prompts; submitting reveals a clear timeline —
**user → each specialist → synthesis**. The interface is never blocked: agents
think and stream sequentially with visible, non-modal progress, and the user can
**stop**, **retry**, or start a **new session** at any moment.

## Accessibility considerations

Accessibility was a baseline, not a pass at the end. Semantic landmarks and a
sensible heading order, real `<button>`/`<textarea>` controls, a consistent
focus-visible ring, and keyboard ergonomics (Enter to send, Shift+Enter for a
newline, Escape to close the drawer with focus restored). A single polite live
region announces phase-level progress so screen readers are informed but not
spammed.

## Motion strategy

Motion only communicates state — what changed and where it went. Durations are
short (150–400 ms) and every animation is transform/opacity only to stay at 60 FPS
with no layout thrash. Timing is centralised in tokens shared by CSS and Framer
Motion. `prefers-reduced-motion` is honoured in both worlds, with animated
indicators falling back to static equivalents.

## Engineering trade-offs

State is a small pure reducer for _what_ plus a timer hook for _when_, with a
`runId` token making stop/retry race-free — deliberately chosen over a heavier
state library that the scope didn't warrant. Message components are memoised and
the reducer preserves identity, so only the streaming card re-renders. The cost
is more orchestration code than a naive `setTimeout` chain, paid back in
predictability, testability, and clean cancellation.
