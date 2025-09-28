export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  class: number;
  role: UserRole;
  avatar: string;
  points: number;
  level: number;
  badges: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: 'Science' | 'Physics' | 'Math' | 'Technology';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  completed: boolean;
  progress: number;
  icon: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  progress: number;
  badges: Badge[];
}

export interface SimulationType {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}