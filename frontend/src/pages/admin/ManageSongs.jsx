import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function ManageSongs() {
  const [songs, setSongs] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/all-songs/")
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
      });
  }, []);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Bài hát</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm bài hát..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Ảnh bìa</th>
            <th className="p-3 text-left">Nghệ sĩ</th>
            <th className="p-3 text-left">Tên bài hát</th>
            <th className="p-3 text-left">Album</th>
            <th className="p-3 text-left">Ngày phát hành</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left">Hành động</th>
            
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={song.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
                <img src={song.cover_image_url} alt="Ảnh bìa" className="w-12 h-12 object-cover" />
              </td>
              <td className="p-3">{song.artist_name}</td>
              <td className="p-3">{song.name}</td>
              <td className="p-3">{song.album_name}</td>
              <td className="p-3">{song.release_date}</td>
              <td className="p-3">
                  {song.is_approved == 1 ? "Đã kiểm duyệt" : "Chưa kiểm duyệt"}
                </td>
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={openEditModal}
                    className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <div className="flex justify-end mb-2">
              <button
                onClick={closeEditModal}
                className="flex text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa bài hát</h2>
            {/* Các trường chỉnh sửa tạm thời cứng */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Tên nghệ sĩ</label>
              <input type="text" value="Artist Name" disabled className="text-gray-500 w-full border rounded p-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Tên bài hát</label>
              <input type="text" value="Song Title" disabled className="text-gray-500 w-full border rounded p-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Tên album</label>
              <input type="text" value="Album Name" disabled className="text-gray-500 w-full border rounded p-2" />
            </div>
            <div className="mb-4 flex items-center space-x-3">
              <label className="block text-gray-700 font-medium">Trạng thái</label>
              <div
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
                  status ? "bg-green-500" : "bg-gray-400"
                }`}
                onClick={() => setStatus(!status)}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    status ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
              <p className="mt-1 text-sm text-gray-600">{status ? "Kiểm duyệt" : "Chưa kiểm duyệt"}</p>
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
