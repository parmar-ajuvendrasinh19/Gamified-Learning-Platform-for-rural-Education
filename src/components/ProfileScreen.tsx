import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import BottomNavigation from './BottomNavigation';
import { useUser } from './UserContext';
import { ChevronLeft, Edit2, Save, X, LogOut, Trophy, Star, Target, Zap } from 'lucide-react';

interface ProfileScreenProps {
  user: any;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
}

const translations = {
  en: {
    profile: 'Profile',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    logout: 'Logout',
    personalInfo: 'Personal Information',
    name: 'Name',
    role: 'Role',
    class: 'Class',
    level: 'Level',
    totalPoints: 'Total Points',
    badges: 'Badges Earned',
    progress: 'Progress',
    statistics: 'Statistics',
    lessonsCompleted: 'Lessons Completed',
    quizzesCompleted: 'Quizzes Completed',
    averageScore: 'Average Score',
    studyStreak: 'Study Streak',
    student: 'Student',
    teacher: 'Teacher',
    days: 'days',
    achievements: 'Achievements',
    recentActivity: 'Recent Activity',
    completedQuiz: 'Completed Physics Quiz',
    earnedBadge: 'Earned Science Star badge',
    startedLesson: 'Started Math lesson',
    minutes: 'min ago',
    hours: 'hours ago',
    selectAvatar: 'Select Avatar',
    changesSaved: 'Changes saved successfully!',
    logoutConfirm: 'Are you sure you want to logout?',
    confirmLogout: 'Confirm Logout',
    cancelLogout: 'Cancel'
  },
  hi: {
    profile: 'प्रोफ़ाइल',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    saveChanges: 'परिवर्तन सहेजें',
    cancel: 'रद्द करें',
    logout: 'लॉगआउट',
    personalInfo: 'व्यक्तिगत जानकारी',
    name: 'नाम',
    role: 'भूमिका',
    class: 'कक्षा',
    level: 'स्तर',
    totalPoints: 'कुल अंक',
    badges: 'अर्जित बैज',
    progress: 'प्रगति',
    statistics: 'आंकड़े',
    lessonsCompleted: 'पूर्ण पाठ',
    quizzesCompleted: 'पूर्ण प्रश्नोत्तरी',
    averageScore: 'औसत स्कोर',
    studyStreak: 'अध्ययन शृंखला',
    student: 'छात्र',
    teacher: 'शिक्षक',
    days: 'दिन',
    achievements: 'उपलब्धियां',
    recentActivity: 'हालिया गतिविधि',
    completedQuiz: 'भौतिकी प्रश्नोत्तरी पूरी की',
    earnedBadge: 'विज्ञान स्टार बैज अर्जित किया',
    startedLesson: 'गणित पाठ शुरू किया',
    minutes: 'मिनट पहले',
    hours: 'घंटे पहले',
    selectAvatar: 'अवतार चुनें',
    changesSaved: 'परिवर्तन सफलतापूर्वक सहेजे गए!',
    logoutConfirm: 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
    confirmLogout: 'लॉगआउट की पुष्टि करें',
    cancelLogout: 'रद्द करें'
  }
};

const avatars = {
  student: ['👨‍🎓', '👩‍🎓', '🧑‍🎓', '👦', '👧', '🧒'],
  teacher: ['👨‍🏫', '👩‍🏫', '🧑‍🏫', '👨‍💼', '👩‍💼', '🧑‍💼']
};

const badgeIcons: { [key: string]: string } = {
  'first-quiz': '🎯',
  'science-star': '⭐',
  'math-master': '🧮',
  'physics-pro': '⚛️',
  'perfect-score': '💯'
};

