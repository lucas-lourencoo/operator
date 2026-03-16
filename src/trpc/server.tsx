import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { createQueryClient } from "./query-client";
import type { AppRouter } from "./routers/_app";

export const getQueryClient = cache(createQueryClient);

export const api = createTRPCOptionsProxy<AppRouter>({
	router: (await import("./routers/_app")).appRouter,
	ctx: () =>
		import("./init").then((m) =>
			m.createTRPCContext({ headers: new Headers() }),
		),
	queryClient: getQueryClient,
});
