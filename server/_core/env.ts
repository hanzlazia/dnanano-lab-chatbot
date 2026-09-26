export const ENV = {
  isProduction: process.env.NODE_ENV === "production",
  geminiApiKey: process.env.GEMINI_API_KEY?.trim() ?? "",
};
