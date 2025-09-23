import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  language: 'en' | 'hi';
  onLanguageChange: (language: 'en' | 'hi') => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'badge' | 'toggle';
}

export default function LanguageSwitcher({ 
  language, 
  onLanguageChange, 
  size = 'sm',
  variant = 'toggle'
}: LanguageSwitcherProps) {
  const languageLabels = {
    en: { label: 'English', short: 'EN' },
    hi: { label: 'हिंदी', short: 'हिं' }
  };

  if (variant === 'button') {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
        className="flex items-center space-x-2"
      >
        <Languages className="w-4 h-4" />
        <span>{languageLabels[language].short}</span>
      </Button>
    );
  }

  if (variant === 'badge') {
    return (
      <Badge
        className="cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
      >
        <Languages className="w-3 h-3 mr-1" />
        {languageLabels[language].short}
      </Badge>
    );
  }

  // Toggle variant (default)
  return (
    <motion.div
      className="flex items-center bg-gray-100 rounded-full p-1"
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('hi')}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
          language === 'hi'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        हिं
      </button>
    </motion.div>
  );
}