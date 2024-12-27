import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ClassroomList = ({ classrooms, onTakeQuiz, isStudent }) => {
  const navigate = useNavigate();
  const { stdid } = useParams();

  const handleTakeQuiz = (name) => {
    const trimmedName = name.split(" ")[0];
    navigate(`/student/${stdid}/quiz`);
    onTakeQuiz(trimmedName); // Optionally call the provided onTakeQuiz function
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-extrabold text-gray-800">Your Classrooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {classrooms ? (
          classrooms.map((classroom, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900">
                {classroom.name}
              </h3>
              <p className="mt-2 text-gray-600 mb-7">
                interestScore: {classroom.interestScore}
              </p>
              {isStudent ? (
                <a
                  // onClick={() => handleTakeQuiz(classroom.name)}
                  href={`/student/${stdid}/subject/${classroom.name}/`}
                  className="mt-8 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Take Quiz
                </a>
              ) : (
                <a
                  // onClick={() => handleTakeQuiz(classroom.name)}
                  // href={`/student/${stdid}/subject/${classroom.name}/`}
                  className="mt-8 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  View Score
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            You are not enrolled in any classrooms yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClassroomList;
