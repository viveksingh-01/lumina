import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function getResponse(prompt: string) {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response;
}