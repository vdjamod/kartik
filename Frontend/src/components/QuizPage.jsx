// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams, useLocation } from "react-router-dom";

// // const QuizPage = () => {
// //   const location = useLocation();
// //   const { text } = location.state || {}; // Get the passed data
// //   const { stdid, subject, chapter } = useParams();
// //   const navigate = useNavigate();

// //   const [mcqs, setMcqs] = useState([]);
// //   const [userAnswers, setUserAnswers] = useState({}); // Store user's selected answers
// //   const [score, setScore] = useState(null); // Store the user's score after submission

// //   const [student_level, setStudentLevel] = useState();

// //   useEffect(() => {
// //     const getData = async () => {
// //       try {
// //         const res = await axios.post("/api/mcq", { text });
// //         console.log(res.data);
// //         setMcqs(res.data["mcqs"]);
// //       } catch (error) {
// //         console.log("Error: " + error);
// //       }
// //     };
// //     getData();
// //   }, [chapter, subject]);

// //   const handleAnswerChange = (questionIndex, selectedOption) => {
// //     setUserAnswers((prev) => ({
// //       ...prev,
// //       [questionIndex]: selectedOption,
// //     }));
// //   };

// //   const handleSubmit = async () => {
// //     let correctAnswers = 0;

// //     mcqs.forEach((mcq, index) => {
// //       if (userAnswers[index] === mcq.correctAnswer) {
// //         correctAnswers++;
// //       }
// //     });

// //     setScore(correctAnswers);

// //     if(score >= 4) {
// //       setStudentLevel("pro");
// //     } else if(score == 3 || score == 2) {
// //       setStudentLevel("medium");
// //     } else {
// //       setStudentLevel("beginner");
// //     }


// //     const res = await axios.post('/dashboard/post-growth', {
// //       id: stdid,
// //       chapter,
// //       student_level,
// //       subject
// //     });

// //     console.log(res);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold text-center mb-6">Quiz</h1>
// //       {mcqs.map((mcq, index) => (
// //         <div
// //           key={index}
// //           className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300"
// //         >
// //           <h3 className="text-xl font-semibold mb-4">
// //             {index + 1}. {mcq.question}
// //           </h3>
// //           <ul className="space-y-2">
// //             {mcq.options.map((option, optionIndex) => (
// //               <li key={optionIndex} className="flex items-center">
// //                 <label className="flex items-center space-x-2">
// //                   <input
// //                     type="radio"
// //                     name={`question-${index}`}
// //                     value={option}
// //                     onChange={() => handleAnswerChange(index, option)} // Update answers on change
// //                     className="form-radio h-5 w-5 text-blue-600"
// //                   />
// //                   <span className="text-gray-700">{option}</span>
// //                 </label>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       ))}

// //       <button
// //         onClick={handleSubmit}
// //         className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
// //       >
// //         Submit Quiz
// //       </button>

// //       {score !== null && (
// //         <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
// //           <h2 className="text-lg font-bold">Your Score: {score}/{mcqs.length}</h2>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default QuizPage;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";

// const QuizPage = () => {
//   const location = useLocation();
//   const { text } = location.state || {}; // Get the passed data
//   const { stdid, subject, chapter } = useParams();
//   const navigate = useNavigate();

//   const [mcqs, setMcqs] = useState([]);
//   const [userAnswers, setUserAnswers] = useState({}); // Store user's selected answers
//   const [score, setScore] = useState(null); // Store the user's score after submission
//   const [student_level, setStudentLevel] = useState();
//   const [loading, setLoading] = useState(false); // Track loading state

//   useEffect(() => {
//     const getData = async () => {
//       setLoading(true); // Start loading
//       try {
//         const res = await axios.post("/api/mcq", { text });
//         console.log(res.data);
//         setMcqs(res.data["mcqs"]);
//       } catch (error) {
//         console.log("Error: " + error);
//       } finally {
//         setLoading(false); // End loading
//       }
//     };
//     getData();
//   }, [chapter, subject]);

