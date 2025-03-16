import React, { useState } from 'react';

const radios = [
  {
    name: "Dangrangto",
    image: "/DangrangtoSpotify.jpg",
    description: "With Wxrdie, Obito, HIEUTHUHAI and more",
    type: "music",
  },
  {
    name: "Obito",
    image: "/ObitoSpotify.jpg",
    description: "With HIEUTHUHAI, RPT MCK, Low G and more",
    type: "music",
  },
  {
    name: "Hà Anh Tuấn",
    image: "/HaAnhTuanSpotify.jpg",
    description: "With Vũ, Nguyên Hà, Only C and more",
    type: "music",
  },
  {
    name: "Vũ.",
    image: "/VuSpotify.jpg",
    description: "With Da LAB, Chillies, Thịnh Suy and more",
    type: "music",
  },
  {
    name: "tlinh",
    image: "/TlinhSpotify.jpg",
    description: "With RPT MCK, HIEUTHUHAI, AMEE and more",
    type: "music",
  },
  {
    name: "Dương Domic",
    image: "/DuongSpotify.jpg",
    description: "With ANH TRAI SAY HIEUTHUHAI, RHYDE and more",
    type: "music",
  },
  {
    name: "Sơn Tùng",
    image: "/SonTungSpotify.jpg",
    description: "With JustaTee, HIEUTHUHAI, SOOBIN and more",
    type: "music",
  },
  {
    name: "Hiếu Thứ Hai",
    image: "/HTHSpotify.jpg",
    description: 'With ANH TRAI "SAY HI", MANBO, RPT MCK and more',
    type: "music",
  },
];

const albums = [
  { name: "Ruby", artist: "JENNIE", image: "/JennieSpotify.jpg" },
  { name: "Lặng", artist: "Shiki", image: "/ShikiSpotify.jpg" },
  { name: "THE WXRDIES", artist: "Wxrdie", image: "/WxrdieSpotify.jpg" },
  { name: "Đánh Đổi", artist: "Obito, Shiki", image: "/ObitoSpotify1.jpg" },
  { name: "Từng Ngày Như Mãi Mãi", artist: "buitruonglinh", image: "/BuiTruongLinhSpotify.jpg" },
];

const artists = [
  { name: "Noo Phước Thịnh", image: "/NooPhuocThinh.jpg" },
  { name: "HIEUTHUHAI", image: "/HTH.jpg" },
  { name: "Sơn Tùng M-TP", image: "/SonTung.jpg" },
  { name: "Dương Domic", image: "/DuongDomic.jpg" },
  { name: "ChiPu", image: "/ChiPu.jpg" },
  { name: "Bích Phương", image: "/BichPhuong.jpg" },
];
const podcasts = [
  { name: "Không thể say", description: " Không Thể Say là bài hát mới được HIEUTHUHAI chính thức ra mắt các fan hâm mộ vào tối 19/4/2023", image: "/HTH.jpg" },
  { name: "Thương em là điều anh không thể ngờ", description: "Ngày ra mắt: 18/12/2018", image: "/NooPhuocThinh.jpg" },
  { name: "Bùa Yêu", description: "Bùa yêu là tên đĩa đơn của nữ ca sĩ Bích Phương, được phát hành vào ngày 12 tháng 5 năm 2018", image: "/BichPhuong.jpg" },
];

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = ['All', 'Music', 'Podcasts'];

  return (
    <div className="flex items-center mb-4 space-x-3">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-5 py-2 rounded-full transition-colors duration-300 ${
            activeFilter === filter
              ? 'bg-green-500 text-white' // Màu xanh khi active
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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

  const filteredRadios = activeFilter === 'All' || activeFilter === 'Music' ? radios : [];
  const filteredAlbums = activeFilter === 'All' || activeFilter === 'Music' ? albums : [];
  const filteredPodcasts = activeFilter === 'Podcasts' ? podcasts : [];

  return (
    <div className="p-6 bg-black min-h-screen">
      <FilterButtons activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      
      {(activeFilter === 'All' || activeFilter === 'Music') && (
        <>
          <SectionTitle title="Popular Radio" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredRadios.map((radio, index) => (
              <RadioCard key={index} radio={radio} />
            ))}
          </div>
        </>
      )}

      {filteredAlbums.length > 0 && (
        <>
          <SectionTitle title="Popular Albums" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredAlbums.map((album, index) => (
              <AlbumCard key={index} album={album} />
            ))}
          </div>
        </>
      )}
       {filteredPodcasts.length > 0 && (
        <div className="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-4 gap-5">
          {filteredPodcasts.map((podcast, index) => (
            <PodcastCard key={index} podcast={podcast} />
          ))}
        </div>
      )}
      {activeFilter === 'All' && <PopularArtists />} 
    </div>
  );
};

// Tiêu đề chung cho các phần
const SectionTitle = ({ title }) => (
  <div className="flex justify-between items-center my-6">
    <h2 className="text-white text-2xl font-bold">{title}</h2>
    <button className="text-gray-400 hover:text-white transition">Show all</button>
  </div>
);

// Thẻ Radio
const RadioCard = ({ radio }) => {
  return (
    <div className="w-full p-4  mb-32  h-44 object-cover rounded-lg transition-transform transform hover:scale-105 duration-300">
      <img src={radio.image} alt={radio.name} className="w-full h-40 object-cover rounded-lg mb-3" />
      <h3 className="text-white font-bold text-lg">{radio.name}</h3>
      <p className="text-gray-400 text-sm">{radio.description}</p>
    </div>
  );
};

// Thẻ Album
const AlbumCard = ({ album }) => {
  return (
    <div className="w-full h-44 mb-20 object-cover rounded-lg transition-transform transform hover:scale-105 duration-300">
      <img src={album.image} alt={album.name} className="w-full h-44 object-cover rounded-lg mb-3" />
      <h3 className="text-white font-semibold mt-3">{album.name}</h3>
      <p className="text-gray-400 text-sm">{album.artist}</p>
    </div>
  );
};

const PopularArtists = () => {
  return (
    <div className="my-8">
      <SectionTitle title="Popular Artists" />
      <div className="flex overflow-x-auto space-x-10 scrollbar-hide">
        {artists.map((artist, index) => (
          <div key={index} className="flex flex-col items-center w-40">
            <img src={artist.image} alt={artist.name} className="w-40 h-40 rounded-full object-cover border-4 border-gray-700 hover:border-green-500 transition" />
            <h3 className="text-white mt-2 font-medium text-center text-lg">{artist.name}</h3>
            <p className="text-gray-400 text-sm">Artist</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PodcastCard = ({ podcast }) => (
  <div className="w-100 h-110 mb-20 object-cover rounded-lg transition-transform transform hover:scale-105 duration-300">
    <img src={podcast.image} alt={podcast.name} className="w-100 h-100 object-cover rounded-lg mb-3" />
    <h3 className="text-white font-semibold mt-3">{podcast.name}</h3>
    <p className="text-gray-400 text-sm">{podcast.description}</p>
  </div>
);


export default Home;
