/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Search, Info, Github, Moon, Sun } from 'lucide-react';
import { UploadZone } from './components/UploadZone';
import { PlantCard } from './components/PlantCard';
import { identifyPlant, type PlantInfo } from './services/gemini';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleImageSelected = async (base64: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const info = await identifyPlant(base64);
      setPlantInfo(info);
    } catch (err) {
      console.error(err);
      setError("Failed to identify plant. Please try a clearer photo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-sage-200 dark:border-sage-800 bg-white/80 dark:bg-sage-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sage-600 dark:bg-sage-500 rounded-xl flex items-center justify-center text-white transition-colors duration-300">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight text-sage-900 dark:text-sage-50 transition-colors duration-300">FloraID</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-sage-600 dark:text-sage-400">
            <a href="#" className="hover:text-sage-900 dark:hover:text-sage-100 transition-colors">Identify</a>
            <a href="#" className="hover:text-sage-900 dark:hover:text-sage-100 transition-colors">Encyclopedia</a>
            <a href="#" className="hover:text-sage-900 dark:hover:text-sage-100 transition-colors">Care Guides</a>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 hover:bg-sage-50 dark:hover:bg-sage-900 rounded-full transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-sage-400 dark:text-sage-300" /> : <Moon className="w-5 h-5 text-sage-600 dark:text-sage-400" />}
            </button>
            <button className="p-2 hover:bg-sage-50 dark:hover:bg-sage-900 rounded-full transition-colors hidden md:block">
              <Search className="w-5 h-5 text-sage-600 dark:text-sage-400" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-serif text-sage-950 dark:text-sage-50 mb-6 tracking-tight transition-colors duration-300"
            >
              Nature, <span className="italic text-sage-600 dark:text-sage-400">Identified.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-sage-600 dark:text-sage-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300"
            >
              Snap a photo of any plant to discover its species, 
              origin, and expert care instructions in seconds.
            </motion.p>
          </div>

          {/* Interaction Zone */}
          <UploadZone onImageSelected={handleImageSelected} isLoading={isLoading} />

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-4 bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-2xl text-center max-w-md mx-auto flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <Info className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {plantInfo && !isLoading && (
            <PlantCard info={plantInfo} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-sage-950 border-t border-sage-200 dark:border-sage-800 py-12 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-sage-400 dark:text-sage-500" />
            <span className="text-sage-400 dark:text-sage-500 font-serif font-bold">FloraID</span>
          </div>
          
          <p className="text-sage-400 dark:text-sage-500 text-sm">
            © 2024 FloraID AI.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-sage-400 dark:text-sage-500 hover:text-sage-600 dark:hover:text-sage-300 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

