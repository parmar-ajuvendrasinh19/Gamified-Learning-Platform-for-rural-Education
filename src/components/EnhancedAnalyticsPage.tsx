import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import BottomNavigation from './BottomNavigation';
import { User } from './types';
import { ChevronLeft, TrendingUp, Users, Award, BookOpen, Clock, Brain, Target, BarChart3, PieChart, Calendar, Download, WifiOff } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

interface EnhancedAnalyticsPageProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
}

const mockStudentData = [
  {
    id: '1',
    name: 'Arjun Kumar',
    nameHi: 'अर्जुन कुमार',
    avatar: '👦',
    totalPoints: 850,
    level: 3,
    quizzesCompleted: 12,
    avgScore: 85,
    badges: ['Math Master', 'Science Star'],
    badgesHi: ['गणित मास्टर', 'विज्ञान स्टार'],
    lastActive: '2 hours ago',
    lastActiveHi: '2 घंटे पहले',
    timeSpent: 45, // minutes per day average
    strengths: ['Algebra', 'Physics'],
    weaknesses: ['Geometry', 'Chemistry'],
    recentQuizzes: [
      { subject: 'Math', score: 90, date: '2024-01-15', timeSpent: 12 },
      { subject: 'Physics', score: 85, date: '2024-01-14', timeSpent: 15 },
      { subject: 'Science', score: 80, date: '2024-01-13', timeSpent: 18 }
    ],
    weeklyProgress: [
      { day: 'Mon', score: 75, timeSpent: 30 },
      { day: 'Tue', score: 80, timeSpent: 45 },
      { day: 'Wed', score: 85, timeSpent: 40 },
      { day: 'Thu', score: 88, timeSpent: 50 },
      { day: 'Fri', score: 85, timeSpent: 35 },
      { day: 'Sat', score: 90, timeSpent: 60 },
      { day: 'Sun', score: 87, timeSpent: 25 }
    ],
    subjects: {
      Math: 90,
      Science: 85,
      Physics: 80,
      Technology: 88
    }
  },
  {
    id: '2',
    name: 'Priya Sharma',
    nameHi: 'प्रिया शर्मा',
    avatar: '👧',
    totalPoints: 920,
    level: 4,
    quizzesCompleted: 15,
    avgScore: 92,
    badges: ['Quiz Champion', 'Science Star', 'Tech Genius'],
    badgesHi: ['क्विज़ चैंपियन', 'विज्ञान स्टार', 'टेक जीनियस'],
    lastActive: '1 hour ago',
    lastActiveHi: '1 घंटे पहले',
    timeSpent: 55,
    strengths: ['Chemistry', 'Biology', 'Programming'],
    weaknesses: ['Physics'],
    recentQuizzes: [
      { subject: 'Science', score: 95, date: '2024-01-15', timeSpent: 10 },
      { subject: 'Technology', score: 94, date: '2024-01-14', timeSpent: 12 },
      { subject: 'Math', score: 88, date: '2024-01-13', timeSpent: 14 }
    ],
    weeklyProgress: [
      { day: 'Mon', score: 90, timeSpent: 50 },
      { day: 'Tue', score: 92, timeSpent: 55 },
      { day: 'Wed', score: 94, timeSpent: 60 },
      { day: 'Thu', score: 96, timeSpent: 65 },
      { day: 'Fri', score: 92, timeSpent: 45 },
      { day: 'Sat', score: 95, timeSpent: 70 },
      { day: 'Sun', score: 93, timeSpent: 40 }
    ],
    subjects: {
      Math: 95,
      Science: 92,
      Physics: 88,
      Technology: 94
    }
  },
  {
    id: '3',
    name: 'Ravi Patel',
    nameHi: 'रवि पटेल',
    avatar: '👦',
    totalPoints: 720,
    level: 2,
    quizzesCompleted: 9,
    avgScore: 78,
    badges: ['Math Master'],
    badgesHi: ['गणित मास्टर'],
    lastActive: '5 hours ago',
    lastActiveHi: '5 घंटे पहले',
    timeSpent: 35,
    strengths: ['Arithmetic', 'Basic Science'],
    weaknesses: ['Advanced Physics', 'Technology'],
    recentQuizzes: [
      { subject: 'Math', score: 82, date: '2024-01-15', timeSpent: 20 },
      { subject: 'Science', score: 75, date: '2024-01-12', timeSpent: 25 },
      { subject: 'Physics', score: 70, date: '2024-01-10', timeSpent: 30 }
    ],
    weeklyProgress: [
      { day: 'Mon', score: 70, timeSpent: 25 },
      { day: 'Tue', score: 75, timeSpent: 30 },
      { day: 'Wed', score: 78, timeSpent: 35 },
      { day: 'Thu', score: 80, timeSpent: 40 },
      { day: 'Fri', score: 76, timeSpent: 30 },
      { day: 'Sat', score: 82, timeSpent: 45 },
      { day: 'Sun', score: 79, timeSpent: 25 }
    ],
    subjects: {
      Math: 82,
      Science: 75,
      Physics: 76,
      Technology: 80
    }
  }
];

