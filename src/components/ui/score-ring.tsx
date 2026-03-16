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
		const baseId = React.useId().replace(/:/g, "");
		const maskId = `ring-mask-${baseId}`;

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
				<svg viewBox="0 0 180 180" className="absolute inset-0 h-full w-full">
					<defs>
						<mask id={maskId}>
							<rect width="100%" height="100%" fill="black" />
							<circle
								cx="90"
								cy="90"
								r={radius}
								stroke="white"
								strokeWidth="4"
								fill="transparent"
								strokeDasharray={circumference}
								strokeDashoffset={offset}
								strokeLinecap="round"
								className="origin-center -rotate-90 transition-all duration-500 ease-out"
							/>
						</mask>
					</defs>

					{/* Background Circle */}
					<circle
						cx="90"
						cy="90"
						r={radius}
						strokeWidth="4"
						fill="transparent"
						className="stroke-border-primary origin-center -rotate-90"
					/>

					{/* Gradient Circle */}
					<foreignObject width="180" height="180" mask={`url(#${maskId})`}>
						<div
							className="h-full w-full"
							style={{
								background:
									"conic-gradient(var(--color-accent-red) 0%, var(--color-accent-amber) 35%, var(--color-accent-green) 35%)",
							}}
						/>
					</foreignObject>
				</svg>
				<div className="absolute flex flex-col items-center justify-center gap-1 text-center">
					<div className="flex items-baseline gap-1">
						<span
							className={cn(
								"font-mono text-5xl font-bold",
								score < 3.5
									? "text-accent-red"
									: score < 7
										? "text-accent-amber"
										: "text-accent-green",
							)}
						>
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
