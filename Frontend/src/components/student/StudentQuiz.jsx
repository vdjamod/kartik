// src/pages/QuizPage.js

import React from "react";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const { id } = useParams(); // Access the quiz ID from the route parameter

  // Sample quiz data
  const quizData = {
    chapterName: "Sample Chapter",
    totalTime: "30 mins",
    questions: [
      {
        question: "What is React?",
        options: ["Library", "Framework", "Language"],
        correct: 0,
      },
      {
        question: "What is JSX?",
        options: ["Syntax", "Function", "Class"],
        correct: 0,
      },
      {
        question: "What is useState?",
        options: ["Hook", "Component", "Function"],
        correct: 0,
      },
      // Add more questions as needed
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Quiz: {quizData.chapterName}
        </h1>
        <p className="text-gray-700 mb-8">Total Time: {quizData.totalTime}</p>

        {quizData.questions.map((q, index) => (
          <div key={index} className="mb-6">
            <p className="text-lg font-semibold mb-2">
              {index + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    id={`q${index}o${i}`}
                    name={`q${index}`}
                    className="mr-2"
                  />
                  <label htmlFor={`q${index}o${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
