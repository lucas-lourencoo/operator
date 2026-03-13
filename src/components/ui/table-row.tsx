import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const tableRowVariants = tv({
	base: "flex items-center border-b border-border-primary px-5 py-4 transition-colors hover:bg-bg-hover/50",
});

export interface TableRowProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof tableRowVariants> {}

const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(tableRowVariants({ className }))}
				{...props}
			/>
		);
	},
);

TableRow.displayName = "TableRow";

const TableCell = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center font-mono text-xs", className)}
		{...props}
	/>
));
TableCell.displayName = "TableCell";

export { TableRow, TableCell };
