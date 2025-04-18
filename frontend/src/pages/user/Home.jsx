import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.css';
import { useOutletContext } from 'react-router-dom'; // ✅ import hook này

const Home = () => {
  const { setCurrentSong } = useOutletContext(); // ✅ nhận function từ UserLayout
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/songs/');
        setSongs(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài hát:", error);
      }
    };

    fetchSongs();
  }, []);

  const formatDuration = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="relative bg-[var(--dark-gray)] p-6 min-h-screen pb-24">
      <h2 className="text-white text-2xl font-bold mb-6">Danh sách bài hát</h2>
      <div className="flex flex-col space-y-4">
        {songs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => setCurrentSong(song)} // ✅ gọi hàm từ cha
            className="flex justify-between items-center px-4 py-3 rounded hover:bg-gray-800 cursor-pointer transition"
          >
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 w-6 text-right">{index + 1}</span>
              <div>
                <p className="text-white font-semibold">{song.name}</p>
                <p className="text-gray-400 text-sm">{song.artist_name}</p>
              </div>
            </div>
            <span className="text-gray-400">{formatDuration(song.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
