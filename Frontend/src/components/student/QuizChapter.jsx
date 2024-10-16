// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function QuizChapter() {
//   const { stdid, subject } = useParams();
//   const [text, setText] = useState("");
//   const [chapterName, setChapterName] = useState(["A", "B"]);
//   const [data, setData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(subject);
//     const getData = async () => {
//       try {
//         let response = await axios.post(
//           "https://sih-5.onrender.com/dashboard/get-subject-detail",
//           { subject: subject }
//         );
//         console.log(response.data.data);
//         let originalData = response.data.data;
//         let titles = response.data.data.map((val) => val.title);

//         // Set the chapterName state with the collected titles
//         setChapterName([...chapterName, ...titles]);
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     getData();
//   }, [subject]);

//   const handleQuiz = async(subject, title) => {
//     const res = await axios.post("http://localhost:3000/mcq/generate", {
//       subject,
//       title
//     });

//     setText(res.data);
//     console.log(res.data);
//     // navigate(`/student/${stdid}/subject/${subject}/${title}/quiz`);
//   };

//   const handlePDF = async (subject, title) => {
//     const res = await axios.post('http://localhost:3000/pdf/get-files', {
//       subject: subject,
//       title: title
//     })

//     const url = "http://localhost:3000/files/" + res.data.path;
//     console.log(url);

//     console.log(res.data.path);
//     // navigate(url);
//     window.open(url, "_blank");
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-lg font-bold mb-4">Chapters</h2>
//       {data ? (
//         <table className="min-w-full table-auto border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Name
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 PDF
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Quiz
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {chapterName.map((name, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">{name}</td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   <button
//                     onClick={() => handlePDF(subject, name)}
//                     className="text-blue-500 hover:underline"
//                   >
//                     View PDF
//                   </button>
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   <button
//                     onClick={() => handleQuiz(subject, name)}
//                     className="text-blue-500 hover:underline"
//                   >
//                     Take Quiz
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default QuizChapter;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function QuizChapter() {
  const { stdid, subject } = useParams();
  const [text, setText] = useState("");
  const [chapter, setChapter] = useState();
  const [chapterName, setChapterName] = useState(["A", "B"]);
  const [data, setData] = useState({});
  const [showBottomButton, setShowBottomButton] = useState(false); // State to show bottom button
  const navigate = useNavigate();

  useEffect(() => {
    console.log(subject);
    const getData = async () => {
      try {
        let response = await axios.post("/api/dashboard/get-subject-detail", {
          subject: subject,
        });
        console.log(response.data.data);
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

  const handleQuiz = async (subject, title) => {
    try {
      const res = await axios.post("/api/mcq/generate", {
        subject,
        title,
      });

      setChapter(title);
      setText(res.data);
      console.log(res.data);

      // Show the bottom button when "Take Quiz" is clicked
      setShowBottomButton(true);

      // Uncomment if you want to navigate to the quiz route
      // navigate(`/student/${stdid}/subject/${subject}/${title}/quiz`);
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  const handlePDF = async (subject, title) => {
    try {
      const res = await axios.post("/api/pdf/get-files", {
        subject: subject,
        title: title,
      });

      const url = "/api/files/" + res.data.path;
      console.log(url);
      console.log(res.data.path);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const handleStart = async () => {
    // console.log("On button click: " + text);

    // try {
    //   const res = await axios.post("/api/mcq", {
    //     text
    //   });

    //   console.log(res.data);
    //   console.log(res.data['mcqs']);
    // } catch (error) {
    //   console.log("Error: " + error);
    // }

    navigate(`/student/${stdid}/subject/${subject}/${chapter}/quiz`, {
      state: {
        text
      },
    });
  };

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
                    onClick={() => handlePDF(subject, name)}
                    className="text-blue-500 hover:underline"
                  >
                    View PDF
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      // console.log(name);
                      handleQuiz(subject, name);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Take Quiz
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}

      {/* Conditionally render the button at the bottom */}
      {showBottomButton && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleStart} // Replace with desired action
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start
          </button>
        </div>
      )}

      {/* {
      
      
      */}
    </div>
  );
}

export default QuizChapter;
