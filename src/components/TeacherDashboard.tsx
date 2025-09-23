import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import BottomNavigation from './BottomNavigation';
import { User, Student } from './types';
import { Users, BookOpen, Trophy, TrendingUp, Calendar, Eye, Plus, Settings } from 'lucide-react';

interface TeacherDashboardProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
}

const mockStudentData: Student[] = [
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
  }
];

const weeklyProgressData = [
  { name: 'Mon', completed: 12, assigned: 15 },
  { name: 'Tue', completed: 18, assigned: 20 },
  { name: 'Wed', completed: 15, assigned: 18 },
  { name: 'Thu', completed: 22, assigned: 25 },
  { name: 'Fri', completed: 25, assigned: 28 },
  { name: 'Sat', completed: 8, assigned: 10 },
  { name: 'Sun', completed: 5, assigned: 8 }
];

const subjectData = [
  { name: 'Math', value: 35, color: '#8B5CF6' },
  { name: 'Science', value: 28, color: '#06B6D4' },
  { name: 'Physics', value: 22, color: '#10B981' },
  { name: 'Technology', value: 15, color: '#F59E0B' }
];

const translations = {
  en: {
    welcome: 'Welcome back',
    teacher: 'Teacher',
    overview: 'Class Overview',
    students: 'Students',
    lessons: 'Lessons Assigned',
    avgProgress: 'Average Progress',
    topPerformers: 'Top Performers',
    weeklyProgress: 'Weekly Progress',
    subjectDistribution: 'Subject Distribution',
    recentActivity: 'Recent Activity',
    assignLesson: 'Assign Lesson',
    viewReports: 'View Reports',
    manageClass: 'Manage Class',
    settings: 'Settings',
    completed: 'Completed',
    assigned: 'Assigned',
    points: 'points',
    level: 'Level',
    completedQuiz: 'completed Physics Quiz',
    earnedBadge: 'earned Science Star badge',
    startedLesson: 'started Math lesson',
    minutes: 'min ago',
    hours: 'hours ago',
    analytics: 'Analytics',
    performance: 'Performance'
  },
  hi: {
    welcome: 'वापसी पर स्वागत',
    teacher: 'शिक्षक',
    overview: 'कक्षा सिंहावलोकन',
    students: 'छात्र',
    lessons: 'पाठ असाइन किए गए',
    avgProgress: 'औसत प्रगति',
    topPerformers: 'शीर्ष प्रदर्शन',
    weeklyProgress: 'साप्ताहिक प्रगति',
    subjectDistribution: 'विषय वितरण',
    recentActivity: 'हालिया गतिविधि',
    assignLesson: 'पाठ असाइन करें',
    viewReports: 'रिपोर्ट देखें',
    manageClass: 'कक्षा प्रबंधित करें',
    settings: 'सेटिंग्स',
    completed: 'पूर्ण',
    assigned: 'असाइन्ड',
    points: 'अंक',
    level: 'स्तर',
    completedQuiz: 'भौतिकी प्रश्नोत्तरी पूरी की',
    earnedBadge: 'विज्ञान स्टार बैज अर्जित किया',
    startedLesson: 'गणित पाठ शुरू किया',
    minutes: 'मिनट पहले',
    hours: 'घंटे पहले',
    analytics: 'विश्लेषण',
    performance: 'प्रदर्शन'
  }
};

export default function TeacherDashboard({ user, navigateToScreen, language }: TeacherDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const t = translations[language];
  
  if (!user || user.role !== 'teacher') return null;

  const totalStudents = mockStudentData.length;
  const averageProgress = Math.round(mockStudentData.reduce((sum, student) => sum + student.progress, 0) / totalStudents);
  const topPerformers = [...mockStudentData].sort((a, b) => b.points - a.points).slice(0, 3);

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
            <p className="text-sm opacity-80">{t.teacher}</p>
          </div>
          <div className="text-4xl">👩‍🏫</div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card className="bg-white/20 border-0 text-center p-3">
            <div className="text-lg">{totalStudents}</div>
            <div className="text-xs opacity-80">{t.students}</div>
          </Card>
          <Card className="bg-white/20 border-0 text-center p-3">
            <div className="text-lg">24</div>
            <div className="text-xs opacity-80">{t.lessons}</div>
          </Card>
          <Card className="bg-white/20 border-0 text-center p-3">
            <div className="text-lg">{averageProgress}%</div>
            <div className="text-xs opacity-80">{t.avgProgress}</div>
          </Card>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
              onClick={() => navigateToScreen('lessons')}
            >
              <motion.div whileTap={{ scale: 0.95 }} className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm">{t.assignLesson}</h4>
              </motion.div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
              onClick={() => navigateToScreen('analytics')}
            >
              <motion.div whileTap={{ scale: 0.95 }} className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm">{t.viewReports}</h4>
              </motion.div>
            </Card>
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg mb-3">{t.topPerformers}</h3>
          <div className="space-y-2">
            {topPerformers.map((student, index) => (
              <Card key={student.id} className="p-3 bg-white/80">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                  } text-white text-sm`}>
                    #{index + 1}
                  </div>
                  <div className="text-2xl">{student.avatar}</div>
                  <div className="flex-1">
                    <h4 className="text-sm">{student.name}</h4>
                    <p className="text-xs text-gray-600">
                      {t.level} {student.level} • {student.points} {t.points}
                    </p>
                  </div>
                  <div className="text-right">
                    <Progress value={student.progress} className="h-2 w-16" />
                    <p className="text-xs text-gray-500 mt-1">{student.progress}%</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg mb-3">{t.weeklyProgress}</h3>
          <Card className="p-4 bg-white/80">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#8B5CF6" name={t.completed} />
                <Bar dataKey="assigned" fill="#E5E7EB" name={t.assigned} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Subject Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg mb-3">{t.subjectDistribution}</h3>
          <Card className="p-4 bg-white/80">
            <div className="flex">
              <ResponsiveContainer width="60%" height={150}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {subjectData.map((subject) => (
                  <div key={subject.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: subject.color }}
                      />
                      <span className="text-sm">{subject.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{subject.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg mb-3">{t.recentActivity}</h3>
          <div className="space-y-2">
            <Card className="p-3 bg-white/80">
              <div className="flex items-center space-x-3">
                <div className="text-xl">👩‍🎓</div>
                <div className="flex-1">
                  <p className="text-sm">Priya Sharma {t.completedQuiz}</p>
                  <p className="text-xs text-gray-500">15 {t.minutes}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">+100 pts</Badge>
              </div>
            </Card>

            <Card className="p-3 bg-white/80">
              <div className="flex items-center space-x-3">
                <div className="text-xl">👨‍🎓</div>
                <div className="flex-1">
                  <p className="text-sm">Alex Kumar {t.earnedBadge}</p>
                  <p className="text-xs text-gray-500">2 {t.hours}</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">⭐</Badge>
              </div>
            </Card>

            <Card className="p-3 bg-white/80">
              <div className="flex items-center space-x-3">
                <div className="text-xl">👦</div>
                <div className="flex-1">
                  <p className="text-sm">Ravi Patel {t.startedLesson}</p>
                  <p className="text-xs text-gray-500">3 {t.hours}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Started</Badge>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>

      <BottomNavigation 
        activeScreen="teacher-dashboard" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}