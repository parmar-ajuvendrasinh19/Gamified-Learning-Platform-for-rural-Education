import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Badge } from './components/ui/badge';
import { UserProvider, useUser } from './components/UserContext';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import OnboardingFlow from './components/OnboardingFlow';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import LessonList from './components/LessonList';
import QuizScreen from './components/QuizScreen';
import STEMSimulations from './components/STEMSimulations';
import Leaderboard from './components/Leaderboard';
import BadgeCollection from './components/BadgeCollection';
import ProfileScreen from './components/ProfileScreen';
import AnalyticsPage from './components/AnalyticsPage';
import EnhancedAnalyticsPage from './components/EnhancedAnalyticsPage';
import { WifiOff, Wifi } from 'lucide-react';

function AppContent() {
  const { user, isAuthenticated } = useUser();
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [selectedSimulation, setSelectedSimulation] = useState<string>('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setCurrentScreen(user?.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
  };

  const navigateToScreen = (screen: string, data?: any) => {
    if (data?.lesson) setSelectedLesson(data.lesson);
    if (data?.simulation) setSelectedSimulation(data.simulation);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    const screenProps = { user, navigateToScreen, language };

    // Authentication screens
    if (!isAuthenticated) {
      switch (currentScreen) {
        case 'login':
          return <LoginScreen onNavigate={navigateToScreen} language={language} setLanguage={setLanguage} />;
        case 'signup':
          return <SignupScreen onNavigate={navigateToScreen} language={language} />;
        default:
          return <LoginScreen onNavigate={navigateToScreen} language={language} setLanguage={setLanguage} />;
      }
    }

    // Show onboarding for new users
    if (showOnboarding) {
      return <OnboardingFlow onComplete={handleOnboardingComplete} language={language} />;
    }

    // Main app screens
    switch (currentScreen) {
      case 'student-dashboard':
        return <StudentDashboard {...screenProps} />;
      case 'teacher-dashboard':
        return <TeacherDashboard {...screenProps} />;
      case 'lessons':
        return <LessonList {...screenProps} setLanguage={setLanguage} />;
      case 'quiz':
        return <QuizScreen {...screenProps} lesson={selectedLesson} />;
      case 'simulations':
        return <STEMSimulations {...screenProps} simulation={selectedSimulation} />;
      case 'leaderboard':
        return <Leaderboard {...screenProps} />;
      case 'badges':
        return <BadgeCollection {...screenProps} />;
      case 'profile':
        return <ProfileScreen {...screenProps} />;
      case 'analytics':
        return <EnhancedAnalyticsPage {...screenProps} />;
      default:
        return user?.role === 'student' ? <StudentDashboard {...screenProps} /> : <TeacherDashboard {...screenProps} />;
    }
  };

  const offlineTranslations = {
    en: 'Offline Mode - Limited features available',
    hi: 'ऑफ़लाइन मोड - सीमित सुविधाएं उपलब्ध'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Offline Indicator */}
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 z-50"
        >
          <div className="flex items-center justify-center space-x-2">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm">{offlineTranslations[language]}</span>
          </div>
        </motion.div>
      )}
      
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`h-screen ${!isOnline ? 'pt-10' : ''}`}
      >
        {renderScreen()}
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}