# OTC Trading Desk UI

## Context & Working Agreement

This repository hosts the Aztec OTC Desk front-end, built with Vite and TypeScript to deliver a clean, reusable, and well-structured UI for an OTC trading workflow. The high-level product goals, navigation, wallet behavior, and page content requirements are summarized below. **Every time work progresses, read this section first and update the checklist to reflect the current state so future iterations (AI or human) stay aligned.**

## Build Checklist

### Project Setup

- [x] Initialize Vite + React + TypeScript project scaffold
- [x] Establish global styling strategy (e.g., design tokens, typography, spacing scale)
- [x] Add basic linting/formatting config (ESLint + Prettier) aligned with TypeScript
- [x] Document Bun scripts in this README once created

### Core Architecture

- [x] Define folder structure for components, views, contexts, hooks, and assets
- [x] Implement routing (landing `/`, `"/mint"`, `"/sell"`, `"/buy"`, plus additional views as needed)
- [x] Create shared layout wrapping NavBar, footer, and content outlet
- [x] Decide on state management approach (React context + hooks) and scaffold base providers

### NavBar

- [x] Build NavBar shell with three logical areas: navigation, wallet status, app icon
- [x] Implement navigation buttons with active state styling and routing integration
- [ ] Create scalable SVG square icon component positioned right-most with landing-page click behavior

### Wallet Interaction

- [x] Design wallet status component with red/green state indicator and styled container
- [x] Implement wallet context tracking provider, accounts, connection state, and actions
- [x] Build connection modal (not connected): provider list with icons, disabled styling for unavailable options, hook up selection handler
- [x] Build connected modal view: show full address, dropdown of available accounts, disconnect button, state-driven modal transitions
- [x] Wire modal to open from wallet box clicks and respond to external state changes

### Footer

- [x] Implement minimal footer with "Created by Aztec Pioneers" copy
- [x] Add GitHub and Discord icons linking to placeholder (Google) URLs that open in new tabs

### Views

- [x] Landing page: hero text for "Aztec OTC Desk" and supporting copy emphasizing privacy
- [x] Landing page: four feature cards (Private matching, Private execution, Private counterparties, Instant finality)
- [x] Landing page: placeholder "How to use" section with temporary content
- [x] Mint Tokens view component structure and placeholder content
- [x] Sell (Open Orders) view component structure and placeholder content
- [x] Buy (Order Matching) view component structure and placeholder content

### Reusable Components & Hooks

- [x] Build feature card component for landing page reuse
- [x] Build modal primitive consistent with design system
- [x] Build button primitive consistent with design system
- [x] Build dropdown primitive consistent with design system
- [x] Implement wallet provider logo components (SVG)
- [x] Create hooks for modal visibility, wallet connection requests, and account selection

### Styling & UX Polish

- [ ] Ensure responsive layout for desktop-first with graceful tablet/mobile behavior
- [ ] Add hover/focus states, keyboard navigation, and basic accessibility labels
- [ ] Validate color contrast and typography hierarchy

- [x] Update README with project setup instructions once tooling is in place
- [ ] Capture open questions or assumptions (e.g., visual design decisions, copy updates)
- [ ] List future enhancements or stretch goals after MVP is stable

## Development With Bun

We use [Bun](https://bun.sh/) as the package manager and script runner for this project. Make sure Bun is installed (version 1.2.21 or later) before working with the repo.

| Purpose                  | Command                |
| ------------------------ | ---------------------- |
| Install dependencies     | `bun install`          |
| Start dev server         | `bun run dev`          |
| Type-check & build       | `bun run build`        |
| Lint source              | `bun run lint`         |
| Format files             | `bun run format`       |
| Check formatting         | `bun run format:check` |
| Preview production build | `bun run preview`      |

## Notes & Open Questions

- Await guidance on final "How to use" content
- Confirm branding palette and typography preferences if any exist
