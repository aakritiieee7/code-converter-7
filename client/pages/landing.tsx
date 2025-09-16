import Head from 'next/head';
import { useTheme } from '../lib/themeContext';
import Button from '../components/ui/button';
import Link from 'next/link';

const FeatureCard = ({ icon, title, description }: { icon: string; title:string; description: string }) => (
  <div className="bg-white/10 dark:bg-brand-dark/50 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-lg hover:scale-105 hover:-rotate-1 transition-transform duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Head>
        <title>Code Convertor</title>
        <meta name="description" content="Instantly convert, fix, and understand code across different programming languages." />
      </Head>

      <div className={`min-h-screen w-full relative overflow-hidden font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-brand-dark text-white' : 'bg-gray-100 text-black'}`}>
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-[-10%] left-[5%] w-96 h-96 bg-gradient-to-r from-deep-purple to-hot-pink rounded-full opacity-30 filter blur-3xl animate-blob-float" />
          <div className="absolute bottom-[5%] right-[-5%] w-80 h-80 bg-gradient-to-r from-baby-pink to-hot-pink rounded-full opacity-20 filter blur-3xl animate-blob-float animation-delay-4000" />
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/50 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <div className="flex items-center space-x-3 font-bold text-2xl">
              <span className="text-3xl">💻</span>
              <span className="bg-gradient-to-r from-baby-pink to-hot-pink bg-clip-text text-transparent">
                DevTranslate
              </span> 
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/" passHref>
                <a><Button variant="secondary" size="sm">Converter</Button></a>
              </Link>
              <Button onClick={toggleTheme} variant="ghost" size="icon">
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>
            </div>
          </div>
        </header>

        <main className="pt-24 relative z-10">
          <section className="py-20 md:py-32 px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-baby-pink to-hot-pink bg-clip-text text-transparent">
                Translate Code Instantly
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Use the power of AI to convert, fix, and understand code across different programming languages.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/" passHref>
                    <a><Button size="lg">Start Converting →</Button></a>
                </Link>
              </div>
            </div>
          </section>

          <section id="features" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-baby-pink to-hot-pink bg-clip-text text-transparent">Why DevTranslate?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard icon="🔄" title="Multi-Language Support" description="Convert between Python, JavaScript, Java, C#, and more." />
                <FeatureCard icon="💡" title="AI-Powered Analysis" description="Get detailed explanations of your converted code to learn faster." />
                <FeatureCard icon="🛠️" title="Automatic Bug Fixing" description="Let the AI detect and fix common errors in your code snippets." />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
