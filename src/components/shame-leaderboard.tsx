import Link from "next/link";
import * as React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { TableCell, TableRow } from "@/components/ui/table-row";
import { api, getQueryClient } from "@/trpc/server";
import { CollapsibleCodeBlock } from "./collapsible-code-block";

export function ShameLeaderboardSkeleton() {
	return (
		<>
			<div className="flex flex-col overflow-hidden rounded-lg border border-border-primary bg-bg-card">
				<div className="flex h-10 items-center border-b border-border-primary bg-bg-hover px-5">
					<span className="w-[50px] font-mono text-xs font-medium text-text-tertiary">
						#
					</span>
					<span className="w-[70px] font-mono text-xs font-medium text-text-tertiary">
						score
					</span>
					<span className="flex-1 font-mono text-xs font-medium text-text-tertiary">
						code
					</span>
					<span className="w-[100px] text-right font-mono text-xs font-medium text-text-tertiary">
						lang
					</span>
				</div>
				{[1, 2, 3].map((i) => (
					<TableRow key={i}>
						<TableCell className="w-[50px] font-medium text-text-secondary animate-pulse">
							<div className="h-4 w-4 bg-bg-hover rounded" />
						</TableCell>
						<TableCell className="w-[70px] font-bold text-text-secondary animate-pulse">
							<div className="h-4 w-8 bg-bg-hover rounded" />
						</TableCell>
						<TableCell className="flex-1 flex-col items-start justify-center gap-1 py-2 font-medium text-text-primary animate-pulse">
							<div className="h-4 w-3/4 bg-bg-hover rounded" />
							<div className="h-4 w-1/2 bg-bg-hover rounded" />
						</TableCell>
						<TableCell className="w-[100px] justify-end text-text-secondary italic animate-pulse">
							<div className="h-4 w-16 bg-bg-hover rounded ml-auto" />
						</TableCell>
					</TableRow>
				))}
			</div>
			<div className="flex justify-center py-4">
				<div className="h-4 w-64 bg-bg-hover rounded animate-pulse" />
			</div>
		</>
	);
}

export async function ShameLeaderboard() {
	const queryClient = getQueryClient();
	const data = await queryClient.fetchQuery(
		api.roast.getLeaderboardPreview.queryOptions(),
	);

	return (
		<>
			<div className="flex flex-col overflow-hidden rounded-lg border border-border-primary bg-bg-card">
				<div className="flex h-10 items-center border-b border-border-primary bg-bg-hover px-5">
					<span className="w-[50px] font-mono text-xs font-medium text-text-tertiary">
						#
					</span>
					<span className="w-[70px] font-mono text-xs font-medium text-text-tertiary">
						score
					</span>
					<span className="flex-1 font-mono text-xs font-medium text-text-tertiary">
						code
					</span>
					<span className="w-[100px] text-right font-mono text-xs font-medium text-text-tertiary">
						lang
					</span>
				</div>

				{data.roasts.map((roast, index) => {
					const rank = index + 1;
					const rankColor =
						rank === 1
							? "text-accent-amber"
							: rank === 2
								? "text-text-secondary"
								: "text-text-secondary";

					const linesCount = roast.code.split("\n").length;
					const isExpandable = linesCount > 3;

					return (
						<TableRow
							key={roast.id}
							className="items-start py-4 border-b border-border-primary last:border-b-0 px-5"
						>
							<TableCell
								className={`w-[50px] font-medium ${rankColor} pt-[18px] items-start`}
							>
								{rank}
							</TableCell>
							<TableCell className="w-[70px] font-bold text-accent-red pt-[18px] items-start">
								{roast.score.toFixed(1)}
							</TableCell>
							<TableCell className="flex-1 px-0 overflow-hidden block">
								<CollapsibleCodeBlock isExpandable={isExpandable}>
									<CodeBlock
										code={roast.code}
										lang={roast.language}
										showLineNumbers
										className="rounded-none border-none bg-transparent"
									/>
								</CollapsibleCodeBlock>
							</TableCell>
							<TableCell className="w-[100px] justify-end text-text-secondary italic pt-[18px] items-start pr-0">
								{roast.language}
							</TableCell>
						</TableRow>
					);
				})}

				{data.roasts.length === 0 && (
					<div className="flex items-center justify-center p-8 font-mono text-sm text-text-secondary">
						No shames recorded yet. Be the first!
					</div>
				)}
			</div>

			<div className="flex justify-center py-4">
				<Link
					href="/leaderboard"
					className="font-mono text-xs text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
				>
					{`showing top ${data.roasts.length} of ${data.totalCount} · view full leaderboard >>`}
				</Link>
			</div>
		</>
	);
}
