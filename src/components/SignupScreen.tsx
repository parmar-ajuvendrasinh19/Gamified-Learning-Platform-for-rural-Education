import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserRole, User } from '../types';
import { useUser } from './UserContext';
import { UserPlus, GraduationCap, User as UserIcon } from 'lucide-react';

interface SignupScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Join Eklavya!',
    subtitle: 'Create your account to start learning',
    firstName: 'First Name',
    lastName: 'Last Name',
    firstNamePlaceholder: 'Enter your first name',
    lastNamePlaceholder: 'Enter your last name',
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
    avatar: 'Choose Your Avatar',
    signupButton: 'Create Account',
    loginText: 'Already have an account?',
    loginLink: 'Login here',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    classRequired: 'Please select your class',
    roleRequired: 'Please select your role',
    avatarRequired: 'Please choose an avatar',
    nameLength: 'Name must be at least 2 characters'
  },
  hi: {
    title: 'Eklavya में शामिल हों!',
    subtitle: 'सीखना शुरू करने के लिए अपना खाता बनाएं',
    firstName: 'प्रथम नाम',
    lastName: 'अंतिम नाम',
    firstNamePlaceholder: 'अपना प्रथम नाम दर्ज करें',
    lastNamePlaceholder: 'अपना अंतिम नाम दर्ज करें',
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
    avatar: 'अपना अवतार चुनें',
    signupButton: 'खाता बनाएं',
    loginText: 'पहले से खाता है?',
    loginLink: 'यहाँ लॉगिन करें',
    firstNameRequired: 'प्रथम नाम आवश्यक है',
    lastNameRequired: 'अंतिम नाम आवश्यक है',
    classRequired: 'कृपया अपनी कक्षा चुनें',
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userClass, setUserClass] = useState<number | ''>('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [errors, setErrors] = useState<{ 
    firstName?: string; 
    lastName?: string;
    userClass?: string;
    role?: string; 
    avatar?: string 
  }>({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  const t = translations[language];

  const handleSignup = () => {
    const newErrors: typeof errors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = t.firstNameRequired;
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = t.nameLength;
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = t.lastNameRequired;
    } else if (lastName.trim().length < 2) {
      newErrors.lastName = t.nameLength;
    }
    
    if (!userClass) {
      newErrors.userClass = t.classRequired;
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
      name: `${firstName.trim()} ${lastName.trim()}`.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      class: userClass as number,
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
          <p className="text-gray-600">Welcome to your Eklavya learning journey!</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t.firstName}</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder={t.firstNamePlaceholder}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors(prev => ({ ...prev, firstName: undefined }));
                  }}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">{t.lastName}</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder={t.lastNamePlaceholder}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName) setErrors(prev => ({ ...prev, lastName: undefined }));
                  }}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

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