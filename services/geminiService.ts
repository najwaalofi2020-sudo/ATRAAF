
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, MessageRole } from '../types';
import { SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to convert our ChatMessage format to Gemini's Content format
const toGeminiContent = (messages: ChatMessage[]) => {
    return messages.map(msg => ({
        role: msg.role,
        parts: msg.parts.map(part => ({ text: part.text }))
    }));
};

export const generateResponse = async (chatHistory: ChatMessage[]): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: toGeminiContent(chatHistory),
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating response from Gemini API:", error);
        throw new Error("Failed to get a response from the AI model.");
    }
};
