import * as trpcNext from "@trpc/server/adapters/next";
import { router } from "@/server/trpc";

import { chatgptRouter } from "@/server/routers/chatgpt";

const appRouter = router({
  chatgpt: chatgptRouter,
});

export type AppRouter = typeof appRouter;

const nextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
});

export default nextApiHandler;