const subjectPerformanceData = [
  { subject: 'Math', avgScore: 89, students: 3, color: '#3B82F6' },
  { subject: 'Science', avgScore: 84, students: 3, color: '#10B981' },
  { subject: 'Physics', avgScore: 81, students: 3, color: '#8B5CF6' },
  { subject: 'Technology', avgScore: 87, students: 3, color: '#F59E0B' }
];

const weeklyEngagementData = [
  { week: 'Week 1', activeStudents: 2, avgTimeSpent: 35 },
  { week: 'Week 2', activeStudents: 3, avgTimeSpent: 42 },
  { week: 'Week 3', activeStudents: 3, avgTimeSpent: 38 },
  { week: 'Week 4', activeStudents: 3, avgTimeSpent: 45 }
];

const translations = {
  en: {
    analytics: 'Student Analytics',
    overview: 'Overview',
    students: 'Students',
    performance: 'Performance',
    engagement: 'Engagement',
    totalStudents: 'Total Students',
    avgClassScore: 'Average Class Score',
    completionRate: 'Completion Rate',
    totalQuizzes: 'Total Quizzes',
    topPerformers: 'Top Performers',
    recentActivity: 'Recent Activity',
    subjectPerformance: 'Subject Performance',
    weeklyProgress: 'Weekly Progress',
    studentDetails: 'Student Details',
    timeSpent: 'Avg Time Spent',
    strengths: 'Strengths',
    weaknesses: 'Needs Improvement',
    recentQuizzes: 'Recent Quizzes',
    viewProfile: 'View Profile',
    assignLesson: 'Assign Lesson',
    exportData: 'Export Data',
    offlineIndicator: 'Offline data available',
    points: 'points',
    level: 'Level',
    quizzes: 'quizzes completed',
    badges: 'badges earned',
    lastActive: 'Last active',
    minutes: 'min/day',
    score: 'Score',
    date: 'Date',
    subject: 'Subject',
    day: 'Day',
    week: 'Week',
    activeStudents: 'Active Students',
    avgTimeSpent: 'Avg Time (min)'
  },
  hi: {
    analytics: 'छात्र विश्लेषण',
    overview: 'अवलोकन',
    students: 'छात्र',
    performance: 'प्रदर्शन',
    engagement: 'सहभागिता',
    totalStudents: 'कुल छात्र',
    avgClassScore: 'औसत कक्षा स्कोर',
    completionRate: 'पूर्णता दर',
    totalQuizzes: 'कुल क्विज़',
    topPerformers: 'शीर्ष प्रदर्शनकर्ता',
    recentActivity: 'हालिया गतिविधि',
    subjectPerformance: 'विषय प्रदर्शन',
    weeklyProgress: 'साप्ताहिक प्रगति',
    studentDetails: 'छात्र विवरण',
    timeSpent: 'औसत समय',
    strengths: 'मजबूत पक्ष',
    weaknesses: 'सुधार की आवश्यकता',
    recentQuizzes: 'हालिया क्विज़',
    viewProfile: 'प्रोफ़ाइल देखें',
    assignLesson: 'पाठ सौंपें',
    exportData: 'डेटा निर्यात करें',
    offlineIndicator: 'ऑफ़लाइन डेटा उपलब्ध',
    points: 'अंक',
    level: 'स्तर',
    quizzes: 'प्रश्नोत्तरी पूर्ण',
    badges: 'बैज अर्जित',
    lastActive: 'अंतिम सक्रिय',
    minutes: 'मिन/दिन',
    score: 'स्कोर',
    date: 'दिनांक',
    subject: 'विषय',
    day: 'दिन',
    week: 'सप्ताह',
    activeStudents: 'सक्रिय छात्र',
    avgTimeSpent: 'औसत समय (मिन)'
  }
};

