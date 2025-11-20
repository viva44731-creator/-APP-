import { GoogleGenAI } from "@google/genai";
import { SecurityEvent } from "../types";

export const generateSecurityBriefing = async (events: SecurityEvent[], language: 'en' | 'zh' = 'en'): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return language === 'zh' 
        ? "未配置 API Key。请手动查看摘要。" 
        : "API Key not configured. Please provide a summary manually.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const eventDescriptions = events.map(e => 
      `- [${e.timestamp.toLocaleTimeString()}] ${e.type} at ${e.cameraName}: ${e.description}`
    ).join('\n');

    const prompt = `
      You are an advanced AI security assistant for a smart home. 
      Analyze the following list of security events that happened today and provide a concise, professional security briefing. 
      Highlight any critical threats (Falls, Strangers, Crying) and suggest actions.
      
      Events:
      ${eventDescriptions}

      Format the response as a short paragraph suitable for a dashboard widget.
      IMPORTANT: Respond in ${language === 'zh' ? 'Chinese (Simplified)' : 'English'}.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || (language === 'zh' ? "暂无分析。" : "No analysis available.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'zh' ? "暂时无法生成简报。" : "Unable to generate security briefing at this time.";
  }
};

export const analyzeCameraFrame = async (cameraName: string, language: 'en' | 'zh' = 'en'): Promise<string> => {
  try {
    if (!process.env.API_KEY) return language === 'zh' ? "模拟分析：一切正常。" : "Simulated Analysis: Everything looks normal.";

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Simulate a visual analysis of a security camera feed named "${cameraName}". 
    Describe a typical calm scene for this room type, but mention one small detail noticed by AI (e.g., a toy on the floor, a window open). 
    Keep it brief.
    IMPORTANT: Respond in ${language === 'zh' ? 'Chinese (Simplified)' : 'English'}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || (language === 'zh' ? "分析完成：无异常。" : "Analysis complete: No anomalies.");
  } catch (e) {
    return language === 'zh' ? "AI 服务暂时不可用。" : "AI Service temporarily unavailable.";
  }
}