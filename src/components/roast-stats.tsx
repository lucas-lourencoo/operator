"use client";

import NumberFlow from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useTRPC } from "@/trpc/client";

export function RoastStats() {
	const trpc = useTRPC();

	const { data } = useQuery(trpc.roast.getStats.queryOptions());

	const count = data?.count ?? 0;
	const averageScore = data?.averageScore ?? 0;

	return (
		<div className="flex items-center justify-center gap-4 mt-8 font-mono text-xs text-text-tertiary">
			<div className="flex items-center gap-1">
				<NumberFlow value={count} />
				<span>codes roasted</span>
			</div>
			<span>·</span>
			<div className="flex items-center gap-1">
				<span>avg score:</span>
				<NumberFlow
					value={averageScore / 10}
					format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
				/>
				<span>/10</span>
			</div>
		</div>
	);
}
