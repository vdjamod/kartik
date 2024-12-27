import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TeacherPdfCreate = () => {
  const [pdfTitle, setPdfTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState([
    { title: "", description: "", link: "" },
  ]);
  const [fileUrl, setFileUrl] = useState("");
  const { tchrid } = useParams();
  const navigate = useNavigate();

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...content];
    updatedContent[index][field] = value;
    setContent(updatedContent);
  };

  const addContentField = () => {
    setContent([...content, { title: "", description: "", link: "" }]);
  };

  const removeContentField = (index) => {
    const updatedContent = [...content];
    updatedContent.splice(index, 1);
    setContent(updatedContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("title: " + pdfTitle);
    console.log("heading: " + heading);
    console.log("content: " + content.map((ctn) => ctn.title));
    console.log("content: " + content.map((ctn) => ctn.description));
    console.log("content: " + content.map((ctn) => ctn.link));

    // Construct the body to match the required structure
    const requestBody = {
      pdf_title: heading, // Use the heading as pdf_title if that fits your need
      heading: heading, // This may be redundant depending on API requirements
      content: content.map((item) => ({
        title: item.title,
        link: item.link,
        description: item.description,
      })),
    };

    try {
      const response = await axios.post(
        // "https://sih-2024-5.onrender.com/create-pdf",
        "/api/create-pdf",
        requestBody
      );

      console.log(response);

      if (response.status === 200) {
        
        // Assuming the response contains a file URL directly
        const { file_url } = response.data;
        // console.log(file_url)
        setFileUrl(file_url);
      } else {
        alert("Failed to create PDF");
      }
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  const backClick = () => {
    navigate(`/teacher/${tchrid}`);
  };

  const handleDownload = () => {
    if (fileUrl) {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = "generated.pdf"; // You can change this to the desired filename
      a.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Pdf Title:
          </label>
          <input
            type="text"
            value={pdfTitle}
            onChange={(e) => setPdfTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter heading"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Heading:</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter heading"
            required
          />
        </div>

        {content.map((item, index) => (
          <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
            <div className="mb-3">
              <label className="block text-gray-700 font-semibold mb-1">
                Title:
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) =>
                  handleContentChange(index, "title", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-semibold mb-1">
                Description:
              </label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  handleContentChange(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-semibold mb-1">
                Link:
              </label>
              <input
                type="text"
                value={item.link}
                onChange={(e) =>
                  handleContentChange(index, "link", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter link (optional)"
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeContentField(index)}
                className="mt-2 text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={addContentField}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add More Content
          </button>
          <button
            onClick={backClick}
            type="submit"
            className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Generate PDF
          </button>
        </div>
      </form>

      {fileUrl && (
        <div className="mt-4">
          <button
            onClick={() => window.open(fileUrl, "_blank")}
            className="px-4 py-2 mr-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View PDF
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherPdfCreate;

/*



"pdf_title": "title1",
"heading": "chapter2",
"content": {
      {
        "title", "ML",
        "link": "Link",
        "description": "description"
      }, 
      {
        "title", "ML1",
        "link": "Link1",
        "description": "description1"
      }
}


*/
