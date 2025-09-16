import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { LANGUAGES, Language } from '../lib/languages';
import { addToHistory, getItemToRerun, setItemToRerun } from '../lib/historyService';
import { useTheme } from '../lib/themeContext';

import Button from '../components/ui/button';
import Select from '../components/ui/select';
import AnalysisPanel from '../components/AnalysisPanel';

const CodeEditor = dynamic(() => import('..u components/CodeEditor'), {
  ssr: false,
  loading: () => <div className="h-[300px] md:h-[400px] bg-brand-dark/50 rounded-lg flex items-center justify-center"><p>Loading Editor...</p></div>
});

export default function Home() {
    const { theme, toggleTheme } = useTheme();
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [sourceLang, setSourceLang] = useState<Language>('Python');
    const [targetLang, setTargetLang] = useState<Language>('Java');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [fixedCode, setFixedCode] = useState('');
    const router = useRouter();

    useEffect(() => {
        const itemToRerun = getItemToRerun();
        if (itemToRerun) {
            setInputCode(itemToRerun.inputCode);
            setSourceLang(itemToRerun.sourceLang as Language);
            setTargetLang(itemToRerun.targetLang as Language);
            setOutputCode(''); 
            setAnalysis('Code loaded from history. Ready to convert.');
        }
    }, []);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

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
        <div className={`flex flex-col min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-brand-dark text-white' : 'bg-gray-50 text-black'}`}>
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
                            <Link href="/history" passHref>
                                <a><Button variant="secondary" size="sm">History</Button></a>
                            </Link>
                            <Link href="/landing" passHref>
                                <a><Button variant="secondary" size="sm">About</Button></a>
                            </Link>
                            <Button onClick={toggleTheme} variant="ghost" size="icon">
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Input Section */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="font-semibold">From:</span>
                                <div className="flex-grow">
                                    <Select
                                        value={sourceLang}
                                        onChange={(e) => setSourceLang(e.target.value as Language)}
                                        disabled={loading}
                                    >
                                        {LANGUAGES.map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="h-[400px]">
                                <CodeEditor
                                    language={sourceLang}
                                    value={inputCode}
                                    onChange={setInputCode}
                                    readOnly={loading}
                                />
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="font-semibold">To:</span>
                                <div className="flex-grow">
                                    <Select
                                        value={targetLang}
                                        onChange={(e) => setTargetLang(e.target.value as Language)}
                                        disabled={loading}
                                    >
                                        {LANGUAGES.map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="h-[400px]">
                                <CodeEditor 
                                    value={outputCode} 
                                    language={targetLang} 
                                    readOnly 
                                    onChange={setOutputCode} 
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <p className="text-center text-red-500 dark:text-hot-pink mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col space-y-4 mt-6">
                        {(analysis || loading) && (
                            <AnalysisPanel
                                analysis={analysis ? analysis.split('\n') : []}
                                loading={loading}
                                onCopyAnalysis={() => handleCopy(analysis)}
                            />
                        )}
                        {fixedCode && (
                            <div className="bg-brand-dark/50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Suggested Fix</h3>
                                <CodeEditor
                                    language={sourceLang}
                                    value={fixedCode}
                                    readOnly
                                />
                                <div className="flex gap-4 mt-4">
                                    <Button onClick={handleReplaceFixed} variant="secondary">Use This Fix</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                        <Button onClick={handleConvert} disabled={loading} size="lg">
                            {loading ? 'Converting...' : 'Convert Code'}
                        </Button>
                        <Button onClick={handleClearAll} variant="secondary" size="lg">
                            Clear All
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
}


