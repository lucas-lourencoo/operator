import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import type { Highlighter } from "shiki";
import { useLanguageDetection } from "@/hooks/use-language-detection";
import {
	getShikiHighlighter,
	SUPPORTED_LANGUAGES,
	type SupportedLanguage,
} from "@/lib/shiki";
import { cn } from "@/lib/utils";

export interface CodeEditorProps {
	value: string;
	onChange: (value: string) => void;
	onLanguageChange?: (lang: SupportedLanguage) => void;
	className?: string;
	placeholder?: string;
	maxLength?: number;
}

export function CodeEditor({
	value,
	onChange,
	onLanguageChange,
	className,
	placeholder = "function calculateTotal(items) { ... }",
	maxLength,
}: CodeEditorProps) {
	const { language, setLanguage, isDetecting } = useLanguageDetection(value);
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
	const [isManualOverride, setIsManualOverride] = useState(false);
	const _editorRef = useRef<HTMLDivElement>(null);

	const activeLanguage = language;
	const currentLength = value.length;
	const isOverLimit = maxLength ? currentLength > maxLength : false;

	useEffect(() => {
		getShikiHighlighter().then(setHighlighter);
	}, []);

	useEffect(() => {
		if (onLanguageChange) {
			onLanguageChange(activeLanguage);
		}
	}, [activeLanguage, onLanguageChange]);

	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLanguage(e.target.value as SupportedLanguage);
		setIsManualOverride(true);
	};

	const handleCodeChange = (val: string) => {
		onChange(val);
		if (isManualOverride && val === "") {
			setIsManualOverride(false);
		}
	};

	const highlight = useCallback(
		(code: string) => {
			if (!highlighter || !code) {
				return code;
			}
			try {
				const html = highlighter.codeToHtml(code, {
					lang: activeLanguage,
					theme: "github-dark",
				});
				const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
				return match ? match[1] : code;
			} catch (e) {
				return code;
			}
		},
		[highlighter, activeLanguage],
	);

	// Calculate line numbers
	const lines = value.split("\n");
	const lineCount = Math.max(lines.length, 12); // Minimum 12 lines for visual height

	return (
		<div
			className={cn(
				"flex flex-col rounded-lg border border-border-primary bg-bg-input overflow-hidden shadow-2xl relative",
				className,
			)}
		>
			{/* Window Header */}
			<div className="flex h-10 items-center justify-between px-4 border-b border-border-primary bg-bg-hover">
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 rounded-full bg-[#EF4444]" />
					<div className="h-3 w-3 rounded-full bg-[#F59E0B]" />
					<div className="h-3 w-3 rounded-full bg-[#10B981]" />
				</div>

				<div className="flex items-center gap-3">
					{isDetecting && (
						<span className="font-mono text-[10px] text-text-tertiary animate-pulse uppercase tracking-wider">
							detecting...
						</span>
					)}
					<div className="relative flex items-center">
						<select
							className="appearance-none bg-transparent font-mono text-xs text-text-tertiary border-none outline-none focus:ring-0 cursor-pointer pr-4 hover:text-text-secondary transition-colors"
							value={activeLanguage}
							onChange={handleLanguageChange}
						>
							{SUPPORTED_LANGUAGES.map((lang) => (
								<option
									key={lang.id}
									value={lang.id}
									className="bg-bg-card text-text-primary"
								>
									{lang.name}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute right-0 flex items-center text-text-tertiary">
							<svg
								className="w-3 h-3 fill-current opacity-50"
								viewBox="0 0 20 20"
							>
								<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Code Inner Area */}
			<div className="flex max-h-[500px] overflow-y-auto relative custom-scrollbar">
				{/* Line Numbers Column */}
				<div className="flex flex-col items-end gap-[2px] pt-6 pb-6 px-3 border-r border-border-primary bg-bg-page/30 text-right font-mono text-xs text-text-tertiary select-none min-w-[48px] sticky left-0 z-10">
					{Array.from({ length: lineCount }, (_, i) => i + 1).map((num) => (
						<span key={num} className="leading-5 h-5">
							{num}
						</span>
					))}
				</div>

				{/* Editor Area */}
				<div className="flex-1 relative min-w-0">
					<Editor
						value={value}
						onValueChange={handleCodeChange}
						highlight={highlight}
						padding={24}
						style={{
							fontFamily: '"IBM Plex Mono", monospace',
							fontSize: 13,
							minHeight: "320px",
							outline: "none",
							lineHeight: "20px",
						}}
						className="editor-textarea min-h-[320px] text-text-primary"
						textareaClassName="focus:outline-none caret-accent-green"
					/>
					{value.length === 0 && (
						<div className="absolute top-6 left-6 text-text-tertiary pointer-events-none select-none font-mono text-sm opacity-50">
							{placeholder}
						</div>
					)}
				</div>
			</div>

			{/* Character Counter */}
			{maxLength && (
				<div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] tracking-tight bg-bg-page/50 backdrop-blur px-2 py-1 rounded border border-border-primary pointer-events-none">
					<span
						className={cn(
							isOverLimit ? "text-accent-red" : "text-text-tertiary",
						)}
					>
						{currentLength.toLocaleString("en-US")}
					</span>
					<span className="text-text-tertiary opacity-50 mx-1">/</span>
					<span className="text-text-tertiary font-bold">
						{maxLength.toLocaleString("en-US")}
					</span>
				</div>
			)}
		</div>
	);
}
