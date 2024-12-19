// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const StudentNavbar = ({ setPage }) => {
//   const navigate = useNavigate();
//   const {stdid} = useParams();

//   const handleLearning = () => {
//     navigate(`/student/${stdid}/learning`)
//   }

//   const handleDashboard = () => {
//     navigate(`/student/${stdid}/dashboard`);
//   }

//   const handleHome = () => {
//     navigate(`/`)
//   }

//   return (
//     <nav className="bg-gradient-to-r from-green-500 to-blue-500 p-4 shadow-lg">
//       <div className="max-w-8xl mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <img src="/src/assets/image.png" alt="LearnLab Logo" className="h-12 w-12 mr-4 rounded-full hover:scale-105 transition-transform duration-200" />
//           <span className="text-white font-extrabold text-xl tracking-wide">LearnLab</span>
//         </div>
//         <div className="space-x-8">
//           <button onClick={handleHome} className="text-white font-medium hover:text-gray-300 transition duration-200">Home</button>
//           {/* <button className="text-white font-medium hover:text-gray-300 transition duration-200">Profile</button> */}
//           <button className="text-white font-medium hover:text-gray-300 transition duration-200">View Class</button>
//           <button onClick={handleDashboard} className="text-white font-medium hover:text-gray-300 transition duration-200">Dashboard</button>
//           <button onClick={handleLearning} className="text-white font-medium hover:text-gray-300 transition duration-200">My Learning</button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default StudentNavbar;




import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const { stdid } = useParams();

  const handleLearning = () => {
    navigate(`/student/${stdid}/learning`);
  };

  const handleDashboard = () => {
    navigate(`/student/${stdid}/dashboard`);
  };

  const handleHome = () => {
    navigate(`/`);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 shadow-md">
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/src/assets/image.png"
            alt="LearnLab Logo"
            className="h-12 w-12 mr-4 rounded-full hover:scale-105 transition-transform duration-200"
          />
          <span className="text-white font-extrabold text-xl tracking-wide">
            LearnLab
          </span>
        </div>
        <div className="space-x-6">
          <button
            onClick={handleHome}
            className="text-white font-medium hover:text-gray-100 transition duration-200"
          >
            Home
          </button>
          <button
            className="text-white font-medium hover:text-gray-100 transition duration-200"
          >
            View Class
          </button>
          <button
            onClick={handleDashboard}
            className="text-white font-medium hover:text-gray-100 transition duration-200"
          >
            Dashboard
          </button>
          <button
            onClick={handleLearning}
            className="text-white font-medium hover:text-gray-100 transition duration-200"
          >
            My Learning
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
