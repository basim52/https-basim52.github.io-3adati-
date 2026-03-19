import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateMotivationalMessage(streak: number) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: `You are Farfasha AI, a witty and supportive habit coach. 
      The user currently has a ${streak}-day habit streak. 
      Generate a short, punchy, and encouraging one-sentence message (max 20 words) 
      that mentions their streak and makes them feel like a hero. 
      Keep it futuristic and fun.`,
    });
    return response.text || "Keep going, you're doing great!";
  } catch (error) {
    console.error("Error generating AI message:", error);
    return "Your streak is glowing brighter than my future! Keep it up.";
  }
}
