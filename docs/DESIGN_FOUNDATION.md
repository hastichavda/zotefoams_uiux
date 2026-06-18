# Multi-Agent AI Workspace — Design & Architecture Foundation

> **Phase 1 deliverable.** This document defines product direction, UX strategy, design language, and engineering standards. It is the source of truth that every later implementation phase follows. No application screens or business features are built in this phase.

---

## 1. Product Vision

A focused, keyboard-first workspace where a knowledge worker collaborates with three specialized AI agents to move an idea from rough concept to validated direction — without context-switching between tools.

The product should feel like a calm, professional instrument: fast, quiet, and confident. It borrows the operational speed of **Raycast**, the structural clarity of **Linear**, the content flexibility of **Notion AI**, and the conversational fluency of **ChatGPT** — while remaining an original implementation.

**Guiding statement:** _Help one person think better by giving them three expert collaborators in a single, distraction-free surface._

The three agents are:

| Agent | Role | Lens it brings |
| --- | --- | --- |
| **Product Strategist** | Frames the problem, defines value, prioritizes. | Business & outcomes |
| **UX Researcher** | Surfaces user needs, risks, and evidence. | Users & validation |
| **Software Architect** | Translates direction into technical shape. | Feasibility & systems |

All agent behaviour is **mocked locally** (simulated streaming, no backend, no network).

---

## 2. Target Users

**Primary persona — "The Operator."** A product manager, founder, or senior IC who thinks in documents and decisions. They are comfortable with modern SaaS tools, value speed, and resent friction. They want answers framed from multiple expert perspectives, fast.

**Secondary persona — "The Maker."** A designer or engineer who uses the workspace to pressure-test an idea before committing effort.

**Shared traits the design must respect:**

- Time-poor; every extra click is a cost.
- Keyboard-oriented; mouse is optional, not required.
- Expect professional polish; visual noise reads as low quality.
- Work across desktop primarily, tablet occasionally, mobile for review.

---

## 3. Primary User Journey

The core loop is **Ask → Stream → Compare → Act.**

1. **Enter the workspace.** No onboarding, no empty setup. The user immediately sees a clear input and the three available agents.
2. **Pose a question or task.** A single, prominent composer is the primary action.
3. **Select / route to agents.** The user directs the prompt at one agent or fans it out to all three.
4. **Watch responses stream in.** Mocked streaming communicates "thinking" state through motion, not spinners-as-decoration.
5. **Compare perspectives.** Responses are presented so the three lenses can be read side by side or in sequence.
6. **Act on the result.** Copy, continue the thread, or refine the prompt.

Every screen we later build maps back to a step in this loop. If a feature does not serve Ask → Stream → Compare → Act, it is out of scope.

---

## 4. Information Architecture

A three-region shell, stable across the session:

```
┌──────────────────────────────────────────────────────────┐
│  Top Bar  (workspace identity · global actions · status)   │
├───────────┬──────────────────────────────────────────────┤
│           │                                                │
│  Sidebar  │   Primary Workspace                            │
│  (agents, │   (conversation / agent responses)            │
│  threads, │                                                │
│  nav)     │                                                │
│           │                                                │
│           ├──────────────────────────────────────────────┤
│           │   Composer  (primary input — always reachable) │
└───────────┴──────────────────────────────────────────────┘
```

- **Top Bar** — Workspace identity, global/secondary actions, connection/agent status.
- **Sidebar** — Agent roster, thread/history navigation, collapsible to maximize focus.
- **Primary Workspace** — The main content surface where agent responses render.
- **Composer** — The persistent input; the single most important interactive element.

**Hierarchy of navigation:** Workspace → Thread → Message → Agent response. Depth is intentionally shallow to keep cognitive load low.

---

## 5. Interaction Philosophy

- **One primary action at a time.** Each view has exactly one obvious next step, visually dominant. Everything else is secondary or tertiary.
- **Keyboard is a first-class citizen.** Core actions are reachable without a mouse; focus order is logical and visible.
- **Progressive disclosure.** Advanced controls (agent routing, settings, metadata) stay hidden until relevant.
- **State over decoration.** Motion and visual change exist to communicate _what just happened_ or _what is happening_, never to entertain.
- **Forgiving and predictable.** Actions are reversible where possible; the system never surprises the user.

---

## 6. Visual Design Language

A restrained, professional aesthetic. Generous whitespace, a near-neutral palette, one disciplined accent, and typography that does most of the hierarchy work. (Exact values are produced in the Design System phase; this is direction only.)

### 6.1 Color Palette

- **Neutrals first.** A grayscale ramp (background → surfaces → borders → text) carries ~90% of the UI. Defined in **OKLCH** for perceptually even steps and reliable light/dark theming.
- **Single accent.** One brand accent used sparingly for the primary action, focus, and active state. Accent is a signal, not a texture.
- **Agent identity colors.** Each agent gets a subtle, distinct hue used only as a small identifier (avatar, label) — never as large fills that compete with content.
- **Semantic colors.** Reserved, muted tokens for success / warning / error / info.
- **Dual theme.** Light and dark are first-class; tokens are theme-agnostic (semantic names, not raw colors).
- **Contrast is a constraint, not an afterthought** (see §10).

