import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/videos/${id}/`);
        setVideoData(res.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!videoData) {
    return <div className="text-center text-white">Đang tải video...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">{videoData.name}</h1>
      <video
        controls
        autoPlay
        className="w-full max-w-3xl rounded-lg shadow-lg"
        src={videoData.video_file_url}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoDetail;
