import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import BottomNavigation from './BottomNavigation';
import { User, Lesson } from './types';
import { bilingualLessons, searchLessons, getLessonsBySubject, BilingualLesson } from './LessonData';
import LanguageSwitcher from './LanguageSwitcher';
import { ChevronLeft, Search, Filter, Play, Lock, CheckCircle, Atom, Calculator, Zap, Cpu, Clock, WifiOff } from 'lucide-react';
import { Input } from './ui/input';

interface LessonListProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
  setLanguage?: (language: 'en' | 'hi') => void;
}

const subjectIcons = {
  Science: Atom,
  Physics: Zap,
  Math: Calculator,
  Technology: Cpu
};

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Wave Properties & Sound',
    subject: 'Physics',
    difficulty: 'Medium',
    points: 100,
    completed: true,
    progress: 100,
    icon: '🌊'
  },
  {
    id: '2',
    title: 'Projectile Motion',
    subject: 'Physics',
    difficulty: 'Hard',
    points: 150,
    completed: false,
    progress: 75,
    icon: '🎯'
  },
  {
    id: '3',
    title: 'Quadratic Equations',
    subject: 'Math',
    difficulty: 'Medium',
    points: 120,
    completed: false,
    progress: 0,
    icon: '📐'
  },
  {
    id: '4',
    title: 'Chemical Reactions',
    subject: 'Science',
    difficulty: 'Easy',
    points: 80,
    completed: true,
    progress: 100,
    icon: '⚗️'
  },
  {
    id: '5',
    title: 'Circuit Basics',
    subject: 'Technology',
    difficulty: 'Easy',
    points: 90,
    completed: false,
    progress: 50,
    icon: '🔌'
  },
  {
    id: '6',
    title: 'Wi-Fi & Networks',
    subject: 'Technology',
    difficulty: 'Medium',
    points: 110,
    completed: false,
    progress: 25,
    icon: '📶'
  }
];

const translations = {
  en: {
    lessons: 'Lessons',
    search: 'Search lessons...',
    filter: 'Filter',
    all: 'All',
    science: 'Science',
    physics: 'Physics',
    math: 'Math',
    technology: 'Technology',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    completed: 'Completed',
    inProgress: 'In Progress',
    locked: 'Locked',
    continue: 'Continue',
    start: 'Start',
    replay: 'Replay',
    points: 'pts'
  },
  hi: {
    lessons: 'पाठ',
    search: 'पाठ खोजें...',
    filter: 'फ़िल्टर',
    all: 'सभी',
    science: 'विज्ञान',
    physics: 'भौतिकी',
    math: 'गणित',
    technology: 'तकनीक',
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'कठिन',
    completed: 'पूर्ण',
    inProgress: 'प्रगति में',
    locked: 'बंद',
    continue: 'जारी रखें',
    start: 'शुरू करें',
    replay: 'दोबारा खेलें',
    points: 'अंक'
  }
};

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800'
};

export default function LessonList({ user, navigateToScreen, language, setLanguage }: LessonListProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  if (!user) return null;

  const subjects = ['All', 'Science', 'Physics', 'Math', 'Technology'];
  
  // Use bilingual lessons and apply filters
  let filteredLessons = bilingualLessons;
  
  if (selectedSubject !== 'All') {
    filteredLessons = getLessonsBySubject(selectedSubject);
  }
  
  if (searchQuery.trim()) {
    filteredLessons = searchLessons(searchQuery, language);
  }

  const getLessonStatus = (lesson: BilingualLesson) => {
    if (lesson.progress === 100) return 'completed';
    if (lesson.progress > 0) return 'inProgress';
    if (lesson.locked) return 'locked';
    return 'available';
  };

  const getLessonButtonText = (lesson: BilingualLesson) => {
    if (lesson.locked) return t.locked;
    if (lesson.progress === 100) return t.replay;
    if (lesson.progress > 0) return t.continue;
    return t.start;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 border-b border-gray-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen('student-dashboard')}
            className="p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl">{t.lessons}</h1>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
              className="whitespace-nowrap rounded-full"
            >
              {t[subject.toLowerCase() as keyof typeof t] || subject}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Lessons Grid */}
      <div className="p-4 space-y-4">
        {filteredLessons.map((lesson, index) => {
          const status = getLessonStatus(lesson);
          const SubjectIcon = subjectIcons[lesson.subject];
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-xl">
                    {lesson.icon}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base">{lesson.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <SubjectIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{lesson.subject}</span>
                          <Badge className={`text-xs ${difficultyColors[lesson.difficulty]}`}>
                            {t[lesson.difficulty.toLowerCase() as keyof typeof t]}
                          </Badge>
                        </div>
                      </div>
                      
                      {status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>

                    {lesson.progress > 0 && lesson.progress < 100 && (
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{t.inProgress}</span>
                          <span>{lesson.progress}%</span>
                        </div>
                        <Progress value={lesson.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>{lesson.points}</span>
                        <span>{t.points}</span>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => navigateToScreen('quiz', { lesson: lesson.id })}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        {getLessonButtonText(lesson)}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <BottomNavigation 
        activeScreen="lessons" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}