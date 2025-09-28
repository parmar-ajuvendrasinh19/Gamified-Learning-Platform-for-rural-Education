import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge as BadgeComponent } from './ui/badge';
import BottomNavigation from './BottomNavigation';
import { User, Badge } from './types';
import { ChevronLeft, Award, Lock, Star, Zap, Target, Trophy, Book, Lightbulb, Rocket } from 'lucide-react';

interface BadgeCollectionProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
}

const allBadges: Badge[] = [
  {
    id: 'first-quiz',
    name: 'First Quiz',
    description: 'Complete your first quiz',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
    unlocked: true
  },
  {
    id: 'science-star',
    name: 'Science Star',
    description: 'Master 5 science concepts',
    icon: '⭐',
    color: 'from-yellow-400 to-yellow-600',
    unlocked: true
  },
  {
    id: 'math-master',
    name: 'Math Master',
    description: 'Solve 10 math problems perfectly',
    icon: '🧮',
    color: 'from-purple-500 to-pink-500',
    unlocked: true
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a quiz in under 2 minutes',
    icon: '⚡',
    color: 'from-orange-500 to-red-500',
    unlocked: false
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: '💯',
    color: 'from-green-500 to-emerald-500',
    unlocked: false
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Study for 7 days straight',
    icon: '🔥',
    color: 'from-red-500 to-pink-500',
    unlocked: false
  },
  {
    id: 'physics-pro',
    name: 'Physics Pro',
    description: 'Complete all physics simulations',
    icon: '⚛️',
    color: 'from-indigo-500 to-purple-500',
    unlocked: false
  },
  {
    id: 'tech-wizard',
    name: 'Tech Wizard',
    description: 'Master technology lessons',
    icon: '🧙‍♂️',
    color: 'from-cyan-500 to-blue-500',
    unlocked: false
  },
  {
    id: 'helping-hand',
    name: 'Helping Hand',
    description: 'Help 5 classmates',
    icon: '🤝',
    color: 'from-teal-500 to-green-500',
    unlocked: false
  },
  {
    id: 'super-learner',
    name: 'Super Learner',
    description: 'Reach level 10',
    icon: '🚀',
    color: 'from-gradient-500 to-purple-600',
    unlocked: false
  },
  {
    id: 'quiz-champion',
    name: 'Quiz Champion',
    description: 'Win 20 quizzes',
    icon: '🏆',
    color: 'from-yellow-500 to-amber-600',
    unlocked: false
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Try all Eklavya simulations',
    icon: '🔍',
    color: 'from-emerald-500 to-teal-500',
    unlocked: false
  }
];

const translations = {
  en: {
    myBadges: 'My Badges',
    unlocked: 'Unlocked',
    locked: 'Locked',
    earned: 'Earned',
    notEarned: 'Not Earned Yet',
    progress: 'Progress',
    total: 'total badges',
    categories: 'Categories',
    all: 'All',
    learning: 'Learning',
    achievement: 'Achievement',
    social: 'Social',
    rare: 'Rare',
    recentlyEarned: 'Recently Earned',
    nextToEarn: 'Next to Earn',
    badgeDetails: 'Badge Details'
  },
  hi: {
    myBadges: 'मेरे बैज',
    unlocked: 'अनलॉक्ड',
    locked: 'लॉक्ड',
    earned: 'अर्जित',
    notEarned: 'अभी तक नहीं मिला',
    progress: 'प्रगति',
    total: 'कुल बैज',
    categories: 'श्रेणियां',
    all: 'सभी',
    learning: 'सीखना',
    achievement: 'उपलब्धि',
    social: 'सामाजिक',
    rare: 'दुर्लभ',
    recentlyEarned: 'हाल में अर्जित',
    nextToEarn: 'अगला अर्जित करने के लिए',
    badgeDetails: 'बैज विवरण'
  }
};

