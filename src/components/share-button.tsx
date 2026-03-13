import * as React from "react";
import { Button } from "./ui/button";

export function ShareButton() {
	return (
		<Button
			variant="outline"
			size="sm"
			className="font-mono text-xs text-text-primary gap-2 h-9 px-4"
		>
			$ share_roast
		</Button>
	);
}
