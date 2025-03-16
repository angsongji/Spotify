import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaBell, FaGlobe } from 'react-icons/fa';

const AppBar = ({ radios, albums, artists, podcasts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  const handleSearch = () => {
    const results = [];

    // Tìm kiếm trong radios
    if (radios) {
      radios.forEach((radio) => {
        if (radio.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: 'radio', ...radio });
        }
      });
    }

    // Tìm kiếm trong albums
    if (albums) {
      albums.forEach((album) => {
        if (album.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: 'album', ...album });
        }
      });
    }

    // Tìm kiếm trong artists
    if (artists) {
      artists.forEach((artist) => {
        if (artist.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: 'artist', ...artist });
        }
      });
    }

    // Tìm kiếm trong podcasts
    if (podcasts) {
      podcasts.forEach((podcast) => {
        if (podcast.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: 'podcast', ...podcast });
        }
      });
    }

    setSearchResults(results);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-[#121212] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="What do you want to play?"
              className="bg-[#282828] text-white p-2 rounded-full w-96 focus:outline-none placeholder-gray-400 text-sm pl-10"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="border-white text-black px-5 py-2 rounded-full text-sm flex items-center">
            Explore Premium
          </button>
          <button className="border border-white text-white px-4 py-2 rounded-full text-sm">Install App</button>
          <FaBell className="text-white" />
          <FaGlobe />
          <div ref={avatarRef} className="relative">
            <img
              src="/Avatar.jpg"
              alt="Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      {searchResults.length > 0 && (
        <div className="p-4 bg-black">
          <h2 className="text-white text-lg font-semibold mb-4">Kết quả tìm kiếm:</h2>
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