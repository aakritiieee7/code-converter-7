// import { useState } from 'react';
// import Head from 'next/head';
// import axios from 'axios';
// import CodeEditor from '../components/CodeEditor';
// import { Select } from '../components/ui/select';
// import { Button } from '../components/ui/button';

// const languages = ['Python', 'Java', 'JavaScript', 'C#'];

// export default function Home() {
//     const [inputCode, setInputCode] = useState('');
//     const [outputCode, setOutputCode] = useState('');
//     const [sourceLang, setSourceLang] = useState('Python');
//     const [targetLang, setTargetLang] = useState('Java');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const [analysis, setAnalysis] = useState('');
//     const [fixedCode, setFixedCode] = useState('');

//     const apiBase = 'http://localhost:5001';

//     async function handleConvert() {
//         setLoading(true);
//         setError('');
//         setAnalysis('');
//         setFixedCode('');
//         setOutputCode('');

//         try {
//             const response = await axios.post(`${apiBase}/api/convert/convert`, {
//                 sourceLang,
//                 targetLang,
//                 inputCode,
//             });

//             // ✅ Use result wrapper from backend
//             const data = response.data.result;
//             console.log("Frontend received:", data);

//             if (data.fixedCode) {
//                 // Step 1: Issues found → show AI Analysis + fixedCode
//                 setAnalysis(data.analysis || 'Issues found and fixed.');
//                 setFixedCode(data.fixedCode);
//             } else if (data.convertedCode) {
//                 // Step 2: No issues → show AI Analysis + convertedCode
//                 setAnalysis(data.analysis || 'No issues found.');
//                 setOutputCode(data.convertedCode);
//             }

