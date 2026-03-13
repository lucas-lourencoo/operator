import { Plus, Send, Terminal, Trash2 } from "lucide-react";
import {
	AnalysisCardContent,
	AnalysisCardHeader,
	AnalysisCardRoot,
	AnalysisCardTitle,
	AnalysisCardDescription,
} from "@/components/ui/analysis-card";
import { BadgeRoot, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Input, Textarea } from "@/components/ui/input";
import { ScoreRing } from "@/components/ui/score-ring";
import { TableCell, TableRow } from "@/components/ui/table-row";
import { UIComponentsClient } from "./client-examples";

export default function UIComponentsPage() {
	const variants = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"danger",
	] as const;
	const sizes = ["sm", "default", "lg"] as const;

	return (
		<main className="min-h-screen p-8 max-w-5xl mx-auto space-y-16 bg-bg-card text-text-primary">
			<header className="space-y-4 border-b border-border-primary pb-8">
				<div className="flex items-center gap-3">
					<Terminal className="text-accent-green w-8 h-8" />
					<h1 className="text-4xl font-mono font-bold tracking-tight">
						DevRoast<span className="text-accent-green">.UI</span>
					</h1>
				</div>
				<p className="text-text-secondary font-mono">
					{/* Component library for the brutally honest code review platform. */}
				</p>
			</header>

			{/* Score Ring Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> score-ring.tsx
				</h2>
				<div className="flex flex-wrap gap-12 p-8 rounded-xl border border-border-primary bg-bg-card justify-center">
					<div className="flex flex-col items-center gap-4">
						<ScoreRing score={2.1} />
						<span className="text-xs font-mono text-text-secondary">
							Severity: Critical
						</span>
					</div>
					<div className="flex flex-col items-center gap-4">
						<ScoreRing score={5.8} />
						<span className="text-xs font-mono text-text-secondary">
							Severity: Warning
						</span>
					</div>
					<div className="flex flex-col items-center gap-4">
						<ScoreRing score={9.4} />
						<span className="text-xs font-mono text-text-secondary">
							Severity: Good
						</span>
					</div>
				</div>
			</section>

			{/* Analysis Card Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> analysis-card.tsx
				</h2>
				<div className="grid gap-6 md:grid-cols-2">
					<AnalysisCardRoot variant="critical">
						<AnalysisCardHeader>
							<BadgeRoot variant="critical">
								<BadgeDot variant="critical" />
								CRITICAL
							</BadgeRoot>
						</AnalysisCardHeader>
						<AnalysisCardContent>
							<AnalysisCardTitle>Using var instead of const/let</AnalysisCardTitle>
							<AnalysisCardDescription>
								The var keyword is function-scoped rather than block-scoped, which can lead to unexpected behavior and bugs.
							</AnalysisCardDescription>
						</AnalysisCardContent>
					</AnalysisCardRoot>
					<AnalysisCardRoot variant="warning">
						<AnalysisCardHeader>
							<BadgeRoot variant="warning">
								<BadgeDot variant="warning" />
								WARNING
							</BadgeRoot>
						</AnalysisCardHeader>
						<AnalysisCardContent>
							<AnalysisCardTitle>Unused variables found</AnalysisCardTitle>
							<AnalysisCardDescription>
								Variables declared but never used increase cognitive load and can indicate incomplete logic.
							</AnalysisCardDescription>
						</AnalysisCardContent>
					</AnalysisCardRoot>
					<AnalysisCardRoot variant="good">
						<AnalysisCardHeader>
							<BadgeRoot variant="good">
								<BadgeDot variant="good" />
								GOOD
							</BadgeRoot>
						</AnalysisCardHeader>
						<AnalysisCardContent>
							<AnalysisCardTitle>Clean architecture</AnalysisCardTitle>
							<AnalysisCardDescription>
								The component structure follows best practices and maintains a clear separation of concerns.
							</AnalysisCardDescription>
						</AnalysisCardContent>
					</AnalysisCardRoot>
				</div>
			</section>

			{/* Badge Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> badge.tsx
				</h2>
				<div className="flex flex-wrap gap-6 p-8 rounded-xl border border-border-primary bg-bg-card">
					<BadgeRoot variant="critical">
						<BadgeDot variant="critical" />
						critical
					</BadgeRoot>
					<BadgeRoot variant="warning">
						<BadgeDot variant="warning" />
						warning
					</BadgeRoot>
					<BadgeRoot variant="good">
						<BadgeDot variant="good" />
						good
					</BadgeRoot>
					<BadgeRoot variant="neutral">
						<BadgeDot variant="neutral" />
						neutral
					</BadgeRoot>
					<BadgeRoot variant="good">no-dot</BadgeRoot>
				</div>
			</section>

			{/* Buttons Section */}
			<section className="space-y-10">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> button.tsx
				</h2>

				<div className="grid gap-12">
					{variants.map((variant) => (
						<div key={variant} className="space-y-6">
							<h3 className="text-sm font-mono text-text-secondary uppercase tracking-widest">
								Variant: {variant}
							</h3>
							<div className="flex flex-wrap items-end gap-6 p-6 rounded-xl border border-border-primary bg-bg-card">
								{sizes.map((size) => (
									<div
										key={`${variant}-${size}`}
										className="flex flex-col gap-2 items-center"
									>
										<Button variant={variant} size={size}>
											{variant === "danger" ? (
												<Trash2 className="w-4 h-4" />
											) : null}
											{variant === "primary" ? (
												<Send className="w-4 h-4" />
											) : null}
											{variant} {size}
										</Button>
									</div>
								))}

								{/* Icon variant */}
								<div className="flex flex-col gap-2 items-center">
									<Button variant={variant} size="icon">
										<Plus className="w-5 h-5" />
									</Button>
								</div>

								{/* Disabled state */}
								<div className="flex flex-col gap-2 items-center">
									<Button variant={variant} disabled>
										Disabled
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Form Inputs Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> input.tsx
				</h2>
				<div className="grid gap-8 p-8 rounded-xl border border-border-primary bg-bg-card max-w-2xl">
					<div className="space-y-2">
						<label
							htmlFor="username"
							className="text-xs font-mono text-text-secondary"
						>
							USERNAME
						</label>
						<Input id="username" placeholder="Enter your handle..." />
					</div>
					<div className="space-y-2">
						<label
							htmlFor="bio"
							className="text-xs font-mono text-text-secondary"
						>
							BIOGRAPHY
						</label>
						<Textarea
							id="bio"
							placeholder="Tell us about your coding sins..."
						/>
					</div>
				</div>
			</section>

			{/* Table Rows Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> table-row.tsx
				</h2>
				<div className="rounded-xl border border-border-primary bg-bg-card overflow-hidden">
					<TableRow>
						<TableCell className="w-12 text-text-secondary">#1</TableCell>
						<TableCell className="w-20 font-bold text-accent-red">
							2.1
						</TableCell>
						<TableCell className="flex-1 text-text-secondary truncate">
							function calculateTotal(items) &#123; var total = 0; ...
						</TableCell>
						<TableCell className="w-32 justify-end text-text-secondary italic">
							javascript
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="w-12 text-text-secondary">#2</TableCell>
						<TableCell className="w-20 font-bold text-accent-amber">
							5.8
						</TableCell>
						<TableCell className="flex-1 text-text-secondary truncate">
							const data = await fetch(url).then(res =&gt; res.json())
						</TableCell>
						<TableCell className="w-32 justify-end text-text-secondary italic">
							typescript
						</TableCell>
					</TableRow>
				</div>
			</section>

			{/* Code Block Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> code-block.tsx
				</h2>
				<CodeBlock
					lang="typescript"
					code={`interface User {
  id: string;
  username: string;
  sins: string[];
}

function roast(user: User) {
  if (user.sins.length > 10) {
    return "You're beyond help.";
  }
  return "Could be worse.";
}`}
				/>
			</section>

			{/* Client-side Examples (Tooltip, Dialog, Toggle) */}
			<UIComponentsClient />

			<footer className="pt-16 border-t border-border-primary text-center">
				<p className="text-text-secondary font-mono text-sm">
					&lt;/ end of components &gt;
				</p>
			</footer>
		</main>
	);
}
