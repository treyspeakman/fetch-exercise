import { TRPCError, initTRPC } from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await fetch(
    "https://frontend-take-home-service.fetch.com/auth/login",
    {
      method: "POST",
      credentials: "include",
    }
  );

  return {
    status: session.status,
  };
};

/*----------------------------------------------------------------------------------------------------*/

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

const isAuthed = t.middleware(({ next, ctx }) => {
  return next({ ctx: { authorized: ctx.status == 200 } });
});

export const router = t.router;
export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthed);
