import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlay, FaPlus } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";



const Song = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPlaylistPopupVisible, setIsPlaylistPopupVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // Lựa chọn "Thêm vào Hàng đợi" hoặc "Thêm vào Playlist"

  const getAccountIdFromToken = () => {
    const token = localStorage.getItem("access");
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);

      return decoded.user_id || decoded.account_id; // tùy bạn đặt tên trong payload
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/songs/${id}/`);
        const data = await response.json();
        setSong(data);
      } catch (error) {
        console.error("Failed to fetch song", error);
      }
    };

    fetchSong();
  }, [id]);

  // useEffect(() => {
  //   const fetchPlaylists = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/api/playlists/");
  //       const data = await response.json();
  //       setPlaylists(data);
  //     } catch (error) {
  //       console.error("Failed to fetch playlists", error);
  //     }
  //   };

  //   fetchPlaylists();
  // }, []);

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylist) {
      alert("Vui lòng chọn một playlist.");
      return;
    }
    
    const playlistId = selectedPlaylist.id;
    const songId = song.id;
    const addedAt = new Date().toISOString();
  
    try {
      const response = await fetch("http://localhost:8000/api/playlist_song/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlist_id: playlistId,
          song_id: songId,
          added_at: addedAt,
        }),
      });
  
      if (response.ok) {
        alert("Đã thêm bài hát vào playlist!");
        setIsPlaylistPopupVisible(false);
        setSelectedPlaylist(null);
      } else {
        alert("Thêm bài hát thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm bài hát:", error);
      alert("Không thể thêm bài hát.");
    }
  };
  

  const handleAddToQueue = () => {
    const currentQueue = JSON.parse(sessionStorage.getItem("musicQueue")) || [];
  
    const isAlreadyInQueue = currentQueue.some((item) => item.id === song.id);
    if (isAlreadyInQueue) {
      alert("Bài hát đã có trong hàng đợi.");
      return;
    }
  
    const songData = {
      id: song.id,
      title: song.name,
      artist: song.artist_name,
      image: song.cover_image_url,
    };
  
    const updatedQueue = [...currentQueue, songData];
    sessionStorage.setItem("musicQueue", JSON.stringify(updatedQueue));
  
    const event = new CustomEvent("queueUpdated", { detail: updatedQueue });
    window.dispatchEvent(event);
  
    alert("Đã thêm vào hàng đợi.");
    setIsPopupVisible(false);
  };
  
  

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!song) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center space-x-6 bg-gradient-to-b from-red-600 to-black p-8 rounded-lg mb-8">
        <img
          src={song.cover_image_url}
          alt={song.name}
          className="w-48 h-48 rounded-lg shadow-lg"
        />
        <div>
          <p className="text-white font-bold text-sm mb-2">Song</p>
          <h1 className="text-white text-6xl font-bold mb-4">{song.name}</h1>
          <div className="flex items-center text-gray-300 text-sm space-x-2">
            {song.artist_avatar_url && (
              <img
                src={song.artist_avatar_url}
                alt={song.artist_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
  
            <span className="font-bold">
              {song?.artist_name || "Unknown Artist"}
            </span>
            
            <span>•</span>
            <span>{song.album_name || "Unknown Album"}</span>
            <span>•</span>
            <span>{song.release_date || "Unknown Year"}</span>
            <span>•</span>
            <span>{formatDuration(song?.duration)}</span>
            {/* <span>•</span>
            <span>{song?.listen_count?.toLocaleString() || "0"}</span> */}
          </div>
        </div>
      </div>

      {/* Play & Add */}
      <div className="flex items-center space-x-6 mb-8">
        <button className="bg-green-500 text-white px-8 py-4 rounded-full flex items-center text-lg font-bold hover:scale-105 transition">
          <FaPlay className="mr-3" /> Play
        </button>
        <button
          className="bg-gray-700 text-white p-4 rounded-full hover:scale-105 transition"
          onClick={() => setIsPopupVisible(true)}
        >
          <FaPlus />
        </button>
      </div>

      {/* Popup for Add to Playlist */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Thêm Playlist</h3>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-md mb-4"
              onClick={async () => {
                const accountId = getAccountIdFromToken();
                if (!accountId) {
                  alert("Bạn chưa đăng nhập.");
                  return;
                }

                try {
                  const response = await fetch(`http://localhost:8000/api/playlists/${accountId}/`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                  });

                  if (!response.ok) {
                    throw new Error("Không thể lấy danh sách playlist");
                  }

                  const data = await response.json();
                  setPlaylists(data);
                  setIsPlaylistPopupVisible(true); // mở popup chọn playlist
                  setIsPopupVisible(false); // đóng popup chính
                } catch (error) {
                  console.error("Lỗi khi lấy playlists:", error);
                  alert("Không thể tải danh sách playlist.");
                }
              }}
            >
              Thêm vào Playlist
            </button>

            <button
              className="w-full bg-blue-500 text-white py-3 rounded-md mb-4"
              onClick={() => {
                setSelectedOption("queue");
                handleAddToQueue();
              }}
            >
              Thêm vào hàng đợi
            </button>
            <button
              className="w-full bg-gray-500 text-white py-3 rounded-md"
              onClick={() => setIsPopupVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Playlist Selection Popup */}
      {isPlaylistPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Lựa chọn Playlist</h3>
            <select
              className="w-full p-3 mb-4 border rounded-md"
              onChange={(e) => setSelectedPlaylist(JSON.parse(e.target.value))}
            >
              
              <option value="">Lựa chọn Playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={JSON.stringify(playlist)}>
                  {playlist.name}
                </option>
              ))}
            </select>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-md"
              onClick={handleAddToPlaylist}
            >
              Thêm bài hát vào Playlist
            </button>
            <button
              className="w-full bg-gray-500 text-white py-3 rounded-md mt-4"
              onClick={() => setIsPlaylistPopupVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Song;
