"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import * as React from "react";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Popup>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Popup> & {
		sideOffset?: number;
	}
>(({ className, sideOffset = 8, ...props }, ref) => (
	<TooltipPrimitive.Portal>
		<TooltipPrimitive.Positioner sideOffset={sideOffset}>
			<TooltipPrimitive.Popup
				ref={ref}
				className={cn(
					"z-50 overflow-hidden rounded-md bg-bg-hover px-3 py-1.5 font-mono text-xs text-text-primary shadow-md border border-border-primary animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
					className,
				)}
				{...props}
			/>
		</TooltipPrimitive.Positioner>
	</TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";

export {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
	TooltipPrimitive,
};
