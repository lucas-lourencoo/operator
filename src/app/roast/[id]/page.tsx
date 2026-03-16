import { notFound } from "next/navigation";
import { ShareButton } from "@/components/share-button";
import {
	AnalysisCardContent,
	AnalysisCardDescription,
	AnalysisCardHeader,
	AnalysisCardRoot,
	AnalysisCardTitle,
} from "@/components/ui/analysis-card";
import { BadgeDot, BadgeRoot } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { ScoreRing } from "@/components/ui/score-ring";
import { api, getQueryClient } from "@/trpc/server";

interface RoastPageProps {
	params: Promise<{ id: string }>;
}

export default async function RoastResultPage({ params }: RoastPageProps) {
	"use cache";
	const { id } = await params;

	const queryClient = getQueryClient();
	const roast = await queryClient.fetchQuery(
		api.roast.getRoastById.queryOptions({ id }),
	);

	if (!roast) {
		notFound();
	}

	const lines = roast.code.split("\n").length;
	const verdict =
		roast.score <= 3
			? "needs_serious_help"
			: roast.score <= 6
				? "could_be_better"
				: "not_terrible";

	return (
		<main className="flex flex-col gap-10 px-10 py-10 lg:px-20 max-w-7xl mx-auto w-full">
			{/* Score Hero */}
			<section className="flex flex-col md:flex-row items-center gap-12">
				<div className="flex-shrink-0">
					<ScoreRing score={roast.score} className="h-44 w-44" />
				</div>
				<div className="flex flex-col gap-4 items-start text-left flex-1">
					<BadgeRoot
						variant={
							roast.score <= 3
								? "critical"
								: roast.score <= 6
									? "warning"
									: "good"
						}
					>
						<BadgeDot
							variant={
								roast.score <= 3
									? "critical"
									: roast.score <= 6
										? "warning"
										: "good"
							}
						/>
						verdict: {verdict}
					</BadgeRoot>
					<h1 className="font-mono text-xl lg:text-2xl font-normal leading-relaxed text-text-primary">
						"{roast.summary}"
					</h1>
					<div className="flex items-center gap-4 font-mono text-xs text-text-tertiary">
						<span>lang: {roast.language}</span>
						<span>·</span>
						<span>{lines} lines</span>
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
					<span className="font-mono text-sm font-bold text-accent-green">
						{"//"}
					</span>
					<h2 className="font-mono text-sm font-bold text-text-primary uppercase tracking-wider">
						your_submission
					</h2>
				</div>
				<CodeBlock
					code={roast.code}
					lang={roast.language}
					showLineNumbers
					className="bg-bg-input"
				/>
			</section>

			<div className="h-px w-full bg-border-primary" />

			{/* Detailed Analysis Section */}
			{roast.findings.length > 0 && (
				<>
					<section className="flex flex-col gap-6">
						<div className="flex items-center gap-2">
							<span className="font-mono text-sm font-bold text-accent-green">
								{/* */}
							</span>
							<h2 className="font-mono text-sm font-bold text-text-primary uppercase tracking-wider">
								detailed_analysis
							</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{roast.findings.map((item) => (
								<AnalysisCardRoot key={item.id} variant={item.type}>
									<AnalysisCardHeader>
										<BadgeRoot variant={item.type}>
											<BadgeDot variant={item.type} />
											{item.type.toUpperCase()}
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
				</>
			)}

			{/* Suggested Fix Section */}
			{roast.improvements.length > 0 && (
				<section className="flex flex-col gap-6">
					<div className="flex items-center gap-2">
						<span className="font-mono text-sm font-bold text-accent-green">
							{/* */}
						</span>
						<h2 className="font-mono text-sm font-bold text-text-primary uppercase tracking-wider">
							suggested_fix
						</h2>
					</div>
					{roast.improvements.map((improvement) => (
						<div key={improvement.id} className="flex flex-col gap-4">
							<p className="font-mono text-sm text-text-secondary">
								{improvement.explanation}
							</p>
							<div className="rounded-lg border border-border-primary bg-bg-input overflow-hidden flex flex-col">
								<div className="h-10 border-b border-border-primary px-4 flex items-center bg-bg-card/50">
									<span className="font-mono text-xs text-text-secondary">
										improved_code.
										{roast.language === "javascript"
											? "js"
											: roast.language === "typescript"
												? "ts"
												: "txt"}
									</span>
								</div>
								<CodeBlock
									code={improvement.improvedCode}
									lang={roast.language}
									showLineNumbers
									className="rounded-none border-none bg-transparent"
								/>
							</div>
						</div>
					))}
				</section>
			)}
		</main>
	);
}
