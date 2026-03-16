import { createTRPCRouter, publicProcedure } from '../init';
import { roasts } from '@/lib/db/schema';
import { sql, asc } from 'drizzle-orm';

export const roastRouter = createTRPCRouter({
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
});
