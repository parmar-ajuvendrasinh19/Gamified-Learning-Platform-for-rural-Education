import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import BottomNavigation from './BottomNavigation';
import { User, Student } from './types';
import { ChevronLeft, Trophy, Medal, Award, Crown, Users, Target } from 'lucide-react';

interface LeaderboardProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: '👩‍🎓',
    points: 2450,
    level: 8,
    progress: 85,
    badges: []
  },
  {
    id: '2',
    name: 'Alex Kumar',
    avatar: '👨‍🎓',
    points: 1250,
    level: 5,
    progress: 67,
    badges: []
  },
  {
    id: '3',
    name: 'Ravi Patel',
    avatar: '👦',
    points: 2100,
    level: 7,
    progress: 78,
    badges: []
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    avatar: '👧',
    points: 1890,
    level: 6,
    progress: 72,
    badges: []
  },
  {
    id: '5',
    name: 'Arjun Singh',
    avatar: '👨‍🎓',
    points: 1456,
    level: 5,
    progress: 59,
    badges: []
  },
  {
    id: '6',
    name: 'Kavya Reddy',
    avatar: '👩‍🎓',
    points: 1234,
    level: 4,
    progress: 45,
    badges: []
  },
  {
    id: '7',
    name: 'Rohan Das',
    avatar: '👨‍🎓',
    points: 1123,
    level: 4,
    progress: 41,
    badges: []
  },
  {
    id: '8',
    name: 'Ananya Joshi',
    avatar: '👧',
    points: 987,
    level: 3,
    progress: 38,
    badges: []
  }
];

const translations = {
  en: {
    leaderboard: 'Leaderboard',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    allTime: 'All Time',
    myRank: 'My Rank',
    points: 'points',
    level: 'Level',
    students: 'students',
    you: 'You',
    top3: 'Top 3 This Week',
    champion: 'Champion',
    runner1: '2nd Place',
    runner2: '3rd Place',
    weeklyStats: 'Weekly Stats',
    totalPoints: 'Total Points Earned',
    activeStudents: 'Active Students',
    completedLessons: 'Lessons Completed'
  },
  hi: {
    leaderboard: 'लीडरबोर्ड',
    thisWeek: 'इस सप्ताह',
    thisMonth: 'इस महीने',
    allTime: 'सभी समय',
    myRank: 'मेरी रैंक',
    points: 'अंक',
    level: 'स्तर',
    students: 'छात्र',
    you: 'आप',
    top3: 'शीर्ष 3 इस सप्ताह',
    champion: 'चैंपियन',
    runner1: '2वां स्थान',
    runner2: '3वां स्थान',
    weeklyStats: 'साप्ताहिक आंकड़े',
    totalPoints: 'कुल अंक अर्जित',
    activeStudents: 'सक्रिय छात्र',
    completedLessons: 'पूर्ण पाठ'
  }
};

const getRankIcon = (position: number) => {
  switch (position) {
    case 0: return <Crown className="w-5 h-5 text-yellow-500" />;
    case 1: return <Medal className="w-5 h-5 text-gray-400" />;
    case 2: return <Award className="w-5 h-5 text-amber-600" />;
    default: return <span className="text-sm text-gray-500">#{position + 1}</span>;
  }
};

const getRankBadgeColor = (position: number) => {
  switch (position) {
    case 0: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    case 1: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    case 2: return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function Leaderboard({ user, navigateToScreen, language }: LeaderboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('thisWeek');
  const t = translations[language];

  if (!user) return null;

  // Sort students by points for leaderboard
  const sortedStudents = [...mockStudents].sort((a, b) => b.points - a.points);
  const currentUserRank = sortedStudents.findIndex(student => student.name === user.name);
  const topThree = sortedStudents.slice(0, 3);

  const periods = [
    { id: 'thisWeek', label: t.thisWeek },
    { id: 'thisMonth', label: t.thisMonth },
    { id: 'allTime', label: t.allTime }
  ];

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
          <h1 className="text-xl">{t.leaderboard}</h1>
          <Trophy className="w-6 h-6" />
        </div>

        {/* Period Selector */}
        <div className="flex space-x-2 mb-4">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod(period.id)}
              className="text-white hover:bg-white/20 rounded-full"
            >
              {period.label}
            </Button>
          ))}
        </div>

        {/* User's Rank */}
        <Card className="bg-white/20 border-0 p-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{user.avatar}</div>
              <div>
                <p className="text-sm opacity-80">{t.myRank}</p>
                <p className="text-lg">#{currentUserRank + 1}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">{user.points} {t.points}</p>
              <p className="text-lg">{t.level} {user.level}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg mb-3">{t.top3}</h3>
          <div className="flex justify-center items-end space-x-2 mb-4">
            {/* 2nd Place */}
            {topThree[1] && (
              <Card className="p-3 text-center bg-gradient-to-b from-gray-100 to-gray-200 flex-1">
                <div className="text-2xl mb-1">{topThree[1].avatar}</div>
                <h4 className="text-sm">{topThree[1].name}</h4>
                <p className="text-xs text-gray-600">{topThree[1].points} {t.points}</p>
                <Badge className="bg-gray-400 text-white text-xs mt-1">2nd</Badge>
              </Card>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <Card className="p-4 text-center bg-gradient-to-b from-yellow-100 to-yellow-200 flex-1 transform scale-110">
                <Crown className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                <div className="text-3xl mb-1">{topThree[0].avatar}</div>
                <h4 className="text-sm">{topThree[0].name}</h4>
                <p className="text-xs text-gray-600">{topThree[0].points} {t.points}</p>
                <Badge className="bg-yellow-500 text-white text-xs mt-1">{t.champion}</Badge>
              </Card>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <Card className="p-3 text-center bg-gradient-to-b from-amber-100 to-amber-200 flex-1">
                <div className="text-2xl mb-1">{topThree[2].avatar}</div>
                <h4 className="text-sm">{topThree[2].name}</h4>
                <p className="text-xs text-gray-600">{topThree[2].points} {t.points}</p>
                <Badge className="bg-amber-500 text-white text-xs mt-1">3rd</Badge>
              </Card>
            )}
          </div>
        </motion.div>

        {/* Weekly Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg mb-3">{t.weeklyStats}</h3>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="text-xl text-blue-600">15.2k</div>
              <p className="text-xs text-gray-600">{t.totalPoints}</p>
            </Card>
            <Card className="p-3 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="text-xl text-green-600">124</div>
              <p className="text-xs text-gray-600">{t.activeStudents}</p>
            </Card>
            <Card className="p-3 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="text-xl text-purple-600">89</div>
              <p className="text-xs text-gray-600">{t.completedLessons}</p>
            </Card>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg mb-3">{t.leaderboard}</h3>
          <div className="space-y-2">
            {sortedStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-3 ${
                  student.name === user.name 
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 border-2' 
                    : 'bg-white/80'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(index)}`}>
                      {getRankIcon(index)}
                    </div>
                    
                    <div className="text-2xl">{student.avatar}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm">{student.name}</h4>
                        {student.name === user.name && (
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            {t.you}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        {t.level} {student.level} • {student.points} {t.points}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm">{student.points}</p>
                      <p className="text-xs text-gray-500">{t.points}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNavigation 
        activeScreen="leaderboard" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}