import React from 'react';
import { motion } from 'motion/react';
import { Home, BookOpen, Trophy, Award, Users } from 'lucide-react';
import { User } from './types';

interface BottomNavigationProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  user: User | null;
}

const studentNavItems = [
  { id: 'student-dashboard', icon: Home, label: 'Home', labelHi: 'होम' },
  { id: 'quiz', icon: Trophy, label: 'Quiz', labelHi: 'प्रश्नोत्तरी' },
  { id: 'badges', icon: Award, label: 'Badges', labelHi: 'बैज' },
  { id: 'leaderboard', icon: Users, label: 'Leaderboard', labelHi: 'लीडरबोर्ड' },
  { id: 'profile', icon: Users, label: 'Profile', labelHi: 'प्रोफ़ाइल' }
];

const teacherNavItems = [
  { id: 'teacher-dashboard', icon: Home, label: 'Dashboard', labelHi: 'डैशबोर्ड' },
  { id: 'analytics', icon: Trophy, label: 'Analytics', labelHi: 'विश्लेषण' },
  { id: 'students', icon: Users, label: 'Students', labelHi: 'छात्र' },
  { id: 'profile', icon: Users, label: 'Profile', labelHi: 'प्रोफ़ाइल' }
];

export default function BottomNavigation({ activeScreen, onNavigate, user }: BottomNavigationProps) {
  const navItems = user?.role === 'student' ? studentNavItems : teacherNavItems;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-inset-bottom"
    >
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          const Icon = item.icon;
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              <span className={`text-xs ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-1 h-1 bg-white rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}