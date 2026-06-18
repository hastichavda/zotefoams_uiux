# Accessibility

Accessibility is treated as a baseline requirement, not an add-on.

## Semantic HTML

- Landmarks: `<nav aria-label="Primary">`, `<main aria-label="Conversation workspace">`, `<section aria-label="Prompt composer">`.
- Each message is an `<article>` labelled by its heading via `aria-labelledby`.
- Headings follow a sensible order: the workspace title is `h1`; agent names and
  the empty-state title are `h2`.
- Lists use `<ol>`/`<ul>`/`<li>`; the user prompt has a visually-hidden heading.

## Keyboard

- All interactive elements are real `<button>`/`<textarea>` elements and are
  reachable in a logical tab order.
- Composer: **Enter** submits, **Shift+Enter** inserts a newline
  (`aria-keyshortcuts="Enter"`).
- Mobile drawer: **Escape** closes it; focus moves to the first item on open and
  **returns to the trigger** on close. The drawer is `inert` + `aria-hidden`
  when closed, removing it from the tab order. Focus is never trapped.

## Visible focus

A consistent `:focus-visible` ring (`--ring`, 2px offset) is defined globally and
on every interactive primitive. Focus is never removed without a replacement.

## Live regions

- A single visually-hidden `aria-live="polite"` status region announces
  lifecycle transitions ("UX Researcher is responding", "All responses
  complete") — phase-level only, so screen readers are not spammed per streamed
  word.
- Streaming agent cards expose `aria-busy` while thinking/streaming.
- Errors use `role="alert"`.

## Reduced motion

- `prefers-reduced-motion` is honoured globally for CSS animations (durations
  collapsed) **and** for Framer Motion via `<MotionConfig reducedMotion="user">`
  — important because the CSS media query does not affect JS-driven animations.
- The `ThinkingIndicator` swaps animated dots for a static label under reduced
  motion. Entrance animations render in their final state immediately.

## Color contrast

Semantic tokens use OKLCH and are paired (`-subtle` surface + `-foreground`
text) to maintain readable contrast in both light and dark themes.
