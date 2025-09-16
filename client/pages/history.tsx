import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'; 
import Button from '../components/ui/button';
import { getHistory, HistoryItem, setItemToRerun } from '../lib/historyService';

const CodeEditor = dynamic(() => import('../components/CodeEditor'), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-brand-dark/50 rounded-lg flex items-center justify-center"><p>Loading Editor...</p></div>
});

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setItems(getHistory());
    setLoading(false);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
  };

  const handleRerun = (item: HistoryItem) => {
    setItemToRerun(item);
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-brand-dark text-white">
      <Head>
        <title>History - DevTranslate</title>
      </Head>

      <header className="sticky top-0 z-50 bg-brand-dark/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-baby-pink to-hot-pink bg-clip-text text-transparent">
            Conversion History
          </h1>
          <div className="flex items-center space-x-2">
            <Link href="/" passHref>
              <Button as="a" variant="secondary" size="sm">
                Converter
              </Button>
            </Link>
            <Link href="/landing" passHref>
              <Button as="a" variant="secondary" size="sm">
                About
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <p>Loading history...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-brand-dark/50 rounded-lg">
            <p className="text-gray-400">No history found.</p>
            <Link href="/" passHref>
              <Button as="a" className="mt-4">Start Converting</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white/5 rounded-lg border border-white/10">
                <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</span>
                    <span className="text-sm font-semibold">{item.sourceLang} → {item.targetLang}</span>
                    {item.type === 'fix' && <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">Fix</span>}
                  </div>
                  <Button variant="ghost" size="sm">{selectedItemId === item.id ? 'Hide' : 'View'}</Button>
                </div>

                {selectedItemId === item.id && (
                  <div className="p-4 border-t border-white/10">
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Input</h4>
                        <CodeEditor value={item.inputCode} onChange={() => {}} language={item.sourceLang} height="250px" readOnly />
                        <Button onClick={() => handleCopy(item.inputCode)} variant="outline" size="sm" className="mt-2 w-full">Copy Input</Button>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{item.type === 'fix' ? 'Fixed Code' : 'Output'}</h4>
                        <CodeEditor value={item.outputCode} onChange={() => {}} language={item.targetLang || item.sourceLang} height="250px" readOnly />
                        <Button onClick={() => handleCopy(item.outputCode)} variant="outline" size="sm" className="mt-2 w-full">Copy Output</Button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Analysis</h4>
                      <p className="text-sm text-gray-300 bg-black/20 p-3 rounded">{item.analysis}</p>
                    </div>
                    <Button onClick={() => handleRerun(item)} size="sm">Re-run this Conversion</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}