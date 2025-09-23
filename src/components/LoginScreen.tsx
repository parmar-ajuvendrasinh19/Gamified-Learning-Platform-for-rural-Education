import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserRole, User } from './types';
import { useUser } from './UserContext';
import { LogIn, User as UserIcon, GraduationCap, Globe } from 'lucide-react';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const translations = {
  en: {
    title: 'Welcome Back!',
    subtitle: 'Login to continue your STEM journey',
    name: 'Your Name',
    namePlaceholder: 'Enter your name',
    role: 'I am a...',
    student: 'Student',
    teacher: 'Teacher',
    loginButton: 'Login',
    signupText: "Don't have an account?",
    signupLink: 'Sign up here',
    nameRequired: 'Name is required',
    roleRequired: 'Please select your role'
  },
  hi: {
    title: 'वापसी पर स्वागत!',
    subtitle: 'अपनी STEM यात्रा जारी रखने के लिए लॉगिन करें',
    name: 'आपका नाम',
    namePlaceholder: 'अपना नाम दर्ज करें',
    role: 'मैं हूँ...',
    student: 'छात्र',
    teacher: 'शिक्षक',
    loginButton: 'लॉगिन',
    signupText: 'कोई खाता नहीं है?',
    signupLink: 'यहाँ साइन अप करें',
    nameRequired: 'नाम आवश्यक है',
    roleRequired: 'कृपया अपनी भूमिका चुनें'
  }
};

const mockUsers = [
  { name: 'Alex Kumar', role: 'student' as UserRole, avatar: '👨‍🎓', points: 1250, level: 5, badges: ['first-quiz', 'science-star'] },
  { name: 'Priya Sharma', role: 'student' as UserRole, avatar: '👩‍🎓', points: 2450, level: 8, badges: ['first-quiz', 'science-star', 'math-master'] },
  { name: 'Teacher Priya', role: 'teacher' as UserRole, avatar: '👩‍🏫', points: 0, level: 1, badges: [] },
  { name: 'Teacher Raj', role: 'teacher' as UserRole, avatar: '👨‍🏫', points: 0, level: 1, badges: [] }
];

export default function LoginScreen({ onNavigate, language, setLanguage }: LoginScreenProps) {
  const { login } = useUser();
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [errors, setErrors] = useState<{ name?: string; role?: string }>({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  const t = translations[language];

  const handleLogin = () => {
    const newErrors: { name?: string; role?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = t.nameRequired;
    }
    
    if (!role) {
      newErrors.role = t.roleRequired;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Try to find existing user or create new one
    let user = mockUsers.find(u => u.name.toLowerCase() === name.toLowerCase() && u.role === role);
    
    if (!user) {
      // Create new user for login
      user = {
        name: name.trim(),
        role: role as UserRole,
        avatar: role === 'student' ? '👨‍🎓' : '👩‍🏫',
        points: role === 'student' ? 100 : 0,
        level: 1,
        badges: []
      };
    }

    const fullUser: User = {
      id: Date.now().toString(),
      ...user
    };

    login(fullUser);
    setShowOnboarding(true);
    setTimeout(() => {
      onNavigate(fullUser.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
    }, 2000);
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-3xl"
            >
              🚀
            </motion.div>
          </div>
          <h2 className="text-2xl text-purple-600 mb-2">Welcome to STEM Quest!</h2>
          <p className="text-gray-600">Setting up your learning adventure...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Language Switcher */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4"
      >
        <div className="flex gap-2">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
            className="rounded-full"
          >
            <Globe className="w-4 h-4 mr-1" />
            EN
          </Button>
          <Button
            variant={language === 'hi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('hi')}
            className="rounded-full"
          >
            <Globe className="w-4 h-4 mr-1" />
            हिं
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🧬
            </motion.div>
          </div>
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            STEM Quest
          </h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Login Form */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-2">{t.title}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                }}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="role">{t.role}</Label>
              <Select value={role} onValueChange={(value: UserRole) => {
                setRole(value);
                if (errors.role) setErrors(prev => ({ ...prev, role: undefined }));
              }}>
                <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t.role} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>{t.student}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="w-4 h-4" />
                      <span>{t.teacher}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              size="lg"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {t.loginButton}
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {t.signupText}{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-purple-600 hover:text-purple-700 underline"
              >
                {t.signupLink}
              </button>
            </p>
          </div>
        </Card>

        {/* Quick Login Options */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600 mb-3">Quick Login (Demo):</p>
          <div className="grid grid-cols-2 gap-2">
            {mockUsers.slice(0, 4).map((user, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  const fullUser: User = {
                    id: Date.now().toString(),
                    ...user
                  };
                  login(fullUser);
                  onNavigate(fullUser.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
                }}
                className="text-xs"
              >
                {user.avatar} {user.name}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}