import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const LearningProgress = () => {
  const navigate = useNavigate();
  const { stdid } = useParams();
  console.log(stdid);

  // Sample data for demonstration
  const videos = [
    { title: "Introduction to React", completed: 17, timeLeft: "10m" },
    { title: "Advanced JavaScript", completed: 60, timeLeft: "30m" },
    { title: "Tailwind CSS Basics", completed: 100, timeLeft: "0m" },
  ];

  const materials = [
    {
      title: "React Documentation",
      completed: 25,
      estimatedTime: "2h",
      chaptersDone: 3,
    },
    {
      title: "JavaScript Essentials",
      completed: 75,
      estimatedTime: "1.5h",
      chaptersDone: 7,
    },
    {
      title: "CSS Flexbox Guide",
      completed: 50,
      estimatedTime: "1h",
      chaptersDone: 5,
    },
  ];

  const backButton = () => {
    navigate(`/student/${stdid}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Learning Progress
        </h1>

        {/* Video Progress Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Video Progress</h2>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <div className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{ width: `${video.completed}%` }}
                  ></div>
                  <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white font-semibold">
                    {video.completed}% completed
                  </div>
                </div>
                <p className="text-gray-500 mt-2">
                  Time left: {video.timeLeft}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Material Progress Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Material Progress</h2>
          <div className="space-y-4">
            {materials.map((material, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{material.title}</h3>
                <div className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500"
                    style={{ width: `${material.completed}%` }}
                  ></div>
                  <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white font-semibold">
                    {material.completed}% completed
                  </div>
                </div>
                <p className="text-gray-500 mt-2">
                  Estimated Time: {material.estimatedTime}
                </p>
                <p className="text-gray-500 mt-1">
                  Chapters Done: {material.chaptersDone}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={backButton}
          type="submit"
          className="px-4 mt-2 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default LearningProgress;
