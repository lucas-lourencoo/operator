import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const inputVariants = tv({
	base: "flex h-10 w-full rounded-md border border-border-primary bg-bg-card px-3 py-2 font-mono text-sm text-text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green disabled:cursor-not-allowed disabled:opacity-50",
});

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants({ className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

const textareaVariants = tv({
	base: "flex min-h-[80px] w-full rounded-md border border-border-primary bg-bg-card px-3 py-2 font-mono text-sm text-text-primary ring-offset-background placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green disabled:cursor-not-allowed disabled:opacity-50",
});

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(textareaVariants({ className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
