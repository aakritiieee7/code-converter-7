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
            setAnalysis('');
        }
    }, []);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

    const handleConvert = async () => {
        console.log('Convert button clicked!'); // Debug log
        
        if (!inputCode.trim()) {
            setError('Please enter some code to convert');
            return;
        }
        
        setLoading(true);
        setError('');
        setOutputCode('');
        setAnalysis('');
        
        try {
            console.log('Making API call to:', `${apiBase}/api/convert`);
            const response = await axios.post(`${apiBase}/api/convert`, {
                inputCode,
                sourceLang,
                targetLang
            });
            
            console.log('API Response:', response.data);
            
            if (response.data.convertedCode) {
                setOutputCode(response.data.convertedCode);
                setAnalysis(response.data.analysis || 'Conversion completed successfully.');
                
                addToHistory({
                    sourceLang,
                    targetLang,
                    inputCode,
                    outputCode: response.data.convertedCode,
                    analysis: response.data.analysis || 'Conversion completed successfully.',
                    type: 'convert'
                });
            } else if (response.data.fixedCode) {
                setOutputCode(response.data.fixedCode);
                setAnalysis(response.data.analysis || 'Code was fixed.');
                
                addToHistory({
                    sourceLang,
                    targetLang,
                    inputCode,
                    outputCode: response.data.fixedCode,
                    analysis: response.data.analysis || 'Code was fixed.',
                    type: 'fix'
                });
            } else {
                setError('No converted code received from server.');
            }
        } catch (err) {
            console.error('Conversion error:', err);
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

    const handleClearAll = () => {
        console.log('Clear All button clicked!'); // Debug log
        setInputCode('');
        setOutputCode('');
        setAnalysis('');
        setError('');
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
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

                <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    onChange={setOutputCode}
                                    readOnly 
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="text-center text-red-500 dark:text-hot-pink mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    {analysis && (
                        <div className="mt-6 p-4 bg-brand-dark/50 rounded-lg">
                            <h3 className="font-semibold mb-2">Analysis</h3>
                            <p className="text-sm whitespace-pre-wrap">{analysis}</p>
                            <Button onClick={() => handleCopy(analysis)} variant="outline" size="sm" className="mt-2">
                                Copy Analysis
                            </Button>
                        </div>
                    )}

                    <div className="mt-8 flex justify-center gap-6 relative z-20">
                        <button
                            onClick={handleConvert}
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-deep-purple to-hot-pink text-white font-medium rounded-lg hover:shadow-lg hover:shadow-hot-pink/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Converting...' : 'Convert Code'}
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="px-8 py-3 bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-transparent font-medium rounded-lg transition-all duration-300"
                        >
                            Clear All
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}


