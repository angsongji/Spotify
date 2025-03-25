import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa"; // Import thêm FaTimes

export default function ManageAlbums() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [status, setStatus] = useState(true); // true = Bật, false = Tắt

  //edit
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = (e) => {
    setIsEditModalOpen(false);
  };

  const handleSave = () => {
    closeEditModal();
  };

  return (
    <div className="p-5">
      {/* Tiêu đề và thanh tìm kiếm */}
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

      {/* Bảng danh sách album */}
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
          {/* Album 1 */}
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3">1</td>
            <td className="p-3">
              <img src="/ChiPu.jpg" alt="Ảnh bìa" className="w-12 h-12" />
            </td>
            <td className="p-3">Album One</td>
            <td className="p-3">Artist One</td>
            <td className="p-3">10</td>
            <td className="p-3">2023-01-01</td>
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

          {/* Album 2 */}
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3">2</td>
            <td className="p-3">
              <img src="/DuongDomic.jpg" alt="Ảnh bìa" className="w-12 h-12" />
            </td>
            <td className="p-3">Album Two</td>
            <td className="p-3">Artist Two</td>
            <td className="p-3">8</td>
            <td className="p-3">2023-02-15</td>
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

          {/* Album 3 */}
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3">3</td>
            <td className="p-3">
              <img src="/HTH.jpg" alt="Ảnh bìa" className="w-12 h-12" />
            </td>
            <td className="p-3">Album Three</td>
            <td className="p-3">Artist Three</td>
            <td className="p-3">12</td>
            <td className="p-3">2023-03-10</td>
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
        </tbody>
      </table>

      {/* Popup sửa album */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Header */}
            <div className="flex justify-end mb-2">
              <button
                onClick={closeEditModal}
                className="flex text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa album</h2>
            {/* Form */}
            <form>
              {/* Tên Album */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tên Album</label>
                <input
                  type="text"
                  disabled
                  className="text-gray-500 w-full p-2 border border-gray-300 rounded-md"
                  value="Album One"
                />
              </div>

              {/* Tên nghệ sĩ */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tên nghệ sĩ</label>
                <input
                  type="text"
                  disabled
                  className="text-gray-500 w-full p-2 border border-gray-300 rounded-md"
                  value="Tên nghệ sĩ"
                />
              </div>
              {/* Số bài hát*/}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Số bài hát</label>
                <input
                  type="text"
                  disabled
                  className="text-gray-500 w-full p-2 border border-gray-300 rounded-md"
                  value="10"
                />
              </div>

              {/* Trạng thái Toggle Switch */}
              <div className="mb-4 flex items-center space-x-3">
                <label className="block text-gray-700 font-medium">
                  Trạng thái
                </label>
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
                <p className="mt-1 text-sm text-gray-600">
                  {status ? "Bật" : "Tắt"}
                </p>
              </div>

              {/* Nút lưu */}
              <button
                onClick={handleSave}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Lưu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
