# DevRoast Global Standards

## Project Overview
**DevRoast** is a "brutally honest" code review platform with a hacker/terminal aesthetic. It uses a Next.js 16+, React 19+, and Tailwind v4 stack.

## Architecture & Patterns
- **Framework:** Next.js (App Router).
- **Styling:** Tailwind CSS v4 using CSS variables (`--color-*`) defined in `src/app/globals.css`.
- **UI Patterns:** 
  - **Composition Pattern:** Components must use sub-components (Root, Header, Content, etc.) instead of monolithic props.
  - **Variant Management:** `tailwind-variants` for styles and `cn()` for merging classes.
- **Tone:** Technical, sharp, and minimalist.

## Tech Stack
- **Base UI:** `@base-ui/react` (headless components).
- **Icons:** `lucide-react`.
- **Formatting:** `biome` (strict).
- **Fonts:** `font-mono` (JetBrains Mono) for dev-related content; `font-sans` for UI text.

## Core Rules
1. **Always** use Named Exports.
2. **Never** use hardcoded hex in components (use Tailwind theme classes).
3. **Prioritize** composition over complex prop drilling.
4. **Validation:** Run `npm run lint` and `tsc` before finishing any task.

## Data Fetching & tRPC v11
- **Version:** We use **tRPC v11** with **TanStack Query v5** (`@trpc/tanstack-react-query`).
- **Client Components:** Use `createTRPCContext()` (not `createTRPCReact`). Access hooks via `useTRPC()`, and fetch using standard TanStack hooks: `useQuery(trpc.router.procedure.queryOptions())`.
- **Server Components:** Use `createTRPCOptionsProxy()`. Fetch using the query client: `await getQueryClient().fetchQuery(api.router.procedure.queryOptions())`.
- **Parallel Fetching:** ALWAYS use `Promise.all` when making multiple independent database queries or API calls within the same procedure or component to reduce total latency.
- **Animations vs Suspense:** For UI that animates from an initial state (like NumberFlow starting at 0), fetch data directly in the Client Component to avoid `Suspense` and `Skeleton` bypassing the initial state.

## Component Architecture (Domain vs UI)
- **`src/components/ui/`**: STRICTLY reserved for generic, reusable design system components (primitives and composed UI elements like Button, Input, Card, AnalysisCard, ScoreRing). NO domain logic, NO tRPC, NO feature-specific code.
- **`src/components/` (Root)**: Used for feature-specific components that contain business logic, data fetching (tRPC), or state directly tied to the application's domain (e.g., `code-editor`, `roast-stats`, `share-button`).

## Hydration Safety
- When formatting numbers or dates (e.g., `toLocaleString()`), ALWAYS pass an explicit locale (e.g., `"en-US"`) to prevent hydration mismatches between the Node.js SSR environment and the client's browser.
