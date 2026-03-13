import { createTRPCRouter, publicProcedure } from '../init';
import { roasts } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

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
});
