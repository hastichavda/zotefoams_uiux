# Design System

A restrained, enterprise-grade visual language. All visual values are
expressed as tokens; components consume tokens, never raw values.

## Tokens

The authoritative tokens live in `src/index.css` under Tailwind v4 `@theme`.
`src/theme/tokens.ts` mirrors the token **names** for any non-Tailwind consumer
(inline styles, charts). Colors use OKLCH for perceptually even, theme-friendly
steps and flip automatically between light and `.dark`.

| Group        | Tokens                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| Color        | `background`, `surface`, `surface-muted`, `foreground`, `muted-foreground`, `border`, `ring`, `primary(+hover/-foreground/-subtle)`, and `success`/`warning`/`error`/`info` (each with `-subtle`/`-foreground`) |
| Typography   | `display`, `h1`–`h4`, `body-lg`, `body`, `body-sm`, `caption`, `label` (size · line-height · tracking · weight) on Inter |
| Spacing      | Tailwind 8-point scale                                                  |
| Radius       | `xs` `sm` `md` `lg` `xl`                                                 |
| Elevation    | `shadow-xs` `sm` `md` `lg` (soft, restrained)                           |
| Motion       | `--duration-fast/normal/slow`, `--ease-standard/-out-expo/-in-out`     |
| Breakpoints  | `sm` 40rem · `md` 48rem · `lg` 64rem · `xl` 80rem                       |

### Semantic colors

Tokens are semantic, not literal (`--primary`, not `--blue-500`). Status colors
are paired (`-subtle` background + `-foreground` text) so badges and alerts meet
contrast in both themes.

## Primitives (`src/components/ui`)

Each is presentational, keyboard-accessible, typed, and variant-driven:

- **Button** — `primary` · `secondary` · `ghost` · `destructive`; sizes `sm`/`md`/`lg`; `isLoading`, icons.
- **IconButton** — `default` · `ghost` · `subtle` · `primary`; requires an accessible `label`.
- **Input** / **Textarea** — focus ring, `invalid` state (`aria-invalid`).
- **Card** — `default` · `interactive` (hover lift) · `muted`, with sub-parts.
- **Badge** — six tones × `subtle`/`solid`/`outline`.
- **Avatar** — image → initials → icon fallback, optional status dot.
- **Divider**, **Panel** — structural helpers.
- **Text** — maps the type scale to semantic elements.
- **Spinner**, **LoadingState** (`spinner`/`skeleton`), **EmptyState**, **ErrorState**.

> The AI "thinking" affordance is a domain concept and lives in the feature
> (`ThinkingIndicator`), keeping the generic `LoadingState` focused on data
> loading (spinner/skeleton).

## Usage rules

- Compose with `cn()` (`clsx` + a `tailwind-merge` extended with the custom type
  scale so `text-h2` and `text-foreground` don't collide).
- Use token-backed utilities (`bg-surface`, `text-foreground`, `rounded-lg`,
  `shadow-sm`, `duration-[var(--duration-fast)]`) rather than hardcoded values.
- One primary action per view; everything else is secondary/ghost.
