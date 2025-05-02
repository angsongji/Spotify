import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import axios from "axios";

export default function ManageGenres() {
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state để lưu từ khóa tìm kiếm
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deleteGenreId, setDeleteGenreId] = useState(null);
  const [newGenreName, setNewGenreName] = useState("");
  const [newGenreDescription, setNewGenreDescription] = useState("");

  // Lấy danh sách thể loại từ API
  useEffect(() => {
    axios.get("http://localhost:8000/api/music-genres/")
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => {
        console.error("Error fetching genres:", error);
      });
  }, []);

  // Hàm xử lý tìm kiếm
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
  };

  // Lọc danh sách thể loại nhạc theo từ khóa tìm kiếm
  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase()) // Lọc theo tên thể loại
  );

  // Mở modal xóa
  const openDeleteModal = (id) => {
    setDeleteGenreId(id);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Xóa thể loại
  const handleDeleteGenre = () => {
    axios.delete(`http://localhost:8000/api/music-genres/delete/${deleteGenreId}/`)
      .then(() => {
        setGenres(genres.filter(genre => genre.id !== deleteGenreId)); // Xóa khỏi danh sách hiển thị
        closeDeleteModal();
      })
      .catch(error => {
        console.error("Error deleting genre:", error);
      });
  };

  // Mở modal thêm thể loại mới
  const openNewModal = () => {
    setIsNewModalOpen(true);
  };

  // Đóng modal thêm thể loại mới
  const closeNewModal = () => {
    setIsNewModalOpen(false);
  };

  // Thêm thể loại mới
  const handleAddGenre = () => {
    const newGenre = { name: newGenreName, description: newGenreDescription };
    axios.post("http://localhost:8000/api/music-genres/add/", newGenre)
      .then(response => {
        setGenres([...genres, response.data]); // Thêm thể loại vào danh sách
        closeNewModal();
      })
      .catch(error => {
        console.error("Error adding genre:", error);
      });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thể loại</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={openNewModal}
            className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
          >
            <FaPlus className="text-lg" />
          </button>
          <div className="relative">
            <input
              type="text"
              value={searchTerm} // Liên kết với state searchTerm
              onChange={handleSearchChange} // Hàm xử lý thay đổi từ khóa tìm kiếm
              placeholder="Tìm kiếm thể loại..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Danh sách thể loại */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Tên thể loại</th>
            <th className="p-3 text-left">Mô tả</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredGenres.map((genre, index) => (
            <tr key={genre.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{genre.name}</td>
              <td className="p-3">{genre.description}</td>
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openDeleteModal(genre.id)}
                    className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border rounded-lg p-6 w-96">
            <div className="flex justify-end items-center mb-2">
              <button
                onClick={closeDeleteModal}
                className="flex text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-center mb-4">Xác nhận xóa</h2>
            <p className="text-gray-700 mb-8">Bạn có chắc chắn muốn xóa thể loại này không?</p>
            <div className="flex justify-center gap-10 mt-5">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteGenre}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm thể loại mới */}
      {isNewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <button
              onClick={closeNewModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-lg" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Thêm thể loại</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium">Tên thể loại</label>
              <input
                type="text"
                value={newGenreName}
                onChange={(e) => setNewGenreName(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Mô tả</label>
              <input
                type="text"
                value={newGenreDescription}
                onChange={(e) => setNewGenreDescription(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <button
              onClick={handleAddGenre}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
