import Link from "next/link";

export function Header() {
	return (
		<header className="flex h-14 w-full items-center justify-between border-b border-border-primary bg-bg-card px-10">
			<Link href="/" className="flex items-center gap-2">
				<span className="font-mono text-xl font-bold text-accent-green">
					&gt;
				</span>
				<span className="font-mono text-lg font-medium text-text-primary">
					devroast
				</span>
			</Link>
			<nav className="flex items-center gap-6">
				<Link
					href="/leaderboard"
					className="font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
				>
					leaderboard
				</Link>
			</nav>
		</header>
	);
}
