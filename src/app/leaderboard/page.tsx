import { cacheLife } from "next/cache";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";
import { api, getQueryClient } from "@/trpc/server";

export default async function LeaderboardPage() {
	"use cache";
	cacheLife("leaderboard");

	const queryClient = getQueryClient();

	const [roasts, stats] = await Promise.all([
		queryClient.fetchQuery(api.roast.getLeaderboard.queryOptions()),
		queryClient.fetchQuery(api.roast.getStats.queryOptions()),
	]);

	return (
		<main className="flex flex-col gap-10 px-10 py-10 lg:px-20">
			<section className="flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<span className="font-mono text-3xl font-bold text-accent-green">
						&gt;
					</span>
					<h1 className="font-mono text-2xl font-bold text-text-primary">
						shame_leaderboard
					</h1>
				</div>
				<p className="font-mono text-sm text-text-secondary">
					{"// the most roasted code on the internet"}
				</p>
				<div className="flex items-center gap-2 font-mono text-xs text-text-tertiary">
					<span>{stats.count.toLocaleString()} submissions</span>
					<span>·</span>
					<span>avg score: {stats.averageScore.toFixed(1)}/10</span>
				</div>
			</section>

			<div className="flex flex-col gap-5">
				{roasts.map((entry, index) => {
					const rank = index + 1;
					const lines = entry.code.split("\n").length;

					return (
						<Link
							key={entry.id}
							href={`/roast/${entry.id}`}
							className="flex flex-col overflow-hidden rounded-md border border-border-primary hover:border-text-secondary transition-colors group"
						>
							<div className="flex h-12 items-center justify-between border-b border-border-primary bg-bg-card px-5 group-hover:bg-bg-hover transition-colors">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1.5 font-mono text-sm">
										<span className="text-text-tertiary">#</span>
										<span
											className={cn(
												"font-bold",
												rank === 1 ? "text-accent-amber" : "text-text-primary",
											)}
										>
											{rank}
										</span>
									</div>
									<div className="flex items-center gap-1.5 font-mono text-xs">
										<span className="text-text-tertiary">score:</span>
										<span
											className={cn(
												"font-bold",
												entry.score < 4
													? "text-accent-red"
													: "text-accent-amber",
											)}
										>
											{entry.score.toFixed(1)}
										</span>
									</div>
								</div>
								<div className="flex items-center gap-3 font-mono text-xs">
									<span className="text-text-secondary">{entry.language}</span>
									<span className="text-text-tertiary">{lines} lines</span>
								</div>
							</div>
							<CodeBlock
								code={entry.code}
								lang={entry.language}
								showLineNumbers
								className="rounded-none border-none pointer-events-none"
							/>
						</Link>
					);
				})}

				{roasts.length === 0 && (
					<div className="flex items-center justify-center p-8 font-mono text-sm text-text-secondary border border-border-primary rounded-md border-dashed">
						No shames recorded yet. Be the first!
					</div>
				)}
			</div>
		</main>
	);
}