//   const handleAnswerChange = (questionIndex, selectedOption) => {
//     setUserAnswers((prev) => ({
//       ...prev,
//       [questionIndex]: selectedOption,
//     }));
//   };

//   const handleSubmit = async () => {
//     let correctAnswers = 0;

//     mcqs.forEach((mcq, index) => {
//       if (userAnswers[index] === mcq.correctAnswer) {
//         correctAnswers++;
//       }
//     });

//     setScore(correctAnswers);

//     if (correctAnswers >= 4) {
//       setStudentLevel("pro");
//     } else if (correctAnswers === 3 || correctAnswers === 2) {
//       setStudentLevel("medium");
//     } else {
//       setStudentLevel("beginner");
//     }

//     const res = await axios.post("/dashboard/post-growth", {
//       id: stdid,
//       chapter,
//       student_level,
//       subject,
//     });

//     console.log(res);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center mb-6">Quiz</h1>

//       {loading ? (
//         <div className="flex justify-center items-center">
//           {/* Loading spinner or message */}
//           <div className="loader border-t-4 border-blue-600 rounded-full w-16 h-16 animate-spin"></div>
//           <p className="ml-4 text-blue-600">Loading questions...</p>
//         </div>
//       ) : (
//         <>
//           {mcqs.map((mcq, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300"
//             >
//               <h3 className="text-xl font-semibold mb-4">
//                 {index + 1}. {mcq.question}
//               </h3>
//               <ul className="space-y-2">
//                 {mcq.options.map((option, optionIndex) => (
//                   <li key={optionIndex} className="flex items-center">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name={`question-${index}`}
//                         value={option}
//                         onChange={() => handleAnswerChange(index, option)} // Update answers on change
//                         className="form-radio h-5 w-5 text-blue-600"
//                       />
//                       <span className="text-gray-700">{option}</span>
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           <button
//             onClick={handleSubmit}
//             className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
//           >
//             Submit Quiz
//           </button>

//           {score !== null && (
//             <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
//               <h2 className="text-lg font-bold">
//                 Your Score: {score}/{mcqs.length}
//               </h2>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default QuizPage;


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const QuizPage = () => {
  const location = useLocation();
  const { text } = location.state || {}; // Get the passed data
  const { stdid, subject, chapter } = useParams();
  const navigate = useNavigate();

  const [mcqs, setMcqs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // Store user's selected answers
  const [score, setScore] = useState(null); // Store the user's score after submission
  const [student_level, setStudentLevel] = useState();
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error message

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const res = await axios.post("/api/mcq", { text });
        console.log(res.data);
        setMcqs(res.data["mcqs"]);
      } catch (error) {
        console.log("Error: " + error);
        setError("Internet Problem OR server error"); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };
    getData();
  }, [chapter, subject]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;

    mcqs.forEach((mcq, index) => {
      if (userAnswers[index] === mcq.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);

    if (correctAnswers >= 4) {
      setStudentLevel("pro");
    } else if (correctAnswers === 3 || correctAnswers === 2) {
      setStudentLevel("intermediate");
    } else {
      setStudentLevel("beginner");
    }

    const res = await axios.post("/dashboard/post-growth", {
      id: stdid,
      chapter,
      student_level,
      subject,
    });

    console.log(res);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Quiz</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          {/* Loading spinner or message */}
          <div className="loader border-t-4 border-blue-600 rounded-full w-16 h-16 animate-spin"></div>
          <p className="ml-4 text-blue-600">Loading questions...</p>
        </div>
      ) : error ? (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
          <p className="font-bold">{error}</p>
        </div>
      ) : (
        <>
          {mcqs.map((mcq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300"
            >
              <h3 className="text-xl font-semibold mb-4">
                {index + 1}. {mcq.question}
              </h3>
              <ul className="space-y-2">
                {mcq.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex items-center">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleAnswerChange(index, option)} // Update answers on change
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Quiz
          </button>

          {score !== null && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              <h2 className="text-lg font-bold">
                Your Score: {score}/{mcqs.length}
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage;
