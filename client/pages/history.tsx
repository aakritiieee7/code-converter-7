import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Button from '../components/ui/button';
import { getHistory, HistoryItem, setItemToRerun } from '../lib/historyService';
import { useTheme } from '../lib/themeContext';

const CodeEditor = dynamic(() => import('../components/CodeEditor'), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-brand-dark/50 rounded-lg flex items-center justify-center"><p>Loading Editor...</p></div>
});

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setItems(getHistory());
    setLoading(false);
  }, []);

  const handleRerun = (item: HistoryItem) => {
    setItemToRerun(item);
    router.push('/');
  };

  const selectedItem = items.find(item => item.id === selectedItemId);

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-brand-dark text-white' : 'bg-gray-50 text-black'}`}>
      <Head>
        <title>Conversion History - DevTranslate</title>
        <meta name="description" content="Review your past code conversions." />
      </Head>

      <header className="sticky top-0 z-50 bg-brand-dark/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-baby-pink to-hot-pink bg-clip-text text-transparent">
            Conversion History
          </h1>
          <div className="flex items-center space-x-2">
            <Link href="/" passHref>
              <a><Button variant="secondary" size="sm">Converter</Button></a>
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

      <main className="max-w-7xl mx-auto p-6 w-full">
        {loading ? (
          <p>Loading history...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-brand-dark/50 rounded-lg">
            <p className="text-gray-400">No history found.</p>
            <Link href="/" passHref>
              <a><Button className="mt-4">Start Converting</Button></a>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setSelectedItemId(item.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${selectedItemId === item.id ? 'bg-deep-purple/80' : 'bg-brand-dark/50 hover:bg-brand-dark'}`}
                    >
                      <div className="font-semibold">{item.sourceLang} to {item.targetLang}</div>
                      <div className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              {selectedItem ? (
                <div className="bg-brand-dark/50 p-4 rounded-lg space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Input Code ({selectedItem.sourceLang})</h3>
                    <CodeEditor language={selectedItem.sourceLang} value={selectedItem.inputCode} readOnly />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Output Code ({selectedItem.targetLang})</h3>
                    <CodeEditor language={selectedItem.targetLang} value={selectedItem.outputCode} readOnly />
                  </div>
                  {selectedItem.analysis && (
                    <div>
                      <h3 className="font-semibold mb-2">AI Analysis</h3>
                      <div className="text-sm whitespace-pre-wrap p-3 bg-black/30 rounded-lg">{selectedItem.analysis}</div>
                    </div>
                  )}
                  <Button onClick={() => handleRerun(selectedItem)}>Rerun this Conversion</Button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-brand-dark/50 rounded-lg">
                  <p className="text-gray-400">Select an item to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}