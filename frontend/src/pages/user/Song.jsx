import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlay, FaPlus } from "react-icons/fa";

const Song = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/song/${id}/`);
        const data = await response.json();
        setSong(data);
      } catch (error) {
        console.error("Failed to fetch song", error);
      }
    };

    fetchSong();
  }, [id]);

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 👉 Gửi bài hát qua SideBar để gọi setCurrentSong
  const playThisSong = () => {
    if (!song) return;
    window.setCurrentSongFromOutside?.(song); // 🔥 Gọi như click ở sidebar
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center space-x-6 bg-gradient-to-b from-red-600 to-black p-8 rounded-lg mb-8">
        <img
          src={song?.cover_image_url}
          alt={song?.name}
          className="w-48 h-48 rounded-lg shadow-lg"
        />
        <div>
          <p className="text-white font-bold text-sm mb-2">Song</p>
          <h1 className="text-white text-6xl font-bold mb-4">{song?.name}</h1>
          <div className="flex items-center text-gray-300 text-sm space-x-2">
            {song?.artist_avatar_url && (
              <img
                src={song.artist_avatar_url}
                alt={song.artist_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="font-bold">
              {song?.artist_name || "Unknown Artist"}
            </span>
            <span>•</span>
            <span>{song?.album_name || "Unknown Album"}</span>
            <span>•</span>
            <span>{song?.release_date || "Unknown Year"}</span>
            <span>•</span>
            <span>{formatDuration(song?.duration)}</span>
            <span>•</span>
            <span>{song?.listen_count?.toLocaleString() || "0"}</span>
          </div>
        </div>
      </div>

      {/* Play & Add */}
      <div className="flex items-center space-x-6 mb-8">
        <button
          className="bg-green-500 text-white px-8 py-4 rounded-full flex items-center text-lg font-bold hover:scale-105 transition"
          onClick={playThisSong}
        >
          <FaPlay className="mr-3" /> Play
        </button>
        <button className="bg-gray-700 text-white p-4 rounded-full hover:scale-105 transition">
          <FaPlus />
        </button>
      </div>

      {/* Artist Section */}
      <div className="mt-8">
        <div className="flex items-center space-x-4">
          {song?.artist_avatar_url && (
            <img
              src={song.artist_avatar_url}
              alt={song.artist_name}
              className="w-25 h-25 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-white text-sm font-bold">Artist</h2>
            <div className="text-white text-2xl font-bold">
              {song?.artist_name || "Unknown Artist"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
