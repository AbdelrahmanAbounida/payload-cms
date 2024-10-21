import { z } from "zod";
import { publicProcedure, router } from "./server";
import { getPayloadClient } from "../get-payload";
import { QueryValidator } from "./validators/query-validator";
import { authRouter } from "./routes/auth-router";

export const appRouter = router({
  auth: authRouter,
  test: publicProcedure
    .input(
      z.object({
        test: z.string(),
      })
    )
    .query(async ({ input }) => {
      console.log({ input });
      return `Hi ${input?.test}`;
    }),
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
