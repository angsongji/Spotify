import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaPlus, FaList } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const artists = [
  { name: "Sơn Tùng", img: "/artists/sontung.jpg" },
  { name: "Bích Phương", img: "/artists/bichphuong.jpg" },
  { name: "Hiếu Thứ Hai", img: "/artists/hth.jpg" },
  { name: "Dương Domic", img: "/artists/duongdomic.jpg" },
  { name: "Chi Pu", img: "/artists/chipu.jpg" },
];

const SideBar = () => {
  return (
    <div className="w-72 bg-black h-screen p-4 flex flex-col text-white">
      {/* Logo + Home */}
      <div className="flex items-center gap-3 mb-5">
        <img src="https://static.vecteezy.com/system/resources/previews/023/986/728/non_2x/spotify-logo-spotify-logo-transparent-spotify-icon-transparent-free-free-png.png" alt="Spotify" className="w-8 h-8" />
        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <FaHome className="text-white w-6 h-6" />
        </button>
      </div>

      {/* Your Library */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <HiLibrary className="w-5 h-5" />
          <h2 className="text-lg font-bold">Your Library</h2>
        </div>
        <button>
          <FaPlus className="w-5 h-5" />
        </button>
      </div>

      {/* Tìm kiếm và sắp xếp */}
      <div className="flex items-center gap-3 bg-gray-800 p-2 rounded-md mb-4">
        <FaSearch className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search in Library"
          className="bg-transparent outline-none text-white w-full"
        />
        <FaList className="w-5 h-5 text-gray-400" />
      </div>

      {/* Danh sách nghệ sĩ */}
      <div className="flex flex-col gap-3">
        {/* Liked Songs */}
        <div className="flex items-center gap-3">
          <img src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8470d229cb865e8d81cdce0889" className="w-12 h-12 rounded-md" />
          <div>
            <p className="text-white font-bold">Liked Songs</p>
            <p className="text-gray-400 text-sm">Playlist • 2 songs</p>
          </div>
        </div>

        {/* Artists */}
        {artists.map((artist, index) => (
          <div key={index} className="flex items-center gap-3">
            <img src={artist.img} className="w-10 h-10 rounded-full" />
            <p className="text-white">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
