import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green disabled:pointer-events-none disabled:opacity-50 font-mono",
	variants: {
		variant: {
			primary:
				"bg-accent-green text-black hover:bg-accent-green/90 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
			secondary:
				"border border-accent-green text-accent-green bg-transparent hover:bg-accent-green/10",
			outline:
				"border border-border-primary bg-transparent hover:bg-bg-hover hover:text-text-primary text-text-secondary",
			ghost: "hover:bg-bg-hover hover:text-accent-green text-text-secondary",
			danger:
				"bg-accent-red text-white hover:bg-accent-red/90 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-12 rounded-md px-8 text-base",
			icon: "h-9 w-9",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants };
