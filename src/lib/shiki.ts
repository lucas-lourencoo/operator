import {
	type BundledLanguage,
	createHighlighter,
	type Highlighter,
} from "shiki";

export const SUPPORTED_LANGUAGES = [
	{ id: "javascript", name: "JavaScript" },
	{ id: "typescript", name: "TypeScript" },
	{ id: "python", name: "Python" },
	{ id: "java", name: "Java" },
	{ id: "c", name: "C" },
	{ id: "cpp", name: "C++" },
	{ id: "csharp", name: "C#" },
	{ id: "go", name: "Go" },
	{ id: "rust", name: "Rust" },
	{ id: "php", name: "PHP" },
	{ id: "ruby", name: "Ruby" },
	{ id: "swift", name: "Swift" },
	{ id: "kotlin", name: "Kotlin" },
	{ id: "dart", name: "Dart" },
	{ id: "scala", name: "Scala" },
	{ id: "html", name: "HTML" },
	{ id: "css", name: "CSS" },
	{ id: "json", name: "JSON" },
	{ id: "sql", name: "SQL" },
	{ id: "bash", name: "Bash" },
	{ id: "yaml", name: "YAML" },
	{ id: "markdown", name: "Markdown" },
	{ id: "tsx", name: "TSX" },
	{ id: "jsx", name: "JSX" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["id"];

export const SUPPORTED_LANGUAGE_IDS = SUPPORTED_LANGUAGES.map(
	(l) => l.id,
) as SupportedLanguage[];

let highlighterInstance: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

export async function getShikiHighlighter(): Promise<Highlighter> {
	if (highlighterInstance) return highlighterInstance;
	if (highlighterPromise) return highlighterPromise;

	highlighterPromise = createHighlighter({
		themes: ["github-dark"],
		langs: SUPPORTED_LANGUAGE_IDS as unknown as BundledLanguage[],
	}).then((hl: Highlighter) => {
		highlighterInstance = hl;
		return hl;
	});

	return highlighterPromise;
}
