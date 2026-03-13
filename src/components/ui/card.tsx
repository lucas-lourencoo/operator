import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const cardVariants = tv({
	base:
		"flex flex-col gap-3 rounded-lg border border-border-primary bg-bg-card p-5 shadow-sm",
});

export interface CardRootProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {}

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
	({ className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(cardVariants({ className }))} {...props} />
		);
	},
);

CardRoot.displayName = "CardRoot";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center gap-2", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"font-mono text-[13px] font-medium text-text-primary",
			className,
		)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("font-mono text-xs leading-6 text-text-secondary", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("text-sm", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center justify-end gap-2 pt-2", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";

export {
	CardRoot,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	// Alias for compatibility
	CardRoot as Card,
};
