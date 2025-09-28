import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronRight, Trophy, Zap, Target } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  language: 'en' | 'hi';
}

const slides = {
  en: [
    {
      icon: '🎮',
      title: 'Learn Through Gaming',
      description: 'Turn complex Eklavya concepts into fun, interactive games and simulations.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🏆',
      title: 'Earn Rewards',
      description: 'Collect points, unlock badges, and climb the leaderboard as you master new skills.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🧪',
      title: 'Interactive Simulations',
      description: 'Experiment with physics, chemistry, and technology in safe virtual environments.',
      color: 'from-green-500 to-emerald-500'
    }
  ],
  hi: [
    {
      icon: '🎮',
      title: 'गेमिंग के माध्यम से सीखें',
      description: 'जटिल Eklavya अवधारणाओं को मजेदार, इंटरैक्टिव गेम और सिमुलेशन में बदलें।',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🏆',
      title: 'पुरस्कार अर्जित करें',
      description: 'अंक एकत्र करें, बैज अनलॉक करें, और नए कौशल में महारत हासिल करते हुए लीडरबोर्ड पर चढ़ें।',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🧪',
      title: 'इंटरैक्टिव सिमुलेशन',
      description: 'सुरक्षित वर्चुअल वातावरण में भौतिकी, रसायन विज्ञान और प्रौद्योगिकी के साथ प्रयोग करें।',
      color: 'from-green-500 to-emerald-500'
    }
  ]
};

export default function OnboardingFlow({ onComplete, language }: OnboardingFlowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlides = slides[language];

  const nextSlide = () => {
    if (currentSlide < currentSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md">
        {/* Progress Indicators */}
        <div className="flex justify-center mb-8 space-x-2">
          {currentSlides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 text-center space-y-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${currentSlides[currentSlide].color} flex items-center justify-center text-4xl`}
              >
                {currentSlides[currentSlide].icon}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {currentSlides[currentSlide].title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {currentSlides[currentSlide].description}
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <Button
            onClick={nextSlide}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-full"
            size="lg"
          >
            {currentSlide < currentSlides.length - 1 ? (
              <>
                {language === 'en' ? 'Next' : 'आगे'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              language === 'en' ? "Let's Start!" : 'चलिए शुरू करते हैं!'
            )}
          </Button>
        </motion.div>

        {/* Skip Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <Button
            variant="ghost"
            onClick={onComplete}
            className="text-gray-500 hover:text-gray-700"
          >
            {language === 'en' ? 'Skip' : 'छोड़ें'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}