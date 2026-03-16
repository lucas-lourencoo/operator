"use client";

import * as React from "react";
import { CodeEditor } from "@/components/code-editor";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import type { SupportedLanguage } from "@/lib/shiki";
import { useMutation } from "@tanstack/react-query";

export function HomeForm() {
	const router = useRouter();
	const trpc = useTRPC();
	const [code, setCode] = React.useState("");
	const [language, setLanguage] = React.useState<SupportedLanguage>("javascript");
	const [isRoastMode, setIsRoastMode] = React.useState(true);

	const createRoast = useMutation({
		...trpc.roast.createRoast.mutationOptions(),
		onSuccess: (data) => {
			router.push(`/roast/${data.id}`);
		},
	});

	const MAX_LENGTH = 2000;
	const isButtonEnabled = code.trim().length > 0 && code.length <= MAX_LENGTH && !createRoast.isPending;

	const handleSubmit = () => {
		if (!isButtonEnabled) return;
		createRoast.mutate({ code, language, isRoastMode });
	};

	return (
		<section className="flex flex-col w-full max-w-[780px] mt-8">
			<CodeEditor
				value={code}
				onChange={setCode}
				onLanguageChange={setLanguage}
				placeholder="function calculateTotal(items) { ... }"
				maxLength={MAX_LENGTH}
			/>

			{/* Actions Bar */}
			<div className="flex items-center justify-between mt-4">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Toggle 
							checked={isRoastMode} 
							onCheckedChange={setIsRoastMode} 
						/>
						<span className="font-mono text-sm text-accent-green">
							roast mode
						</span>
					</div>
					<span className="hidden font-mono text-xs text-text-tertiary sm:inline-block">
						{code.length > MAX_LENGTH
							? "// code too long, even I have limits"
							: isRoastMode 
								? "// maximum sarcasm enabled" 
								: "// constructive feedback mode"}
					</span>
				</div>
				<Button
					variant="primary"
					className="font-bold"
					disabled={!isButtonEnabled}
					onClick={handleSubmit}
				>
					{createRoast.isPending ? "$ roasting..." : "$ roast_my_code"}
				</Button>
			</div>
		</section>
	);
}