### 6.2 Typography Scale

- **One typeface family** (system/sans) for UI, with a mono family for code/IDs.
- **A small, modular type scale** — a limited set of steps (e.g. caption → body → lead → headings). Fewer sizes = clearer hierarchy.
- **Weight and color, not size, drive most emphasis.** Body weight for content, heavier weight for headings, muted color for secondary text.
- **Comfortable line length and line height** for sustained reading of agent output.

### 6.3 Spacing System (8-Point Grid)

- All spacing, sizing, and layout gaps derive from an **8px base unit** (with a 4px half-step for fine control).
- Component padding, stack gaps, and grid gutters use the same scale, producing consistent vertical and horizontal rhythm.
- Spacing tokens are named by intent/step, not raw pixels, so they remain consistent across components.

### 6.4 Border Radius

- A small, fixed radius scale: **sm / md / lg** plus **full** (pills/avatars).
- Interactive controls share a consistent radius; containers use the next step up. No ad-hoc radii.

### 6.5 Elevation

- Elevation is expressed through **layered surfaces + soft shadows**, kept shallow and restrained.
- A small set of elevation levels: flat (page), raised (cards/panels), overlay (popovers/menus), modal (dialogs/toasts).
- Higher elevation = more separation, never heavier decoration. Dark theme leans on surface lightness shifts more than shadow.

### 6.6 Iconography

- **`lucide-react`** as the single icon set for visual and stylistic consistency.
- Icons are **functional**, sized on the grid, optically aligned with text, and given accessible labels when interactive.
- Consistent stroke weight; no mixing icon styles.

### 6.7 Layout Rhythm

- A consistent max content width keeps reading comfortable on large screens.
- Predictable vertical rhythm via the spacing scale; related elements grouped, unrelated elements separated by clear whitespace.
- Alignment to the grid creates a calm, scannable surface — the structure should feel inevitable, not designed-around.

---

## 7. Design Principles

1. **Restraint over richness** — remove until only what serves the task remains.
2. **Clarity over cleverness** — obvious beats impressive.
3. **Consistency is a feature** — same patterns, same outcomes, everywhere.
4. **Content is the interface** — chrome recedes so agent output leads.
5. **Tokens, not magic numbers** — every visual value comes from the system.
6. **Accessible by default** — accessibility is a design input, not a fix.

---

## 8. Engineering Principles

1. **Composition over inheritance** — build from small, combinable parts.
2. **Strict TypeScript** — model intent in types; no `any`, no implicit escape hatches.
3. **Separation of presentation and logic** — UI components stay dumb; behaviour lives in hooks/context/services.
4. **Single responsibility** — small, focused components and modules.
5. **Tokens drive styling** — components consume design tokens, never hard-coded values.
6. **Performance is a default** — GPU-friendly motion, no needless re-renders, no layout thrash.
7. **Predictable structure** — readable folders and consistent naming so any file is findable by intuition.

---

## 9. Component Inventory

The initial reusable primitive set. Each entry lists **purpose** and **expected variants** (states such as hover/focus/disabled/loading are assumed for all interactive components). Built in the Design System phase, not now.

| Component | Purpose | Expected variants |
| --- | --- | --- |
| **Button** | Primary text-driven action trigger. | `primary`, `secondary`, `ghost`, `destructive`; sizes `sm / md / lg`; states: default, hover, focus, active, disabled, loading. |
| **IconButton** | Compact icon-only action (toolbar, controls). | `default`, `ghost`, `subtle`; sizes `sm / md / lg`; requires accessible label. |
| **Input** | Single-line text entry. | `default`, `error`, `disabled`; optional leading/trailing icon or affix. |
| **Textarea** | Multi-line text entry (composer, notes). | `default`, `error`, `disabled`; auto-grow option. |
| **Card** | Group related content into a surface. | `default`, `interactive` (hoverable/clickable), `muted`; optional header/footer slots. |
| **Badge** | Small status/metadata label. | `neutral`, `success`, `warning`, `error`, `info`; subtle/solid tone. |
| **Avatar** | Represent an agent or user. | `image`, `initials`, `icon`; sizes `sm / md / lg`; optional status ring. |
| **Chip** | Compact selectable/removable token (agent select, filters). | `selectable`, `removable`, `static`; selected/unselected states. |
| **Tooltip** | On-demand contextual hint for terse controls. | Placement variants (top/right/bottom/left); keyboard + hover triggered. |
| **Divider** | Separate content regions. | `horizontal`, `vertical`; optional label. |
| **Panel** | Larger structural container (sidebar, side panel, sections). | `default`, `collapsible`, `floating/overlay`. |
| **Toast** | Transient, non-blocking feedback. | `success`, `error`, `info`, `warning`; auto-dismiss + manual dismiss; live-region announced. |
| **Empty State** | Communicate "nothing here yet" + guide next action. | `default`, `with-action`, `compact`. |
| **Loading State** | Communicate in-progress work. | `skeleton`, `inline spinner`, `streaming` (for agent responses). |
| **Error State** | Communicate failure + recovery path. | `inline`, `block`, `full-surface`; with retry action where applicable. |

