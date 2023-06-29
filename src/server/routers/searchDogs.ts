import { router, publicProcedure } from "../trpc";
import { z } from "zod";

const OutputSchema = z.object({
  resultIds: z.array(z.number()),
  total: z.number(),
  next: z.string(),
  prev: z.string(),
});

export type AllDogsResult = z.TypeOf<typeof OutputSchema>;

export const searchDogsRouter = router({
  all: publicProcedure
    .input(z.void())
    .output(OutputSchema)
    .query(async () => {
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/search",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      return {
        resultIds: data.resultIds,
        total: data.total,
        next: data.next,
        prev: data.prev,
      };
    }),
});