//         } catch (e) {
//             setError((e as any)?.response?.data?.message || 'An error occurred');
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleReplaceFixed = () => {
//         setInputCode(fixedCode);
//         setFixedCode('');
//         setAnalysis('Fixed code applied. Now press Convert to get target code.');
//     };

//     const handleReplaceConverted = () => {
//         setInputCode(outputCode);
//         setOutputCode('');
//     };

//     return (
//         <>
//             <Head>
//                 <title>Code Converter AI</title>
//                 <meta name="description" content="Convert code from one language to another" />
//             </Head>
//             <main className="container py-10">
//                 <h1 className="text-2xl font-bold mb-6">Code Converter</h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Source Code */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Source Code</label>
//                         <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
//                             {languages.map((lang) => (
//                                 <option key={lang} value={lang}>{lang}</option>
//                             ))}
//                         </Select>
//                         <CodeEditor value={inputCode} onChange={setInputCode} language={sourceLang} height="300px" />
//                     </div>

//                     {/* Target Code */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">AI Suggested Code</label>
//                         <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
//                         {languages.map((lang) => (
//                             <option key={lang} value={lang}>{lang}</option>
//                         ))}
//                         </Select>

//                         <CodeEditor
//                             value={outputCode}
//                             onChange={() => { }}
//                             language={targetLang}
//                             height="300px"
//                             readOnly
//                         />
//                     </div>
//                 </div>

//                 {/* AI Analysis Section */}
//                 {analysis && (
//                     <div className="mt-6">
//                         <h2 className="text-lg font-semibold mb-2">AI Analysis</h2>
//                         <p className="text-sm text-gray-700 mb-2">{analysis}</p>

//                         {fixedCode && (
//                             <>
//                                 <CodeEditor
//                                     value={fixedCode}
//                                     onChange={() => { }}
//                                     language={sourceLang}
//                                     height="300px"
//                                     readOnly
//                                 />
//                                 <Button onClick={handleReplaceFixed} className="mt-2">Use Fixed Code</Button>
//                             </>
//                         )}
//                     </div>
//                 )}

//                 <div className="mt-4 flex items-center">
//                 <Button 
//                     onClick={handleConvert} 
//                     disabled={loading || (!!fixedCode && fixedCode !== '')} // Disable if fix is pending
//                     className="ml-2"
//                     >
//                     {loading ? 'Processing...' : 'Convert'}
//                     </Button>


//                     {outputCode !== '' && outputCode !== inputCode &&
//                         <Button onClick={handleReplaceConverted} className="ml-2">Use AI Fix</Button>
//                     }

//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div>
//             </main>
//         </>
//     );
// }
import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import CodeEditor from '../components/CodeEditor';
import { Select } from '../components/ui/select';
import { Button } from '../components/ui/button';

const languages = ['Python', 'Java', 'JavaScript', 'C#'];

export default function Home() {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [sourceLang, setSourceLang] = useState('Python');
    const [targetLang, setTargetLang] = useState('Java');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [analysis, setAnalysis] = useState('');
    const [fixedCode, setFixedCode] = useState('');

    const apiBase = 'http://localhost:5001';

    async function handleConvert() {
        setLoading(true);
        setError('');
        setAnalysis('');
        setFixedCode('');
        setOutputCode('');

        try {
            const response = await axios.post(`${apiBase}/api/convert/convert`, {
                sourceLang,
                targetLang,
                inputCode,
            });

            const data = response.data.result;
            console.log("Frontend received:", data);

            if (data.fixedCode) {
                setAnalysis(data.analysis || 'Issues found and fixed.');
                setFixedCode(data.fixedCode);
            } else if (data.convertedCode) {
                setAnalysis(data.analysis || 'No issues found.');
                setOutputCode(data.convertedCode);
            }
        } catch (e) {
            setError((e as any)?.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }

    const handleReplaceFixed = () => {
        setInputCode(fixedCode);
        setFixedCode('');
        setAnalysis('Fixed code applied. Now press Convert to get target code.');
    };

    const handleClearAll = () => {
        setInputCode('');
        setOutputCode('');
        setFixedCode('');
        setAnalysis('');
        setError('');
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <>
            <Head>
                <title>Code Converter AI</title>
                <meta name="description" content="Convert code from one language to another" />
            </Head>
            <main className="container py-10">
                <h1 className="text-2xl font-bold mb-6">Code Converter</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Source Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Source Code</label>
                        <div className="flex gap-2 mb-1">
                            <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                                {languages.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </Select>
                            <Button onClick={() => handleCopy(inputCode)}>Copy</Button>
                        </div>
                        <CodeEditor value={inputCode} onChange={setInputCode} language={sourceLang} height="300px" />
                    </div>

                    {/* Target Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">AI Suggested Code</label>
                        <div className="flex gap-2 mb-1">
                            <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                                {languages.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </Select>
                            <Button onClick={() => handleCopy(outputCode)}>Copy</Button>
                        </div>
                        <CodeEditor
                            value={outputCode}
                            onChange={() => {}}
                            language={targetLang}
                            height="300px"
                            readOnly
                        />
                    </div>
                </div>

                {/* AI Analysis Section */}
                {analysis && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">AI Analysis</h2>
                        <div className="flex gap-2 mb-1">
                            <p className="text-sm text-gray-700">{analysis}</p>
                            <Button onClick={() => handleCopy(analysis)}>Copy</Button>
                        </div>

                        {fixedCode && (
                            <>
                                <CodeEditor
                                    value={fixedCode}
                                    onChange={() => {}}
                                    language={sourceLang}
                                    height="300px"
                                    readOnly
                                />
                                <Button onClick={handleReplaceFixed} className="mt-2">Use Fixed Code</Button>
                                <Button onClick={() => handleCopy(fixedCode)} className="mt-2 ml-2">Copy Fixed Code</Button>
                            </>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 flex items-center gap-2">
                    <Button 
                        onClick={handleConvert} 
                        disabled={loading || (!!fixedCode && fixedCode !== '')} 
                    >
                        {loading ? 'Processing...' : 'Convert'}
                    </Button>

                    <Button onClick={handleClearAll} className="ml-2">Clear</Button>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </main>
        </>
    );
}
