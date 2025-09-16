import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import CodeEditor from '../components/CodeEditor';
import { Select } from '../components/ui/select';
import Button from '../components/ui/button';
import { useTheme } from '../lib/themeContext';
import { addToHistory, getItemToRerun } from '../lib/historyService';
import { useRouter } from 'next/router'; 

const languages = ['Python', 'Java', 'JavaScript', 'C#'];

export default function Home() {
    const { theme, toggleTheme } = useTheme();
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [sourceLang, setSourceLang] = useState('Python');
    const [targetLang, setTargetLang] = useState('Java');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [fixedCode, setFixedCode] = useState('');
    const router = useRouter();

    useEffect(() => {
        const itemToRerun = getItemToRerun();
        if (itemToRerun) {
            setInputCode(itemToRerun.inputCode);
            setSourceLang(itemToRerun.sourceLang);
            setTargetLang(itemToRerun.targetLang);
            setOutputCode(''); 
            setAnalysis('Code loaded from history. Ready to convert.');
        }
    }, []);

    const apiBase = 'http://localhost:5001/api';

    async function handleConvert() {
        if (!inputCode.trim()) {
            setError('Please enter some code to convert');
            return;
        }
        setLoading(true);
        setError('');
        setOutputCode('');
        setAnalysis('');
        setFixedCode('');
        try {
            const response = await axios.post(`${apiBase}/convert`, { inputCode, sourceLang, targetLang, useAI: true });
            const analysisText = response.data.analysis || 'No analysis provided.';
            
            if (response.data.convertedCode) {
                const converted = response.data.convertedCode;
                setOutputCode(converted);
                setAnalysis(analysisText);
                addToHistory({
                    sourceLang, targetLang, inputCode, outputCode: converted, analysis: analysisText, type: 'convert'
                });
            } else if (response.data.fixedCode) {
                const fixed = response.data.fixedCode;
                setFixedCode(fixed);
                setAnalysis(analysisText);
                addToHistory({
                    sourceLang, targetLang, inputCode, outputCode: fixed, analysis: analysisText, type: 'fix'
                });
            } else {
                setError('Unexpected response format from server.');
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Server error during conversion.');
            } else {
                setError('Failed to connect to server. Is it running?');
            }
        } finally {
            setLoading(false);
        }
    }

    const handleReplaceFixed = () => {
        setInputCode(fixedCode);
        setFixedCode('');
        setAnalysis('Fixed code applied. Press Convert to get target code.');
    };

    const handleClearAll = () => {
        setInputCode('');
        setOutputCode('');
        setFixedCode('');
        setAnalysis('');
        setError('');
    };

    const handleCopy = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <>
            <Head>
                <title>AI Code Converter - DevTranslate</title>
                <meta name="description" content="Convert code from one language to another" />
            </Head>
            
            <div className="min-h-screen w-full bg-white dark:bg-brand-dark text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
                {theme === 'dark' && (
                    <div className="absolute top-0 left-0 w-full h-full z-0">
                        <div className="absolute top-[5%] left-[15%] w-80 h-80 bg-gradient-to-r from-deep-purple to-hot-pink rounded-full opacity-20 filter blur-3xl animate-blob-float" />
                        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-gradient-to-r from-baby-pink to-hot-pink rounded-full opacity-10 filter blur-3xl animate-blob-float animation-delay-4000" />
                    </div>
                )}

                <header className="sticky top-0 z-50 bg-white/50 dark:bg-brand-dark/50 backdrop-blur-md border-b border-black/10 dark:border-white/10">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                        <div className="flex items-center space-x-3 font-bold text-2xl">
                            <span className="bg-gradient-to-r from-deep-purple to-hot-pink bg-clip-text text-transparent">
                                Code Converter
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button href="/history" variant="secondary" size="sm">
                                History
                            </Button>
                            <Button href="/landing" variant="secondary" size="sm">
                                About
                            </Button>
                            <Button onClick={toggleTheme} variant="ghost" size="icon">
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto p-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white/80 dark:bg-brand-dark/50 p-6 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 backdrop-blur-lg">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-lg font-medium">Source Code</label>
                                <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                                    {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                                </Select>
                            </div>
                            <CodeEditor value={inputCode} onChange={setInputCode} language={sourceLang} height="400px" />
                        </div>

                        <div className="bg-white/80 dark:bg-brand-dark/50 p-6 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 backdrop-blur-lg">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-lg font-medium">Converted Code</label>
                                <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                                    {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                                </Select>
                            </div>
                            <CodeEditor value={outputCode} onChange={() => {}} language={targetLang} height="400px" readOnly />
                        </div>
                    </div>

                    {analysis && (
                        <div className="mt-8 bg-white/80 dark:bg-brand-dark/50 p-6 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 backdrop-blur-lg">
                            <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>
                            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">{analysis}</p>
                            {fixedCode && (
                                <>
                                    <CodeEditor value={fixedCode} onChange={() => {}} language={sourceLang} height="250px" readOnly />
                                    <div className="flex gap-4 mt-4">
                                        <Button onClick={handleReplaceFixed} variant="secondary">
                                            Use Fixed Code
                                        </Button>
                                        <Button onClick={() => handleCopy(fixedCode)} variant="outline">
                                            Copy Fixed Code
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="mt-8 flex justify-center gap-6">
                        <Button onClick={handleConvert} disabled={loading} size="lg">
                            {loading ? 'Converting...' : 'Convert Code'}
                        </Button>
                        <Button onClick={handleClearAll} variant="secondary" size="lg">
                            Clear All
                        </Button>
                    </div>

                    {error && (
                        <p className="text-center text-red-500 dark:text-hot-pink mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                            {error}
                        </p>
                    )}
                </main>
            </div>
        </>
    );
}