export default function EnhancedAnalyticsPage({ user, navigateToScreen, language }: EnhancedAnalyticsPageProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const t = translations[language];

  React.useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  if (!user || user.role !== 'teacher') return null;

  const classAverage = Math.round(mockStudentData.reduce((acc, student) => acc + student.avgScore, 0) / mockStudentData.length);
  const totalQuizzes = mockStudentData.reduce((acc, student) => acc + student.quizzesCompleted, 0);
  const completionRate = 85;
  const avgTimeSpent = Math.round(mockStudentData.reduce((acc, student) => acc + student.timeSpent, 0) / mockStudentData.length);

  const selectedStudentData = selectedStudent ? mockStudentData.find(s => s.id === selectedStudent) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 border-b border-gray-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToScreen('teacher-dashboard')}
              className="p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl">{t.analytics}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isOnline && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <WifiOff className="w-3 h-3 mr-1" />
                {t.offlineIndicator}
              </Badge>
            )}
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              {t.exportData}
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="students">{t.students}</TabsTrigger>
            <TabsTrigger value="performance">{t.performance}</TabsTrigger>
            <TabsTrigger value="engagement">{t.engagement}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl">{mockStudentData.length}</div>
                    <div className="text-sm text-gray-600">{t.totalStudents}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl">{classAverage}%</div>
                    <div className="text-sm text-gray-600">{t.avgClassScore}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl">{totalQuizzes}</div>
                    <div className="text-sm text-gray-600">{t.totalQuizzes}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl">{avgTimeSpent}</div>
                    <div className="text-sm text-gray-600">{t.minutes}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Subject Performance Chart */}
            <Card className="p-4">
              <h3 className="text-lg mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                {t.subjectPerformance}
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={subjectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4 mt-6">
            {/* Student List */}
            <div className="space-y-3">
              {mockStudentData.map((student) => (
                <Card 
                  key={student.id} 
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selectedStudent === student.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white/80 hover:bg-white'
                  }`}
                  onClick={() => setSelectedStudent(selectedStudent === student.id ? null : student.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{student.avatar}</div>
                      <div>
                        <h3 className="text-sm">{language === 'hi' ? student.nameHi : student.name}</h3>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span>{student.totalPoints} {t.points}</span>
                          <span>{t.level} {student.level}</span>
                          <span>{student.timeSpent} {t.minutes}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg text-green-600">{student.avgScore}%</div>
                      <div className="text-xs text-gray-500">{language === 'hi' ? student.lastActiveHi : student.lastActive}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {Object.entries(student.subjects).map(([subject, score]) => (
                      <div key={subject} className="text-center">
                        <div className="text-xs text-gray-500">{subject}</div>
                        <div className="text-sm text-blue-600">{score}%</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Student Details Modal */}
            {selectedStudentData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                  <h3 className="text-lg mb-4">{t.studentDetails}</h3>
                  
                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm mb-2 flex items-center">
                        <Brain className="w-4 h-4 mr-1 text-green-600" />
                        {t.strengths}
                      </h4>
                      <div className="space-y-1">
                        {selectedStudentData.strengths.map((strength, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 text-xs mr-1">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-1 text-orange-600" />
                        {t.weaknesses}
                      </h4>
                      <div className="space-y-1">
                        {selectedStudentData.weaknesses.map((weakness, index) => (
                          <Badge key={index} className="bg-orange-100 text-orange-800 text-xs mr-1">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Weekly Progress Chart */}
                  <div className="mb-4">
                    <h4 className="text-sm mb-2">{t.weeklyProgress}</h4>
                    <ResponsiveContainer width="100%" height={150}>
                      <AreaChart data={selectedStudentData.weeklyProgress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Recent Quizzes */}
                  <div>
                    <h4 className="text-sm mb-2">{t.recentQuizzes}</h4>
                    <div className="space-y-2">
                      {selectedStudentData.recentQuizzes.map((quiz, index) => (
                        <div key={index} className="flex justify-between items-center text-xs bg-white p-2 rounded">
                          <span>{quiz.subject}</span>
                          <span className="text-green-600">{quiz.score}%</span>
                          <span className="text-gray-500">{quiz.timeSpent}min</span>
                          <span className="text-gray-500">{quiz.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-6">
            {/* Performance Distribution */}
            <Card className="p-4">
              <h3 className="text-lg mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Performance Distribution
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={[
                      { name: 'Excellent (90-100%)', value: 1, fill: '#10B981' },
                      { name: 'Good (80-89%)', value: 1, fill: '#3B82F6' },
                      { name: 'Average (70-79%)', value: 1, fill: '#F59E0B' },
                      { name: 'Needs Help (<70%)', value: 0, fill: '#EF4444' }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {subjectPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Card>

            {/* Subject-wise Performance */}
            <Card className="p-4">
              <h3 className="text-lg mb-4">Subject Difficulty Analysis</h3>
              <div className="space-y-3">
                {subjectPerformanceData.map((subject) => (
                  <div key={subject.subject}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.subject}</span>
                      <span>{subject.avgScore}%</span>
                    </div>
                    <Progress value={subject.avgScore} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6 mt-6">
            {/* Weekly Engagement */}
            <Card className="p-4">
              <h3 className="text-lg mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Weekly Engagement Trends
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="activeStudents" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="avgTimeSpent" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="text-sm mb-2">Daily Active Users</h4>
                <div className="text-2xl text-blue-600">3</div>
                <div className="text-xs text-gray-500">+20% from last week</div>
              </Card>
              
              <Card className="p-4">
                <h4 className="text-sm mb-2">Session Duration</h4>
                <div className="text-2xl text-green-600">45min</div>
                <div className="text-xs text-gray-500">+5min from last week</div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation 
        activeScreen="analytics" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}