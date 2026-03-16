import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import {
	CardRoot as Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./card";

const analysisCardVariants = tv({
	base: "",
	variants: {
		variant: {
			critical: "border-accent-red/50",
			warning: "border-accent-amber/50",
			good: "border-accent-green/50",
			neutral: "border-border-primary",
		},
	},
	defaultVariants: {
		variant: "neutral",
	},
});

export interface AnalysisCardRootProps
	extends React.ComponentPropsWithoutRef<typeof Card>,
		VariantProps<typeof analysisCardVariants> {}

const AnalysisCardRoot = React.forwardRef<
	HTMLDivElement,
	AnalysisCardRootProps
>(({ className, variant, ...props }, ref) => {
	return (
		<Card
			ref={ref}
			className={cn(analysisCardVariants({ variant, className }))}
			{...props}
		/>
	);
});

AnalysisCardRoot.displayName = "AnalysisCardRoot";

const AnalysisCardHeader = CardHeader;

const AnalysisCardTitle = CardTitle;

const AnalysisCardDescription = CardDescription;

const AnalysisCardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));

AnalysisCardContent.displayName = "AnalysisCardContent";

export {
	AnalysisCardRoot,
	AnalysisCardHeader,
	AnalysisCardTitle,
	AnalysisCardDescription,
	AnalysisCardContent,
	analysisCardVariants,
};
