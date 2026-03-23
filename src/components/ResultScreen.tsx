import React from 'react';
import { Button, Typography, Space } from 'antd';
import { useQuiz } from '../context/QuizContext';

const { Title, Paragraph } = Typography;

const ResultScreen: React.FC = () => {
  const { score, questions, restartQuiz } = useQuiz();
  const totalQuestions = questions.length;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Quiz Results</Title>
      <Paragraph>
        You scored <Text strong>{score}</Text> out of <Text strong>{totalQuestions}</Text> correct answers!
      </Paragraph>
      <Button type="primary" size="large" onClick={restartQuiz}>
        Restart Quiz
      </Button>
    </Space>
  );
};

export default ResultScreen;
