import React from "react";
import { FaUserPlus } from "react-icons/fa"; // Import icon
const artist = {
  id: "1",
  name: "Sơn Tùng M-TP",
  avatar: "https://i.scdn.co/image/ab67616100005174449c7d96a5a5c5db5d5c5d5c",
  image: "https://i.scdn.co/image/ab67618600001016789a7d9a6a6c7d7b7b7b7b7b",
  genre: ["Pop", "R&B"],
  followers: 5000000,
  albums: [
    {
      id: "album1",
      name: "Sky Tour",
      releaseDate: "2020-06-07",
      image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6",
    },
    {
      id: "album2",
      name: "M-TP M-TP",
      releaseDate: "2017-12-12",
      image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6",
    },
  ],
  songs: [
    {
      id: "track1",
      name: "Chạy Ngay Đi",
      duration: "3:50",
      playCount: 12000000,
    },
    {
      id: "track2",
      name: "Hãy Trao Cho Anh",
      duration: "4:10",
      playCount: 15000000,
    },
  ],
  bio: "Sơn Tùng M-TP là một ca sĩ, nhạc sĩ và nhà sản xuất âm nhạc người Việt Nam. Anh là một trong những nghệ sĩ thành công nhất của Vpop với nhiều bản hit đình đám.",
};

const Artist = () => {
  return (
    <div className="p-6">
      <img
        src={artist.image}
        alt={artist.name}
        className="w-64 h-64 rounded-full mb-4"
      />
      <h1 className="text-white text-3xl font-bold mb-2">{artist.name}</h1>
      {/* <p className="text-gray-400 mb-4">{artist.followers} followers</p> */}
      {/* <p className="text-gray-400 mb-4">{artist.bio}</p> */}
      <button className="border border-white text-white px-6 py-3 rounded-full mb-4 flex items-center">
        <FaUserPlus className="mr-2" /> Follow
      </button>
      <h2 className="text-white text-2xl font-bold mb-2">Popular Albums</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {artist.albums.map((album, index) => (
          <div key={index}>
            <img
              src={album.image}
              alt={album.name}
              className="w-full rounded-lg mb-2"
            />
            <p className="text-white">{album.name}</p>
          </div>
        ))}
      </div>
      <h2 className="text-white text-2xl font-bold mb-2">Popular Songs</h2>
      <ul>
        {artist.songs.map((song, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-800"
          >
            <span>{song.name}</span>
            <span className="text-gray-400">{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Artist;
