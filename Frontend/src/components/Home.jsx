import React from "react";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg)",
      }}
    >
      <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src="src/assets/image.png"
            alt="LearnLab Logo"
            className="h-10"
          />
          <span className="text-white font-bold text-2xl">DashMasters</span>
        </div>
        <div className="space-x-8 text-white font-semibold">
          <a href="" className="hover:text-yellow-300">
            Home
          </a>
          <a href="/aboutus" className="hover:text-yellow-300">
            About Us
          </a>
          <a href="/feedback" className="hover:text-yellow-300">
            Feedback
          </a>
          <a href="/signup" className="hover:text-yellow-300">
            Signup
          </a>
          <a href="/login" className="hover:text-yellow-300">
            Login
          </a>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center text-white mt-40 p-4 space-y-6">
        <h1 className="text-5xl font-extrabold animate-fadeInUp">
          Creative Learning for the Future
        </h1>
        <p className="text-lg max-w-2xl">
          Empower your education with tailored learning paths, insightful
          resources, and continuous progress tracking. Join us in shaping the
          future of learning.
        </p>
        <a
          className="px-6 py-3 bg-yellow-500 text-xl font-bold rounded-full hover:bg-yellow-600 transition transform hover:-translate-y-1 hover:scale-105"
          href="/signup"
        >
          Get Started
        </a>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
