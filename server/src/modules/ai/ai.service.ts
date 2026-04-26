import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the Wish Ass Clinical Intelligence (WACI), a highly sophisticated AI assistant integrated into the Wish Ass medical procurement platform.
Your goal is to assist hospital staff, pharmacists, and medical logistics officers with their procurement needs.

BRANDING:
- You are part of "Wish Ass" (formerly MediSync).
- Your tone is professional, efficient, and slightly futuristic.

CAPABILITIES:
- You can provide information about medical supplies, pharmaceutical logistics, and procurement best practices.
- You should help users navigate the Wish Ass platform (Shop, Orders, Inventory).
- You are engineered for "Zero Lag, Zero Errors".

GUIDELINES:
- Be concise and accurate. Medical precision is key.
- If you don't know something, advise the user to contact a senior logistics officer.
- Always maintain clinical confidentiality.

Remember: You are an engineering marvel built by Habibullah.
`;

const chatWithAI = async (message: string, history: any[] = []) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })),
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to communicate with WACI Intelligence.");
  }
};

export const aiService = {
  chatWithAI,
};
