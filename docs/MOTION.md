# Motion

## Philosophy

Motion exists to **communicate interface state**, never for decoration. Every
animation answers a question: *what just changed, and where did it go?* If an
animation doesn't aid comprehension or feedback, it isn't used.

Principles:

- **Purposeful** — entrance, state change, or feedback only.
- **Immediate** — short durations (150–400 ms) so the UI never feels gated.
- **GPU-friendly** — `transform` and `opacity` only; never animate layout
  properties (width/height/top/left) that trigger reflow.
- **Accessible** — fully respects `prefers-reduced-motion`.

## Tokens

Timing is centralised so motion feels like one system:

- Durations: `--duration-fast` (150 ms), `--duration-normal` (250 ms),
  `--duration-slow` (400 ms).
- Easing: `--ease-standard`, `--ease-out-expo`, `--ease-in-out`.

Framer Motion reads a shared `transitions` object (`src/animations`); Tailwind
utilities reference the same tokens via `duration-[var(--duration-fast)]` and
`ease-[var(--ease-standard)]`.

## Where motion is used

| Surface                     | Motion                                   | Why |
| --------------------------- | ---------------------------------------- | --- |
| Buttons / IconButtons       | press `scale`                            | tactile feedback |
| Cards / suggestion chips    | hover lift + press settle                | affordance |
| Inputs                      | focus ring/border transition             | focus feedback |
| Sidebar collapse / drawer   | `transform`/`width` + overlay fade       | spatial continuity |
| Empty ↔ conversation        | crossfade                                | context switch |
| Message appearance          | `slideUp` entrance                       | new content arriving |
| Agent thinking → streaming  | crossfade dots → text + caret            | state progression |
| Completed reveal            | fade-in highlights/citations             | completion |
| Summary card                | `scaleIn` (distinct)                     | emphasis on synthesis |
| Stop ↔ Retry control        | scale/opacity presence                   | state change |

## Reduced motion

`<MotionConfig reducedMotion="user">` disables transform-based animation for
users who request it (opacity still resolves), and the global CSS media query
collapses CSS animation/transition durations. Animated indicators fall back to
static equivalents.

## Performance

- Memoised message components mean only the streaming card re-renders mid-stream.
- Auto-scroll runs once per update inside `requestAnimationFrame`.
- No layout-thrashing animations; streaming reveals text content, not animated
  geometry.
