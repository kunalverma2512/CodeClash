// /utils/geminiApi.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function getGeminiResponse(promptText) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: promptText }] }],
    });
    console.log(result.candidates?.[0]?.content?.parts?.[0]?.text);
    
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty response from Gemini");

    return { rawAdvice: text.trim() };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get response from Gemini.");
  }
}
