import React from 'react';
import { FaLock, FaBell, FaGlobe } from 'react-icons/fa'; // Import FaGlobe

const AppBar = () => {
  return (
    <div className="bg-[#121212] p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-[#282828] text-white p-2 rounded-full w-96 focus:outline-none placeholder-gray-400 text-sm pl-10"
          />
          <FaLock className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center gap-4"> {/* Sử dụng gap-4 để tạo khoảng cách */}
        <button className="border-white text-black px-5 py-2 rounded-full text-sm flex items-center">
          Explore Premium
        </button>
        <button className="border border-white text-white px-4 py-2 rounded-full text-sm">Install App</button>
        <FaBell className="text-white" />
        <FaGlobe />
        <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default AppBar;