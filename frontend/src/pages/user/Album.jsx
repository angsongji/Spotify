import React from 'react';
import { FaPlay, FaRandom } from 'react-icons/fa'; // Import icons

const Album = ({ album }) => {
  return (
    <div className="p-6">
      <img src={album.image} alt={album.name} className="w-64 h-64 rounded-lg mb-4" />
      <h1 className="text-white text-3xl font-bold mb-2">{album.name}</h1>
      <h2 className="text-gray-400 text-lg mb-4">{album.artist}</h2>
      <p className="text-gray-400 mb-4">
        {album.year} • {album.tracks.length} songs
      </p>
      <div className="flex items-center mb-4">
        <button className="bg-green-500 text-white px-6 py-3 rounded-full mr-4 flex items-center">
          <FaPlay className="mr-2" /> Play
        </button>
        <button className="text-gray-400 flex items-center">
          <FaRandom className="mr-2" /> Shuffle
        </button>
      </div>
      <ul>
        {album.tracks.map((track, index) => (
          <li key={index} className="flex justify-between items-center py-2 border-b border-gray-800">
            <div className="flex items-center">
              <span className="mr-4">{index + 1}</span>
              <span>{track.name}</span>
            </div>
            <span className="text-gray-400">{track.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Album;