"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table-row";
import { Toggle } from "@/components/ui/toggle";

export default function Home() {
	const [code, setCode] = React.useState("");

	const isButtonEnabled = code.trim().length > 0;

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
						{"// drop your code below and we'll rate it — brutally honest or full roast mode"}
					</p>
				</section>

				{/* Code Input Box Section */}
				<section className="flex flex-col w-full max-w-[780px] mt-8">
					<div className="flex flex-col rounded-lg border border-border-primary bg-bg-card overflow-hidden">
						{/* Window Header */}
						<div className="flex h-10 items-center px-4 border-b border-border-primary gap-2 bg-bg-hover">
							<div className="h-3 w-3 rounded-full bg-accent-red" />
							<div className="h-3 w-3 rounded-full bg-accent-amber" />
							<div className="h-3 w-3 rounded-full bg-accent-green" />
						</div>

						{/* Code Inner Area */}
						<div className="flex min-h-[320px]">
							{/* Line Numbers */}
							<div className="flex flex-col gap-2 p-4 border-r border-border-primary text-right font-mono text-xs text-text-tertiary select-none">
								{Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
									<span key={num}>{num}</span>
								))}
							</div>
							{/* Editor Area */}
							<div className="flex-1 p-4">
								<textarea
									className="h-full w-full resize-none bg-transparent font-mono text-xs text-text-primary outline-none placeholder:text-text-tertiary focus:ring-0"
									placeholder="function calculateTotal(items) { ... }"
									value={code}
									onChange={(e) => setCode(e.target.value)}
								/>
							</div>
						</div>
					</div>

					{/* Actions Bar */}
					<div className="flex items-center justify-between mt-4">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<Toggle defaultChecked />
								<span className="font-mono text-sm text-accent-green">
									roast mode
								</span>
							</div>
							<span className="hidden font-mono text-xs text-text-tertiary sm:inline-block">
								{"// maximum sarcasm enabled"}
							</span>
						</div>
						<Button
							variant="primary"
							className="font-bold"
							disabled={!isButtonEnabled}
						>
							$ roast_my_code
						</Button>
					</div>

					{/* Footer Stats */}
					<div className="flex items-center justify-center gap-4 mt-8 font-mono text-xs text-text-tertiary">
						<span>2,847 codes roasted</span>
						<span>·</span>
						<span>avg score: 4.2/10</span>
					</div>
				</section>

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
						<Button
							variant="outline"
							size="sm"
							className="text-xs text-text-secondary"
						>
							$ view_all &gt;&gt;
						</Button>
					</div>
					<p className="-mt-4 font-mono text-xs text-text-tertiary">
						{"// the worst code on the internet, ranked by shame"}
					</p>

					{/* Table Preview */}
					<div className="flex flex-col overflow-hidden rounded-lg border border-border-primary bg-bg-card">
						{/* Table Header */}
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

						{/* Mocked Rows */}
						<TableRow>
							<TableCell className="w-[50px] font-medium text-accent-amber">
								1
							</TableCell>
							<TableCell className="w-[70px] font-bold text-accent-red">
								1.2
							</TableCell>
							<TableCell className="flex-1 flex-col items-start justify-center gap-1 py-2 font-medium text-text-primary">
								<span>eval(prompt("enter code"))</span>
								<span>document.write(response)</span>
								<span className="text-text-tertiary font-normal">
									{"// trust the user lol"}
								</span>
							</TableCell>
							<TableCell className="w-[100px] justify-end text-text-secondary italic">
								javascript
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="w-[50px] font-medium text-text-secondary">
								2
							</TableCell>
							<TableCell className="w-[70px] font-bold text-accent-red">
								1.8
							</TableCell>
							<TableCell className="flex-1 flex-col items-start justify-center gap-1 py-2 font-medium text-text-primary">
								<span>if (x == true) &#123; return true; &#125;</span>
								<span>else if (x == false) &#123; return false; &#125;</span>
								<span>else &#123; return !false; &#125;</span>
							</TableCell>
							<TableCell className="w-[100px] justify-end text-text-secondary italic">
								typescript
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="w-[50px] font-medium text-text-secondary">
								3
							</TableCell>
							<TableCell className="w-[70px] font-bold text-accent-red">
								2.1
							</TableCell>
							<TableCell className="flex-1 flex-col items-start justify-center gap-1 py-2 font-medium text-text-primary">
								<span>SELECT * FROM users WHERE 1=1</span>
								<span className="text-text-tertiary font-normal">
									{"-- TODO: add authentication"}
								</span>
							</TableCell>
							<TableCell className="w-[100px] justify-end text-text-secondary italic">
								sql
							</TableCell>
						</TableRow>
					</div>

					{/* Leaderboard Footer Hint */}
					<div className="flex justify-center py-4">
						<p className="font-mono text-xs text-text-tertiary">
							{"showing top 3 of 2,847 · view full leaderboard >>"}
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}
