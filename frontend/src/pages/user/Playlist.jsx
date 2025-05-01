import React, { useState, useEffect } from "react";
import { FaPlay, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

const Playlist = () => {
  const { playlistId } = useParams(); 
  console.log("ID PL: ",playlistId)
  console.log("Params:", useParams);

  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [colorMain, setColorMain] = useState("#ffffff");
  const [backgroundStyle, setBackgroundStyle] = useState("");

  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };

  const generateLinearGradient = (
    hex,
    opacityStart = 1,
    opacityEnd = 0.2,
    angle = 50
  ) => {
    const { r, g, b } = hexToRgb(hex);
    return `linear-gradient(${angle}deg, rgba(${r}, ${g}, ${b}, ${opacityStart}), rgba(${r}, ${g}, ${b}, ${opacityEnd}))`;
  };

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        // Gọi API lấy thông tin playlist
        const playlistRes = await axios.get(`http://localhost:8000/api/playlist/${playlistId}/`);
        setPlaylist(playlistRes.data);

        // Gọi API lấy danh sách bài hát trong playlist
        const songRes = await axios.get(`http://localhost:8000/api/playlist/${playlistId}/songs/`);
        setSongs(songRes.data);
  
        // Tạo màu nền nếu có ảnh
        if (playlistRes.data.image) {
          fac.getColorAsync(playlistRes.data.image).then((color) => {
            setColorMain(color.hex);
            let bg = generateLinearGradient(color.hex, 0.7, 0.4, 180);
            setBackgroundStyle(bg);
          });
        }
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu playlist hoặc bài hát:", error);
      }
    };
  
    if (playlistId) fetchPlaylistData();
  }, [playlistId]);

  if (!playlist) {
    return <div className="text-white p-5">Loading playlist...</div>;
  }

  return (
    <div className="pb-10 bg-[#121212]">
      <div
        className="text-white flex gap-8 flex-col md:flex-row md:items-center p-5"
        style={{ background: backgroundStyle }}
      >
        <img
          className="w-48 h-48 rounded"
          src={playlist.image}
          alt={playlist.name}
        />
        <div className="flex flex-col justify-center">
          <p>Playlist</p>
          <h1 className="text-5xl font-bold mb-4 md:text-7xl">{playlist.name}</h1>
          <p className="mt-1 flex items-center text-gray-400 text-sm">
            <img
              className="w-5 rounded-full"
              src={playlist.image}
              alt="Avatar"
            />
            <b className="pl-2">{playlist.owner_name || "Người dùng"} •</b>
            <b className="pl-2">{songs.length} bài hát</b>
          </p>
        </div>
      </div>

      <div
        style={{
          background: `linear-gradient(to bottom, ${colorMain} 1%, #121212 60%)`,
        }}
      >
        <div className="flex items-center mx-5 w-[20%] justify-between py-10">
          <button className="bg-green-500 px-6 py-3 rounded-full mr-4 flex items-center cursor-pointer">
            <FaPlay className="mr-2" /> Play
          </button>
          <button className="text-gray-400 flex items-center cursor-pointer">
            <FaHeart className="mr-2 text-2xl" color="red" />
          </button>
        </div>

        <ul>
          {songs.map((song, index) => (
            <li
              key={song.id}
              className="h-15 w-full flex justify-between items-center py-2 px-5 border-b border-gray-800 hover:bg-gray-950 cursor-pointer"
            >
              <div className="flex items-center text-white gap-3">
                <span className="text-gray-500">{index + 1}</span>
                <div className="flex flex-col">
                  <span className="font-bold">{song.name}</span>
                  <span className="text-gray-500 text-sm">
                    {song.artist_name}
                  </span>
                </div>
              </div>
              <span className="text-gray-400">
                {formatDuration(song.duration)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playlist;
