import React, { useState } from "react";
import axios from "axios";
import PdfComp from "./PdfComp";

const TeacherUploadPdf = () => {
  const [title, setTitle] = useState("");
  const [titleNo, setTitleNo] = useState("");
  const [subject, setSubject] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const id = Date.now();

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("title_no", titleNo);
    formData.append("subject", subject);
    formData.append("faculty_id", id);
    formData.append("video_link", videoLink);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      // "/api/pdf//upload-files",
      "/api/pdf/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log(result);
    console.log(result.status);
    if (result.status === 200) {
      alert("Uploaded Successfully!!!");
      // getPdf();
    }
    // if (result.data.status === "ok") {
    //   alert("Uploaded Successfully!!!");
    //   getPdf();
    // }
  };

  const handleBack = () => {
    navigate(`/teacher/${tchrid}`);
  };

  const getPdf = async () => {
    const result = await axios.get("/api/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };


  return (
    <div className="App">
      <form
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <h4 className="text-xl font-semibold mb-4 text-gray-800">
          Upload PDF in React
        </h4>

        <input
          type="text"
          className="form-control w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="form-control w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Chapter no"
          required
          onChange={(e) => setTitleNo(e.target.value)}
        />

        <input
          type="text"
          className="form-control w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Video Link"
          required
          onChange={(e) => setVideoLink(e.target.value)}
        />

        <input
          type="text"
          className="form-control w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Subject"
          required
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="file"
          className="form-control w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="btn w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile} /> */}
    </div>
  );
};

export default TeacherUploadPdf;
