import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
    this.initializeClient();
  }

  initializeClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
  }


  isConfigured() {
        const apiKey = process.env.GEMINI_API_KEY;
        return !!apiKey
  }
}