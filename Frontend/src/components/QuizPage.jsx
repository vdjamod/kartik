import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Quiz from "../components/Quiz";

const QuizPage = () => {
  const [MCQ, setMCQ] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // Store user's selected answers
  const [score, setScore] = useState(null); // Store the user's score after submission
  const { stdid, subject, chapter } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post("http://localhost:3000/mcq/generate", {
        title: chapter,
        subject: subject,
      });

      setMCQ(response.data.mcq);
      console.log(response.data.mcq);
    };
    getData();
  }, [chapter, subject]);

  // Function to update user's selected answer
  const handleOptionChange = (questionId, optionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  // Function to handle quiz submission and calculate the score
  const handleSubmit = () => {
    let totalCorrect = 0;

    MCQ.forEach((question, index) => {
      // Compare user's answer with correct answer
      if (userAnswers[index] === question.correct) {
        totalCorrect += 1;
      }
    });

    // Set the score
    setScore({
      totalQuestions: MCQ.length,
      correctAnswers: totalCorrect,
      percentage: ((totalCorrect / MCQ.length) * 100).toFixed(2),
    });
    console.log(score);
  };

  const handleCancelQuiz = () => {
    navigate(`/student/${stdid}`);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Quiz: {chapter}</h1>
        {MCQ ? (
          <Quiz questions={MCQ} handleOptionChange={handleOptionChange} />
        ) : (
          <p>Loading</p>
        )}
        <button
          onClick={handleSubmit}
          className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Quiz
        </button>
        <button
          onClick={handleCancelQuiz}
          className="mt-8 ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cancel Quiz
        </button>

        {/* Display the marksheet after submission */}
        {score && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Marksheet</h2>
            <p>Total Questions: {score.totalQuestions}</p>
            <p>Correct Answers: {score.correctAnswers}</p>
            <p>Score Percentage: {score.percentage}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Option = ({ optionText, optionId, questionId, handleOptionChange }) => {
  return (
    <div>
      <input
        type="radio"
        id={`q${questionId}o${optionId}`}
        name={`q${questionId}`}
        className="mr-2"
        onChange={() => handleOptionChange(questionId, optionId)}
      />
      <label htmlFor={`q${questionId}o${optionId}`}>{optionText}</label>
    </div>
  );
};

const Question = ({
  questionText,
  options,
  questionId,
  handleOptionChange,
}) => {
  return (
    <div className="mb-6">
      <p className="text-lg font-semibold mb-2">
        {questionId + 1}. {questionText}
      </p>
      <div className="space-y-2">
        {options.map((option, i) => (
          <Option
            key={i}
            optionText={option}
            optionId={i}
            questionId={questionId}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </div>
    </div>
  );
};

const Quiz = ({ questions, handleOptionChange }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <Question
          key={index}
          questionId={index}
          questionText={question.question}
          options={question.options}
          handleOptionChange={handleOptionChange}
        />
      ))}
    </div>
  );
};

export default QuizPage;
