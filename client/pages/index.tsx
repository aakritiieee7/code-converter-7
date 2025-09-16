import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic'; 
import { LANGUAGES, Language } from '../lib/languages';
import { saveHistory, setItemToRerun } from '../lib/historyService';
import Button from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const CodeEditor = dynamic(() => import('../components/CodeEditor'), {
  ssr: false,
  loading: () => <div className="h-[300px] md:h-[400px] bg-brand-dark/50 rounded-lg flex items-center justify-center"><p>Loading Editor...</p></div>
});

import AnalysisPanel from '../components/AnalysisPanel';

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
                                <Button as="a" variant="secondary" size="sm">
                                    History
                                </Button>
                            </Link>
                            <Link href="/landing" passHref>
                                <Button as="a" variant="secondary" size="sm">
                                    About
                                </Button>
                            </Link>
                            <Button onClick={toggleTheme} variant="ghost" size="icon">
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-lg font-medium">Source Code</label>
                                <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                                    {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                                </Select>
                            </div>
                            <div className="flex-grow">
                                <CodeEditor
                                    language={sourceLang}
                                    value={inputCode}
                                    onChange={setInputCode}
                                    readOnly={loading}
                                />
                            </div>
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

                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Output Code ({targetLang})</h3>
                            <Button onClick={() => handleCopy(outputCode)} variant="ghost" size="sm">Copy</Button>
                        </div>
                        <div className="flex-grow">
                            <CodeEditor
                                language={targetLang}
                                value={outputCode}
                                onChange={(value: string | undefined) => {}}
                                readOnly
                            />
                        </div>
                        {analysis && (
                            <AnalysisPanel
                                analysis={analysis.split('\n')}
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
                                    onChange={(value: string | undefined) => {}}
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

                    {error && (
                        <p className="text-center text-red-500 dark:text-hot-pink mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                            {error}
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
}


