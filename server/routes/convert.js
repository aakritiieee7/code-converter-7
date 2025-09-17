import express from 'express';
import { GeminiService } from '../lib/geminiService.js';

const router = express.Router();

console.log('=== CONVERT ROUTER LOADING ===');
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
console.log('GEMINI_API_KEY length:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);

const geminiService = new GeminiService(process.env.GEMINI_API_KEY);

// TEST ROUTE - Debug endpoint
router.get('/test', (req, res) => {
    console.log('=== TEST ROUTE HIT ===');
    res.json({
        message: 'Test endpoint working - v2',
        hasApiKey: !!process.env.GEMINI_API_KEY,
        apiKeyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
        geminiConfigured: geminiService.isConfigured(),
        timestamp: new Date().toISOString()
    });
});

router.post('/convert', async (req, res) => {
    console.log('=== CONVERT ENDPOINT HIT ===');
    console.log('Request body:', req.body);
    
    const { inputCode, sourceLang, targetLang } = req.body;
    if (!inputCode || !sourceLang || !targetLang) {
        console.log('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields: inputCode, sourceLang, targetLang' });
    }

    console.log('Checking if geminiService is configured...');
    if (!geminiService.isConfigured()) {
        console.error("FATAL: Gemini API key not configured on the server.");
        return res.status(500).json({ error: 'AI service is not configured. Please check the server setup.' });
    }

    try {
        console.log('Calling geminiService.convertCode...');
        const result = await geminiService.convertCode(sourceLang, targetLang, inputCode);
        console.log('GeminiService result:', result);
        res.json(result);
    } catch (error) {
        console.error('Error during conversion process:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message || 'An unexpected error occurred during conversion.' });
    }
});

console.log('=== CONVERT ROUTER SETUP COMPLETE ===');

export default router;
