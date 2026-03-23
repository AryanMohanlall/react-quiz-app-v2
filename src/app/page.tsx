import React from 'react';
import { QuizProvider, QuizPhase, useQuiz } from '../context/QuizContext';
import QuizLayout from '../components/Layout';
import StartScreen from '../components/StartScreen';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';

const QuizAppContent: React.FC = () => {
  const { quizPhase } = useQuiz();

  let content;
  switch (quizPhase) {
    case QuizPhase.Start:
      content = <StartScreen />;
      break;
    case QuizPhase.Quiz:
      content = <QuizScreen />;
      break;
    case QuizPhase.Results:
      content = <ResultScreen />;
      break;
    default:
      content = <StartScreen />;
  }

  return <QuizLayout>{content}</QuizLayout>;
};

export default function HomePage() {
  return (
    <QuizProvider>
      <QuizAppContent />
    </QuizProvider>
  );
}
