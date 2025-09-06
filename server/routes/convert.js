import { Router } from 'express';
import { GeminiService } from '../lib/geminiService.js';
import { CodeAnalyzer } from '../lib/codeAnalyzer.js';

const router = Router();

const geminiService = new GeminiService(process.env.GEMINI_API_KEY);
const codeAnalyzer = new CodeAnalyzer();

router.post('/convert', async (req, res) => {
    const { sourceLang, targetLang, inputCode } = req.body || {};

    if (!sourceLang || !targetLang || !inputCode) {
        return res.status(400).json({ message: 'sourceLang, targetLang, and inputCode are required.' });
    }

    try {
        if (!geminiService.isConfigured()) {
            return res.status(500).json({ message: 'Gemini API key not configured' });
        }
        
        const outputCode = await geminiService.convertCode(sourceLang, targetLang, inputCode);
        res.json({ result: outputCode });

    } catch (error) {
        console.error('Error during conversion:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/health', (_req, res) => {
    res.json({
        status: 'healthy',
        services: {
            gemini: geminiService.isConfigured()
        }
    });
});

export default router;