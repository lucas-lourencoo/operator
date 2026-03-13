import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const badgeVariants = tv({
	base: "inline-flex items-center gap-2 font-mono text-xs font-medium",
	variants: {
		variant: {
			critical: "text-accent-red",
			warning: "text-accent-amber",
			good: "text-accent-green",
			neutral: "text-text-secondary",
		},
	},
	defaultVariants: {
		variant: "neutral",
	},
});

const dotVariants = tv({
	base: "h-2 w-2 rounded-full",
	variants: {
		variant: {
			critical: "bg-accent-red",
			warning: "bg-accent-amber",
			good: "bg-accent-green",
			neutral: "bg-text-secondary",
		},
	},
	defaultVariants: {
		variant: "neutral",
	},
});

export interface BadgeRootProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

const BadgeRoot = React.forwardRef<HTMLDivElement, BadgeRootProps>(
	({ className, variant, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(badgeVariants({ variant, className }))}
				{...props}
			>
				{children}
			</div>
		);
	},
);

BadgeRoot.displayName = "BadgeRoot";

export interface BadgeDotProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof dotVariants> {}

const BadgeDot = React.forwardRef<HTMLSpanElement, BadgeDotProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn(dotVariants({ variant, className }))}
				{...props}
			/>
		);
	},
);

BadgeDot.displayName = "BadgeDot";

export { BadgeRoot, BadgeDot, badgeVariants, dotVariants };
