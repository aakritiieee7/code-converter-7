import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import CodeEditor from '../components/CodeEditor';
import Select from '../components/ui/select';
import { Button } from '../components/ui/button';

const languages = ['Python', 'Java', 'JavaScript', 'C#'];

export default function Home() {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [sourceLang, setSourceLang] = useState('Python');
    const [targetLang, setTargetLang] = useState('Java');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
    const apiBase = 'http://localhost:5001';


    async function handleConvert() {
        setLoading(true);
        setError('');
        try {
            console.log("Sending to API:", { sourceLang, targetLang, inputCode });
            const response = await axios.post(`${apiBase}/api/convert`, {
                sourceLang,
                targetLang,
                inputCode,
            });
            setOutputCode(response.data.outputCode || '');
        } catch (e) {
            setError((e as any)?.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }
    async function handleGetAiFix() {
      setLoading(true);
      setError('');
      try {
          console.log("Sending to API:", { sourceLang, targetLang, inputCode });
          const response = await axios.post(`${apiBase}/api/convert`, {
              sourceLang,
              targetLang,
              inputCode,
          });
          setOutputCode(response.data.outputCode || '');
      } catch (e) {
          setError((e as any)?.response?.data?.message || 'An error occurred');
      } finally {
          setLoading(false);
      }
  }

    const handleReplaceCode = () => {
        setInputCode(outputCode);
    }

    return (
        <>
            <Head>
                <title>Code Converter AI</title>
                <meta name="description" content="Convert code from one language to another" />
            </Head>
            <main className="container py-10">
                <h1 className="text-2xl font-bold mb-6">Code Converter</h1>


                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Source Code</label>
                                <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                                    {languages.map((lang) => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </Select>
                                  <label className="block text-sm font-medium text-gray-700">Target Language</label>
                                <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                                    {languages.map((lang) => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </Select>
                                <CodeEditor value={inputCode} onChange={setInputCode} language={sourceLang} height="300px" />
                            </div>

                           <div>
                                <label className="block text-sm font-medium text-gray-700">AI Suggested Code</label>
                                <CodeEditor value={outputCode} onChange={() => { }} language={sourceLang} height="300px" readOnly />
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button onClick={handleGetAiFix} disabled={loading}>{
                                loading ? 'Contacting AI ...' : 'Get AI Fix'
                            }</Button>
                            {outputCode !== inputCode && outputCode !== '' &&
                                <Button onClick={handleReplaceCode}>Use AI Fix</Button>
                            }

                            <Button onClick={handleConvert} disabled={loading} >{
                                loading ? 'Contacting AI ...' : 'Convert'
                            }</Button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>


            </main>
        </>
    );
}