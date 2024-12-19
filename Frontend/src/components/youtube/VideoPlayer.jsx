import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VideoPlayer = () => {
  const location = useLocation();
  const videoUrl = location.state?.videoUrl;
  const playerRef = useRef(null);
  const [generatedLink, setGeneratedLink] = useState("");
  const navigate = useNavigate();
  const {stdid} = useParams();

  useEffect(() => {
    if (!videoUrl) return;

    // console.log("Initial Video URL:", videoUrl);

    // Function to initialize the YouTube player
    const initializePlayer = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "450",
        width: "800",
        videoId: extractVideoId(videoUrl),
        playerVars: {
          start: extractStartTime(videoUrl), // Use the start time extracted from the URL
        },
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // Load YouTube Iframe API script if it's not already loaded
    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Wait for the API to load before initializing the player
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      // Initialize player if API is already loaded
      initializePlayer();
    }

    return () => {
      // Clean up the player when the component unmounts
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl]);

  // Handle player state changes
  const onPlayerStateChange = async (event) => {
    if (event.data === window.YT.PlayerState.PAUSED) {
      const currentTime = Math.floor(playerRef.current.getCurrentTime());
      const newLink = updateTimeInLink(videoUrl, currentTime);

      try {
        const response = await axios.post("/api/growth/add/genlink", {
          gel_link: newLink,
        });

        console.log(response.data.gel_link);
        setGeneratedLink(currentTime);
      } catch (error) {
        console.error("Error generating link:", error);
      }
    }
  };

  // Update the 't' parameter in the link with the new time
  const updateTimeInLink = (url, currentTime) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set("t", `${currentTime}s`);
    console.log("Video stopped at: ", currentTime);
    return urlObj.toString();
  };

  const extractVideoId = (url) => {
    const urlParams = new URL(url).searchParams;
    return urlParams.get("v");
  };

  const extractStartTime = (url) => {
    const urlParams = new URL(url).searchParams;
    const time = urlParams.get("t");
    const startTime = time ? parseInt(time.replace("s", "")) : 0;
    // console.log("Extracted Start Time:", startTime);
    return startTime;
  };

  const handleBackClick = () => {
    sessionStorage.setItem("visitedVideo", "true");
    navigate(`/student/${stdid}/youtube`);
  };

  if (!videoUrl) {
    return <div className="text-red-500">No video selected</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div id="player" />
      {generatedLink && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Time:</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              onClick={() => navigator.clipboard.writeText(generatedLink)}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Copy
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleBackClick}
        className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
      >
        Back
      </button>
    </div>
  );
};

export default VideoPlayer;

