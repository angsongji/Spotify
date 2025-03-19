import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../index.css'


const albums = [
  { id: 0, name: "Ruby", artist: "JENNIE", image: "/JennieSpotify.jpg" },
  { id: 1, name: "Lặng", artist: "Shiki", image: "/ShikiSpotify.jpg" },
  { id: 2, name: "THE WXRDIES", artist: "Wxrdie", image: "/WxrdieSpotify.jpg" },
  { id: 3, name: "Đánh Đổi", artist: "Obito, Shiki", image: "/ObitoSpotify1.jpg" },
  { id: 4, name: "Từng Ngày Như Mãi Mãi", artist: "buitruonglinh", image: "/BuiTruongLinhSpotify.jpg" },
];

const artists = [
  { id: 0, name: "Noo Phước Thịnh", image: "/NooPhuocThinh.jpg" },
  { id: 1, name: "HIEUTHUHAI", image: "/HTH.jpg" },
  { id: 2, name: "Sơn Tùng M-TP", image: "/SonTung.jpg" },
  { id: 3, name: "Dương Domic", image: "/DuongDomic.jpg" },
  { id: 4, name: "ChiPu", image: "/ChiPu.jpg" },
  { id: 5, name: "Bích Phương", image: "/BichPhuong.jpg" },
];
const podcasts = [
  { name: "Không thể say", description: " Không Thể Say là bài hát mới được HIEUTHUHAI chính thức ra mắt các fan hâm mộ vào tối 19/4/2023", image: "/HTH.jpg" },
  { name: "Thương em là điều anh không thể ngờ", description: "Ngày ra mắt: 18/12/2018", image: "/NooPhuocThinh.jpg" },
  { name: "Bùa Yêu", description: "Bùa yêu là tên đĩa đơn của nữ ca sĩ Bích Phương, được phát hành vào ngày 12 tháng 5 năm 2018", image: "/BichPhuong.jpg" },
];

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = ['All', 'Music'];

  return (
    <div className=" flex items-center mb-4 gap-2 space-x-3 text-sm ">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`cursor-pointer px-5 py-1 rounded-full transition-colors duration-300 ${activeFilter === filter
            ? 'bg-green-500 text-white' // Màu xanh khi active
            : 'bg-[var(--light-gray1)] text-gray-300 hover:bg-gray-600'
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
  const navigate = useNavigate();
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };


  const filteredAlbums = activeFilter === 'All' || activeFilter === 'Music' ? albums : [];
  const filteredPodcasts = activeFilter === 'Podcasts' ? podcasts : [];

  // Tiêu đề chung cho các phần
  const SectionTitle = ({ title }) => (
    <div className="flex justify-between items-center  text-green-500 mb-5">
      <h2 className="text-white text-2xl font-bold">{title}</h2>
      <button className="text-gray-400 hover:text-white transition cursor-pointer text-sm">Show all</button>
    </div>
  );


  // Thẻ Album
  const AlbumCard = ({ album }) => {
    return (
      <div onClick={() => navigate(`/album/${album.id}`)} className="w-full h-auto object-cover rounded-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer">
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
            <div onClick={() => navigate(`/artist/${artist.id}`)} key={index} className="flex flex-col items-center w-40 cursor-pointer">
              <img src={artist.image} alt={artist.name} className="flex-1 rounded-full object-cover border-4 border-gray-700 hover:border-green-500 transition" />
              <h3 className="text-white mt-2 font-medium text-center text-base">{artist.name}</h3>
              <p className="text-gray-400 text-sm">Nghệ sĩ</p>
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
  return (
    <div className="bg-[var(--dark-gray)] p-6 min-h-screen flex flex-col gap-5">
      <FilterButtons activeFilter={activeFilter} onFilterChange={handleFilterChange} />



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




export default Home;
