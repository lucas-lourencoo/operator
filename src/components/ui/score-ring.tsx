import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const scoreRingVariants = tv({
	base: "relative flex h-[180px] w-[180px] items-center justify-center",
});

export interface ScoreRingProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof scoreRingVariants> {
	score: number;
	max?: number;
}

const ScoreRing = React.forwardRef<HTMLDivElement, ScoreRingProps>(
	({ className, score, max = 10, ...props }, ref) => {
		const percentage = (score / max) * 100;
		const radius = 86;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference - (percentage / 100) * circumference;

		return (
			<div
				ref={ref}
				className={cn(scoreRingVariants({ className }))}
				{...props}
			>
				<svg className="h-full w-full -rotate-90">
					<title>Score progress ring</title>
					{/* Background Circle */}
					<circle
						cx="90"
						cy="90"
						r={radius}
						strokeWidth="4"
						fill="transparent"
						className="stroke-border-primary"
					/>
					{/* Progress Circle */}
					<circle
						cx="90"
						cy="90"
						r={radius}
						strokeWidth="4"
						fill="transparent"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap="round"
						className={cn("transition-all duration-500 ease-out", {
							"stroke-accent-red": score < 4,
							"stroke-accent-amber": score >= 4 && score < 7,
							"stroke-accent-green": score >= 7,
						})}
					/>
				</svg>
				<div className="absolute flex flex-col items-center justify-center gap-1 text-center">
					<div className="flex items-baseline gap-1">
						<span className="font-mono text-5xl font-bold text-text-primary">
							{score.toFixed(1)}
						</span>
						<span className="font-mono text-lg text-text-secondary">
							/{max}
						</span>
					</div>
				</div>
			</div>
		);
	},
);

ScoreRing.displayName = "ScoreRing";

export { ScoreRing, scoreRingVariants };
