import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { sharedAudioRef } from "../../components/user/AudioBar";

// Cho phép file khác (AudioBar) truy cập videoRef
export let sharedVideoRef = null;

const VideoDetail = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const videoRef = useRef(null); // ref video để điều khiển

  // Gán ref cho sharedVideoRef
  sharedVideoRef = videoRef;

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

  // Khi phát video -> dừng nhạc
  const handleVideoPlay = () => {
    if (sharedAudioRef?.current && !sharedAudioRef.current.paused) {
      sharedAudioRef.current.pause();
    }
  };

  if (!videoData) {
    return <div className="text-center text-white">Đang tải video...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">{videoData.name}</h1>
      <video
        ref={videoRef}
        controls
        autoPlay
        onPlay={handleVideoPlay}
        className="w-full max-w-3xl rounded-lg shadow-lg"
        src={videoData.video_file_url}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoDetail;