export default function ProfileScreen({ user: propUser, navigateToScreen, language }: ProfileScreenProps) {
  const { user, updateUser, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const t = translations[language];

  if (!user) return null;

  const handleSaveChanges = () => {
    if (editName.trim()) {
      updateUser({
        name: editName.trim(),
        avatar: editAvatar
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditName(user.name);
    setEditAvatar(user.avatar);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigateToScreen('login');
  };

  const progressToNextLevel = ((user.points % 500) / 500) * 100;
  const availableAvatars = avatars[user.role];

  const mockStats = {
    lessonsCompleted: user.role === 'student' ? 12 : 0,
    quizzesCompleted: user.role === 'student' ? 8 : 0,
    averageScore: user.role === 'student' ? 85 : 0,
    studyStreak: user.role === 'student' ? 7 : 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-b-3xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToScreen(user.role === 'student' ? 'student-dashboard' : 'teacher-dashboard')}
              className="p-2 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl">{t.profile}</h1>
          </div>
          <div className="flex space-x-2">
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-white hover:bg-white/20"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogoutConfirm(true)}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="text-center">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">{t.selectAvatar}</Label>
                <div className="flex justify-center space-x-2 flex-wrap">
                  {availableAvatars.map((avatar, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditAvatar(avatar)}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                        editAvatar === avatar
                          ? 'border-white bg-white/20'
                          : 'border-white/50 hover:border-white hover:bg-white/10'
                      }`}
                    >
                      {avatar}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-center bg-white/20 border-white/50 text-white placeholder-white/70"
                />
              </div>
              <div className="flex space-x-2 justify-center">
                <Button
                  onClick={handleSaveChanges}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <Save className="w-4 h-4 mr-1" />
                  {t.saveChanges}
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4 mr-1" />
                  {t.cancel}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-6xl mb-2">{user.avatar}</div>
              <h2 className="text-2xl mb-1">{user.name}</h2>
              <p className="text-white/80 capitalize">{user.role === 'student' ? t.student : t.teacher}</p>
            </>
          )}
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <h3 className="text-lg mb-3">{t.personalInfo}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.name}:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.role}:</span>
                <span className="capitalize">{user.role === 'student' ? t.student : t.teacher}</span>
              </div>
              {user.role === 'student' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.class}:</span>
                    <span>Class {user.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.level}:</span>
                    <span>{user.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.totalPoints}:</span>
                    <span>{user.points}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{t.progress}:</span>
                      <span>{Math.round(progressToNextLevel)}%</span>
                    </div>
                    <Progress value={progressToNextLevel} className="h-2" />
                  </div>
                </>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Student Statistics */}
        {user.role === 'student' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 bg-white/80 backdrop-blur-sm">
              <h3 className="text-lg mb-3">{t.statistics}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-2xl text-blue-600 mb-1">{mockStats.lessonsCompleted}</div>
                  <p className="text-xs text-gray-600">{t.lessonsCompleted}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-2xl text-green-600 mb-1">{mockStats.quizzesCompleted}</div>
                  <p className="text-xs text-gray-600">{t.quizzesCompleted}</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-2xl text-purple-600 mb-1">{mockStats.averageScore}%</div>
                  <p className="text-xs text-gray-600">{t.averageScore}</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-xl">
                  <div className="text-2xl text-orange-600 mb-1">{mockStats.studyStreak}</div>
                  <p className="text-xs text-gray-600">{t.studyStreak} {t.days}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Badges */}
        {user.role === 'student' && user.badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 bg-white/80 backdrop-blur-sm">
              <h3 className="text-lg mb-3">{t.achievements}</h3>
              <div className="grid grid-cols-4 gap-3">
                {user.badges.map((badgeId, index) => (
                  <motion.div
                    key={badgeId}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200"
                  >
                    <div className="text-2xl mb-1">{badgeIcons[badgeId] || '🏆'}</div>
                    <p className="text-xs text-gray-600 capitalize">{badgeId.replace('-', ' ')}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <h3 className="text-lg mb-3">{t.recentActivity}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{t.completedQuiz}</p>
                  <p className="text-xs text-gray-500">15 {t.minutes}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{t.earnedBadge}</p>
                  <p className="text-xs text-gray-500">2 {t.hours}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
          >
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg">{t.confirmLogout}</h3>
              <p className="text-gray-600">{t.logoutConfirm}</p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  {t.logout}
                </Button>
                <Button
                  onClick={() => setShowLogoutConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  {t.cancelLogout}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <BottomNavigation 
        activeScreen="profile" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}