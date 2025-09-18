import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { LANGUAGES, Language } from '../lib/languages';
import { addToHistory, getItemToRerun } from '../lib/historyService';
import { useTheme } from '../lib/themeContext';
import Button from '../components/ui/button';
import Select from '../components/ui/select';

const CodeEditor = dynamic(() => import('../components/CodeEditor'), {
  ssr: false,
  loading: () => <div className="h-[300px] md:h-[400px] bg-brand-dark/50 rounded-lg flex items-center justify-center"><p>Loading Editor...</p></div>
});

export default function Home() {
    const { theme, toggleTheme } = useTheme();
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [fixedCode, setFixedCode] = useState('');
    const [sourceLang, setSourceLang] = useState<Language>('Python');
    const [targetLang, setTargetLang] = useState<Language>('Java');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysis, setAnalysis] = useState('');
    const router = useRouter();

    useEffect(() => {
        const itemToRerun = getItemToRerun();
        if (itemToRerun) {
            setInputCode(itemToRerun.inputCode);
            setSourceLang(itemToRerun.sourceLang as Language);
            setTargetLang(itemToRerun.targetLang as Language);
            setOutputCode('');
            setFixedCode('');
            setAnalysis('Code loaded from history. Ready to convert.');
        }
    }, []);

    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001').replace(/\/$/, '');

    const handleConvert = async () => {
        if (!inputCode.trim()) {
            setError('Please enter some code to convert');
            return;
        }
        
        setLoading(true);
        setError('');
        setOutputCode('');
        setFixedCode('');
        setAnalysis('');
        
        try {
            const response = await axios.post(`${apiBase}/api/convert`, {
                inputCode,
                sourceLang,
                targetLang,
                useAI: true
            });
            
            const analysisText = response.data.analysis || 'No analysis provided.';
            
            if (response.data.convertedCode) {
                setOutputCode(response.data.convertedCode);
                setAnalysis(analysisText);
                
                addToHistory({
                    sourceLang,
                    targetLang,
                    inputCode,
                    outputCode: response.data.convertedCode,
                    analysis: analysisText,
                    type: 'convert'
                });
            } else if (response.data.fixedCode) {
                setFixedCode(response.data.fixedCode);
                setAnalysis(analysisText);
                
                addToHistory({
                    sourceLang,
                    targetLang,
                    inputCode,
                    outputCode: response.data.fixedCode,
                    analysis: analysisText,
                    type: 'fix'
                });
            } else {
                setError('Unexpected response format from server.');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setError(`Server error: ${err.response.data?.error || err.response.statusText}`);
                } else if (err.request) {
                    setError('Cannot connect to server. Please check if the server is running.');
                } else {
                    setError('Request failed. Please try again.');
                }
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

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
                            <Link href="/history" legacyBehavior>
                                <a><Button variant="secondary" size="sm">History</Button></a>
                            </Link>
                            <Link href="/landing" legacyBehavior>
                                <a><Button variant="secondary" size="sm">About</Button></a>
                            </Link>
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
                                <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value as Language)}>
                                    {LANGUAGES.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                                </Select>
                            </div>
                            <div className="h-[400px]">
                                <CodeEditor value={inputCode} onChange={setInputCode} language={sourceLang} />
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-brand-dark/50 p-6 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 backdrop-blur-lg">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-lg font-medium">Converted Code</label>
                                <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value as Language)}>
                                    {LANGUAGES.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                                </Select>
                            </div>
                            <div className="h-[400px]">
                                <CodeEditor value={outputCode} onChange={() => {}} language={targetLang} readOnly />
                            </div>
                        </div>
                    </div>

                    {analysis && (
                        <div className="mt-8 bg-white/80 dark:bg-brand-dark/50 p-6 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 backdrop-blur-lg">
                            <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>
                            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">{analysis}</p>
                            {fixedCode && (
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                    <div className="h-[120px] border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                                        <pre className="h-full overflow-auto bg-black text-green-400 p-3 text-sm font-mono whitespace-pre-wrap">
                                            {fixedCode}
                                        </pre>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <Button onClick={handleReplaceFixed} variant="secondary">
                                            Use Fixed Code
                                        </Button>
                                        <Button onClick={() => handleCopy(fixedCode)} variant="outline">
                                            Copy Fixed Code
                                        </Button>
                                    </div>
                                </div>
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


