import React from 'react';
import { motion } from 'motion/react';
import { UserRole } from './types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { GraduationCap, Users, Globe } from 'lucide-react';

interface LandingScreenProps {
  onRoleSelect: (role: UserRole) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const translations = {
  en: {
    title: "Eklavya",
    subtitle: "Learn Science, Technology, Engineering & Math through Games",
    studentRole: "I'm a Student",
    teacherRole: "I'm a Teacher",
    studentDesc: "Play games, earn badges, and master Eklavya concepts",
    teacherDesc: "Track progress and assign interactive lessons"
  },
  hi: {
    title: "एकलव्य",
    subtitle: "खेल के माध्यम से विज्ञान, तकनीक, इंजीनियरिंग और गणित सीखें",
    studentRole: "मैं छात्र हूँ",
    teacherRole: "मैं शिक्षक हूँ",
    studentDesc: "खेल खेलें, बैज अर्जित करें, और Eklavya अवधारणाओं में महारत हासिल करें",
    teacherDesc: "प्रगति ट्रैक करें और इंटरैक्टिव पाठ असाइन करें"
  }
};

export default function LandingScreen({ onRoleSelect, language, setLanguage }: LandingScreenProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Language Switcher */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4"
      >
        <div className="flex gap-2">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
            className="rounded-full"
          >
            <Globe className="w-4 h-4 mr-1" />
            EN
          </Button>
          <Button
            variant={language === 'hi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('hi')}
            className="rounded-full"
          >
            <Globe className="w-4 h-4 mr-1" />
            हिं
          </Button>
        </div>
      </motion.div>

      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🧬
            </motion.div>
          </div>
          <div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
        </motion.div>

        {/* Role Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
            onClick={() => onRoleSelect('student')}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg">{t.studentRole}</h3>
                <p className="text-sm text-gray-600">{t.studentDesc}</p>
              </div>
            </motion.div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
            onClick={() => onRoleSelect('teacher')}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg">{t.teacherRole}</h3>
                <p className="text-sm text-gray-600">{t.teacherDesc}</p>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}