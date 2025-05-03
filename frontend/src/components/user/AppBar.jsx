import React, { useState, useRef, useEffect } from "react";
import { useSearch } from "../../context/searchContext"
import { FaHome, FaSearch, FaBell, FaGlobe,FaFacebookMessenger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ChatComponent from "../ChatComponent";
import {jwtDecode} from "jwt-decode";

const AppBar = () => {
  const { searchTerm, setSearchTerm,dataSearch, setDataSearch } = useSearch();
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getAccountIdFromToken = () => {
      const token = localStorage.getItem("access");
      console.log("token:", token)
      if (!token) return null;
    
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded: ",decoded);
        return decoded.user_id;
      } catch (error) {
        console.error("Invalid token", error);
        return null;
      }
    };

  useEffect(() => {
    const fetchUser = async () => {
      const accountId= getAccountIdFromToken();
      console.log("AccountID: ",accountId)
      try {
        const res = await fetch(`http://localhost:8000/api/user/by-account/${accountId}/`);
        const data = await res.json();
        setCurrentUser(data); // { id, username, ... }
      } catch (err) {
        console.error("Lỗi khi fetch user:", err);
      }
    };

    fetchUser();
  }, []);
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        fetch(`http://localhost:8000/api/search/?q=${encodeURIComponent(searchTerm)}`)
          .then(res => res.json())
          .then(data => {
            const results = [
              ...(data.albums || []).map(item => ({ ...item, type: "album" })),
              ...(data.songs || []).map(item => ({ ...item, type: "song" })),
              ...(data.videos || []).map(item => ({ ...item, type: "video" }))
            ];
            setDataSearch(data);
            console.log("Kết quả tìm kiếm:", data);
            setSearchResults(results);
          })
          .catch(err => console.error("Lỗi khi tìm kiếm:", err));
      } else {
        setSearchResults([]);
      }
    }, 200); // debounce 200ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleResultClick = (type, id) => {
    navigate(`/${type}/${id}`);
    setSearchTerm(""); // Clear input
    setSearchResults([]);
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleClickOutside = (e) => {
    if (avatarRef.current && !avatarRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("access");
    if (!token) return console.error("Không có token!");

    try {
      const res = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Lỗi khi gọi API logout");
        return;
      }

      localStorage.clear();
      navigate("/sign-in");
    } catch (err) {
      console.error("Lỗi khi logout:", err);
    }
  };

  return (
    <div className="relative">
      <div className="bg-black p-4 flex justify-between items-center text-white">
        {/* Logo & Home */}
        <div className="flex items-center gap-3">
          <img src="/spotify_logo.jpg" alt="Spotify" className="w-8 h-8" />
          <button
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            onClick={() => navigate("/")}
          >
            <FaHome className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Bạn muốn nghe gì?"
            className="bg-[#282828] text-white p-2 rounded-full w-96 focus:outline-none placeholder-gray-400 text-sm pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white text-black rounded-md shadow-md mt-2 z-20 max-h-64 overflow-y-auto">
              {searchResults.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleResultClick(item.type, item.id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item.type.toUpperCase()}: {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-white px-4 py-2 rounded-full text-sm bg-gradient-to-r from-purple-500 to-pink-500">
            Khám phá Premium
          </button>
          <FaBell className="cursor-pointer" />
          <FaGlobe className="cursor-pointer" />
          <FaFacebookMessenger className="cursor-pointer" onClick={() => setIsChatOpen(prev => !prev)} />
          {isChatOpen && currentUser && (
            <div className="fixed bottom-5 right-5 z-70">
              <ChatComponent username={currentUser.name} />
            </div>
          )}
          {/* Avatar Menu */}
          <div ref={avatarRef} className="relative">
            <img
              src={currentUser?.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Account
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
