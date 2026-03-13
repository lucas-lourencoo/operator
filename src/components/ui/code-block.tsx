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
	showLineNumbers?: boolean;
}

async function CodeBlock({
	code,
	lang = "typescript",
	showLineNumbers = false,
	className,
	...props
}: CodeBlockProps) {
	const html = await codeToHtml(code, {
		lang: lang as string,
		theme: "vesper",
	});

	const lines = code.split("\n");

	return (
		<div className={cn(codeBlockVariants({ className }))} {...props}>
			<div className="flex">
				{showLineNumbers && (
					<div className="flex flex-col border-r border-border-primary bg-bg-card/50 px-3 py-4 text-right font-mono text-xs text-text-tertiary select-none min-w-[40px]">
						{lines.map((_, i) => (
							<span key={i} className="leading-5 h-5">
								{i + 1}
							</span>
						))}
					</div>
				)}
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: required for shiki syntax highlighter
					dangerouslySetInnerHTML={{ __html: html }}
					className="flex-1 overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:m-0 text-xs leading-5"
				/>
			</div>
		</div>
	);
}

CodeBlock.displayName = "CodeBlock";

export { CodeBlock, codeBlockVariants };
