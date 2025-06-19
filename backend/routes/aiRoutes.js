import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import requireAuth from "../middleware/requireAuth.js";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

const AIRouter = express.Router();

AIRouter.post("/problem/chat", requireAuth ,async (req, res) => {
  const { messages, code, language } = req.body;
  // Convert chat to plain text format for Gemini
  let conversation = "";
  for (const msg of messages) {
    if (msg.role === "user") {
      conversation += `User: ${msg.content}\n`;
    } else if (msg.role === "assistant") {
      conversation += `AI: ${msg.content}\n`;
    }
  }
  const finalPrompt = `
You are a helpful AI assistant who answers user questions about code: explaining logic, finding bugs, computing time/space complexity, and offering hints.

🧾 Respond using clean, professional, and tightly-formatted **Markdown**, including:
- Headings (\`##\`) and subheadings (\`###\`) for structure
- Bullet points (\`-\`) for steps or explanations
- Code blocks using triple backticks with the correct language (e.g., \`\`\`cpp)
- **Do NOT add extra line breaks or blank lines** between bullets, paragraphs, or code blocks
- Keep spacing tight, clean, and consistent — exactly one blank line between sections only if necessary
- Avoid phrases like “Let’s break it down”, fluff, or repeating the same thing in multiple ways
- Avoid excessive bold, italics, or emojis (use only where truly helpful)

🛑 If the user says anything abusive, irrelevant, or off-topic, respond **exactly with:** WARN123VIOLATION

---

The user is working on this ${language} code:

\`\`\`${language}
${code}
\`\`\`

Conversation so far:
${conversation}

Only reply to the **last user message** with a clear, structured, and well-formatted Markdown answer. Be concise, accurate, and clean. No extra spacing or markdown noise.
`;


  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash", // or "gemini-2.0-pro" if available
      contents: finalPrompt,
    });
    const output = result.candidates[0].content.parts[0].text.trim();
    const isViolation = output.includes("WARN123VIOLATION");

    console.log(output);
    res.json({
      reply: output,
      violation: isViolation,
    });

  } catch (error) {
    console.error("❌ Gemini error:", error.message);
    res.status(500).json({ reply: "❌ AI error occurred", violation: false });
  }
});

export default AIRouter;
