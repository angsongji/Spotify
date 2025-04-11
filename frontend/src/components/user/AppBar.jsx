import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaSearch, FaBell, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const AppBar = ({ radios, albums, artists, podcasts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const handleSearch = () => {
    const results = [];

    // Tìm kiếm trong radios
    if (radios) {
      radios.forEach((radio) => {
        if (radio.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: "radio", ...radio });
        }
      });
    }

    // Tìm kiếm trong albums
    if (albums) {
      albums.forEach((album) => {
        if (album.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: "album", ...album });
        }
      });
    }

    // Tìm kiếm trong artists
    if (artists) {
      artists.forEach((artist) => {
        if (artist.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: "artist", ...artist });
        }
      });
    }

    // Tìm kiếm trong podcasts
    if (podcasts) {
      podcasts.forEach((podcast) => {
        if (podcast.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: "podcast", ...podcast });
        }
      });
    }

    setSearchResults(results);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (avatarRef.current && !avatarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-black p-4 flex justify-between items-center text-white">
        {/* Logo + Home */}
        <div className="flex items-center gap-3 ">
          <img src="/spotify_logo.jpg" alt="Spotify" className="w-8 h-8" />
          <button
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            onClick={() => navigate("/")}
          >
            <FaHome className="text-white w-6 h-6 cursor-pointer" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Bạn muốn nghe gì?"
              className="bg-[#282828] text-white p-2 rounded-full w-96 focus:outline-none placeholder-gray-400 text-sm pl-10"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <FaSearch className="absolute left-2 top-0 translate-x-[50%] translate-y-[50%] text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className=" text-white px-4 py-2 rounded-full text-sm bg-gradient-to-r from-purple-500 to-pink-500">
            Khám phá Premium{" "}
          </button>
          <FaBell className="text-white cursor-pointer" />
          <FaGlobe className="cursor-pointer" />
          <div ref={avatarRef} className="relative">
            <img
              src="/Avatar.jpg"
              alt="Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Account
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem("access"); // Xóa access token
                    navigate("/sign-in"); // Chuyển hướng về trang đăng nhập
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      {searchResults.length > 0 && (
        <div className="p-4 bg-black">
          <h2 className="text-white text-lg font-semibold mb-4">
            Kết quả tìm kiếm:
          </h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} className="text-white">
                {result.type}: {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AppBar;
