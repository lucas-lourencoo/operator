import { ImageResponse } from "@takumi-rs/image-response";
import { api, getQueryClient } from "@/trpc/server";

export const runtime = "nodejs";
export const alt = "DevRoast - Code Analysis";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

interface ImageProps {
	params: Promise<{ id: string }>;
}

export default async function Image({ params }: ImageProps) {
	const { id } = await params;

	const queryClient = getQueryClient();
	const roast = await queryClient.fetchQuery(
		api.roast.getRoastById.queryOptions({ id }),
	);

	if (!roast) {
		return new Response("Not Found", { status: 404 });
	}

	const lines = roast.code.split("\n").length;
	const { score, language, summary } = roast;

	let verdict = "not_terrible";
	let verdictColor = "#10B981"; // good

	if (score <= 3) {
		verdict = "needs_serious_help";
		verdictColor = "#EF4444"; // critical
	} else if (score <= 6) {
		verdict = "could_be_better";
		verdictColor = "#F59E0B"; // warning
	}

	return new ImageResponse(
		<div tw="flex flex-col w-[1200px] h-[630px] bg-[#0A0A0A] border border-[#2A2A2A] p-[64px] justify-center items-center gap-[28px] overflow-hidden font-mono text-[#FAFAFA]">
			{/* Logo Section */}
			<div tw="flex flex-row gap-[8px] justify-center items-center">
				<span tw="text-[#10B981] text-[24px] font-bold">&gt;</span>
				<span tw="text-[#FAFAFA] text-[20px] font-medium">devroast</span>
			</div>

			{/* Score Section */}
			<div tw="flex flex-row gap-[4px] justify-center items-end">
				<span tw="text-[#F59E0B] text-[160px] font-black leading-none">
					{score}
				</span>
				<span tw="text-[#4B5563] text-[56px] font-normal leading-none">
					/10
				</span>
			</div>

			{/* Verdict Section */}
			<div tw="flex flex-row gap-[8px] justify-center items-center">
				<div
					tw="h-[12px] w-[12px] rounded-full"
					style={{ backgroundColor: verdictColor }}
				/>
				<span tw="text-[20px] font-normal" style={{ color: verdictColor }}>
					{verdict}
				</span>
			</div>

			{/* Language and Line Count Info */}
			<div tw="text-[#4B5563] text-[16px] font-normal">
				lang: {language} · {lines} lines
			</div>

			{/* Summary / Roast Quote */}
			<div tw="text-[#FAFAFA] font-sans text-[22px] font-normal leading-[1.5] text-center w-full px-12">
				“{summary}”
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
