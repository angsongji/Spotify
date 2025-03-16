import React, { useState } from 'react';

const radios = [
  {
    name: "Dangrangto",
    image: "/images/dangrangto.jpg",
    description: "With Wxrdie, Obito, HIEUTHUHAI and more",
    type: "music",
  },
  {
    name: "Obito",
    image: "/images/obito.jpg",
    description: "With HIEUTHUHAI, RPT MCK, Low G and more",
    type: "music",
  },
  {
    name: "Hà Anh Tuấn",
    image: "/images/haanhtuan.jpg",
    description: "With Vũ, Nguyên Hà, Only C and more",
    type: "music",
  },
  {
    name: "Vũ.",
    image: "/images/vu.jpg",
    description: "With Da LAB, Chillies, Thịnh Suy and more",
    type: "music",
  },
  {
    name: "tlinh",
    image: "/images/tlinh.jpg",
    description: "With RPT MCK, HIEUTHUHAI, AMEE and more",
    type: "music",
  },
  {
    name: "Dương Domic",
    image: "/images/duongdomic.jpg",
    description: "With ANH TRAI SAY HIEUTHUHAI, RHYDE",
    type: "music",
  },
  {
    name: "Podcast 1",
    image: "/images/podcast1.jpg",
    description: "Description of Podcast 1",
    type: "podcasts",
  },
  {
    name: "Podcast 2",
    image: "/images/podcast2.jpg",
    description: "Description of Podcast 2",
    type: "podcasts",
  },
];

const albums = [
  { name: "Album 1", image: "/images/album1.jpg", type: "music" },
  { name: "Album 2", image: "/images/album2.jpg", type: "music" },
  { name: "Album 3", image: "/images/album3.jpg", type: "music" },
  { name: "Album 4", image: "/images/album4.jpg", type: "music" },
];

const FilterButtons = ({ activeFilter, onFilterChange }) => {
    const filters = ['All', 'Music', 'Podcasts'];
  
    return (
      <div className="flex items-center mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === filter
                ? 'bg-gray-700 text-white' // Màu xám đậm hơn khi active
                : 'bg-gray-800 text-white'
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    );
  };
  
const Home = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredRadios =
    activeFilter === 'All'
      ? radios
      : radios.filter((radio) => radio.type === activeFilter.toLowerCase());

  const filteredAlbums =
    activeFilter === 'All'
      ? albums
      : albums.filter((album) => album.type === activeFilter.toLowerCase());

  return (
    <div className="p-6">
      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-white text-2xl font-bold">Popular Radio</h2>
        <button className="text-white">Show all</button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {filteredRadios.map((radio, index) => (
          <RadioCard key={index} radio={radio} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 mb-5">
        <h2 className="text-white text-2xl font-bold">Popular Albums</h2>
        <button className="text-white">Show all</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredAlbums.map((album, index) => (
          <AlbumCard key={index} album={album} />
        ))}
      </div>
    </div>
  );
};

const RadioCard = ({ radio }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <img src={radio.image} alt={radio.name} className="w-full h-32 object-cover rounded-lg mb-2" />
      <h3 className="text-white font-bold">{radio.name}</h3>
      <p className="text-gray-400 text-sm">{radio.description}</p>
    </div>
  );
};

const AlbumCard = ({ album }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <img src={album.image} alt={album.name} className="w-full h-32 object-cover rounded-lg" />
    </div>
  );
};

export default Home;