# UI Component Patterns & Design System

This directory contains the core UI components for the **devroast** project. All agents and developers MUST follow these patterns to ensure architectural and visual consistency.

## 🎨 Visual Identity (Terminal/Hacker Aesthetic)
- **Primary Accent:** Green (`#10B981`) - used for success, prompts, and main actions.
- **Typography:** 
  - **Mono (Default Mono):** JetBrains Mono (`font-mono`). Used for code, terminals, and interactive labels.
  - **Sans (Default Sans):** System Default (`font-sans`). Used for general SaaS UI text, descriptions, and paragraphs.
- **Shadows:** Use subtle colored glows (`drop-shadow` or `shadow-[...rgba(16,185,129,0.3)]`) for interactive elements.
- **Borders:** Dark, subtle borders (`#2A2A2A`) for containers and inputs.

## 🛠 Implementation Standards

### 1. Technology Stack
- **Styling:** Tailwind CSS (v4). Configured via `@theme` in `globals.css` to overwrite `--font-sans` and `--font-mono`.
- **Variant Management:** `tailwind-variants` (TV).
- **Class Merging:** Custom `cn()` utility from `@/lib/utils`.
- **Icons:** `lucide-react`.

### 2. Component Structure
Always use **Named Exports**. Never use default exports.
Always extend native attributes and use `forwardRef`.

```tsx
import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const componentVariants = tv({
  base: '...', // Use font-mono or font-sans as needed
  variants: {
    variant: {
      primary: '...',
    },
  },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, className }))}
        {...props}
      />
    )
  }
)

Component.displayName = 'Component'

export { Component, componentVariants }
```

### 3. Fonts Configuration
Do not create custom font classes. Tailwind v4 defaults are:
- `font-sans`: System font (default for the whole `body`).
- `font-mono`: JetBrains Mono (configured via `--font-jetbrains-mono`).

## 📝 Rules for Agents
- **Fonts:** Use `font-mono` for anything "dev-related" and `font-sans` for "business-related" text.
- **Colors:** Use the colors from the `.pen` file as hardcoded hex in variants OR CSS variables if defined in `globals.css`.
