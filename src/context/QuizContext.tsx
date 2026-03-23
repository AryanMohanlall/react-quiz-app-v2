import React, { createContext, useContext, useState, ReactNode } from 'react';

// Core Entities as defined in the README
interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

enum QuizPhase {
  Start = 'START',
  Quiz = 'QUIZ',
  Results = 'RESULTS',
}

type UserAnswers = (number | null)[];

// Hardcoded Quiz Questions
const QUIZ_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswerIndex: 2,
  },
  {
    id: '2',
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswerIndex: 1,
  },
  {
    id: '3',
    text: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correctAnswerIndex: 3,
  },
  {
    id: '4',
    text: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctAnswerIndex: 2,
  },
  {
    id: '5',
    text: 'What is the chemical symbol for water?',
    options: ['O2', 'H2O', 'CO2', 'NaCl'],
    correctAnswerIndex: 1,
  },
];

interface QuizContextType {
  quizPhase: QuizPhase;
  currentQuestionIndex: number;
  userAnswers: UserAnswers;
  questions: Question[];
  startQuiz: () => void;
  selectAnswer: (questionIndex: number, optionIndex: number) => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
  score: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizPhase, setQuizPhase] = useState<QuizPhase>(QuizPhase.Start);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(
    new Array(QUIZ_QUESTIONS.length).fill(null)
  );

  const calculateScore = (): number => {
    return userAnswers.reduce((totalScore, userAnswer, index) => {
      if (userAnswer !== null && userAnswer === QUIZ_QUESTIONS[index].correctAnswerIndex) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);
  };

  const startQuiz = () => {
    setQuizPhase(QuizPhase.Quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
  };

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = optionIndex;
      return newAnswers;
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizPhase(QuizPhase.Results);
    }
  };

  const restartQuiz = () => {
    setQuizPhase(QuizPhase.Start);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
  };

  const score = calculateScore();

  const value = {
    quizPhase,
    currentQuestionIndex,
    userAnswers,
    questions: QUIZ_QUESTIONS,
    startQuiz,
    selectAnswer,
    nextQuestion,
    restartQuiz,
    score,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export { QuizPhase };
