// src/pages/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // Handler to navigate to the teacher login page
  const handleTeacherLogin = () => {
    navigate("/login/teacher");
  };

  // Handler to navigate to the student login page
  const handleStudentLogin = () => {
    navigate("/login/student");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-10">Welcome Back!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Please select your login type to continue
      </p>
      <div className="grid grid-cols-1 gap-6">
        <button
          onClick={handleTeacherLogin}
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 w-72"
        >
          Teacher Login
        </button>
        <button
          onClick={handleStudentLogin}
          className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 w-72"
        >
          Student Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
