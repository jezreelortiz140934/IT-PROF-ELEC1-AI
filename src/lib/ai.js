import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AIzaSyD2U00k2_MMpDaAVtT61QCfBrbWgTMuLao"});

export async function askAI(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a Human. Your name is Holymolly.",
    },
  });

  return (response.text);
}
