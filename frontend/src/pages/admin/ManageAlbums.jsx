import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function ManageAlbums() {
  const [albums, setAlbums] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/all-albums/");
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = () => {
    closeEditModal();
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Album</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm album..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Ảnh bìa</th>
            <th className="p-3 text-left">Tên album</th>
            <th className="p-3 text-left">Nghệ sĩ</th>
            <th className="p-3 text-left">Số bài hát</th>
            <th className="p-3 text-left">Ngày phát hành</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album, index) => (
            <tr key={album.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
                <img src={album.cover_image} alt="Ảnh bìa" className="w-12 h-12" />
              </td>
              <td className="p-3">{album.name}</td>
              <td className="p-3">{album.artist_name}</td>
              <td className="p-3">{album.song_count}</td>
              <td className="p-3">{album.create_at}</td>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-end mb-2">
              <button
                onClick={closeEditModal}
                className="flex text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa album</h2>
            <form>
              {/* Form content giống như bạn đã viết */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
