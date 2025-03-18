import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaSearch, FaBell, FaGlobe } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const albums = [
    { id: "album1", name: "Sky Tour", type: "Album", artist: "Sơn Tùng M-TP", cover: "/Skytour.jpg" },
    { id: "album2", name: "M-TP M-TP", type: "Album", artist: "Sơn Tùng M-TP", cover: "/MTP.jpg" }
];

const songs = [
    { id: "song1", name: "Lạc Trôi", type: "Song", artist: "Sơn Tùng M-TP", cover: "/Lactroi.jpg" },
    { id: "song2", name: "Solo", type: "Song", artist: "Jennie", cover: "/Solo.jpg" }
];

const artists = [
    { id: "1", name: "Sơn Tùng M-TP", type: "Artist", cover: "/SonTung.jpg" },
    { id: "2", name: "Jennie", type: "Artist", cover: "/JennieSpotify.jpg" }
];

const AppBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const avatarRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        const results = [];

        artists.forEach(artist => {
            if (artist.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push({ type: 'Artist', ...artist });
            }
        });

        albums.forEach(album => {
            if (album.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push({ type: 'Album', ...album });
            }
        });

        songs.forEach(song => {
            if (song.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push({ type: 'Song', ...song });
            }
        });

        setSearchResults(results);
    }, [searchTerm]);

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
            <div className="bg-black p-4 flex justify-between items-center text-white relative">
                {/* Logo + Home */}
                <div className="flex items-center gap-3">
                    <img src="/spotify_logo.jpg" alt="Spotify" className="w-8 h-8" />
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700" onClick={() => navigate("/")}> 
                        <FaHome className="text-white w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                {/* Ô tìm kiếm */}
                <div className="flex items-center relative w-96">
                    <input
                        type="text"
                        placeholder="Bạn muốn nghe gì?"
                        className="bg-[#282828] text-white p-2 rounded-full w-full focus:outline-none placeholder-gray-400 text-sm pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-2.5 text-gray-400" />

                    {/* Hiển thị kết quả tìm kiếm */}
                    {searchResults.length > 0 && (
                        <div className="absolute top-12 left-0 w-full bg-gray-700 rounded-lg shadow-lg z-10 p-4">
                            <h3 className="text-gray-400 text-sm mb-2">Kết quả tìm kiếm:</h3>
                            <ul>
                                {searchResults.map((result, index) => (
                                    <li key={index} className="text-white cursor-pointer hover:bg-gray-600 p-2 rounded-md" onClick={() => navigate(`/${result.type}/${result.id}`)}>
                                        <img src={result.cover} alt={result.name} className="w-12 h-12 rounded-md inline-block mr-3" />
                                        {result.type}: {result.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Các icon bên phải */}
                <div className="flex items-center gap-4">
                    <button className="text-white px-4 py-2 rounded-full text-sm bg-gradient-to-r from-purple-500 to-pink-500">Khám phá Premium</button>
                    <FaBell className="text-white cursor-pointer" />
                    <FaGlobe className='cursor-pointer' />
                    <div ref={avatarRef} className="relative">
                        <img src="/Avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full cursor-pointer" onClick={toggleMenu} />
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
        </div>
    );
};

export default AppBar;