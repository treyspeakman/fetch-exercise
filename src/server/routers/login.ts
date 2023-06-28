import { router, publicProcedure } from "../trpc";
import { z } from "zod";

const InputSchema = z.object({
  name: z.union([z.string(), z.null()]),
  email: z.union([z.string(), z.null()]),
});

const OutputSchema = z.boolean();

export const loginRouter = router({
  login: publicProcedure
    .input(InputSchema)
    .output(OutputSchema)
    .mutation(async ({ input }) => {
      if (input.name && input.email) {
        const res = await fetch(
          "https://frontend-take-home-service.fetch.com/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",

            body: JSON.stringify(input),
          }
        );
        if (res.status == 200) {
          return true;
        }
      }
      return false;
    }),
});
