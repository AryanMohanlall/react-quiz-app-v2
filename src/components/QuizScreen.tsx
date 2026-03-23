import React, { useState, useEffect } from 'react';
import { Button, Typography, Radio, Space, Progress } from 'antd';
import { useQuiz } from '../context/QuizContext';

const { Title, Text } = Typography;

const QuizScreen: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    selectAnswer,
    nextQuestion,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    userAnswers[currentQuestionIndex]
  );

  useEffect(() => {
    // Reset selected option when question changes
    setSelectedOptionIndex(userAnswers[currentQuestionIndex]);
  }, [currentQuestionIndex, userAnswers]);

  const handleOptionChange = (e: any) => {
    const newSelectedOptionIndex = e.target.value;
    setSelectedOptionIndex(newSelectedOptionIndex);
    selectAnswer(currentQuestionIndex, newSelectedOptionIndex);
  };

  const isNextButtonDisabled = selectedOptionIndex === null;
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Progress
        percent={progressPercent}
        showInfo={false}
        strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
        style={{ marginBottom: '20px' }}
      />
      <Text strong style={{ fontSize: '16px' }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>
      <Title level={3}>{currentQuestion.text}</Title>
      <Radio.Group
        onChange={handleOptionChange}
        value={selectedOptionIndex}
        style={{ width: '100%' }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {currentQuestion.options.map((option, index) => (
            <Radio
              key={index}
              value={index}
              style={{
                padding: '10px',
                border: selectedOptionIndex === index ? '1px solid #1890ff' : '1px solid #d9d9d9',
                borderRadius: '4px',
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {option}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      <Button
        type="primary"
        size="large"
        onClick={nextQuestion}
        disabled={isNextButtonDisabled}
        style={{ marginTop: '20px' }}
      >
        {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </Button>
    </Space>
  );
};

export default QuizScreen;
