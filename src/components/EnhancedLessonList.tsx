import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import BottomNavigation from './BottomNavigation';
import { User } from './types';
import { bilingualLessons, searchLessons, getLessonsBySubject, BilingualLesson } from './LessonData';
import LanguageSwitcher from './LanguageSwitcher';
import { ChevronLeft, Search, Play, Lock, CheckCircle, Atom, Calculator, Zap, Cpu, Clock, WifiOff, Star } from 'lucide-react';
import { Input } from './ui/input';

interface EnhancedLessonListProps {
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
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    completed: 'Completed',
    inProgress: 'In Progress',
    locked: 'Locked',
    continue: 'Continue',
    start: 'Start',
    replay: 'Replay',
    minutes: 'min',
    offlineAvailable: 'Available offline'
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
    beginner: 'शुरुआती',
    intermediate: 'मध्यम',
    advanced: 'उन्नत',
    completed: 'पूर्ण',
    inProgress: 'प्रगति में',
    locked: 'बंद',
    continue: 'जारी रखें',
    start: 'शुरू करें',
    replay: 'दोबारा खेलें',
    minutes: 'मिन',
    offlineAvailable: 'ऑफ़लाइन उपलब्ध'
  }
};

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800'
};

export default function EnhancedLessonList({ user, navigateToScreen, language, setLanguage }: EnhancedLessonListProps) {
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
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
          
          <div className="flex items-center space-x-2">
            {!isOnline && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </Badge>
            )}
            {setLanguage && (
              <LanguageSwitcher 
                language={language} 
                onLanguageChange={setLanguage}
                variant="toggle"
                size="sm"
              />
            )}
          </div>
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
              <Card className={`p-4 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                lesson.locked ? 'opacity-60' : ''
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${lesson.color} bg-gradient-to-r`}>
                    {lesson.icon}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base">{lesson.title[language]}</h3>
                        <p className="text-sm text-gray-600 mt-1">{lesson.description[language]}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <SubjectIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{lesson.subject}</span>
                          <Badge className={`text-xs ${difficultyColors[lesson.difficulty]}`}>
                            {t[lesson.difficulty.toLowerCase() as keyof typeof t]}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.duration} {t.minutes}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-1">
                        {status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {lesson.locked && (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        {!isOnline && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            {t.offlineAvailable}
                          </Badge>
                        )}
                      </div>
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
                      <div className="flex items-center space-x-2">
                        {lesson.progress === 100 && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">Completed</span>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        size="sm"
                        disabled={lesson.locked}
                        onClick={() => navigateToScreen('quiz', { lesson: lesson.id })}
                        className={`rounded-full ${
                          lesson.locked 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                        } text-white`}
                      >
                        {lesson.locked ? (
                          <Lock className="w-4 h-4 mr-1" />
                        ) : (
                          <Play className="w-4 h-4 mr-1" />
                        )}
                        {getLessonButtonText(lesson)}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg text-gray-600 mb-2">
              {language === 'en' ? 'No lessons found' : 'कोई पाठ नहीं मिला'}
            </h3>
            <p className="text-sm text-gray-500">
              {language === 'en' 
                ? 'Try adjusting your search or filter settings' 
                : 'अपनी खोज या फ़िल्टर सेटिंग्स को समायोजित करने का प्रयास करें'}
            </p>
          </div>
        )}
      </div>

      <BottomNavigation 
        activeScreen="lessons" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}