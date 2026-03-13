import { ScoreRing } from "@/components/ui/score-ring";
import { BadgeRoot, BadgeDot } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { ShareButton } from "@/components/share-button";
import {
	AnalysisCardRoot,
	AnalysisCardHeader,
	AnalysisCardTitle,
	AnalysisCardDescription,
	AnalysisCardContent,
} from "@/components/ui/analysis-card";
import { cn } from "@/lib/utils";

interface RoastPageProps {
	params: Promise<{ id: string }>;
}

export default async function RoastResultPage({ params }: RoastPageProps) {
	const { id } = await params;

	// Mock data based on the Pencil design
	const roast = {
		id,
		score: 3.5,
		verdict: "needs_serious_help",
		quote: "\"this code looks like it was written during a power outage... in 2005.\"",
		language: "javascript",
		lines: 7,
		submittedCode: `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  
  return total;
}`,
		analysis: [
			{
				id: "1",
				variant: "critical" as const,
				title: "using var instead of const/let",
				description: "var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
			},
			{
				id: "2",
				variant: "critical" as const,
				title: "imperative loop pattern",
				description: "for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
			},
			{
				id: "3",
				variant: "good" as const,
				title: "clear naming conventions",
				description: "calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
			},
			{
				id: "4",
				variant: "good" as const,
				title: "single responsibility",
				description: "the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
			},
		],
		suggestedFix: {
			file: "your_code.ts → improved_code.ts",
			diff: [
				{ type: "context", content: "function calculateTotal(items) {" },
				{ type: "removed", content: "  var total = 0;" },
				{ type: "removed", content: "  for (var i = 0; i < items.length; i++) {" },
				{ type: "removed", content: "    total = total + items[i].price;" },
				{ type: "removed", content: "  }" },
				{ type: "removed", content: "  return total;" },
				{ type: "added", content: "  return items.reduce((sum, item) => sum + item.price, 0);" },
				{ type: "context", content: "}" },
			],
		},
	};

	return (
		<main className="flex flex-col gap-10 px-10 py-10 lg:px-20 max-w-7xl mx-auto w-full">
			{/* Score Hero */}
			<section className="flex flex-col md:flex-row items-center gap-12">
				<div className="flex-shrink-0">
					<ScoreRing score={roast.score} className="h-44 w-44" />
				</div>
				<div className="flex flex-col gap-4 items-start text-left flex-1">
					<BadgeRoot variant="critical">
						<BadgeDot variant="critical" />
						verdict: {roast.verdict}
					</BadgeRoot>
					<h1 className="font-mono text-xl lg:text-2xl font-normal leading-relaxed text-text-primary">
						{roast.quote}
					</h1>
					<div className="flex items-center gap-4 font-mono text-xs text-text-tertiary">
						<span>lang: {roast.language}</span>
						<span>·</span>
						<span>{roast.lines} lines</span>
					</div>
					<div className="mt-2">
						<ShareButton />
					</div>
				</div>
			</section>

			<div className="h-px w-full bg-border-primary" />

			{/* Submitted Code Section */}
			<section className="flex flex-col gap-6">
				<div className="flex items-center gap-2">
					<span className="font-mono text-sm font-bold text-accent-green">//</span>
					<h2 className="font-mono text-sm font-bold text-text-primary uppercase tracking-wider">
						your_submission
					</h2>
				</div>
				<CodeBlock
					code={roast.submittedCode}
					lang={roast.language}
					showLineNumbers
					className="bg-bg-input"
				/>
			</section>

			<div className="h-px w-full bg-border-primary" />

			{/* Detailed Analysis Section */}
			<section className="flex flex-col gap-6">
				<div className="flex items-center gap-2">
					<span className="font-mono text-sm font-bold text-accent-green">//</span>
					<h2 className="font-mono text-sm font-bold text-text-primary uppercase tracking-wider">
						detailed_analysis
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{roast.analysis.map((item) => (
						<AnalysisCardRoot key={item.id} variant={item.variant}>
							<AnalysisCardHeader>
								<BadgeRoot variant={item.variant}>
									<BadgeDot variant={item.variant} />
									{item.variant.toUpperCase()}
								</BadgeRoot>
							</AnalysisCardHeader>
							<AnalysisCardContent>
								<AnalysisCardTitle>{item.title}</AnalysisCardTitle>
								<AnalysisCardDescription>
									{item.description}
								</AnalysisCardDescription>
							</AnalysisCardContent>
						</AnalysisCardRoot>
					))}
				</div>
			</section>

			<div className="h-px w-full bg-border-primary" />

			{/* Suggested Fix Section */}
			<section className="flex flex-col gap-6">
				<div className="flex items-center gap-2">
					<span className="font-mono text-sm font-bold text-accent-green">//</span>
					<h2 className="font-mono text-sm font-bold text-text-primary uppercase tracking-wider">
						suggested_fix
					</h2>
				</div>
				<div className="rounded-lg border border-border-primary bg-bg-input overflow-hidden flex flex-col">
					<div className="h-10 border-b border-border-primary px-4 flex items-center bg-bg-card/50">
						<span className="font-mono text-xs text-text-secondary">
							{roast.suggestedFix.file}
						</span>
					</div>
					<div className="flex flex-col py-2">
						{roast.suggestedFix.diff.map((line, i) => (
							<div
								key={i}
								className={cn(
									"flex items-center h-8 px-4 font-mono text-xs leading-none",
									line.type === "added" && "bg-accent-green/10 text-accent-green",
									line.type === "removed" && "bg-accent-red/10 text-accent-red",
									line.type === "context" && "text-text-secondary"
								)}
							>
								<span className="w-6 flex-shrink-0 opacity-50">
									{line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
								</span>
								<pre className="m-0 whitespace-pre font-mono">
									{line.content}
								</pre>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
