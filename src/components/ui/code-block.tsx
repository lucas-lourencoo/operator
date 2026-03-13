import type * as React from "react";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const codeBlockVariants = tv({
	base: "overflow-hidden rounded-md border border-border-primary bg-bg-card text-sm font-mono",
});

export interface CodeBlockProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
		VariantProps<typeof codeBlockVariants> {
	code: string;
	lang?: BundledLanguage | string;
}

async function CodeBlock({
	code,
	lang = "typescript",
	className,
	...props
}: CodeBlockProps) {
	const html = await codeToHtml(code, {
		lang: lang as string,
		theme: "vesper",
	});

	return (
		<div className={cn(codeBlockVariants({ className }))} {...props}>
			<div
				// biome-ignore lint/security/noDangerouslySetInnerHtml: required for shiki syntax highlighter
				dangerouslySetInnerHTML={{ __html: html }}
				className="overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:m-0"
			/>
		</div>
	);
}

CodeBlock.displayName = "CodeBlock";

export { CodeBlock, codeBlockVariants };
