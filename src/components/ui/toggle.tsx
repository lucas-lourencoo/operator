"use client";

import { Switch } from "@base-ui/react/switch";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const toggleRootVariants = tv({
	base: "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-accent-green data-[unchecked]:bg-border-primary data-[checked]:shadow-[0_0_10px_rgba(16,185,129,0.3)]",
});

const toggleThumbVariants = tv({
	base: "pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[checked]:translate-x-5 data-[unchecked]:translate-x-0 data-[checked]:bg-bg-card data-[unchecked]:bg-text-secondary",
});

export interface ToggleProps
	extends Omit<React.ComponentPropsWithoutRef<typeof Switch.Root>, "className">,
		VariantProps<typeof toggleRootVariants> {
	className?: string;
}

const Toggle = React.forwardRef<
	React.ElementRef<typeof Switch.Root>,
	ToggleProps
>(({ className, ...props }, ref) => {
	return (
		<Switch.Root
			className={cn(toggleRootVariants({ className }))}
			ref={ref}
			{...props}
		>
			<Switch.Thumb className={toggleThumbVariants()} />
		</Switch.Root>
	);
});

Toggle.displayName = "Toggle";

export { Toggle, toggleRootVariants, toggleThumbVariants };
