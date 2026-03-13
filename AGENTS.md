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
