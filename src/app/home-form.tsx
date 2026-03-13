"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { CodeEditor } from "@/components/code-editor";

export function HomeForm() {
	const [code, setCode] = React.useState("");

	const MAX_LENGTH = 2000;
	const isButtonEnabled = code.trim().length > 0 && code.length <= MAX_LENGTH;

	return (
		<section className="flex flex-col w-full max-w-[780px] mt-8">
			<CodeEditor 
				value={code} 
				onChange={setCode}
				placeholder="function calculateTotal(items) { ... }"
				maxLength={MAX_LENGTH}
			/>

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
						{code.length > MAX_LENGTH 
							? "// code too long, even I have limits"
							: "// maximum sarcasm enabled"}
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
		</section>
	);
}