export default function BadgeCollection({ user, navigateToScreen, language }: BadgeCollectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const t = translations[language];

  if (!user) return null;

  // Set badges based on user's badge list
  const userBadges = allBadges.map(badge => ({
    ...badge,
    unlocked: user.badges.includes(badge.id)
  }));

  const unlockedBadges = userBadges.filter(badge => badge.unlocked);
  const lockedBadges = userBadges.filter(badge => !badge.unlocked);

  const categories = [
    { id: 'all', label: t.all, count: userBadges.length },
    { id: 'unlocked', label: t.unlocked, count: unlockedBadges.length },
    { id: 'locked', label: t.locked, count: lockedBadges.length }
  ];

  const getFilteredBadges = () => {
    switch (selectedCategory) {
      case 'unlocked': return unlockedBadges;
      case 'locked': return lockedBadges;
      default: return userBadges;
    }
  };

  const filteredBadges = getFilteredBadges();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-b-3xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen('student-dashboard')}
            className="p-2 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl">{t.myBadges}</h1>
          <Award className="w-6 h-6" />
        </div>

        {/* Progress Stats */}
        <Card className="bg-white/20 border-0 p-3">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-lg">{unlockedBadges.length}</p>
              <p className="text-sm opacity-80">{t.earned}</p>
            </div>
            <div className="text-center">
              <p className="text-lg">{userBadges.length}</p>
              <p className="text-sm opacity-80">{t.total}</p>
            </div>
            <div>
              <p className="text-lg">{Math.round((unlockedBadges.length / userBadges.length) * 100)}%</p>
              <p className="text-sm opacity-80">{t.progress}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap rounded-full"
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>

        {/* Recently Earned */}
        {unlockedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg mb-3">{t.recentlyEarned}</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {unlockedBadges.slice(0, 3).map((badge) => (
                <Card key={badge.id} className="min-w-[100px] p-3 text-center bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-3xl mb-2"
                  >
                    {badge.icon}
                  </motion.div>
                  <p className="text-xs text-gray-700">{badge.name}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next to Earn */}
        {lockedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg mb-3">{t.nextToEarn}</h3>
            <Card 
              className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedBadge(lockedBadges[0])}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center relative">
                  <span className="text-2xl filter grayscale">{lockedBadges[0].icon}</span>
                  <Lock className="absolute -top-1 -right-1 w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm text-gray-700">{lockedBadges[0].name}</h4>
                  <p className="text-xs text-gray-500">{lockedBadges[0].description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Badge Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg mb-3">{selectedCategory === 'all' ? t.all : categories.find(c => c.id === selectedCategory)?.label} {t.myBadges}</h3>
          <div className="grid grid-cols-3 gap-3">
            {filteredBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`p-3 text-center cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    badge.unlocked 
                      ? 'bg-gradient-to-br from-white to-gray-50' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  }`}
                  onClick={() => setSelectedBadge(badge)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <div className={`text-3xl mb-2 ${!badge.unlocked ? 'filter grayscale' : ''}`}>
                      {badge.icon}
                    </div>
                    {!badge.unlocked && (
                      <Lock className="absolute top-0 right-0 w-4 h-4 text-gray-500" />
                    )}
                  </motion.div>
                  <p className={`text-xs ${badge.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {badge.name}
                  </p>
                  {badge.unlocked && (
                    <BadgeComponent className="bg-green-100 text-green-800 text-xs mt-1">
                      ✓ {t.earned}
                    </BadgeComponent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className={`text-6xl ${!selectedBadge.unlocked ? 'filter grayscale' : ''}`}>
                  {selectedBadge.icon}
                </div>
                
                <div>
                  <h2 className="text-xl mb-2">{selectedBadge.name}</h2>
                  <p className="text-gray-600 text-sm">{selectedBadge.description}</p>
                </div>

                <BadgeComponent 
                  className={`${
                    selectedBadge.unlocked 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {selectedBadge.unlocked ? t.earned : t.notEarned}
                </BadgeComponent>

                <Button
                  onClick={() => setSelectedBadge(null)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNavigation 
        activeScreen="badges" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}