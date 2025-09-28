import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserRole, User } from '../types';
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
    subtitle: 'Login to continue your Eklavya journey',
    username: 'Username',
    usernamePlaceholder: 'Enter your username',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    class: 'Class',
    selectClass: 'Select your class',
    class6: 'Class 6',
    class7: 'Class 7',
    class8: 'Class 8',
    class9: 'Class 9',
    class10: 'Class 10',
    class11: 'Class 11',
    class12: 'Class 12',
    role: 'I am a...',
    student: 'Student',
    teacher: 'Teacher',
    loginButton: 'Login',
    signupText: "Don't have an account?",
    signupLink: 'Sign up here',
    usernameRequired: 'Username is required',
    passwordRequired: 'Password is required',
    classRequired: 'Please select your class',
    roleRequired: 'Please select your role'
  },
  hi: {
    title: 'वापसी पर स्वागत!',
    subtitle: 'अपनी Eklavya यात्रा जारी रखने के लिए लॉगिन करें',
    username: 'उपयोगकर्ता नाम',
    usernamePlaceholder: 'अपना उपयोगकर्ता नाम दर्ज करें',
    password: 'पासवर्ड',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    class: 'कक्षा',
    selectClass: 'अपनी कक्षा चुनें',
    class6: 'कक्षा 6',
    class7: 'कक्षा 7',
    class8: 'कक्षा 8',
    class9: 'कक्षा 9',
    class10: 'कक्षा 10',
    class11: 'कक्षा 11',
    class12: 'कक्षा 12',
    role: 'मैं हूँ...',
    student: 'छात्र',
    teacher: 'शिक्षक',
    loginButton: 'लॉगिन',
    signupText: 'कोई खाता नहीं है?',
    signupLink: 'यहाँ साइन अप करें',
    usernameRequired: 'उपयोगकर्ता नाम आवश्यक है',
    passwordRequired: 'पासवर्ड आवश्यक है',
    classRequired: 'कृपया अपनी कक्षा चुनें',
    roleRequired: 'कृपया अपनी भूमिका चुनें'
  }
};

const mockUsers = [
  { 
    username: 'alexk',
    password: 'student123',
    name: 'Alex Kumar',
    class: 8,
    role: 'student' as UserRole, 
    avatar: '👨‍🎓', 
    points: 1250, 
    level: 5, 
    badges: ['first-quiz', 'science-star'] 
  },
  { 
    username: 'priyas',
    password: 'student123',
    name: 'Priya Sharma',
    class: 10,
    role: 'student' as UserRole, 
    avatar: '👩‍🎓', 
    points: 2450, 
    level: 8, 
    badges: ['first-quiz', 'science-star', 'math-master'] 
  },
  { 
    username: 'priyap',
    password: 'teacher123',
    name: 'Priya Patel',
    class: 0,
    role: 'teacher' as UserRole, 
    avatar: '👩‍🏫', 
    points: 0, 
    level: 1, 
    badges: [] 
  },
  { 
    username: 'rajv',
    password: 'teacher123',
    name: 'Raj Verma',
    class: 0,
    role: 'teacher' as UserRole, 
    avatar: '👨‍🏫', 
    points: 0, 
    level: 1, 
    badges: [] 
  }
];

export default function LoginScreen({ onNavigate, language, setLanguage }: LoginScreenProps) {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userClass, setUserClass] = useState<number | ''>('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [errors, setErrors] = useState<{ 
    username?: string;
    password?: string;
    userClass?: string;
    role?: string;
    auth?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[language];

  const handleLogin = () => {
    const newErrors: typeof errors = {};
    
    if (!username.trim()) {
      newErrors.username = t.usernameRequired;
    }
    
    if (!password) {
      newErrors.password = t.passwordRequired;
    }
    
    if (!role) {
      newErrors.role = t.roleRequired;
    } else if (role === 'student' && !userClass) {
      newErrors.userClass = t.classRequired;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Find user by username and password
      let user = mockUsers.find(u => 
        u.username.toLowerCase() === username.trim().toLowerCase() && 
        u.password === password &&
        u.role === role
      );
      
      if (!user) {
        setErrors({
          auth: language === 'en' 
            ? 'Invalid username or password' 
            : 'अमान्य उपयोगकर्ता नाम या पासवर्ड'
        });
        setIsLoading(false);
        return;
      }
      
      // If student, verify class if provided
      if (role === 'student' && userClass && user.class !== userClass) {
        setErrors({
          auth: language === 'en'
            ? 'Invalid class for this user'
            : 'इस उपयोगकर्ता के लिए अमान्य कक्षा'
        });
        setIsLoading(false);
        return;
      }

      const fullUser: User = {
        ...user,
        id: Date.now().toString(),
        name: user.name,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ').slice(1).join(' '),
        class: role === 'student' ? (userClass as number) : 0
      };

      login(fullUser);
      setIsLoading(false);
      onNavigate(fullUser.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
    }, 1000);
  };

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
          <div className="w-24 h-24 mx-auto mb-4">
            <img 
              src="/images/eklavya-logo.jpg" 
              alt="Eklavya Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h1 className="text-3xl mb-2 font-bold text-gray-800">
            Eklavya
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
              <Label htmlFor="username">{t.username}</Label>
              <Input
                id="username"
                type="text"
                placeholder={t.usernamePlaceholder}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors(prev => ({ ...prev, username: undefined, auth: undefined }));
                }}
                className={errors.username || errors.auth ? 'border-red-500' : ''}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: undefined, auth: undefined }));
                }}
                className={errors.password || errors.auth ? 'border-red-500' : ''}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              {errors.auth && (
                <p className="text-red-500 text-sm mt-1">{errors.auth}</p>
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

            {role === 'student' && (
              <div>
                <Label htmlFor="class">{t.class}</Label>
                <Select 
                  value={userClass.toString()} 
                  onValueChange={(value) => {
                    setUserClass(parseInt(value));
                    if (errors.userClass) setErrors(prev => ({ ...prev, userClass: undefined }));
                  }}
                >
                  <SelectTrigger className={errors.userClass ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t.selectClass} />
                  </SelectTrigger>
                  <SelectContent>
                    {[6, 7, 8, 9, 10, 11, 12].map(grade => (
                      <SelectItem key={grade} value={grade.toString()}>
                        {t[`class${grade}` as keyof typeof t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.userClass && (
                  <p className="text-red-500 text-sm mt-1">{errors.userClass}</p>
                )}
              </div>
            )}

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              size="lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'en' ? 'Logging in...' : 'लॉगिन हो रहा है...'}
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  {t.loginButton}
                </>
              )}
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