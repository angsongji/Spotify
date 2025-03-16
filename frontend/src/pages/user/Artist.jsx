import React from 'react';
import { FaUserPlus } from 'react-icons/fa'; // Import icon

const Artist = ({ artist }) => {
  return (
    <div className="p-6">
      <img src={artist.image} alt={artist.name} className="w-64 h-64 rounded-full mb-4" />
      <h1 className="text-white text-3xl font-bold mb-2">{artist.name}</h1>
      <p className="text-gray-400 mb-4">{artist.followers} followers</p>
      <p className="text-gray-400 mb-4">{artist.bio}</p>
      <button className="border border-white text-white px-6 py-3 rounded-full mb-4 flex items-center">
        <FaUserPlus className="mr-2" /> Follow
      </button>
      <h2 className="text-white text-2xl font-bold mb-2">Popular Albums</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {artist.albums.map((album, index) => (
          <div key={index}>
            <img src={album.image} alt={album.name} className="w-full rounded-lg mb-2" />
            <p className="text-white">{album.name}</p>
          </div>
        ))}
      </div>
      <h2 className="text-white text-2xl font-bold mb-2">Popular Songs</h2>
      <ul>
        {artist.songs.map((song, index) => (
          <li key={index} className="flex justify-between items-center py-2 border-b border-gray-800">
            <span>{song.name}</span>
            <span className="text-gray-400">{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Artist;