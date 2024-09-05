import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "https://sih-2024-5.onrender.com/pdf/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:5000/files/${pdf}`)
  };
  return (
    <div className="App p-6 bg-gray-100 min-h-screen">
  <form
    className="formStyle bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    onSubmit={submitImage}
  >
    <h4 className="text-2xl font-bold text-gray-700 mb-4">Upload PDF in React</h4>
    <input
      type="text"
      className="form-control border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Title"
      required
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      type="file"
      className="form-control border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      accept="application/pdf"
      required
      onChange={(e) => setFile(e.target.files[0])}
    />
    <button
      className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="submit"
    >
      Submit
    </button>
  </form>

  <div className="uploaded bg-white shadow-md rounded p-6">
    <h4 className="text-xl font-semibold text-gray-700 mb-4">Uploaded PDF:</h4>
    <div className="output-div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allImage == null
        ? ""
        : allImage.map((data, index) => {
            return (
              <div
                key={index}
                className="inner-div bg-gray-50 p-4 border border-gray-200 rounded shadow-md"
              >
                <h6 className="text-lg font-medium text-gray-800 mb-2">
                  Title: {data.title}
                </h6>
                <button
                  className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => showPdf(data.pdf)}
                >
                  Show PDF
                </button>
              </div>
            );
          })}
    </div>
  </div>

  <PdfComp pdfFile={pdfFile} />
</div>

  );
}

export default App;
