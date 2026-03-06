import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
  isLoading: boolean;
}

export function UploadZone({ onImageSelected, isLoading }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      // Strip the prefix for Gemini API
      const base64Data = base64.split(',')[1];
      onImageSelected(base64Data);
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clear = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={cn(
              "relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center gap-4",
              isDragging 
                ? "border-sage-500 bg-sage-100 dark:bg-sage-900/50" 
                : "border-sage-300 dark:border-sage-700 hover:border-sage-400 dark:hover:border-sage-500 bg-white dark:bg-sage-900/20 shadow-sm hover:shadow-md"
            )}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onFileChange}
              disabled={isLoading}
            />
            <div className="w-16 h-16 rounded-full bg-sage-50 dark:bg-sage-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-8 h-8 text-sage-600 dark:text-sage-400" />
            </div>
            <div className="text-center">
              <p className="text-xl font-medium text-sage-800 dark:text-sage-200 transition-colors duration-300">Drop your plant photo here</p>
              <p className="text-sage-500 dark:text-sage-400 mt-1 transition-colors duration-300">or click to browse your files</p>
            </div>
            <div className="mt-4 flex gap-2 text-xs text-sage-400 dark:text-sage-500 uppercase tracking-widest font-semibold transition-colors duration-300">
              <span>JPG</span>
              <span>•</span>
              <span>PNG</span>
              <span>•</span>
              <span>WEBP</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden bg-white dark:bg-sage-950 shadow-xl border border-sage-200 dark:border-sage-800 transition-colors duration-300"
          >
            <img 
              src={preview} 
              alt="Preview" 
              className={cn(
                "w-full h-80 object-cover",
                isLoading && "opacity-50 grayscale transition-all duration-1000"
              )}
            />
            {!isLoading && (
              <button
                onClick={clear}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-sage-900/20 backdrop-blur-[2px]">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-white font-medium tracking-wide drop-shadow-md">Identifying Species...</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
