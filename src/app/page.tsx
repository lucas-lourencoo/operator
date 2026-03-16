import Link from "next/link";
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { RoastStats } from "@/components/roast-stats";
import {
	ShameLeaderboard,
	ShameLeaderboardSkeleton,
} from "@/components/shame-leaderboard";
import { Button } from "@/components/ui/button";
import { HomeForm } from "./home-form";

export default async function Home() {
	"use cache";
	cacheLife("leaderboard");

	return (
		<main className="flex flex-col items-center w-full min-h-screen pt-20 pb-16 px-10 gap-8">
			{/* Main Content Container - max-w-5xl keeps the content centered and constrained */}
			<div className="flex flex-col items-center w-full max-w-5xl gap-8">
				{/* Hero Title Section */}
				<section className="flex flex-col items-center gap-3 text-center">
					<div className="flex items-center justify-center gap-3">
						<span className="font-mono text-4xl font-bold text-accent-green">
							$
						</span>
						<h1 className="font-mono text-4xl font-bold text-text-primary">
							paste your code. get roasted.
						</h1>
					</div>
					<p className="font-mono text-sm text-text-secondary">
						{
							"// drop your code below and we'll rate it — brutally honest or full roast mode"
						}
					</p>
				</section>

				{/* Code Input Box Section */}
				<div className="flex flex-col w-full max-w-[780px]">
					<HomeForm />

					{/* Footer Stats */}
					<RoastStats />
				</div>

				{/* Leaderboard Preview Section */}
				<section className="flex flex-col w-full max-w-[960px] gap-6 mt-16">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="font-mono text-sm font-bold text-accent-green">
								{"//"}
							</span>
							<h2 className="font-mono text-sm font-bold text-text-primary">
								shame_leaderboard
							</h2>
						</div>
						<Link href="/leaderboard">
							<Button
								variant="outline"
								size="sm"
								className="text-xs text-text-secondary"
							>
								$ view_all &gt;&gt;
							</Button>
						</Link>
					</div>
					<p className="-mt-4 font-mono text-xs text-text-tertiary">
						{"// the worst code on the internet, ranked by shame"}
					</p>

					<Suspense fallback={<ShameLeaderboardSkeleton />}>
						<ShameLeaderboard />
					</Suspense>
				</section>
			</div>
		</main>
	);
}
