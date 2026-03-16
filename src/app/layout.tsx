import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { TRPCReactProvider } from "@/trpc/client";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "DevRoast UI Kit",
	description: "Brutally honest code reviews components",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${jetbrainsMono.variable} font-sans antialiased bg-bg-card text-text-primary min-h-screen flex flex-col`}
			>
				<Suspense fallback={null}>
					<TRPCReactProvider>
						<Header />
						{children}
					</TRPCReactProvider>
				</Suspense>
			</body>
		</html>
	);
}
