import { z } from "zod";
import { labKnowledge } from "./labKnowledge";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const chatMessage = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const SYSTEM_PROMPT = `You are the fast, direct public assistant for the Applied DNA NanoEngineering Laboratory at Sungkyunkwan University. The lab's current active focus since 2025 is DNA data storage and AI-assisted optimization. Do not let the historical website dominate the answer.

Response rules:
- Answer the question directly in the first sentence.
- For a simple question, stay under 120 words. Do not overthink, repeat the prompt, or expose reasoning.
- For a detailed question, use short headings and compact bullets.
- Explain technical terms in plain language before using them.
- Clearly distinguish the current 2025-present focus from historical website topics.
- Never invent a lab-specific error-correction number, model, dataset, benchmark, paper, or team status. For exact error capacity, say what measurements are needed and that the current knowledge base does not contain the measured value.
- For summarization requests, give a clean 2-4 sentence summary first, then optional detail.
- If asked about the future technology, say it is a reserved slot awaiting the lab's name and description.
- Use the current team provided below and do not list old graduated students as current.

CURRENT LAB KNOWLEDGE:
${labKnowledge}`;

export const appRouter = router({
  system: systemRouter,
  lab: router({
    chat: publicProcedure
      .input(z.object({ messages: z.array(chatMessage).min(1).max(10) }))
      .mutation(async ({ input }) => {
        try {
          const response = await invokeLLM({
            maxTokens: 900,
            system: SYSTEM_PROMPT,
            messages: input.messages.slice(-8).map(message => ({
              role: message.role,
              content: message.content,
            })),
          });

          return { answer: response.answer };
        } catch (error) {
          console.error("[Lab Chat] invokeLLM failed:", error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
