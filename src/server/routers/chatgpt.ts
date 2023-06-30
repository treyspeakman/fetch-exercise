import { introBotMessages } from "@/lib/utils/chatgpt/systemMessages";
import { dogFinderBotMessages } from "@/lib/utils/chatgpt/systemMessages";
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z, TypeOf } from "zod";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

export const ChatMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
});

export const ChatHistorySchema = z.array(ChatMessageSchema);

export type ChatMessage = TypeOf<typeof ChatMessageSchema>;
export type ChatHistory = TypeOf<typeof ChatHistorySchema>;

const DogSchema = z.object({
  name: z.string(),
  breed: z.string(),
  zip_code: z.string(),
  age: z.number(),
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const chatgptRouter = router({
  getIntro: publicProcedure
    .input(DogSchema)
    .output(z.string())
    .mutation(async ({ input }) => {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 1000,
        messages: [
          ...(introBotMessages as ChatCompletionRequestMessage[]),
          {
            role: "user",
            content: `${JSON.stringify(input)}`,
          } as ChatCompletionRequestMessage,
        ],
      });

      if (response.data.choices[0].message?.content) {
        return response.data.choices[0].message.content;
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get message content from the response.",
        });
      }
    }),
  getMatch: publicProcedure
    .input(ChatHistorySchema)
    .output(z.string())
    .mutation(async ({ input }) => {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 1000,
        messages: [
          ...dogFinderBotMessages,
          ...input,
          {
            role: "user",
            content: `Send a message recommending one single breed out of the list provided earlier and an age 0 - 15. the message should look exactly like this "breed-age" with no other words`,
          },
        ],
      });

      if (response.data.choices[0].message?.content) {
        return response.data.choices[0].message.content;
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get message content from the response.",
        });
      }
    }),
});
