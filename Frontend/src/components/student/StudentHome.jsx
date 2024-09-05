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
  // console.log(stdid);

  const handleChatbot = () => {
    navigate(`/student/${stdid}/chatbot`);
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `https://sih-5.onrender.com/user/detail/${stdid}`
        );

        console.log(res);
        console.log(res.status);

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

  const [classrooms] = useState([
    { id: 3, name: "Maths", description: "Maths" },
    { id: 1, name: "Phy", description: "Pysics" },
    { id: 2, name: "Che", description: "Chem" },
  ]);

  const handleSearch = (query) => {
    setQuery(query);
  };

  const handleTakeQuiz = (classroomId) => {
    alert(`Starting quiz for classroom ${classroomId}`);
  };

  const handleSubmit = () => {
    navigate(`/student/${stdid}`);
  };

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
          </>
        )}
        {/* Additional page content based on 'page' state */}
      </div>

      {/* <div>
        <button
          onClick={handleChatbot}
          className="px-6 ml-12 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150 ease-in-out"
        >
          Chatbot
        </button>
      </div> */}
      {/* <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150 ease-in-out"
      >
        Search
      </button> */}
    </div>
  );
};

export default StudentHomePage;
