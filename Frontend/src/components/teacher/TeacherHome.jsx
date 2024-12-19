import React, { useEffect, useState } from "react";
import axios from "axios";
// import StudentNavbar from "./StudentNavbar";
import StudentNavbar from "../student/StudentNavbar";
import TeacherNavbar from "./TeacherNavbar";
import SearchBar from "../SearchBar";
import LearningPath from "../LearningPath";
import ClassroomList from "../teacher/ClassroomList";
import { useNavigate, useParams } from "react-router-dom";

const TeacherHomePage = () => {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { tchrid } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  // console.log(stdid);

  const handleChatbot = () => {
    navigate(`/student/${tchrid}/chatbot`);
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          // `https://sih-5.onrender.com/user/detail/${stdid}`
          `/api/user/detail/${tchrid}`
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
          id: tchrid,
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

        //  // Process subjects to get unique classrooms with interest scores
        //  const uniqueClassrooms = subjects.map((item) => ({
        //   name: item.subject,
        //   interestScore: item.interestScore || 0 // Use a default value if interestScore is not present
        // }));

        // // Use a Set to ensure uniqueness based on classroom name
        // const classroomsSet = Array.from(new Map(uniqueClassrooms.map(item => [item.name, item])).values());
        // setClassrooms(classroomsSet);

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
    navigate(`/teacher/${tchrid}`);
  };

  const handleUpload = () => {
    navigate(`/teacher/${tchrid}/upload`);
  };

  return (
    <div>
      <TeacherNavbar setPage={setPage} />
      <div className="container mx-auto p-8 bg-gray-50">
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
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition duration-200"
                onClick={handleUpload}
              >
                Upload PDF
              </button>
            </div>
          </>
        )}
        {/* Additional page content based on 'page' state */}
      </div>
    </div>
  );
};

export default TeacherHomePage;
