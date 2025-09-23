export interface BilingualLesson {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  subject: 'Science' | 'Physics' | 'Math' | 'Technology';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  icon: string;
  color: string;
  progress: number; // 0-100
  locked: boolean;
}

export const bilingualLessons: BilingualLesson[] = [
  {
    id: '1',
    title: {
      en: 'Wave Properties',
      hi: 'तरंग गुण'
    },
    description: {
      en: 'Learn about sound waves, frequency, and amplitude',
      hi: 'ध्वनि तरंगों, आवृत्ति और आयाम के बारे में जानें'
    },
    subject: 'Physics',
    difficulty: 'Beginner',
    duration: 15,
    icon: '🌊',
    color: 'from-blue-400 to-cyan-500',
    progress: 75,
    locked: false
  },
  {
    id: '2',
    title: {
      en: 'Projectile Motion',
      hi: 'प्रक्षेप्य गति'
    },
    description: {
      en: 'Understand how objects move through the air',
      hi: 'समझें कि वस्तुएं हवा में कैसे चलती हैं'
    },
    subject: 'Physics',
    difficulty: 'Intermediate',
    duration: 20,
    icon: '🎯',
    color: 'from-green-400 to-emerald-500',
    progress: 45,
    locked: false
  },
  {
    id: '3',
    title: {
      en: 'Algebra Basics',
      hi: 'बीजगणित की मूल बातें'
    },
    description: {
      en: 'Master variables, equations, and problem solving',
      hi: 'चर, समीकरण और समस्या समाधान में महारत हासिल करें'
    },
    subject: 'Math',
    difficulty: 'Beginner',
    duration: 25,
    icon: '🧮',
    color: 'from-purple-400 to-pink-500',
    progress: 60,
    locked: false
  },
  {
    id: '4',
    title: {
      en: 'Chemical Reactions',
      hi: 'रासायनिक अभिक्रियाएं'
    },
    description: {
      en: 'Explore how atoms and molecules interact',
      hi: 'जानें कि परमाणु और अणु कैसे परस्पर क्रिया करते हैं'
    },
    subject: 'Science',
    difficulty: 'Intermediate',
    duration: 30,
    icon: '⚗️',
    color: 'from-orange-400 to-red-500',
    progress: 20,
    locked: false
  },
  {
    id: '5',
    title: {
      en: 'Digital Circuits',
      hi: 'डिजिटल सर्किट'
    },
    description: {
      en: 'Learn about logic gates and binary systems',
      hi: 'लॉजिक गेट्स और बाइनरी सिस्टम के बारे में जानें'
    },
    subject: 'Technology',
    difficulty: 'Advanced',
    duration: 35,
    icon: '💻',
    color: 'from-indigo-400 to-blue-600',
    progress: 0,
    locked: false
  },
  {
    id: '6',
    title: {
      en: 'WiFi Technology',
      hi: 'वाईफाई तकनीक'
    },
    description: {
      en: 'Understand wireless communication and signal propagation',
      hi: 'वायरलेस संचार और सिग्नल प्रसार को समझें'
    },
    subject: 'Technology',
    difficulty: 'Intermediate',
    duration: 18,
    icon: '📶',
    color: 'from-teal-400 to-cyan-600',
    progress: 85,
    locked: false
  },
  {
    id: '7',
    title: {
      en: 'Calculus Introduction',
      hi: 'कैलकुलस परिचय'
    },
    description: {
      en: 'Explore derivatives and integrals',
      hi: 'अवकलज और समाकलन का अन्वेषण करें'
    },
    subject: 'Math',
    difficulty: 'Advanced',
    duration: 40,
    icon: '📊',
    color: 'from-violet-400 to-purple-600',
    progress: 10,
    locked: true
  },
  {
    id: '8',
    title: {
      en: 'Cell Biology',
      hi: 'कोशिका जीव विज्ञान'
    },
    description: {
      en: 'Discover the building blocks of life',
      hi: 'जीवन के निर्माण खंडों की खोज करें'
    },
    subject: 'Science',
    difficulty: 'Beginner',
    duration: 22,
    icon: '🔬',
    color: 'from-emerald-400 to-green-600',
    progress: 55,
    locked: false
  }
];

export const getLessonsBySubject = (subject: string): BilingualLesson[] => {
  return bilingualLessons.filter(lesson => lesson.subject === subject);
};

export const getUnlockedLessons = (): BilingualLesson[] => {
  return bilingualLessons.filter(lesson => !lesson.locked);
};

export const searchLessons = (query: string, language: 'en' | 'hi'): BilingualLesson[] => {
  if (!query.trim()) return bilingualLessons;
  
  const lowercaseQuery = query.toLowerCase();
  return bilingualLessons.filter(lesson => 
    lesson.title[language].toLowerCase().includes(lowercaseQuery) ||
    lesson.description[language].toLowerCase().includes(lowercaseQuery) ||
    lesson.subject.toLowerCase().includes(lowercaseQuery)
  );
};