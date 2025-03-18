import React, { useState, useEffect } from 'react';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { FastAverageColor } from "fast-average-color";
import { useParams } from "react-router-dom";

const fac = new FastAverageColor();

const playlist = {
  image: "/SonTung.png",
  name: "Release Radar",
  creator: "Spotify",
  description: "Catch all the latest music from artists you follow, plus new singles picked for you. Updates every Friday.",
  totalSongs: 30,
  totalDuration: "1 hr 45 min",
  tracks: [
    { image: "/SonTung.jpg", name: "Đừng làm trái tim anh đau", artist: "Sơn Tùng", album: "Đừng làm trái tim anh đau", dateAdded: "4 days ago", duration: "3:46" },
    { image: "/HTH.jpg", name: "Không thể say", artist: "Hiếu Thứ Hai", album: "Không thể say", dateAdded: "4 days ago", duration: "3:05" }
  ]
};

const Playlist = () => {
  const { id } = useParams();
  const [colorMain, setColorMain] = useState("#ffffff");
  const [backgroundStyle, setBackgroundStyle] = useState("");

  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };

  function generateLinearGradient(hex, opacityStart = 1, opacityEnd = 0.2, angle = 50) {
    const { r, g, b } = hexToRgb(hex);
    return `linear-gradient(${angle}deg, rgba(${r}, ${g}, ${b}, ${opacityStart}), rgba(${r}, ${g}, ${b}, ${opacityEnd}))`;
  }

  useEffect(() => {
    fac.getColorAsync(playlist.image).then(color => {
      setColorMain(color.hex);
      let bg = generateLinearGradient(color.hex, 0.7, 0.4, 180);
      setBackgroundStyle(bg);
    });
  }, [playlist.image]);

  return (
    <div className='pb-10 bg-[#121212]'>
      <div className="text-white flex gap-8 flex-col md:flex-row md:items-center p-5" style={{ background: backgroundStyle }}>
        <img className="w-48 h-48 rounded" src={playlist.image} alt={playlist.name} />
        <div className="flex flex-col justify-center">
          <p>Playlist</p>
          <h1 className="text-5xl font-bold mb-4 md:text-7xl">{playlist.name}</h1>
          <p className="mt-1 text-gray-400 text-sm">{playlist.description}</p>
          <p className="text-gray-400 text-sm">Made for {playlist.creator} • {playlist.totalSongs} songs, about {playlist.totalDuration}</p>
        </div>
      </div>
      <div style={{ background: `linear-gradient(to bottom, ${colorMain} 1%, #121212 60%)` }}>
        <div className="flex items-center mx-5 w-[20%] justify-between py-10">
          <button className="bg-green-500 px-6 py-3 rounded-full mr-4 flex items-center cursor-pointer">
            <FaPlay className="mr-2" /> Play
          </button>
          <button className="text-gray-400 flex items-center cursor-pointer">
            <FaHeart className="mr-2 text-2xl" color="red" />
          </button>
        </div>
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Artist</th>
              <th className="p-3">Album</th>
              <th className="p-3">Date added</th>
              <th className="p-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.map((track, index) => (
              <tr key={index} className="h-15 border-b border-gray-800 hover:bg-gray-950 cursor-pointer">
                <td className="p-3 text-gray-500">{index + 1}</td>
                <td className="p-3 font-bold">{track.name}</td>
                <td className="p-3 text-gray-400">{track.artist}</td>
                <td className="p-3 text-gray-400">{track.album}</td>
                <td className="p-3 text-gray-400">{track.dateAdded}</td>
                <td className="p-3 text-gray-400">{track.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Playlist;
