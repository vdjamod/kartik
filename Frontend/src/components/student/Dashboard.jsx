// src/pages/Dashboard.jsx

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary elements
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const videoLearningData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Time Spent Watching Videos (hours)",
        data: [2, 3, 1, 4, 2], // Sample data
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const materialLearningData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Time Spent on Materials (hours)",
        data: [1, 2, 2, 3, 1], // Sample data
        fill: false,
        backgroundColor: "rgba(255, 206, 86, 0.4)",
        borderColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };

  const quizData = {
    labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
    datasets: [
      {
        label: "Marks Obtained",
        data: [75, 80, 85, 70, 90], // Sample data
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-7xl p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Learning Time Chart */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Video Learning Time</h3>
          <Line data={videoLearningData} options={chartOptions} />
        </div>

        {/* Material Learning Time Chart */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Learning from Materials</h3>
          <Line data={materialLearningData} options={chartOptions} />
        </div>

        {/* Quiz Performance Chart */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 md:col-span-1">
          <h3 className="text-xl font-semibold mb-2">Quiz Performance</h3>
          <Line data={quizData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
