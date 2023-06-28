import { TRPCError, initTRPC } from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

const t = initTRPC.create();

export const router = t.router;

export const publicProcedure = t.procedure;
