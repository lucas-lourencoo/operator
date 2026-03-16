import * as React from "react";

export default function LeaderboardLoading() {
	return (
		<main className="flex flex-col gap-10 px-10 py-10 lg:px-20">
			{/* Header Skeleton */}
			<section className="flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<span className="font-mono text-3xl font-bold text-accent-green animate-pulse">
						&gt;
					</span>
					<div className="h-8 w-64 bg-bg-hover rounded animate-pulse" />
				</div>
				<div className="h-4 w-48 bg-bg-hover rounded animate-pulse" />
				<div className="flex items-center gap-2">
					<div className="h-3 w-32 bg-bg-hover rounded animate-pulse" />
					<span className="text-text-tertiary">·</span>
					<div className="h-3 w-24 bg-bg-hover rounded animate-pulse" />
				</div>
			</section>

			{/* List Skeleton */}
			<div className="flex flex-col gap-5">
				{[1, 2, 3, 4, 5].map((i) => (
					<div
						key={i}
						className="flex flex-col overflow-hidden rounded-md border border-border-primary"
					>
						{/* Header row of the card */}
						<div className="flex h-12 items-center justify-between border-b border-border-primary bg-bg-card px-5">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-1.5">
									<div className="h-4 w-4 bg-bg-hover rounded animate-pulse" />
									<div className="h-4 w-4 bg-bg-hover rounded animate-pulse" />
								</div>
								<div className="flex items-center gap-1.5">
									<div className="h-3 w-10 bg-bg-hover rounded animate-pulse" />
									<div className="h-4 w-8 bg-bg-hover rounded animate-pulse" />
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="h-3 w-16 bg-bg-hover rounded animate-pulse" />
								<div className="h-3 w-12 bg-bg-hover rounded animate-pulse" />
							</div>
						</div>
						{/* Code block area skeleton */}
						<div className="p-5 space-y-2">
							<div className="h-4 w-3/4 bg-bg-hover rounded animate-pulse" />
							<div className="h-4 w-1/2 bg-bg-hover rounded animate-pulse" />
							<div className="h-4 w-2/3 bg-bg-hover rounded animate-pulse" />
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
