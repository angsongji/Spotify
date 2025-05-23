import React, { useState, useEffect } from "react";
import { FaPlay, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [randomColor, setRandomColor] = useState("#22c55e"); // default green

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumRes = await axios.get(`http://localhost:8000/api/albums/${id}/`);
        const songsRes = await axios.get(`http://localhost:8000/api/songs-by-album/${id}/`);

        setAlbum(albumRes.data);
        setSongs(songsRes.data);

        const generatedColor = getRandomColor();
        setRandomColor(generatedColor);
      } catch (error) {
        console.error("Error fetching album or songs:", error);
      }
    };

    if (id) {
      fetchAlbumData();
    }
  }, [id]);

  if (!album) {
    return <div className="text-white p-5">Loading album...</div>;
  }

  return (
    <div className="pb-10 bg-[#121212]">
      <div
        className="text-white flex gap-8 flex-col md:flex-row md:items-center p-5"
        style={{
          background: `linear-gradient(180deg, ${randomColor} 0%, rgba(18,18,18,0.6) 100%)`,
        }}
      >
        <img
          className="w-48 h-48 rounded"
          src={album.cover_image}
          alt={album.name}
        />
        <div className="flex flex-col justify-center">
          <p>Album</p>
          <h1 className="text-5xl font-bold mb-4 md:text-7xl">{album.name}</h1>
          <p className="mt-1 flex items-center text-gray-400 text-sm">
            <img
              className="w-5 rounded-full"
              src={album.cover_image}
              alt="Spotify Logo"
            />
            <b className="pl-2">{album.artist_id_id} •</b>
            <b className="pl-2">
              {new Date(album.create_at).toLocaleDateString()} •
            </b>
            <b className="pl-2">{songs.length} bài hát</b>
          </p>
        </div>
      </div>

      <div
        style={{
          background: `linear-gradient(to bottom, ${randomColor} 1%, #121212 60%)`,
        }}
      >
        <div className="flex items-center mx-5 w-[20%] justify-between py-10">
          <button className="bg-green-500 px-6 py-3 rounded-full mr-4 flex items-center cursor-pointer">
            <FaPlay className="mr-2" /> Play
          </button>
          <button className="text-gray-400 flex items-center cursor-pointer">
            <FaHeart className="mr-2 text-2xl" color="red" />
          </button>
        </div>

        <ul>
          {songs.map((song, index) => (
            <li
              key={song.id}
              className="h-15 w-full flex justify-between items-center py-2 px-5 border-b border-gray-800 hover:bg-gray-950 cursor-pointer"
            >
              <div className="flex items-center text-white gap-3">
                <span className="text-gray-500">{index + 1}</span>
                <div className="flex flex-col">
                  <span className="font-bold">{song.name}</span>
                  <span className="text-gray-500 text-sm">
                    {song.artist_id_id}
                  </span>
                </div>
              </div>
              <span className="text-gray-400">
                {formatDuration(song.duration)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Album;
