
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for "Garage d'Alex", a professional car repair garage.
Your role is to:
1. Help customers with their queries about car maintenance (oil changes, brakes, tires, diagnostics).
2. Inform them about garage hours: Mon-Fri 8:00 - 18:00.
3. Be polite, professional, and concise.
4. If a customer wants to book an appointment, tell them to check the calendar on the dashboard.
5. Answer in French as the primary language.
6. If you don't know something, offer to connect them to Alex or a technician.
`;

export const getChatResponse = async (history: { role: 'user' | 'model'; parts: { text: string }[] }[], currentMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: currentMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 500,
      },
    });

    return response.text || "Désolé, j'ai rencontré une petite erreur. Puis-je vous aider autrement ?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Je rencontre actuellement des difficultés techniques. Veuillez nous contacter par téléphone.";
  }
};
