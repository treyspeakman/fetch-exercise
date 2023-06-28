import * as trpcNext from "@trpc/server/adapters/next";
import { router } from "@/server/trpc";

import { checkAuthenticationRouter } from "@/server/routers/checkAuthentication";
import { loginRouter } from "@/server/routers/login";
import { createContext } from "@/server/trpc";
import { searchDogsRouter } from "@/server/routers/searchDogs";

const appRouter = router({
  checkAuthentication: checkAuthenticationRouter,
  login: loginRouter,
  searchDogs: searchDogsRouter,
});

export type AppRouter = typeof appRouter;

const nextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export default nextApiHandler;
