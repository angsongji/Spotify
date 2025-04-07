import React from "react";
import { Play, X } from "lucide-react";

const queueSongs = [
  {
    id: 1,
    title: "Bùa yêu",
    artist: "Bích Phương",
    image: "/BichPhuong.jpg",
  },
  {
    id: 2,
    title: "Ruby",
    artist: "JENNIE",
    image: "/JennieSpotify.jpg",
  },
  {
    id: 3,
    title: "Đoạn Kết Nào Cho Em",
    artist: "Hà Anh Tuấn",
    image: "/HaAnhTuanSpotify.jpg",
  },
  {
    id: 4,
    title: "Anh Ơi Ở Lại",
    artist: "Chi Pu",
    image: "/ChiPu.jpg",
  },
  {
    id: 5,
    title: "Nước mắt cá sấu",
    artist: "Hiếu Thứ Hai",
    image: "/HTH.jpg",
  },
  {
    id: 6,
    title: "Ngày Mai Em Đi",
    artist: "Bích Phương",
    image: "/BichPhuong.jpg",
  },
  {
    id: 7,
    title: "Mất kết nối",
    artist: "Tóc Tiên",
    image: "/DuongDomic.jpg",
  },
  {
    id: 8,
    title: "Nơi Này Có Anh",
    artist: "Sơn Tùng M-TP",
    image: "/SonTung.jpg",
  },
  {
    id: 9,
    title: "Lạc trôi",
    artist: "Sơn Tùng M-TP",
    image: "/SonTung.jpg",
  },
];

const MusicQueue = () => {
  return (
    <div className="w-80 h-full bg-black text-white p-4 border-l border-gray-700 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Hàng đợi</h2>

      {/* Danh sách cuộn riêng */}
      <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 150px)', paddingBottom: '64px' }}>
        {queueSongs.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between mb-3 hover:bg-gray-800 rounded-lg p-2 transition-all"
          >
            <div className="flex items-center gap-3">
              <img
                src={song.image}
                alt={song.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS inline để không cần tạo file */}
      <style>
        {`
          html, body {
            overflow: hidden;
          }

          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: black transparent;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: black;
            border-radius: 6px;
          }
        `}
      </style>
    </div>
  );
};

export default MusicQueue;