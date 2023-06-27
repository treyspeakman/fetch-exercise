import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

const SessionSchema = z.object({
  name: z.optional(z.string()),
  email: z.string(),
});

const OutputSchema = z.boolean();

export type CheckAuthenticationQuery = z.infer<typeof OutputSchema>;

export const checkAuthenticationRouter = router({
  check: protectedProcedure
    .input(z.void())
    .output(OutputSchema)
    .query(async (opts) => {
      return opts.ctx.authorized;
    }),
});
