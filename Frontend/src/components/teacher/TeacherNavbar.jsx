// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const Navbar = ({ setPage }) => {
//   const navigate = useNavigate();
//   const { tchrid } = useParams();

//   const handleUploadPdf = () => {
//     navigate(`/teacher/${tchrid}/upload`);
//   };

//   const handleCreatePdf = () => {
//     navigate(`/teacher/${tchrid}/create-pdf`);
//   };

//   const handleHome = () => {
//     navigate("/");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <img
//             src="/src/assets/image.png"
//             alt="LearnLab Logo"
//             className="h-12 w-12 mr-4 rounded-full"
//           />
//           <span className="text-white font-extrabold text-xl tracking-wide">
//             LearnLab
//           </span>
//         </div>
//         <div className="space-x-8">
//           <button
//             onClick={handleHome}
//             className="text-white font-medium hover:text-gray-300 transition duration-200"
//           >
//             Home
//           </button>
//           <button
//             onClick={() => setPage("createClass")}
//             className="text-white font-medium hover:text-gray-300 transition duration-200"
//           >
//             Create Class
//           </button>
//           <button
//             onClick={handleUploadPdf}
//             className="text-white font-medium hover:text-gray-300 transition duration-200"
//           >
//             Upload PDF
//           </button>
//           <button
//             onClick={handleCreatePdf}
//             className="text-white font-medium hover:text-gray-300 transition duration-200"
//           >
//             Make PDF
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const TeacherNavbar = ({ setPage }) => {
  const navigate = useNavigate();
  const { tchrid } = useParams();

  const handleUploadPdf = () => {
    navigate(`/teacher/${tchrid}/upload`);
  };

  const handleCreatePdf = () => {
    navigate(`/teacher/${tchrid}/create-pdf`);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 shadow-md">
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
            className="text-white font-medium hover:text-gray-200 transition duration-200"
          >
            Home
          </button>
          <button
            onClick={() => setPage("createClass")}
            className="text-white font-medium hover:text-gray-200 transition duration-200"
          >
            Create Class
          </button>
          <button
            onClick={handleUploadPdf}
            className="text-white font-medium hover:text-gray-200 transition duration-200"
          >
            Upload PDF
          </button>
          <button
            onClick={handleCreatePdf}
            className="text-white font-medium hover:text-gray-200 transition duration-200"
          >
            Make PDF
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavbar;
