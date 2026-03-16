import { asc, sql, eq } from "drizzle-orm";
import { roasts, roastFindings, suggestedImprovements } from "@/lib/db/schema";
import { createTRPCRouter, publicProcedure } from "../init";
import { z } from "zod";
import { generateText, Output } from "ai";
import { openai } from "@ai-sdk/openai";

const roastSchema = z.object({
	score: z.number().min(0).max(10),
	summary: z.string(),
	findings: z.array(
		z.object({
			type: z.enum(["critical", "warning", "good", "neutral"]),
			title: z.string(),
			description: z.string(),
		})
	),
	suggestedImprovements: z.array(
		z.object({
			originalCode: z.string(),
			improvedCode: z.string(),
			explanation: z.string(),
		})
	),
});

export const roastRouter = createTRPCRouter({
	createRoast: publicProcedure
		.input(
			z.object({
				code: z.string().min(1).max(2000),
				language: z.string(),
				isRoastMode: z.boolean(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { code, language, isRoastMode } = input;

			const systemPrompt = isRoastMode
				? `You are an extremely sarcastic, toxic, and highly critical senior developer reviewing code. Humiliate the code author gently but firmly. 
					You find joy in pointing out terrible variable names, lack of typing, horrible complexity, and general bad practices.
					Give the code a brutal score (0-10) where 10 is 'tolerable' and 0 is 'delete your repository'.
					Even your suggested improvements should carry a condescending or mocking tone in the explanation.`
				: `You are an experienced, polite, and helpful senior software engineer doing a thorough code review.
					Provide constructive feedback, identify potential bugs or performance issues, and suggest clear improvements.
					Give the code a fair score (0-10). Keep the tone professional and encouraging.`;

			const prompt = `Review the following ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;

			const { output } = await generateText({
				model: openai("gpt-4o-mini"),
				system: systemPrompt,
				prompt: prompt,
				output: Output.object({ schema: roastSchema }),
			});

			const roastResult = output;

			const [insertedRoast] = await ctx.db
				.insert(roasts)
				.values({
					code,
					language,
					score: Math.round(roastResult.score),
					summary: roastResult.summary,
				})
				.returning({ id: roasts.id });

			if (roastResult.findings.length > 0) {
				await ctx.db.insert(roastFindings).values(
					roastResult.findings.map((f) => ({
						roastId: insertedRoast.id,
						type: f.type,
						title: f.title,
						description: f.description,
					}))
				);
			}

			if (roastResult.suggestedImprovements.length > 0) {
				await ctx.db.insert(suggestedImprovements).values(
					roastResult.suggestedImprovements.map((imp) => ({
						roastId: insertedRoast.id,
						originalCode: imp.originalCode,
						improvedCode: imp.improvedCode,
						explanation: imp.explanation,
					}))
				);
			}

			return { id: insertedRoast.id };
		}),

	getStats: publicProcedure.query(async ({ ctx }) => {
		const [result] = await ctx.db
			.select({
				count: sql<number>`count(${roasts.id})::int`,
				averageScore: sql<number>`avg(${roasts.score})`,
			})
			.from(roasts);

		return {
			count: result?.count ?? 0,
			averageScore: Number(result?.averageScore ?? 0),
		};
	}),

	getLeaderboardPreview: publicProcedure.query(async ({ ctx }) => {
		const [topRoasts, [stats]] = await Promise.all([
			ctx.db
				.select({
					id: roasts.id,
					score: roasts.score,
					code: roasts.code,
					language: roasts.language,
				})
				.from(roasts)
				.orderBy(asc(roasts.score))
				.limit(3),
			ctx.db
				.select({
					count: sql<number>`count(${roasts.id})::int`,
				})
				.from(roasts),
		]);

		return {
			roasts: topRoasts,
			totalCount: stats?.count ?? 0,
		};
	}),

	getLeaderboard: publicProcedure.query(async ({ ctx }) => {
		return ctx.db
			.select({
				id: roasts.id,
				score: roasts.score,
				code: roasts.code,
				language: roasts.language,
			})
			.from(roasts)
			.orderBy(asc(roasts.score))
			.limit(20);
	}),

	getRoastById: publicProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ ctx, input }) => {
			const [roast] = await ctx.db
				.select()
				.from(roasts)
				.where(eq(roasts.id, input.id));

			if (!roast) return null;

			const findings = await ctx.db
				.select()
				.from(roastFindings)
				.where(eq(roastFindings.roastId, roast.id));

			const improvements = await ctx.db
				.select()
				.from(suggestedImprovements)
				.where(eq(suggestedImprovements.roastId, roast.id));

			return {
				...roast,
				findings,
				improvements,
			};
		}),
});
