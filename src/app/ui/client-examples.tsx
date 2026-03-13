"use client";

import { Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function UIComponentsClient() {
	return (
		<div className="space-y-16">
			{/* Toggle Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> toggle.tsx
				</h2>
				<div className="flex items-center gap-8 p-8 rounded-xl border border-border-primary bg-bg-card">
					<div className="flex flex-col gap-2">
						<span className="text-xs font-mono text-text-secondary uppercase">
							Dark Mode
						</span>
						<Toggle defaultChecked />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-xs font-mono text-text-secondary uppercase">
							Notifications
						</span>
						<Toggle />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-xs font-mono text-text-secondary uppercase">
							Disabled
						</span>
						<Toggle disabled />
					</div>
				</div>
			</section>

			{/* Tooltip Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> tooltip.tsx
				</h2>
				<TooltipProvider>
					<div className="flex flex-wrap gap-8 p-8 rounded-xl border border-border-primary bg-bg-card">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon">
									<Info className="w-4 h-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>This is a helpful tooltip</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="secondary">Hover me</Button>
							</TooltipTrigger>
							<TooltipContent>Using JetBrains Mono font</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>
			</section>

			{/* Dialog Section */}
			<section className="space-y-8">
				<h2 className="text-xl font-mono text-accent-green flex items-center gap-2">
					<span className="opacity-50">#</span> dialog.tsx
				</h2>
				<div className="flex flex-wrap gap-8 p-8 rounded-xl border border-border-primary bg-bg-card">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="primary">
								<MessageSquare className="w-4 h-4" />
								Open Dialog
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Brutally Honest Review</DialogTitle>
								<DialogDescription>
									Are you sure you want to proceed with this roast? Your code
									might not survive the process.
								</DialogDescription>
							</DialogHeader>
							<div className="py-4 font-mono text-sm text-text-secondary">
								&gt; Initializing analysis...
								<br />
								&gt; Detecting code smells...
								<br />
								&gt; Found 42 reasons to start over.
							</div>
							<DialogFooter>
								<Button variant="ghost">Cancel</Button>
								<Button variant="danger">Proceed Anyway</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</section>
		</div>
	);
}
