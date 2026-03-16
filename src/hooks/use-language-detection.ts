import flourite from "flourite";
import { useEffect, useState } from "react";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/lib/shiki";

function normalizeFlouriteLanguage(
	lang: string,
	code: string,
): SupportedLanguage {
	const lowerLang = lang.toLowerCase();
	const lowerCode = code.toLowerCase();

	// Manual overrides for common JS/TS patterns that might be misidentified
	// TypeScript specific syntax
	if (
		code.includes("interface ") ||
		code.includes("type ") ||
		(code.includes(":") &&
			(code.includes("string") ||
				code.includes("number") ||
				code.includes("boolean")))
	) {
		if (lowerLang === "kotlin" || lowerLang === "java") {
			return "typescript";
		}
	}

	// Common JS/TS imports/exports
	if (
		lowerCode.includes("import {") ||
		lowerCode.includes("export function") ||
		lowerCode.includes("export const")
	) {
		if (
			lowerLang === "kotlin" ||
			lowerLang === "java" ||
			lowerLang === "unknown"
		) {
			return "typescript";
		}
	}

	// Custom mappings for languages that might differ from Flourite's output
	if (lowerLang === "c++") return "cpp";
	if (lowerLang === "c#") return "csharp";
	if (lowerLang === "shell") return "bash";

	const match = SUPPORTED_LANGUAGES.find(
		(l) =>
			l.id.toLowerCase() === lowerLang || l.name.toLowerCase() === lowerLang,
	);

	return match ? match.id : "javascript";
}

export function useLanguageDetection(code: string) {
	const [language, setLanguage] = useState<SupportedLanguage>("javascript");
	const [isDetecting, setIsDetecting] = useState(false);

	useEffect(() => {
		if (!code || code.trim() === "") {
			return;
		}

		const timer = setTimeout(() => {
			setIsDetecting(true);
			try {
				const result = flourite(code, { shiki: true });
				if (result.language) {
					const detected = normalizeFlouriteLanguage(result.language, code);
					setLanguage(detected);
				}
			} catch (error) {
				console.error("Failed to detect language", error);
			} finally {
				setIsDetecting(false);
			}
		}, 150); // 150ms debounce for faster detection on paste

		return () => clearTimeout(timer);
	}, [code]);

	return { language, setLanguage, isDetecting };
}
