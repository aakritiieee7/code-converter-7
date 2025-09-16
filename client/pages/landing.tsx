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

      <div className="min-h-screen w-full bg-brand-dark text-white relative overflow-hidden">
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
              <Link href="/" asChild>
                <Button variant="secondary" size="sm">Converter</Button>
              </Link>
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
                <Link href="/" asChild>
                    <Button size="lg">Start Converting →</Button>
                </Link>
              </div>
            </div>
          </section>

          <section id="features" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold">Everything You Need to Ship Faster</h2>
                <p className="text-lg text-gray-400 mt-4">
                  From simple conversions to complex bug fixes, we've got you covered.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard icon="🌐" title="Multi-Language Support" description="Convert between Python, Java, JavaScript, and C#." />
                <FeatureCard icon="🐛" title="AI-Powered Bug Fixes" description="Automatically detect and correct errors in your source code." />
                <FeatureCard icon="💡" title="Code Explanation" description="Get a clear, line-by-line analysis of the converted code." />
                <FeatureCard icon="⚡" title="Lightning Fast" description="Get accurate conversions in seconds, not minutes." />
                <FeatureCard icon="🛡️" title="Clean & Modern UI" description="A beautiful, intuitive interface designed for developers." />
                <FeatureCard icon="💾" title="Conversion History" description="Save and revisit your previous code conversions anytime." />
              </div>
            </div>
          </section>
        </main>

        <footer className="py-12 px-6 border-t border-white/10 relative z-10">
          <div className="max-w-7xl mx-auto text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} DevTranslate. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
