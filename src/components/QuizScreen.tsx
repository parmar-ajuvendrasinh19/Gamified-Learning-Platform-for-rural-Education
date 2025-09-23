import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { User } from './types';
import { useUser } from './UserContext';
import { getRandomQuestions, QuizQuestion } from './QuizData';
import { ChevronLeft, CheckCircle, XCircle, Trophy, Star } from 'lucide-react';

interface QuizScreenProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
  lesson: string;
}



const translations = {
  en: {
    quiz: 'Quiz',
    question: 'Question',
    of: 'of',
    score: 'Score',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    explanation: 'Explanation',
    next: 'Next',
    finish: 'Finish Quiz',
    wellDone: 'Well Done!',
    quizComplete: 'Quiz Complete',
    yourScore: 'Your Score',
    points: 'points',
    earnedBadge: 'You earned a badge!',
    backToLessons: 'Back to Lessons',
    tryAgain: 'Try Again',
    excellent: 'Excellent!',
    good: 'Good Job!',
    needsPractice: 'Keep Practicing!'
  },
  hi: {
    quiz: 'प्रश्नोत्तरी',
    question: 'प्रश्न',
    of: 'का',
    score: 'स्कोर',
    correct: 'सही!',
    incorrect: 'गलत',
    explanation: 'स्पष्टीकरण',
    next: 'अगला',
    finish: 'प्रश्नोत्तरी समाप्त करें',
    wellDone: 'बहुत बढ़िया!',
    quizComplete: 'प्रश्नोत्तरी पूर्ण',
    yourScore: 'आपका स्कोर',
    points: 'अंक',
    earnedBadge: 'आपने बैज अर्जित किया!',
    backToLessons: 'पाठों पर वापस जाएं',
    tryAgain: 'फिर से कोशिश करें',
    excellent: 'उत्कृष्ट!',
    good: 'अच्छा काम!',
    needsPractice: 'अभ्यास जारी रखें!'
  }
};

export default function QuizScreen({ user, navigateToScreen, language, lesson }: QuizScreenProps) {
  const { updateUser } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  
  const t = translations[language];

  // Load questions based on lesson subject
  useEffect(() => {
    const lessonSubjectMap: { [key: string]: string } = {
      '1': 'Physics',
      '2': 'Physics', 
      '3': 'Math',
      '4': 'Science',
      '5': 'Technology',
      '6': 'Technology'
    };
    
    const subject = lesson ? lessonSubjectMap[lesson] : undefined;
    const quizQuestions = getRandomQuestions(subject, 5);
    setQuestions(quizQuestions);
  }, [lesson]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p>Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  const quiz = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Get localized content
  const getLocalizedQuestion = () => language === 'hi' ? quiz.questionHi : quiz.question;
  const getLocalizedOptions = () => language === 'hi' ? quiz.optionsHi : quiz.options;
  const getLocalizedExplanation = () => language === 'hi' ? quiz.explanationHi : quiz.explanation;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === quiz.correctAnswer) {
      setScore(score + 20);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
      
      // Award points and badges
      if (user) {
        const pointsEarned = score;
        updateUser({ 
          points: user.points + pointsEarned,
          level: Math.floor((user.points + pointsEarned) / 500) + 1
        });

        // Award subject-specific badge if high score
        if (score >= 80 && questions.length > 0) {
          const subject = questions[0].subject.toLowerCase();
          const subjectBadge = `${subject}-master`;
          if (!user.badges.includes(subjectBadge)) {
            updateUser({ badges: [...user.badges, subjectBadge] });
            setTimeout(() => setShowBadgeAnimation(true), 500);
          }
        }
      }
    }
  };

  const getScoreMessage = () => {
    if (score >= 90) return t.excellent;
    if (score >= 70) return t.good;
    return t.needsPractice;
  };

  if (!user) return null;

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 text-center space-y-6 bg-white/90 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
            </motion.div>

            <div>
              <h2 className="text-2xl mb-2">{t.wellDone}</h2>
              <p className="text-gray-600">{t.quizComplete}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">{t.yourScore}</p>
              <div className="text-3xl text-purple-600">{score}/100</div>
              <p className="text-sm text-gray-600 mt-1">{getScoreMessage()}</p>
            </div>

            {score >= 80 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
              >
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-yellow-800">{t.earnedBadge}</p>
                <Badge className="bg-yellow-100 text-yellow-800 mt-2">🌟 Quiz Master</Badge>
              </motion.div>
            )}

            <div className="space-y-2">
              <Button
                onClick={() => navigateToScreen('lessons')}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {t.backToLessons}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setShowFeedback(false);
                  setScore(0);
                  setQuizComplete(false);
                  setShowBadgeAnimation(false);
                }}
                className="w-full"
              >
                {t.tryAgain}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 border-b border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen('lessons')}
            className="p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg">{t.quiz}</h1>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">{score}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{t.question} {currentQuestion + 1} {t.of} {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </motion.div>

      {/* Question Card */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm">
              <h2 className="text-lg mb-6 leading-relaxed">{getLocalizedQuestion()}</h2>

              <div className="space-y-3">
                {getLocalizedOptions().map((option, index) => {
                  let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ";
                  
                  if (showFeedback) {
                    if (index === quiz.correctAnswer) {
                      buttonClass += "border-green-500 bg-green-50 text-green-800";
                    } else if (index === selectedAnswer && index !== quiz.correctAnswer) {
                      buttonClass += "border-red-500 bg-red-50 text-red-800";
                    } else {
                      buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                    }
                  } else {
                    buttonClass += selectedAnswer === index 
                      ? "border-purple-500 bg-purple-50" 
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50";
                  }

                  return (
                    <motion.button
                      key={index}
                      whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showFeedback && (
                          <div>
                            {index === quiz.correctAnswer && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            {index === selectedAnswer && index !== quiz.correctAnswer && (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className={`p-4 mb-4 ${
                selectedAnswer === quiz.correctAnswer 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {selectedAnswer === quiz.correctAnswer ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">{t.correct}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800">{t.incorrect}</span>
                    </>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.explanation}:</p>
                  <p className="text-sm">{getLocalizedExplanation()}</p>
                </div>
              </Card>

              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {currentQuestion < questions.length - 1 ? t.next : t.finish}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}