**Conventions for all components:**

- Controlled where it matters; sensible uncontrolled defaults otherwise.
- Forward refs and spread valid native props for composability.
- Accept `className` merged via the `cn()` utility (clsx + tailwind-merge).
- No business logic inside primitives.

---

## 10. UX Principles (Operationalized)

| Principle | How we honor it |
| --- | --- |
| **No onboarding required** | The workspace is usable on first load; affordances are self-evident. |
| **Minimize cognitive load** | Shallow IA, limited choices per view, consistent patterns. |
| **Clear hierarchy** | Typography weight/color + spacing establish what matters first. |
| **One primary action at a time** | Each view has a single visually dominant CTA. |
| **Progressive disclosure** | Advanced controls revealed only when relevant. |
| **Motion communicates state** | Animation signals streaming, entry/exit, and feedback — nothing decorative. |

---

## 11. Accessibility Standards

Target: **WCAG 2.1 AA**.

- **Semantic HTML** — Real `<button>`, `<nav>`, `<main>`, `<header>`, headings in order, lists for lists. ARIA only to fill gaps native HTML can't.
- **Keyboard navigation** — Every interactive element reachable and operable by keyboard; logical tab order; no keyboard traps; standard shortcuts for the core loop.
- **Focus visibility** — A clear, consistent `:focus-visible` ring on every focusable element (already established in base styles).
- **ARIA support** — Correct roles/states for custom widgets (tooltips, toasts, menus); streaming responses use polite live regions; icon-only controls have accessible names.
- **Color contrast** — Text and essential UI meet AA contrast in both themes; never rely on color alone to convey meaning.
- **Reduced motion** — Respect `prefers-reduced-motion`; replace movement with instant/opacity-only transitions when requested.

---

## 12. Motion Guidelines

- **Animate only `transform` and `opacity`** — these are GPU-composited and avoid layout reflow/paint thrash.
- **Never animate** layout-affecting properties (`width`, `height`, `top`, `left`, `margin`, etc.).
- **Purposeful only** — motion communicates entry/exit, streaming, and state change. No ambient or decorative animation.
- **Calm timing** — short, eased durations (fast/normal/slow tokens; expo-out easing already defined). Quick enough to feel responsive, soft enough to feel premium.
- **60 FPS target** — keep animations on the compositor; prefer Framer Motion's transform/opacity-based variants (already scaffolded in `src/animations`).
- **Reduced-motion aware** — all motion has a static fallback.

---

## 13. Responsiveness

The workspace adapts across breakpoints without losing functionality — only its layout density and chrome change.

| Breakpoint | Layout behaviour |
| --- | --- |
| **Desktop** (primary) | Full three-region shell: persistent sidebar + workspace + composer. Multi-perspective comparison shown side by side. |
| **Tablet** | Sidebar becomes collapsible/overlay to reclaim width; workspace remains primary; comparison may stack into a scannable column. |
| **Mobile** (review-first) | Single-column, content-first. Sidebar/navigation behind a toggle; composer pinned and reachable; agent responses stack vertically. |

Principles:

- **Mobile-first token usage**, desktop-enhanced layout.
- **No feature removal** across sizes — only reflow and progressive disclosure.
- **Touch targets** meet minimum size on touch devices.
- Use fluid units and the spacing scale; avoid fixed pixel layouts.

---

## 14. Engineering Standards

- **Reusable components** — UI is assembled from the primitive inventory; features compose primitives, not bespoke markup.
- **Composition over inheritance** — share behaviour via hooks and composition, not class hierarchies.
- **Strict TypeScript** — strict mode on; explicit, descriptive types; no `any`; props typed at the boundary.
- **Separation of presentation & business logic** — presentational components are pure; state, side effects, and mocked AI logic live in `hooks/`, `context/`, and feature services.
- **Readable folder organization** — established in Phase 0: `app`, `layouts`, `components/ui`, `features`, `hooks`, `context`, `utils`, `constants`, `mocks`, `types`, `animations`, `theme`, `assets`; barrel exports per layer; `@/` path alias.
- **Maintainable naming** — `PascalCase` components, `camelCase` functions/vars, `useX` hooks, descriptive intent-revealing names; co-locate a component with its types.
- **Quality gates** — ESLint + Prettier + strict `tsc` must pass; tokens over magic numbers; small, single-responsibility modules.

---

## 15. What This Enables Next

With this foundation set, the **Design System phase** can implement concrete tokens (color/type/space/radius/elevation values) and the component inventory above, confident that every decision traces back to a documented principle. Application screens follow only after the system exists.
