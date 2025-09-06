import { Router } from 'express';
import { GeminiService } from '../lib/geminiService.js';

const router = Router();

// Debugging: Check if GEMINI_API_KEY is loaded
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);

// Initialize GeminiService with the API key
const geminiService = new GeminiService(process.env.GEMINI_API_KEY);

router.post('/convert', async (req, res) => {
    const { sourceLang, targetLang, inputCode } = req.body || {};
    console.log("Received data on /convert:", { sourceLang, targetLang, inputCode });

    if (!sourceLang || !targetLang || !inputCode) {
        return res.status(400).json({ message: 'sourceLang, targetLang, inputCode required' });
    }

    try {
        let result;

        if (!geminiService.isConfigured()) {
            console.log('Gemini isn’t configured. Please check key');
            return res.status(500).json({ message: 'Gemini API key not configured' });
        }

        // Add your conversion logic here
        result = await geminiService.convertCode(sourceLang, targetLang, inputCode);

        res.json({ result });
    } catch (error) {
        console.error('Error during conversion:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Health check endpoint
router.get('/health', (_req, res) => {
    res.json({
        status: 'healthy',
        services: {
            gemini: geminiService.isConfigured()
        }
    });
});

export default router;

export class GeminiService {
  constructor(apiKey) {
    console.log('Initializing GeminiService with API Key:', apiKey); // Debugging
    this.apiKey = apiKey;
    this.genAI = null;
    this.model = null;
    this.initializeClient();
  }

  initializeClient() {
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
  }

  isConfigured() {
    console.log('GeminiService API Key in isConfigured:', this.apiKey); // Debugging
    return !!this.apiKey;
  }
}
