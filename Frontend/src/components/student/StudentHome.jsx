import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import SearchBar from "../SearchBar";
import LearningPath from "../LearningPath";
import ClassroomList from "../teacher/ClassroomList";
import { useNavigate, useParams } from "react-router-dom";

const StudentHomePage = () => {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { stdid } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  // console.log(stdid);

  const handleChatbot = () => {
    navigate(`/student/${stdid}/chatbot`);
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          // `https://sih-5.onrender.com/user/detail/${stdid}`
          `/api/user/detail/${stdid}`
        );

        // console.log(res);
        // console.log(res.status);

        const res1 = await axios.get(
          "https://sihh-mauve.vercel.app/dashboard/get-all-subject"
        );

        // console.log(res1.data.data);
        // Ensure classrooms are always an array
        // const subjects = res1.data.data.map((item) => item.subject);
        const subjects = [
          ...new Set(res1.data.data.map((item) => item.subject)),
        ];
        setClassrooms(subjects);

        const res2 = await axios.post("/api/analysis/all-subject", {
          id: stdid,
        });

        console.log(res2);
        // console.log(res2['data']);
        console.log(res2.data.data);

        // Create a mapping of subjects to their interest scores
        const interestScoreMap = res2.data.data.reduce((acc, item) => {
          acc[item.subject] = item.interestScore || 0; // Default to 0 if not present
          return acc;
        }, {});

        // Create an array of classrooms with their interest scores
        const classroomsWithScores = subjects.map((subject) => ({
          name: subject,
          interestScore: interestScoreMap[subject] || 0, // Set interestScore based on the map
        }));

        setClassrooms(classroomsWithScores);

        // if(res.status != 200) {
        //   alert('You are not authorize student');
        // }
      } catch (error) {
        console.log(error);

        if (error.status == 500 || error.status == 404) {
          alert("Student NOT FOUND");
          navigate(`/signup`);
        }
      }
    }
    getData();
  }, []);

  // const [classrooms] = useState([
  //   { id: 3, name: "Maths", description: "Maths" },
  //   { id: 1, name: "Phy", description: "Pysics" },
  //   { id: 2, name: "Che", description: "Chem" },
  // ]);

  const handleSearch = (query) => {
    setQuery(query);
  };

  const handleTakeQuiz = (classroomId) => {
    alert(`Starting quiz for classroom ${classroomId}`);
  };

  const handleSubmit = () => {
    navigate(`/student/${stdid}`);
  };

  const handleUpload = () => {
    navigate(`/student/${stdid}/youtube`)
  }

  return (
    <div>
      <StudentNavbar setPage={setPage} />
      <div className="container mx-auto p-8">
        {page === "home" && (
          <>
            <SearchBar onSearch={handleSearch} />
            {query && <LearningPath query={query} />}
            <ClassroomList
              classrooms={classrooms}
              onTakeQuiz={handleTakeQuiz}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={handleUpload}
              >
                Watch Video
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={handleChatbot}
              >
                Chatbot
              </button>
            </div>
          </>
        )}
        {/* Additional page content based on 'page' state */}
      </div>
    </div>
  );
};

export default StudentHomePage;
