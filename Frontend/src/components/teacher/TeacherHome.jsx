import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ClassroomList from "./ClassroomList";
import Navbar from "./TeacherNavbar";

const TeacherHome = ({ setPage }) => {
  let { id } = useParams();
  const [classrooms, setClassrooms] = useState([
    {
      name: "DSA",
      description: "Data Structure Algorithams",
      subject: "Mathematics",
      startDate: "2024-09-10",
      endDate: "2024-12-10",
      classCode: "CL-12345",
      classroomImage:
        "https://via.placeholder.com/400x200.png?text=Mathematics",
    },
    {
      name: "DSAA",
      description: "Data Structure And Algorithams",
      subject: "Physics",
      startDate: "2024-09-15",
      endDate: "2024-12-15",
      classCode: "CL-67890",
      classroomImage: "https://via.placeholder.com/400x200.png?text=Physics",
    },
  ]);

  return (
    <div>
      <Navbar setPage={setPage} />
      <div className="p-8">
        <ClassroomList classrooms={classrooms} />
      </div>
    </div>
  );
};

export default TeacherHome;
