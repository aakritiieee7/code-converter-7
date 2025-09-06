import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  constructor(apiKey) {
    this.genAI = null;
    this.model = null;
    this.apiKey = apiKey;
    this.initializeClient();
  }

  initializeClient() {
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
  }

  isConfigured() {
    return !!this.apiKey;
  }

  async convertCode(sourceLang, targetLang, inputCode) {
    try {
      if (!this.model) {
        throw new Error("Gemini model not initialized.");
      }
  
      const prompt = `
        You are an expert software developer and a highly skilled AI assistant. Your task is to process a user's code.
  
        Rule 1: First, analyze the provided ${sourceLang} code for all syntax errors, bugs, or common issues.
        - If you find issues, respond in **JSON** with two fields:
          {
            "analysis": "List of issues and how you fixed them",
            "fixedCode": "Corrected ${sourceLang} code only"
          }
  
        Rule 2: If no issues exist, convert the code from ${sourceLang} to ${targetLang}.
        Convert the Python code to Java **without any class or main method wrapper**. 
        Just give the equivalent statements only. Preserve indentation. You can point out possible runtime issues or logical mistakes, not just syntax errors. Do not add explanations or extra text.

        - Respond in **JSON** with:
          {
            "analysis": "No issues found. Code successfully converted to ${targetLang}",
            "convertedCode": "Converted code only"
          }
  
        Code input:
        \`\`\`${sourceLang}
        ${inputCode}
        \`\`\`
      `;
  
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let processed = response.text().trim();
  
      // 🔥 Remove markdown fences if present
      if (processed.startsWith("```")) {
        processed = processed.replace(/^```[a-zA-Z]*\n/, '').replace(/```$/, '').trim();
      }
  
      let parsed;
      try {
        parsed = JSON.parse(processed);
      } catch (err) {
        console.error("Failed to parse JSON:", processed);
        throw new Error("Gemini response not valid JSON");
      }
  
      return parsed;
  
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to process code using Gemini API.');
    }
  }
  
  
}
