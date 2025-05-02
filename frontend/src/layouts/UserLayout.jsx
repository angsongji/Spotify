import { Outlet } from "react-router-dom";
import AppBar from "../components/user/AppBar";
import SideBar from "../components/user/SideBar";
import MusicQueue from "../components/user/MusicQueue";
import AudioBar from "../components/user/AudioBar";
import Footer from "../components/user/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import '../index.css';

const UserLayout = () => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/songs/");
        setSongs(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài hát:", error);
      }
    };

    fetchSongs();
  }, []);

  const setCurrentSong = (song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    setCurrentIndex(index);
  };

  const currentSong = currentIndex !== null ? songs[currentIndex] : null;

  return (
    <div className="bg-black flex flex-col h-screen">
      <AppBar />

      <div className="flex-1 flex px-2 gap-2">
        <div className="w-[22.22%] bg-[var(--dark-gray)] rounded-lg">
        
        <SideBar setCurrentSong={setCurrentSong} />
        </div>

        <div className="relative flex-1 overflow-y-auto h-[80vh] rounded-lg custom-scroll">
          <div>
            <Outlet context={{ setCurrentSong }} />
            <Footer />
          </div>
        </div>

        <div className="w-1/5 bg-[var(--dark-gray)] rounded-lg">
          <MusicQueue />
        </div>
      </div>

      <AudioBar
        currentSong={currentSong}
        currentIndex={currentIndex}
        songs={songs}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default UserLayout;
