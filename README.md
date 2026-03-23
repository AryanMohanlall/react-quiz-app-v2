# React Quiz App

## Table of Contents
1.  [Introduction](#introduction)
2.  [Features](#features)
3.  [Technology Stack](#technology-stack)
4.  [Architecture Overview](#architecture-overview)
    *   [Core Entities](#core-entities)
    *   [Component Structure](#component-structure)
    *   [State Management](#state-management)
    *   [Data Flow](#data-flow)
5.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the Application](#running-the-application)
6.  [Usage](#usage)
7.  [Future Enhancements](#future-enhancements)
8.  [License](#license)

---

## 1. Introduction
The React Quiz App is a straightforward, single-page web application designed to offer an interactive quiz experience. Developed using Next.js, TypeScript, and Ant Design, it provides a clean and intuitive user interface for taking a multiple-choice quiz. The application manages the entire quiz flow from start to finish, including displaying questions, tracking user answers, calculating scores, and offering a restart option, all without requiring any backend services.

## 2. Features
This application implements the following key features to deliver a complete quiz experience:

*   **Start Screen**: An initial screen presenting the quiz title and a prominent "Start Quiz" button.
*   **Quiz Screen**: Displays one question at a time with four multiple-choice answer options.
*   **Answer Selection**: Users can select one answer option per question. The selected answer is visually highlighted.
*   **Progress Indicator**: Clearly shows the user's progress (e.g., "Question X of Y").
*   **Navigation**: A "Next" button to proceed to the subsequent question after an answer has been selected.
*   **Score Tracking**: Internally tracks the user's selected answers and compares them against the correct answers.
*   **Results Screen**: Upon completing all questions, displays the final score (number of correct answers).
*   **Restart Quiz**: A button on the results screen to reset the quiz and start over from the beginning.
*   **Hardcoded Data**: All quiz questions, options, and correct answers are hardcoded within the application.
*   **Clean UI/UX**: Minimalist, centered design with responsive components provided by Ant Design for an optimal user experience.

## 3. Technology Stack
The project leverages a modern web development stack to ensure robustness, maintainability, and a great developer experience:

*   **Framework**: **Next.js**
    *   Provides a powerful React framework for building server-rendered or statically generated applications. For this project, it offers an excellent development environment, file-system routing, and a streamlined build process for a single-page React application.
*   **Language**: **TypeScript**
    *   Enhances JavaScript by adding static type definitions, leading to fewer runtime errors, improved code readability, and better maintainability, especially in larger codebases.
*   **Styling**: **Ant Design**
    *   A comprehensive UI component library that provides high-quality, enterprise-level components. It helps in quickly building a visually appealing, consistent, and responsive user interface with minimal custom CSS.

## 4. Architecture Overview

### Core Entities
The application manages its state and data around a few key conceptual entities:

*   **`Question`**: Represents a single quiz question.
    ```typescript
    interface Question {
      id: string; // Unique identifier
      text: string; // The question text
      options: string[]; // An array of multiple-choice answer strings
      correctAnswerIndex: number; // The 0-based index of the correct answer within the 'options' array
    }
    ```
*   **`QuizPhase`**: An enumeration to represent the current stage of the quiz.
    ```typescript
    enum QuizPhase {
      Start = 'START',
      Quiz = 'QUIZ',
      Results = 'RESULTS',
    }
    ```
*   **`UserAnswers`**: An array to store the user's selected answer for each question.
    ```typescript
    type UserAnswers = (number | null)[]; // An array where index corresponds to question index,
                                        // and value is the 0-based index of the selected option, or null if not answered.
    ```
*   **`Score`**: A calculated value representing the number of correct answers.

### Component Structure
The application follows a modular component-based architecture:

*   **`pages/index.tsx`**: The main entry point of the application, orchestrating the display of different screens based on the current `QuizPhase`.
*   **`components/Layout.tsx`**: A wrapper component to provide consistent styling, centering, and responsiveness across the application using Ant Design's `Layout` and `Card` components.
*   **`components/StartScreen.tsx`**: Displays the initial welcome message and the "Start Quiz" button.
*   **`components/QuizScreen.tsx`**: Manages the display of individual questions, answer options, progress indicator, and the "Next" button. It interacts with the global quiz state to update selected answers and advance the quiz.
*   **`components/ResultScreen.tsx`**: Presents the user's final score and a "Restart Quiz" button.
*   **`context/QuizContext.tsx`**: A React Context provider to manage and share the global quiz state (current phase, questions, user answers, current question index) across components without prop drilling.

### State Management
The application employs a combination of React's built-in state management tools:

*   **`useState`**: Used for managing local component-specific UI states (e.g., `selectedOptionIndex` within `QuizScreen`).
*   **`useContext`**: A `QuizContext` is implemented to manage the global state of the quiz, including:
    *   `quizPhase`: Current state of the quiz (`Start`, `Quiz`, `Results`).
    *   `currentQuestionIndex`: The index of the question currently being displayed.
    *   `userAnswers`: An array tracking the user's selected answer for each question.
    *   `questions`: The hardcoded array of `Question` objects.
    *   Functions to `startQuiz`, `selectAnswer`, `nextQuestion`, and `restartQuiz`.

### Data Flow
1.  **Initialization**: On application load, `pages/index.tsx` initializes the `QuizContext` with hardcoded questions and sets the `quizPhase` to `Start`.
2.  **Start Quiz**: The `StartScreen` dispatches an action (via `QuizContext`) to change `quizPhase` to `Quiz`.
3.  **Quiz Progression**: `QuizScreen` renders the question corresponding to `currentQuestionIndex`. User interaction (selecting an answer) updates `userAnswers` in the context. Clicking "Next" increments `currentQuestionIndex`.
4.  **Quiz Completion**: When `currentQuestionIndex` exceeds the number of questions, the `quizPhase` transitions to `Results`.
5.  **Results Display**: `ResultScreen` calculates and displays the final score based on `userAnswers` and the `questions` data.
6.  **Restart**: The "Restart Quiz" button dispatches an action to reset `currentQuestionIndex`, `userAnswers`, and set `quizPhase` back to `Start`.

## 5. Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your system:

*   Node.js (LTS version recommended, e.g., v18.x or v20.x)
*   npm (comes with Node.js) or Yarn

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/react-quiz-app.git
    cd react-quiz-app
    ```
    *(Note: Replace `your-username/react-quiz-app.git` with the actual repository URL if available)*

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application
To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:3000` in your web browser.

## 6. Usage
1.  **Start Screen**: Click the "Start Quiz" button to begin.
2.  **Quiz Screen**:
    *   Read the question and select one of the four multiple-choice answers.
    *   Your selection will be visually highlighted.
    *   Click the "Next" button to proceed to the next question.
    *   The progress indicator ("Question X of Y") will update as you advance.
3.  **Results Screen**:
    *   After answering all questions, your final score will be displayed.
    *   Click the "Restart Quiz" button to play again.

## 7. Future Enhancements
*   **Timer**: Implement a countdown timer for each question or the entire quiz.
*   **Categories/Difficulty**: Allow users to select quiz categories or difficulty levels.
*   **Local Storage**: Persist high scores or quiz progress using browser local storage.
*   **Animations**: Add subtle animations for screen transitions and answer selections for a more polished feel.
*   **Backend Integration**: Integrate with a simple API to fetch quiz questions dynamically, enabling content updates without code changes.
*   **Feedback**: Provide immediate feedback (correct/incorrect) after each answer selection.

## 8. License
This project is open-source and available under the [MIT License](LICENSE).
*(Note: Create a `LICENSE` file in the root of your project if you choose to include one.)*

---