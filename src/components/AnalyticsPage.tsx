import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import BottomNavigation from './BottomNavigation';
import { User } from './types';
import { ChevronLeft, TrendingUp, Users, BookOpen, Trophy, Calendar, Download } from 'lucide-react';

interface AnalyticsPageProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
}

const translations = {
  en: {
    analytics: 'Analytics',
    overview: 'Overview',
    studentPerformance: 'Student Performance',
    subjectAnalysis: 'Subject Analysis',
    timeRange: 'Time Range',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    thisQuarter: 'This Quarter',
    averageScore: 'Average Score',
    totalStudents: 'Total Students',
    lessonsAssigned: 'Lessons Assigned',
    completionRate: 'Completion Rate',
    topPerformers: 'Top Performers',
    strugglingStudents: 'Struggling Students',
    subjectPerformance: 'Subject Performance',
    weeklyProgress: 'Weekly Progress',
    exportReport: 'Export Report',
    studentEngagement: 'Student Engagement',
    lessonCompletion: 'Lesson Completion',
    quizScores: 'Quiz Scores',
    strongTopics: 'Strong Topics',
    weakTopics: 'Weak Topics',
    recommendations: 'Recommendations',
    points: 'points',
    students: 'students',
    lessons: 'lessons',
    completed: 'Completed',
    assigned: 'Assigned',
    math: 'Math',
    science: 'Science',
    physics: 'Physics',
    technology: 'Technology'
  },
  hi: {
    analytics: 'विश्लेषण',
    overview: 'सिंहावलोकन',
    studentPerformance: 'छात्र प्रदर्शन',
    subjectAnalysis: 'विषय विश्लेषण',
    timeRange: 'समय सीमा',
    thisWeek: 'इस सप्ताह',
    thisMonth: 'इस महीने',
    thisQuarter: 'इस तिमाही',
    averageScore: 'औसत स्कोर',
    totalStudents: 'कुल छात्र',
    lessonsAssigned: 'असाइन्ड पाठ',
    completionRate: 'पूर्णता दर',
    topPerformers: 'शीर्ष प्रदर्शनकर्ता',
    strugglingStudents: 'संघर्षरत छात्र',
    subjectPerformance: 'विषय प्रदर्शन',
    weeklyProgress: 'साप्ताहिक प्रगति',
    exportReport: 'रिपोर्ट निर्यात करें',
    studentEngagement: 'छात्र भागीदारी',
    lessonCompletion: 'पाठ पूर्णता',
    quizScores: 'प्रश्नोत्तरी स्कोर',
    strongTopics: 'मजबूत विषय',
    weakTopics: 'कमजोर विषय',
    recommendations: 'सुझाव',
    points: 'अंक',
    students: 'छात्र',
    lessons: 'पाठ',
    completed: 'पूर्ण',
    assigned: 'असाइन्ड',
    math: 'गणित',
    science: 'विज्ञान',
    physics: 'भौतिकी',
    technology: 'तकनीक'
  }
};

const studentPerformanceData = [
  { name: 'Priya Sharma', math: 95, science: 88, physics: 92, technology: 85 },
  { name: 'Alex Kumar', math: 78, science: 85, physics: 80, technology: 88 },
  { name: 'Ravi Patel', math: 88, science: 92, physics: 85, technology: 79 },
  { name: 'Sneha Gupta', math: 92, science: 79, physics: 88, technology: 91 },
  { name: 'Arjun Singh', math: 75, science: 82, physics: 78, technology: 84 }
];

const subjectData = [
  { name: 'Math', value: 35, color: '#8B5CF6', avgScore: 85 },
  { name: 'Science', value: 28, color: '#06B6D4', avgScore: 82 },
  { name: 'Physics', value: 22, color: '#10B981', avgScore: 84 },
  { name: 'Technology', value: 15, color: '#F59E0B', avgScore: 86 }
];

