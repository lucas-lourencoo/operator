import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";

const leaderboardEntries = [
	{
		rank: 1,
		score: 1.2,
		language: "javascript",
		code: `eval(prompt("enter code"))\ndocument.write(response)\n// trust the user lol`,
		lines: 3,
	},
	{
		rank: 2,
		score: 1.8,
		language: "python",
		code: `import os\nos.system(request.args.get('cmd'))\n# totally safe`,
		lines: 3,
	},
	{
		rank: 3,
		score: 2.4,
		language: "javascript",
		code: `const password = "admin123";\nif (input === password) {\n  grantAccess();\n}`,
		lines: 4,
	},
	{
		rank: 4,
		score: 3.1,
		language: "sql",
		code: `SELECT * FROM users \nWHERE id = ' + userId + ';\n-- SQL injection? never heard of it`,
		lines: 3,
	},
	{
		rank: 5,
		score: 4.2,
		language: "php",
		code: `<?php\ninclude($_GET['page']);\n// dynamic imports are great`,
		lines: 3,
	},
];

export default function LeaderboardPage() {
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
					// the most roasted code on the internet
				</p>
				<div className="flex items-center gap-2 font-mono text-xs text-text-tertiary">
					<span>2,847 submissions</span>
					<span>·</span>
					<span>avg score: 4.2/10</span>
				</div>
			</section>

			<div className="flex flex-col gap-5">
				{leaderboardEntries.map((entry) => (
					<div
						key={entry.rank}
						className="flex flex-col overflow-hidden rounded-md border border-border-primary"
					>
						<div className="flex h-12 items-center justify-between border-b border-border-primary bg-bg-card px-5">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-1.5 font-mono text-sm">
									<span className="text-text-tertiary">#</span>
									<span
										className={cn(
											"font-bold",
											entry.rank === 1 ? "text-accent-amber" : "text-text-primary",
										)}
									>
										{entry.rank}
									</span>
								</div>
								<div className="flex items-center gap-1.5 font-mono text-xs">
									<span className="text-text-tertiary">score:</span>
									<span
										className={cn(
											"font-bold",
											entry.score < 4 ? "text-accent-red" : "text-accent-amber",
										)}
									>
										{entry.score.toFixed(1)}
									</span>
								</div>
							</div>
							<div className="flex items-center gap-3 font-mono text-xs">
								<span className="text-text-secondary">{entry.language}</span>
								<span className="text-text-tertiary">
									{entry.lines} lines
								</span>
							</div>
						</div>
						<CodeBlock
							code={entry.code}
							lang={entry.language}
							showLineNumbers
							className="rounded-none border-none"
						/>
					</div>
				))}
			</div>
		</main>
	);
}
