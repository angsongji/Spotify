import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaTimes, FaPlus } from "react-icons/fa"; // Import các icon

export default function ManageUsers() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Hàm mở popup xác nhận xóa
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true); // Mở popup
  };

  // Hàm đóng popup xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Đóng popup
  };

  const handleDeleteSong = () => {
    closeDeleteModal();
  };
  const openNewModal = () => {
    setIsNewModalOpen(true); // Mở popup
  };

  const closeNewModal = () => {
    setIsNewModalOpen(false); 
  };
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
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
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
              placeholder="Tìm kiếm người dùng..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Bảng danh sách người dùng */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Ảnh đại diện</th>
            <th className="p-3 text-left">Tên người dùng</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Ngày đăng kí</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {/* user 1*/}
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3">1</td>
            <td className="p-3">
              <img src="/SonTung.jpg" alt="Ảnh bìa" className="w-12 h-12" />
            </td>
            <td className="p-3">Chase Atlantic</td>
            <td className="p-3">chaseatlantic@gmail.com</td>
            <td className="p-3">2022-04-10</td>
            <td className="p-3">Premium</td>
            <td className="p-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={openEditModal}
                  className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
                >
                  <FaEdit className="text-lg" />
                </button>
                <button
                  onClick={openDeleteModal}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </td>
          </tr>

          {/*user 2 */}
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3">2</td>
            <td className="p-3">
              <img src="/DuongDomic.jpg" alt="Ảnh bìa" className="w-12 h-12" />
            </td>
            <td className="p-3">Hoang</td>
            <td className="p-3">hoang@gmail.com</td>
            <td className="p-3">2021-03-13</td>
            <td className="p-3">Thường</td>
            <td className="p-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={openEditModal}
                  className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
                >
                  <FaEdit className="text-lg" />
                </button>
                <button
                  onClick={openDeleteModal}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </td>
          </tr>

          {/* user 3 */}
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3">3</td>
            <td className="p-3">
              <img src="/HTH.jpg" alt="Ảnh bìa" className="w-12 h-12" />
            </td>
            <td className="p-3">Tuấn Cùi</td>
            <td className="p-3">Weeknd@gmail.com</td>
            <td className="p-3">2024-02-10</td>
            <td className="p-3">Premium</td>
            <td className="p-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={openEditModal}
                  className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
                >
                  <FaEdit className="text-lg" />
                </button>
                <button
                  onClick={openDeleteModal}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Popup xác nhận xóa */}
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

            {/* Header */}
            <h2 className="text-xl font-semibold text-center mb-4">
              Xác nhận xóa
            </h2>

            {/* Nội dung */}
            <p className="text-gray-700 mb-8">
              Bạn có chắc chắn muốn xóa người dùng{" "}
              <span className="font-semibold"></span> không? Hành động này không
              thể hoàn tác.
            </p>

            {/* Nút hành động */}
            <div className="flex justify-center gap-10 mt-5">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteSong}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup sửa người dùng */}
      {/* Popup chỉnh sửa */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            {/* Nút đóng */}
            <button
              onClick={closeEditModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-lg" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa người dùng</h2>

            {/* Tên bài hát */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Tên người dùng</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            {/* Tên album */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Email</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>

            {/* Thời lượng */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Ngày đăng kí</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="mm:ss"
              />
            </div>

            {/* Trạng thái */}
            <div className="mb-3">
              <label className="block text-sm font-medium">
                Trạng thái
              </label>
                <select className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="normal">Thường</option>
                    <option value="premium">Premium</option>
                </select>
            </div>
            {/* Ảnh đại diện */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Ảnh đại diện</label>
              <input type="file" className="w-full border rounded p-2" />
            </div>

            {/* Nút lưu */}
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}
      {/* Popup thêm */}
      {isNewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            {/* Nút đóng */}
            <button
              onClick={closeNewModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-lg" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Thêm người dùng</h2>

            {/* Tên bài hát */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Tên người dùng</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            {/* Tên album */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Email</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>

            {/* Thời lượng */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Ngày đăng kí</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="mm:ss"
              />
            </div>

            {/* Trạng thái */}
            <div className="mb-3">
              <label className="block text-sm font-medium">
                Trạng thái
              </label>
                <select className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="normal">Thường</option>
                    <option value="premium">Premium</option>
                </select>
            </div>
            {/* Ảnh đại diện */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Ảnh đại diện</label>
              <input type="file" className="w-full border rounded p-2" />
            </div>

            {/* Nút lưu */}
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
