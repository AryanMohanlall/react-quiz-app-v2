import React, { ReactNode } from 'react';
import { Layout as AntLayout, Card } from 'antd';

interface QuizLayoutProps {
  children: ReactNode;
}

const { Content } = AntLayout;

const QuizLayout: React.FC<QuizLayoutProps> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '50px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          style={{
            width: '100%',
            maxWidth: 600,
            margin: '0 20px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: 8,
          }}
          bodyStyle={{ padding: '40px' }}
        >
          {children}
        </Card>
      </Content>
    </AntLayout>
  );
};

export default QuizLayout;
