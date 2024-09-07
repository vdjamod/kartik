// TitleLinkForm.js
import React, { useState } from "react";
import axios from "axios";

const StudentViewPdf = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        // "https://sih-2024-5.onrender.com/pdf/get-files",
        "/api/pdf/get-files",
        {
          title: title,
        }
      );

      // console.log(response.data.path);

      // Assuming the API responds with an object that includes the link
      setLink(response.data.link);
    } catch (err) {
      setError("Failed to fetch link. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="title" className="font-semibold">
          Enter Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Link
        </button>
      </form>
      {link && (
        <div className="mt-4">
          <p className="text-green-600">Generated Link:</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {link}
          </a>
        </div>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default StudentViewPdf;
