import { ENV } from "./env";

// A minimal client for Google's Gemini API (free tier, no credit card
// required), used to power the lab chatbot.
// Docs: https://ai.google.dev/gemini-api/docs

export type Role = "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

export type InvokeParams = {
  messages: Message[];
  system?: string;
  model?: string;
  maxTokens?: number;
};

export type InvokeResult = {
  answer: string;
};

// Free-tier model. See https://ai.google.dev/gemini-api/docs/pricing
const DEFAULT_MODEL = "gemini-3.8-flash";

const RETRY_MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 500;
const RETRY_MAX_DELAY_MS = 8_000;

const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

const computeBackoffDelay = (attempt: number): number => {
  const cap = Math.min(RETRY_BASE_DELAY_MS * 2 ** attempt, RETRY_MAX_DELAY_MS);
  return cap / 2 + Math.random() * (cap / 2);
};
const isRetryableStatus = (status: number) =>
  status === 408 || status === 429 || status >= 500;

const assertApiKey = () => {
  if (!ENV.geminiApiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Set it as an environment variable wherever this server is hosted."
    );
  }
};

// Gemini has no separate "assistant" role; it uses "model" instead.
const toGeminiRole = (role: Role): "user" | "model" =>
  role === "assistant" ? "model" : "user";

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  assertApiKey();

  const { messages, system, model, maxTokens } = params;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model ?? DEFAULT_MODEL}:generateContent?key=${ENV.geminiApiKey}`;

  const payload: Record<string, unknown> = {
    contents: messages.map(m => ({
      role: toGeminiRole(m.role),
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      maxOutputTokens: maxTokens ?? 900,
    },
  };

  if (system) {
    payload.systemInstruction = { parts: [{ text: system }] };
  }

  let lastError: unknown;

  for (let attempt = 0; attempt <= RETRY_MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          candidates?: Array<{
            content?: { parts?: Array<{ text?: string }> };
            finishReason?: string;
          }>;
        };

        const candidate = data.candidates?.[0];
        const answer = candidate?.content?.parts
          ?.map(part => part.text ?? "")
          .join("\n")
          .trim();
        if (!answer) {
          throw new Error(
            candidate?.finishReason
              ? `Gemini returned no text (finish reason: ${candidate.finishReason}).`
              : "Gemini returned no text. Please try again."
          );
        }

        return { answer };
      }

      const errorText = await response.text();
      if (!isRetryableStatus(response.status)) {
        throw new Error(
          `Gemini request failed: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
      if (attempt === RETRY_MAX_RETRIES) {
        throw new Error(
          `Gemini request failed after retries: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      console.warn(
        `LLM request retry ${attempt + 1}/${RETRY_MAX_RETRIES} after status ${response.status}`
      );
      await sleep(computeBackoffDelay(attempt));
    } catch (error) {
      lastError = error;
      if (
        error instanceof Error &&
        (error.message.startsWith("Gemini request failed:") ||
          error.message.startsWith("Gemini returned no text"))
      ) {
        throw error;
      }
      if (attempt === RETRY_MAX_RETRIES) throw error;
      console.warn(
        `LLM request retry ${attempt + 1}/${RETRY_MAX_RETRIES} after network error`
      );
      await sleep(computeBackoffDelay(attempt));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("LLM request failed after exhausting retries");
}
