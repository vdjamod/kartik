import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const InputComponent = () => {
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [clickedLink, setClickedLink] = useState();
  const [generatedLink, setGeneratedLink] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { stdid } = useParams();

  useEffect(() => {
    const lastGeneratedLinks = JSON.parse(
      localStorage.getItem("generatedLinks")
    );
    const hasVisitedVideo = sessionStorage.getItem("visitedVideo");

    if (lastGeneratedLinks && hasVisitedVideo) {
      setResponseData(lastGeneratedLinks);
      sessionStorage.removeItem("visitedVideo");
    }
  }, []);

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/youtube/video", {
        title: inputData,
      });

      const urls = response.data.data.map(
        (el) => `https://www.youtube.com/watch?v=${el.id}`
      );

      const formattedData = response.data.data.map((el) => ({
        url: `https://www.youtube.com/watch?v=${el.id}`,
        thumbnail: el.thumbnail.thumbnails[0].url,
      }));

      setResponseData(formattedData);
      setError(null);

      localStorage.setItem("generatedLinks", JSON.stringify(urls));
    } catch (error) {
      console.error(error);
      setError("Error in generating the links...");
      setResponseData([]);
    }
  };

  const handleLinkClick = async (url) => {
    event.preventDefault();
    // navigate("/video", { state: { videoUrl: url } });

    setClickedLink(url);

    try {
      const res = await axios.post("/api/growth/generate-link", {
        link: url,
      });

      const genLink = res.data.generatedLink;
      setGeneratedLink(genLink);

      navigate(`/student/${stdid}/youtube/video`, {
        state: { videoUrl: genLink },
      });
    } catch (err) {
      console.error("Error occurred after link was clicked: ", err);
    }
  };

  return (
    <div className="px-4 py-2 mt-20">
      <input
        type="text"
        value={inputData}
        onChange={handleChange}
        placeholder="Enter title"
        className="w-1/2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="ml-1 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>

      {responseData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Generated Links:</h3>
          <ul className="list-disc pl-5 space-y-4">
            {responseData.map((url, index) => (
              <li key={index} className="flex items-center space-x-4">
                <img
                  src={url.thumbnail}
                  alt="Thumbnail"
                  className="w-16 h-16 object-cover rounded-md sm:w-20 sm:h-20 md:w-24 md:h-24"
                />
                <button
                  onClick={() => handleLinkClick(url)}
                  className="text-blue-500 hover:underline truncate sm:max-w-xs md:max-w-md"
                >
                  {url.url}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {clickedLink && (
        <div className="mt-4 text-green-500">
          <h3 className="text-lg font-semibold">Clicked Link:</h3>
          <p>{clickedLink}</p>
        </div>
      )}

      {generatedLink && (
        <div className="mt-4 text-green-500">
          <h3 className="text-lg font-semibold">Generated Link:</h3>
          <p>{generatedLink}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          <h3 className="text-lg font-semibold">Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default InputComponent;
