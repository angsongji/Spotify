import React, { useEffect, useState } from 'react';
import { FaSearch, FaPlus } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import "../../index.css";
import { useNavigate } from "react-router-dom";

const SideBar = ({ setCurrentSong }) => {
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/songs/');
                setSongs(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài hát:", error);
            }
        };

        const fetchPlaylists = async () => {
            try {
                const token = localStorage.getItem("access");
                if (!token) return;
        
                const decoded = jwtDecode(token);
        
                const accountId = decoded.account_id || decoded.user_id;
                if (!accountId) return;
        
                const response = await axios.get(`http://localhost:8000/api/playlists/${accountId}/`);
        
                setPlaylists(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy playlist:", error);
            }
        };
        

        fetchSongs();
        fetchPlaylists();
    }, []);

    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="w-full h-full p-4 flex flex-col text-white overflow-y-auto custom-scroll">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 text-gray-300">
                <div className="flex items-center gap-2">
                    <HiLibrary className="w-5 h-5" />
                    <div className="text-base font-bold">Thư viện</div>
                </div>
                <button>
                    <FaPlus className="w-5 h-5 cursor-pointer" />
                </button>
            </div>

            {/* Tìm kiếm */}
            <div className="flex items-center gap-3 bg-[var(--light-gray1)] px-2 py-1 rounded-md mb-4 w-[80%]">
                <FaSearch className="w-5 h-5 text-white" />
                <input
                    type="text"
                    placeholder="Tìm trong thư viện"
                    className="bg-transparent outline-none text-white w-full"
                />
            </div>

            {/* Danh sách playlist */}
            <div className="flex flex-col gap-3 mb-6">
            {playlists.map((playlist) => (
                <div
                    key={playlist.id}
                    onClick={() => navigate(`/playlist/${playlist.id}`)}  // <- chuyển hướng khi click
                    className="flex items-center gap-3 cursor-pointer hover:border-r hover:border-r-white"
                >
                    <img src={playlist.image} className="w-12 h-12 rounded-md" alt="playlist" />
                    <div className="flex flex-col justify-center h-full gap-1">
                        <div className="text-white font-bold">{playlist.name}</div>
                        <div className="text-gray-400 text-sm">Playlist • {playlist.song_count || 0} songs</div>
                    </div>
                </div>
            ))}
            </div>

            {/* Danh sách bài hát */}
            <h3 className="text-white text-base font-semibold mb-3">Danh sách bài hát</h3>
            <div className="flex flex-col space-y-3">
                {songs.map((song, index) => (
                    <div
                        key={song.id}
                        onClick={() => setCurrentSong(song)}
                        className="flex justify-between items-center px-2 py-2 rounded hover:bg-gray-800 cursor-pointer transition"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-400 w-5 text-right">{index + 1}</span>
                            <div>
                                <p className="text-white font-medium">{song.name}</p>
                                <p className="text-gray-400 text-sm">{song.artist_name}</p>
                            </div>
                        </div>
                        <span className="text-gray-400 text-sm">{formatDuration(song.duration)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
