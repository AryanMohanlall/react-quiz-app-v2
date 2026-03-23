import React from 'react';
import { Button, Typography, Space } from 'antd';
import { useQuiz } from '../context/QuizContext';

const { Title, Paragraph } = Typography;

const StartScreen: React.FC = () => {
  const { startQuiz } = useQuiz();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Welcome to the React Quiz!</Title>
      <Paragraph>Test your knowledge with a series of challenging questions.</Paragraph>
      <Button type="primary" size="large" onClick={startQuiz}>
        Start Quiz
      </Button>
    </Space>
  );
};

export default StartScreen;
