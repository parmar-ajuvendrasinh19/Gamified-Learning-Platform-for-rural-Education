import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserRole, User } from './types';
import { useUser } from './UserContext';
import { UserPlus, GraduationCap, User as UserIcon } from 'lucide-react';

interface SignupScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Join STEM Quest!',
    subtitle: 'Create your account to start learning',
    name: 'Your Name',
    namePlaceholder: 'Enter your full name',
    role: 'I am a...',
    student: 'Student',
    teacher: 'Teacher',
    avatar: 'Choose Your Avatar',
    signupButton: 'Create Account',
    loginText: 'Already have an account?',
    loginLink: 'Login here',
    nameRequired: 'Name is required',
    roleRequired: 'Please select your role',
    avatarRequired: 'Please choose an avatar',
    nameLength: 'Name must be at least 2 characters'
  },
  hi: {
    title: 'STEM क्वेस्ट में शामिल हों!',
    subtitle: 'सीखना शुरू करने के लिए अपना खाता बनाएं',
    name: 'आपका नाम',
    namePlaceholder: 'अपना पूरा नाम दर्ज करें',
    role: 'मैं हूँ...',
    student: 'छात्र',
    teacher: 'शिक्षक',
    avatar: 'अपना अवतार चुनें',
    signupButton: 'खाता बनाएं',
    loginText: 'पहले से खाता है?',
    loginLink: 'यहाँ लॉगिन करें',
    nameRequired: 'नाम आवश्यक है',
    roleRequired: 'कृपया अपनी भूमिका चुनें',
    avatarRequired: 'कृपया एक अवतार चुनें',
    nameLength: 'नाम कम से कम 2 अक्षर का होना चाहिए'
  }
};

const avatars = {
  student: ['👨‍🎓', '👩‍🎓', '🧑‍🎓', '👦', '👧', '🧒'],
  teacher: ['👨‍🏫', '👩‍🏫', '🧑‍🏫', '👨‍💼', '👩‍💼', '🧑‍💼']
};

export default function SignupScreen({ onNavigate, language }: SignupScreenProps) {
  const { login } = useUser();
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [errors, setErrors] = useState<{ name?: string; role?: string; avatar?: string }>({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  const t = translations[language];

  const handleSignup = () => {
    const newErrors: { name?: string; role?: string; avatar?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = t.nameRequired;
    } else if (name.trim().length < 2) {
      newErrors.name = t.nameLength;
    }
    
    if (!role) {
      newErrors.role = t.roleRequired;
    }
    
    if (!selectedAvatar) {
      newErrors.avatar = t.avatarRequired;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: name.trim(),
      role: role as UserRole,
      avatar: selectedAvatar,
      points: role === 'student' ? 100 : 0, // Welcome bonus for students
      level: 1,
      badges: []
    };

    login(newUser);
    setShowOnboarding(true);
    setTimeout(() => {
      onNavigate(newUser.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
    }, 2000);
  };

  const availableAvatars = role ? avatars[role as UserRole] : [];

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
              🎉
            </motion.div>
          </div>
          <h2 className="text-2xl text-purple-600 mb-2">Account Created!</h2>
          <p className="text-gray-600">Welcome to your STEM learning journey!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
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

        {/* Signup Form */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-2">{t.title}</h2>
          </div>

          <div className="space-y-6">
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
                setSelectedAvatar(''); // Reset avatar when role changes
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

            {role && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label>{t.avatar}</Label>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {availableAvatars.map((avatar, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        if (errors.avatar) setErrors(prev => ({ ...prev, avatar: undefined }));
                      }}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                        selectedAvatar === avatar
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      {avatar}
                    </motion.button>
                  ))}
                </div>
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                )}
              </motion.div>
            )}

            <Button
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              size="lg"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {t.signupButton}
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {t.loginText}{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-purple-600 hover:text-purple-700 underline"
              >
                {t.loginLink}
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}