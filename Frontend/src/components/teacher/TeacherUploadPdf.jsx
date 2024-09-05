import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TeacherUploadPdf = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const {tchrid} = useParams();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a PDF file to upload.');
      return;
    }

    // Create FormData and append all required fields
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('title', title);
    formData.append('faculty_email', email);
    formData.append('subject', subject);

    try {
      // Send formData directly as the request body
      const response = await axios.post(
        'https://sih-5.onrender.com/backend/upload-files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Check the response status for successful upload
      if (response.status === 200) {
        alert('PDF uploaded successfully!');
      } else {
        alert('Failed to upload PDF.');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('An error occurred while uploading the PDF.');
    }
  };

  const handleBack = () => {
    navigate(`/teacher/${tchrid}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 p-6 bg-white rounded-md shadow-md max-w-md mx-auto"
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Faculty Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 mt-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Upload PDF
      </button>
      <button
        type="submit"
        onClick={handleBack}
        className="px-6 py-2 mt-2 font-medium text-white bg-blue-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Back
      </button>
    </form>
  );
};

export default TeacherUploadPdf;
