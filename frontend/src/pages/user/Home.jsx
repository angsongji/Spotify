import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../index.css";

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Album", "Song", "Podcast"];

  return (
    <div className="flex items-center mb-4 gap-2 text-sm">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`cursor-pointer px-5 py-1 rounded-full transition-colors duration-300 ${
            activeFilter === filter
              ? "bg-green-500 text-white"
              : "bg-[var(--light-gray1)] text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <div className="flex justify-between items-center text-green-500 mb-5">
    <h2 className="text-white text-2xl font-bold">{title}</h2>
    <button className="text-gray-400 hover:text-white transition cursor-pointer text-sm">
      Show all
    </button>
  </div>
);

const AlbumCard = ({ album }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/album/${album.id}`)}
      className="w-full h-auto object-cover rounded-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
    >
      <img
        src={album.cover_image}
        alt={album.name}
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
      <h3 className="text-white font-semibold mt-3">{album.name}</h3>
      <p className="text-gray-400 text-sm">{album.artist_id_id}</p>
    </div>
  );
};

const SongCard = ({ song }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/song/${song.id}`)}
      className="w-full h-auto object-cover rounded-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
    >
      <img
        src={song.cover_image}
        alt={song.name}
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
      <h3 className="text-white font-semibold mt-3">{song.name}</h3>
      <p className="text-gray-400 text-sm">{song.artist_id_id}</p>
    </div>
  );
};

const PodcastCard = ({ podcast }) => (
  <div className="w-full h-auto object-cover rounded-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer">
    <img
      src={podcast.image}
      alt={podcast.name}
      className="w-full h-44 object-cover rounded-lg mb-3"
    />
    <h3 className="text-white font-semibold mt-3">{podcast.name}</h3>
    <p className="text-gray-400 text-sm">{podcast.description}</p>
  </div>
);

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/artist/${artist.id}`)}
      className="flex flex-col items-center w-40 cursor-pointer"
    >
      <img
        src={artist.avatar}
        alt={artist.name}
        className="flex-1 rounded-full object-cover border-4 border-gray-700 hover:border-green-500 transition"
      />
      <h3 className="text-white mt-2 font-medium text-center text-base">
        {artist.name}
      </h3>
      <p className="text-gray-400 text-sm">Nghệ sĩ</p>
    </div>
  );
};

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumsRes, artistsRes, songsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/albums/"),
          axios.get("http://localhost:8000/api/artists/"),
          axios.get("http://localhost:8000/api/songs/"),
        ]);

        setAlbums(Array.isArray(albumsRes.data) ? albumsRes.data : []);
        setArtists(Array.isArray(artistsRes.data) ? artistsRes.data : []);
        setSongs(Array.isArray(songsRes.data) ? songsRes.data : []);
        setPodcasts([]); // Nếu có API podcast thì fetch luôn, còn không thì để []
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlbums([]);
        setArtists([]);
        setSongs([]);
        setPodcasts([]);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredAlbums =
    activeFilter === "All" || activeFilter === "Album" ? albums : [];
  const filteredSongs =
    activeFilter === "All" || activeFilter === "Song" ? songs : [];
  const filteredPodcasts =
    activeFilter === "All" || activeFilter === "Podcast" ? podcasts : [];

  return (
    <div className="bg-[var(--dark-gray)] p-6 min-h-screen flex flex-col gap-5">
      <FilterButtons activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      {filteredAlbums.length > 0 && (
        <>
          <SectionTitle title="Popular Albums" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </>
      )}

      {filteredSongs.length > 0 && (
        <>
          <SectionTitle title="Popular Songs" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </>
      )}

      {filteredPodcasts.length > 0 && (
        <>
          <SectionTitle title="Popular Podcasts" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredPodcasts.map((podcast, index) => (
              <PodcastCard key={index} podcast={podcast} />
            ))}
          </div>
        </>
      )}

      {activeFilter === "All" && artists.length > 0 && (
        <>
          <SectionTitle title="Popular Artists" />
          <div className="flex overflow-x-auto space-x-10 scrollbar-hide">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
