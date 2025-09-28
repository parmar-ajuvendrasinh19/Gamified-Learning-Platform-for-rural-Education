import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import BottomNavigation from './BottomNavigation';
import { User } from './types';
import { Play, Target, Trophy, Award, Zap, BookOpen } from 'lucide-react';

interface StudentDashboardProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
}

const translations = {
  en: {
    welcome: 'Welcome back',
    level: 'Level',
    points: 'Points',
    progress: 'Progress to next level',
    playLesson: 'Play Lesson',
    takeMission: 'Take Mission',
    viewLeaderboard: 'Leaderboard',
    myBadges: 'My Badges',
    recentActivity: 'Recent Activity',
    completedQuiz: 'Completed Physics Quiz',
    earnedBadge: 'Earned Science Star badge',
    quickActions: 'Quick Actions',
    continueLearning: 'Continue Learning',
    practiceMode: 'Practice Mode',
    simulations: 'Eklavya Simulations'
  },
  hi: {
    welcome: 'वापसी पर स्वागत',
    level: 'स्तर',
    points: 'अंक',
    progress: 'अगले स्तर की प्रगति',
    playLesson: 'पाठ खेलें',
    takeMission: 'मिशन लें',
    viewLeaderboard: 'लीडरबोर्ड',
    myBadges: 'मेरे बैज',
    recentActivity: 'हालिया गतिविधि',
    completedQuiz: 'भौतिकी प्रश्नोत्तरी पूरी की',
    earnedBadge: 'विज्ञान स्टार बैज अर्जित किया',
    quickActions: 'त्वरित कार्य',
    continueLearning: 'सीखना जारी रखें',
    practiceMode: 'अभ्यास मोड',
    simulations: 'Eklavya सिमुलेशन'
  }
};

export default function StudentDashboard({ user, navigateToScreen, language }: StudentDashboardProps) {
  const t = translations[language];
  
  if (!user) return null;

  const progressToNextLevel = ((user.points % 500) / 500) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-b-3xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl">{t.welcome},</h1>
            <h2 className="text-2xl">{user.name}</h2>
          </div>
          <div className="text-4xl">{user.avatar}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card className="bg-white/20 border-0 text-center p-3">
            <div className="text-lg">{user.level}</div>
            <div className="text-xs opacity-80">{t.level}</div>
          </Card>
          <Card className="bg-white/20 border-0 text-center p-3">
            <div className="text-lg">{user.points}</div>
            <div className="text-xs opacity-80">{t.points}</div>
          </Card>
          <Card className="bg-white/20 border-0 text-center p-3">
            <div className="text-lg">{user.badges.length}</div>
            <div className="text-xs opacity-80">Badges</div>
          </Card>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>{t.progress}</span>
            <span>{Math.round(progressToNextLevel)}%</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2 bg-white/20" />
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg mb-3">{t.quickActions}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
              onClick={() => navigateToScreen('lessons')}
            >
              <motion.div whileTap={{ scale: 0.95 }} className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm">{t.playLesson}</h4>
              </motion.div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
              onClick={() => navigateToScreen('simulations')}
            >
              <motion.div whileTap={{ scale: 0.95 }} className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm">{t.simulations}</h4>
              </motion.div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
              onClick={() => navigateToScreen('leaderboard')}
            >
              <motion.div whileTap={{ scale: 0.95 }} className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm">{t.viewLeaderboard}</h4>
              </motion.div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200"
              onClick={() => navigateToScreen('badges')}
            >
              <motion.div whileTap={{ scale: 0.95 }} className="text-center space-y-2">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm">{t.myBadges}</h4>
              </motion.div>
            </Card>
          </div>
        </motion.div>

        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg mb-3">{t.continueLearning}</h3>
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4>Physics: Wave Properties</h4>
                <p className="text-sm text-gray-600">75% Complete</p>
                <Progress value={75} className="h-2 mt-2" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg mb-3">{t.recentActivity}</h3>
          <div className="space-y-2">
            <Card className="p-3 bg-white/80">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{t.completedQuiz}</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <Badge className="bg-green-100 text-green-800">+50 pts</Badge>
              </div>
            </Card>

            <Card className="p-3 bg-white/80">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{t.earnedBadge}</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">⭐</Badge>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>

      <BottomNavigation 
        activeScreen="student-dashboard" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}