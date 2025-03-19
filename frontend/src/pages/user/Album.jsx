import React, { useState, useEffect } from 'react';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { FastAverageColor } from "fast-average-color";
import { useParams } from "react-router-dom";

const fac = new FastAverageColor();


const albums = [
  {
    image: "/JennieSpotify.jpg",
    name: "Ruby",
    artist: "Jennie",
    year: "2025",
    date: "12/10/2024",
    tracks: [
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "Intro: JANE with FKJ", duration: "1:38" },
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "Like Jennie", duration: "2:03" }
    ]
  },
  {
    image: "/ShikiSpotify.jpg",
    name: "Lặng",
    artist: "Shiki",
    year: "2025",
    date: "10/2024",
    tracks: [
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "1000 Ánh Mắt", duration: "2:32" },
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "Anh vẫn đợi", duration: "2:32" }
    ]
  },
  {
    image: "/WxrdieSpotify.jpg",
    name: "The Wxrdies",
    artist: "Wxrdie",
    year: "2025",
    date: "12/10/2024",
    tracks: [
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "Mời Em", duration: "3:23" },
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "Tim Anh Ghen", duration: "4:39" }
    ]
  },
  {
    image: "/ObitoSpotify1.jpg",
    name: "Đánh Đổi",
    artist: "Obito",
    year: "2025",
    date: "28/10/2024",
    tracks: [
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "1000 Ánh Mắt", duration: "1:38" },
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "Track 06", duration: "2:03" }
    ]
  },
  {
    image: "/BuiTruongLinhSpotify.jpg",
    name: "Từng Ngày Như Mãi Mãi",
    artist: "BuiTruongLinh",
    year: "2025",
    date: "12/10/2024",
    tracks: [
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "Giờ Thì", duration: "1:38" },
      { image: "https://i.scdn.co/image/ab67616d00001e02a06a6b51d0dc296d48505ee6", name: "Từng Ngày Yêu Em", duration: "2:03" }
    ]
  }
]
const Album = () => {

  const { albumId } = useParams(); // Đây là id của album, từ id này gọi api để truyền dữ liệu cho biến album
  const [colorMain, setColorMain] = useState("#ffffff");
  const [backgroundStyle, setBackgroundStyle] = useState("");
  //Mảng album này là dữ liệu test thôi, lúc sau sẽ là từ id album gọi api lên để lấy dữ lệu album

  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };
  function generateLinearGradient(hex, opacityStart = 1, opacityEnd = 0.2, angle = 50) {
    // Chuyển HEX sang RGB


    const { r, g, b } = hexToRgb(hex);

    // Tạo background linear-gradient với góc 50 độ
    return `linear-gradient(${angle}deg, rgba(${r}, ${g}, ${b}, ${opacityStart}), rgba(${r}, ${g}, ${b}, ${opacityEnd}))`;
  }
  console.log(albumId)
  // if (!albums[id*1]) {
  //   return <p className="text-white text-center">Album không tồn tại!</p>;
  // }

  useEffect(() => {
    fac.getColorAsync(albums[Number(albumId)].image).then(color => {
      console.log(color.hex);
      setColorMain(color.hex);
      let bg = generateLinearGradient(color.hex, 0.7, 0.4, 180);
      setBackgroundStyle(bg);
      console.log(color.hex); // Màu chủ đạo
    });
  }, [albums[Number(albumId)].image]); // useEffect chỉ chạy khi album.image thay đổi

  return (
    <div className='pb-10 bg-[#121212]'>
      <div
        className="text-white flex gap-8 flex-col md:flex-row md:items-center p-5"
        style={{ background: backgroundStyle }} // Đã cập nhật đúng màu sau khi get
      >
        <img className="w-48 h-48 rounded" src={albums[Number(albumId)].image} alt={albums[Number(albumId)].name} />
        <div className="flex flex-col justify-center">
          <p>Album</p>
          <h1 className="text-5xl font-bold mb-4 md:text-7xl">{albums[Number(albumId)].name}</h1>
          <p className="mt-1 flex items-center text-gray-400 text-sm">
            <img className="w-5 rounded-full" src={albums[Number(albumId)].image} alt="Spotify Logo" />
            <b className="pl-2">{albums[Number(albumId)].artist} • </b>
            <b className="pl-2">{albums[Number(albumId)].date} •</b>
            <b className="pl-2">{albums[Number(albumId)].tracks.length} yêu thích •</b>
            <b className="pl-2">{albums[Number(albumId)].tracks.length} bài hát</b>
          </p>
        </div>
      </div>
      <div style={{ background: `linear-gradient(to bottom, ${colorMain} 1%, #121212 60%)` }}
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
          {albums[Number(albumId)].tracks.map((track, index) => (
            <li key={index} className="h-15 w-full flex justify-between items-center py-2 px-5 border-b border-gray-800 hover:bg-gray-950 cursor-pointer">
              <div className="flex items-center text-white gap-3">
                <span className="text-gray-500">{index + 1}</span>
                <div className="flex flex-col">
                  <span className="font-bold">{track.name}</span>
                  <span className="text-gray-500 text-sm">Các nghệ sĩ tham gia bài hát</span>
                </div>
              </div>
              <span className="text-gray-400">{track.duration}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Album;
