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
  const { user, isAuthenticated, setUser } = useUser();
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [selectedSimulation, setSelectedSimulation] = useState<string>('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Clear cache and reset state on refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('stem-quest-user');
      setUser(null);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [setUser]);
  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    
    const handlePopState = (event: PopStateEvent) => {
      // Get the target screen from the URL or default to login
      const path = window.location.pathname.substring(1) || 'login';
      
      // If we have state in the history, use it
      if (event.state?.screen) {
        setCurrentScreen(event.state.screen);
        if (event.state.data?.lesson) setSelectedLesson(event.state.data.lesson);
        if (event.state.data?.simulation) setSelectedSimulation(event.state.data.simulation);
      } 
      // If no state but we have a path, use that
      else if (path) {
        // Map the path to a valid screen
        const validScreens = [
          'login', 'signup', 'student-dashboard', 'teacher-dashboard', 
          'quiz', 'badges', 'leaderboard', 'profile', 'analytics', 'simulations'
        ];
        
        // If it's a valid screen, use it, otherwise default to dashboard based on role
        if (validScreens.includes(path)) {
          setCurrentScreen(path);
        } else {
          const defaultScreen = user?.role === 'student' ? 'student-dashboard' : 'teacher-dashboard';
          setCurrentScreen(defaultScreen);
          window.history.replaceState(
            { screen: defaultScreen },
            '',
            `/${defaultScreen}`
          );
        }
      }
    };

    // Initialize history state if it doesn't exist
    if (window.history.state === null || !window.history.state.screen) {
      const initialScreen = window.location.pathname.substring(1) || 'login';
      const validInitialScreen = [
        'login', 'signup', 'student-dashboard', 'teacher-dashboard', 
        'quiz', 'badges', 'leaderboard', 'profile', 'analytics'
      ].includes(initialScreen) && isAuthenticated ? initialScreen : 'login';
      
      window.history.replaceState(
        { screen: validInitialScreen },
        '',
        `/${validInitialScreen}`
      );
      setCurrentScreen(validInitialScreen);
    } else {
      // If we already have a valid state, use it
      const { screen, data } = window.history.state;
      const validScreen = [
        'login', 'signup', 'student-dashboard', 'teacher-dashboard', 
        'quiz', 'badges', 'leaderboard', 'profile', 'analytics'
      ].includes(screen) ? screen : (user?.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
      
      setCurrentScreen(validScreen);
      if (data?.lesson) setSelectedLesson(data.lesson);
      if (data?.simulation) setSelectedSimulation(data.simulation);
      
      // Ensure URL matches the valid screen
      if (screen !== validScreen) {
        window.history.replaceState(
          { screen: validScreen, data },
          '',
          `/${validScreen}`
        );
      }
    }
    
    // Add event listeners
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [user?.role]); // Only re-run if user role changes

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setCurrentScreen(user?.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
  };

  const navigateToScreen = (screen: string, data?: any) => {
    // Validate the screen
    const validScreens = [
      'login', 'signup', 'student-dashboard', 'teacher-dashboard', 
      'quiz', 'badges', 'leaderboard', 'profile', 'analytics', 'simulations'
    ];

    // If screen is not valid, default based on user role
    const targetScreen = validScreens.includes(screen) 
      ? screen 
      : (user?.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');

    // Only proceed if we're actually changing screens or data
    if (targetScreen !== currentScreen || (data && (data.lesson || data.simulation))) {
      // Update state first
      setCurrentScreen(targetScreen);
      if (data?.lesson) setSelectedLesson(data.lesson);
      if (data?.simulation) setSelectedSimulation(data.simulation);
      
      // Update the URL and push to history
      const newUrl = `/${targetScreen}`;
      const state = { screen: targetScreen, data };
      
      // Always use pushState for navigation to maintain proper history
      window.history.pushState(state, '', newUrl);
    }
  };

  const renderScreen = () => {
    // Create screen props without the key
    const screenProps = { user, navigateToScreen, language, setLanguage };
    
    // Helper function to create screen components with proper typing
    const createScreen = (Component: React.ComponentType<any>, props: any) => {
      return <Component {...props} />;
    };

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
        return createScreen(StudentDashboard, { ...screenProps });
      case 'teacher-dashboard':
        return createScreen(TeacherDashboard, { ...screenProps });
      case 'quiz':
        return createScreen(QuizScreen, { ...screenProps, lesson: selectedLesson });
      case 'simulations':
        return createScreen(STEMSimulations, { ...screenProps, simulation: selectedSimulation });
      case 'leaderboard':
        return createScreen(Leaderboard, { ...screenProps });
      case 'badges':
        return createScreen(BadgeCollection, { ...screenProps });
      case 'profile':
        return createScreen(ProfileScreen, { ...screenProps });
      case 'analytics':
        return createScreen(EnhancedAnalyticsPage, { ...screenProps });
      default:
        // If we somehow got to an invalid screen, redirect to the appropriate dashboard
        const defaultScreen = user?.role === 'student' ? 'student-dashboard' : 'teacher-dashboard';
        // Use setTimeout to avoid state updates during render
        setTimeout(() => navigateToScreen(defaultScreen), 0);
        return user?.role === 'student'
          ? createScreen(StudentDashboard, { ...screenProps })
          : createScreen(TeacherDashboard, { ...screenProps });
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
      
      <div className={`h-screen ${!isOnline ? 'pt-10' : ''}`}>
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {renderScreen()}
        </motion.div>
      </div>
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