const weeklyProgressData = [
  { name: 'Mon', completed: 12, assigned: 15, engagement: 80 },
  { name: 'Tue', completed: 18, assigned: 20, engagement: 90 },
  { name: 'Wed', completed: 15, assigned: 18, engagement: 83 },
  { name: 'Thu', completed: 22, assigned: 25, engagement: 88 },
  { name: 'Fri', completed: 25, assigned: 28, engagement: 89 },
  { name: 'Sat', completed: 8, assigned: 10, engagement: 80 },
  { name: 'Sun', completed: 5, assigned: 8, engagement: 62 }
];

const topPerformers = [
  { name: 'Priya Sharma', avatar: '👩‍🎓', score: 92, improvement: '+5%' },
  { name: 'Sneha Gupta', avatar: '👧', score: 88, improvement: '+3%' },
  { name: 'Ravi Patel', avatar: '👦', score: 86, improvement: '+7%' }
];

const strugglingStudents = [
  { name: 'Arjun Singh', avatar: '👨‍🎓', score: 72, trend: '-2%' },
  { name: 'Alex Kumar', avatar: '👨‍🎓', score: 78, trend: '+1%' }
];

export default function AnalyticsPage({ user, navigateToScreen, language }: AnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState('thisWeek');
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const t = translations[language];

  if (!user || user.role !== 'teacher') return null;

  const overviewStats = {
    averageScore: 83,
    totalStudents: 25,
    lessonsAssigned: 45,
    completionRate: 78
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-b-3xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToScreen('teacher-dashboard')}
              className="p-2 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl">{t.analytics}</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Download className="w-4 h-4 mr-1" />
            {t.exportReport}
          </Button>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-white/20 border-white/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">{t.thisWeek}</SelectItem>
              <SelectItem value="thisMonth">{t.thisMonth}</SelectItem>
              <SelectItem value="thisQuarter">{t.thisQuarter}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg mb-3">{t.overview}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl">{overviewStats.averageScore}%</p>
                  <p className="text-xs text-gray-600">{t.averageScore}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl">{overviewStats.totalStudents}</p>
                  <p className="text-xs text-gray-600">{t.totalStudents}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl">{overviewStats.lessonsAssigned}</p>
                  <p className="text-xs text-gray-600">{t.lessonsAssigned}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl">{overviewStats.completionRate}%</p>
                  <p className="text-xs text-gray-600">{t.completionRate}</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Student Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg mb-3">{t.studentPerformance}</h3>
          <Card className="p-4 bg-white/80">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={10}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="math" fill="#8B5CF6" name={t.math} />
                <Bar dataKey="science" fill="#06B6D4" name={t.science} />
                <Bar dataKey="physics" fill="#10B981" name={t.physics} />
                <Bar dataKey="technology" fill="#F59E0B" name={t.technology} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Subject Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg mb-3">{t.subjectAnalysis}</h3>
          <Card className="p-4 bg-white/80">
            <div className="flex">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {subjectData.map((subject) => (
                  <div key={subject.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        <span className="text-sm">{t[subject.name.toLowerCase() as keyof typeof t]}</span>
                      </div>
                      <span className="text-sm text-gray-600">{subject.value}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Avg: {subject.avgScore}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg mb-3">{t.weeklyProgress}</h3>
          <Card className="p-4 bg-white/80">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name={t.completed}
                />
                <Line 
                  type="monotone" 
                  dataKey="assigned" 
                  stroke="#E5E7EB" 
                  strokeWidth={2}
                  name={t.assigned}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name={t.studentEngagement}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Top Performers & Struggling Students */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 gap-4"
        >
          {/* Top Performers */}
          <Card className="p-4 bg-white/80">
            <h4 className="text-lg mb-3 text-green-700">{t.topPerformers}</h4>
            <div className="space-y-2">
              {topPerformers.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{student.avatar}</span>
                    <div>
                      <p className="text-sm">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.score}% average</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600">{student.improvement}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Struggling Students */}
          <Card className="p-4 bg-white/80">
            <h4 className="text-lg mb-3 text-orange-700">{t.strugglingStudents}</h4>
            <div className="space-y-2">
              {strugglingStudents.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{student.avatar}</span>
                    <div>
                      <p className="text-sm">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.score}% average</p>
                    </div>
                  </div>
                  <span className="text-sm text-orange-600">{student.trend}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation 
        activeScreen="analytics" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}