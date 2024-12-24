import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./utils/Home";
import SignupForm from "./components/SignupForm";
import UploadPdf from "./components/UploadPdf";

import PageNotFound from "./utils/404PageNotFound";
// import PdfUpload from "./components/PdfUpload";

import TeacherHome from "./components/teacher/TeacherHome";
import TeacherLogin from "./components/teacher/TeacherLogin";
import TeacherUploadPdf from "./components/teacher/TeacherUploadPdf";
import TeacherPdfCreate from "./components/teacher/TeacherPdfCreate";

import StudentChatbot from "./components/student/StudentChatbot";
import StudentHome from "./components/student/StudentHome";
import StudentLogin from "./components/student/StudentLogin";
import StudentQuiz from "./components/student/StudentQuiz";
import StudentViewVideo from "./components/student/StudentViewVideo";
import StudentViewPdf from "./components/student/StudentViewPdf";
import LearningProgress from "./components/LearningProgress";

// For test future Delete
import QuizPage from "./components/QuizPage";
import Dashboard from "./components/student/Dashboard";
import LoginPage from "./components/LoginPage";
import Feedback from "./utils/Feedback";
import Aboutus from "./utils/Aboutus";
import QuizChapter from "./components/student/QuizChapter";
import InputComponent from "./components/youtube/InputComponent";
import VideoPlayer from "./components/youtube/VideoPlayer";

//Chatbot
import Chatbot from "./components/student/Chatbot";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          <Route path="/upload" element={<UploadPdf />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />

          {/* <Route path="/upload" element={<PdfUpload />} /> */}

          {/* Teacher */}
          <Route path="/teacher/:tchrid" element={<TeacherHome />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route
            path="/teacher/:tchrid/upload"
            element={<TeacherUploadPdf />}
          />
          <Route
            path="/teacher/:tchrid/create-pdf"
            element={<TeacherPdfCreate />}
          />

          {/* Student */}
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/student/:stdid/quize" element={<StudentQuiz />} />
          <Route path="/student/:id/video/url" element={<StudentViewVideo />} />
          <Route path="/student/:stdid/pdf" element={<StudentViewPdf />} />
          <Route path="/student/:stdid/chat" element={<StudentChatbot />} />
          <Route path="/student/:stdid" element={<StudentHome />} />
          <Route
            path="/student/:stdid/subject/:subject"
            element={<QuizChapter />}
          />
          <Route
            path="/student/:stdid/:subject/:chapter/quiz"
            element={<QuizPage />}
          />
          <Route
            path="/student/:stdid/learning"
            element={<LearningProgress />}
          />
          <Route path="/student/:stdid/dashboard" element={<Dashboard />} />
          {/* <Route path="/student/:stdid/quiz" element={<QuizPage />} /> */}
          <Route path="/student/:stdid/chatbot" element={<Chatbot />} />

          {/* utils */}
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="*" element={<PageNotFound />} />


          {/* youtube */}
          <Route path="/student/:stdid/youtube" element={<InputComponent />} />
          <Route path="/student/:stdid/youtube/video" element={<VideoPlayer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
