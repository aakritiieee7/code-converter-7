import express from 'express';
import { GeminiService } from '../lib/geminiService.js';

const router = express.Router();

const geminiService = new GeminiService(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
    const { inputCode, sourceLang, targetLang } = req.body;
    if (!inputCode || !sourceLang || !targetLang) {
        return res.status(400).json({ error: 'Missing required fields: inputCode, sourceLang, targetLang' });
    }

    if (!geminiService.isConfigured()) {
        console.error("FATAL: Gemini API key not configured on the server.");
        return res.status(500).json({ error: 'AI service is not configured. Please check the server setup.' });
    }

    try {
        const result = await geminiService.convertCode(sourceLang, targetLang, inputCode);
        res.json(result);
    } catch (error) {
        console.error('Error during conversion process:', error);
        res.status(500).json({ error: error.message || 'An unexpected error occurred during conversion.' });
    }
});

export default router;
