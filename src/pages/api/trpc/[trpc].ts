//  This is the API-handler of your app that contains all your API routes.
//  On a bigger app, you will probably want to split this file up into multiple files.

import type { NextApiRequest, NextApiResponse } from "next";
import * as trpcNext from "@trpc/server/adapters/next";
import { router } from "@/server/trpc";

import { checkAuthenticationRouter } from "@/server/routers/checkAuthentication";
import { loginRouter } from "@/server/routers/login";
import { createContext } from "@/server/trpc";

const appRouter = router({
  checkAuthentication: checkAuthenticationRouter,
  login: loginRouter,
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
const nextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export default nextApiHandler;
