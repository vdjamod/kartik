import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function QuizChapter() {
  const { stdid, subject } = useParams();
  const [chapterName, setChapterName] = useState(["A", "B"]);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log(subject);
    const getData = async () => {
      try {
        let response = await axios.post(
          "https://sih-5.onrender.com/dashboard/get-subject-detail",
          { subject: subject }
        );
        console.log(response.data.data);
        let originalData = response.data.data;
        let titles = response.data.data.map((val) => val.title);

        // Set the chapterName state with the collected titles
        setChapterName([...chapterName, ...titles]);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [subject]);

  const handleQuiz = (title) => {
    navigate(`/student/${stdid}/subject/${subject}/${title}/quiz`);
  };

  const handlePDF = () => {};
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Chapters</h2>
      {data ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                PDF
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Quiz
              </th>
            </tr>
          </thead>
          <tbody>
            {chapterName.map((name, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={handlePDF}
                    className="text-blue-500 hover:underline"
                  >
                    View PDF
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleQuiz(name)}
                    className="text-blue-500 hover:underline"
                  >
                    Take Quiz
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default QuizChapter;
