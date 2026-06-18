# Multi-Agent AI Workspace

A production-quality frontend prototype of a collaborative multi-agent AI
workspace. A user poses a question and three specialists — **Product
Strategist**, **UX Researcher**, and **Software Architect** — respond in
sequence, then a combined summary synthesises their input.

The experience is entirely frontend: AI responses are mocked locally and
streaming is simulated with timers. There is no backend, authentication, or
persistence.

## Tech stack

- **React 18** + **TypeScript** (strict)
- **Vite** build tooling
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** for state-communicating motion
- **ESLint** + **Prettier**
- `clsx` + `tailwind-merge` for class composition
- `lucide-react` for iconography

## Getting started

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check + production build
npm run lint       # ESLint
npm run format     # Prettier --write
```

## Project structure

```
src/
  app/            App root + global providers (MotionConfig)
  layouts/        Application shell: Sidebar, Workspace, header, containers
  components/ui/  Design-system primitives (Button, Card, Input, …)
  features/
    workspace/    The multi-agent experience
      components/ Presentational message + conversation components
      context/    Conversation engine, reducer, provider, context
      data/       Mocked agent responses + suggested prompts
      types.ts    Conversation domain types
  context/        App-shell UI state (sidebar)
  hooks/          Reusable hooks (useMediaQuery)
  animations/     Motion variants + shared transitions
  theme/          Design-token reference (mirrors src/index.css @theme)
  constants/      Agents, product strings
  mocks/          Static mock data
  utils/          cn() class merger
  index.css       Design tokens (@theme) + base styles
```

## Architectural decisions

- **Layered, inward-pointing dependencies.** `app → layouts → features/workspace`,
  all consuming domain-agnostic `components/ui`, `animations`, `hooks`, `theme`.
- **Presentation / logic separation.** UI primitives and message cards are pure;
  orchestration and state live in the conversation engine.
- **State without a library.** Two small React contexts — shell UI (sidebar) and
  a conversation engine built from a **pure reducer** (lifecycle + per-agent
  status) plus a **timer orchestrator**. A `runId` token makes stop / retry /
  new-session race-free.
- **Token-driven design system.** Tailwind v4 `@theme` is the single source of
  truth; OKLCH semantic colors flip cleanly between light and dark.
- **Motion communicates state only.** Transform/opacity at 60 FPS, centralised
  timing tokens, full `prefers-reduced-motion` support.

See [`docs/`](docs/) for the full write-ups.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — composition, layering, data flow
- [State Management](docs/STATE_MANAGEMENT.md) — reducer + orchestrator engine
- [Design System](docs/DESIGN_SYSTEM.md) — tokens and primitives
- [Accessibility](docs/ACCESSIBILITY.md) — semantics, keyboard, reduced motion
- [Motion](docs/MOTION.md) — motion philosophy and performance
- [Implementation Decisions](docs/IMPLEMENTATION_DECISIONS.md) — decision log
- [Design Foundation](docs/DESIGN_FOUNDATION.md) — product vision & UX strategy
- [Craft Note](CRAFT_NOTE.md) · [Interview Notes](docs/INTERVIEW_NOTES.md)

## Deployment

The app is a static SPA — `npm run build` emits `dist/`, deployable to any static
host.

- **Vercel:** import the repo (config in `vercel.json`) or `npx vercel`.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **GitHub Pages / any static host:** serve the contents of `dist/`.

```bash
npm run build && npm run preview   # verify the production build locally
```

## Future improvements

- Replace `createConversationScript` + timers with a real streaming transport
  (SSE/WebSocket); the reducer and components remain unchanged.
- Conversation history and persistence (e.g. `localStorage` or a backend).
- Per-agent expand/collapse and copy/share actions on responses.
- Markdown rendering with syntax highlighting in agent messages.
- A test suite: reducer snapshot tests + component/interaction tests.
- Theme toggle UI (token infrastructure already supports light/dark).

## Scope

This is a presentation prototype. It deliberately omits backend services,
real AI integrations, authentication, persistence, and analytics.
