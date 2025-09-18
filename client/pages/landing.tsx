import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '../lib/themeContext';
import Button from '../components/ui/button';

export default function Landing() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Head>
        <title>DevTranslate - AI Code Converter</title>
        <meta name="description" content="Transform code between languages with AI-powered precision" />
      </Head>
      
      <div className="min-h-screen bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-gradient-to-r from-deep-purple to-hot-pink rounded-full opacity-30 filter blur-3xl animate-blob-float" />
          <div className="absolute bottom-[15%] right-[15%] w-80 h-80 bg-gradient-to-r from-baby-pink to-hot-pink rounded-full opacity-20 filter blur-3xl animate-blob-float animation-delay-4000" />
          <div className="absolute top-[50%] left-[5%] w-64 h-64 bg-gradient-to-r from-hot-pink to-deep-purple rounded-full opacity-15 filter blur-3xl animate-blob-float animation-delay-2000" />
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
              <Link href="/" legacyBehavior>
                <a><Button variant="secondary" size="sm">Converter</Button></a>
              </Link>
            </div>
          </div>
        </header>

        <main className="relative z-10 pt-24">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-baby-pink via-hot-pink to-deep-purple bg-clip-text text-transparent">
                  Transform Code
                </span>
                <br />
                <span className="text-white">With AI Power</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Convert code between languages instantly. Fix bugs automatically. Get intelligent explanations. All powered by advanced AI.
              </p>
              <Link href="/" legacyBehavior>
                <a>
                  <Button size="lg" className="text-lg px-8 py-4">
                    Start Converting Now →
                  </Button>
                </a>
              </Link>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-baby-pink to-hot-pink bg-clip-text text-transparent">
                Why DevTranslate?
              </h2>
              <p className="text-lg text-gray-400 mt-4">
                From simple conversions to complex bug fixes, we've got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold mb-3">Multi-Language Support</h3>
                <p className="text-gray-300">
                  Convert between Python, Java, JavaScript, C#, and more programming languages with perfect syntax preservation.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-4">🐛</div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Bug Fixes</h3>
                <p className="text-gray-300">
                  Automatically detect and fix syntax errors, logical issues, and code problems before conversion.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-3">Code Explanation</h3>
                <p className="text-gray-300">
                  Get detailed analysis and explanations of your code conversions and the changes made.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-300">
                  Convert your code in seconds with our optimized AI processing and modern web architecture.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-3">Clean & Modern UI</h3>
                <p className="text-gray-300">
                  Beautiful, intuitive interface with dark mode support and responsive design for all devices.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-xl font-semibold mb-3">Conversion History</h3>
                <p className="text-gray-300">
                  Keep track of all your conversions with full history, rerun capability, and easy access to past work.
                </p>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="bg-gradient-to-r from-baby-pink to-hot-pink bg-clip-text text-transparent">
                  Ready to Transform Your Code?
                </span>
              </h2>
              <Link href="/" legacyBehavior>
                <a>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                    Get Started
                  </Button>
                </a>
              </Link>
            </div>
          </div>
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
