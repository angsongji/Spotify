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
        <h1 className="text-2xl font-bold">Thể loại</h1>
        <div className="flex items-center space-x-4">
        <button
            onClick={openNewModal}
            className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
        >
        <FaPlus className="text-lg" />
        </button>
        </div>
      </div>

      {/* Bảng danh sách người dùng */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Tên quyền hạn</th>
            <th className="p-3 text-left">Ngày tạo</th>
            <th className="p-3 text-left">Tình trạng</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {/* user 1*/}
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3">1</td>
            <td className="p-3">Admin</td>
            <td className="p-3">2023-10-10</td>
            <td className="p-3">Hoạt động</td>
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
            <td className="p-3">Dev</td>
            <td className="p-3">2024-10-10</td>
            <td className="p-3">Hoạt động</td>
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
            <td className="p-3">User</td>
            <td className="p-3">2025-01-01</td>
            <td className="p-3">Hoạt động</td>
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
              Bạn có chắc chắn muốn xóa quyền {" "}
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

            <h2 className="text-xl font-semibold mb-4">Thêm quyền</h2>

            {/* Tên quyền */}
            <div className="mb-3">
                <label className="block text-sm font-medium">Tên quyền</label>
                <input type="text" className="w-full border rounded p-2" />
            </div>

            {/* Chọn quyền */}
            <div className="mb-3">
                <label className="block text-sm font-medium">Chọn quyền</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-500" />
                    <span>Xem</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-500" />
                    <span>Thêm</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-500" />
                    <span>Sửa</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-500" />
                    <span>Xóa</span>
                </label>
                </div>
            </div>

            {/* Nút lưu */}
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Lưu
            </button>
            </div>
        </div>
        )}

      {/* Popup sửa */}
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

            <h2 className="text-xl font-semibold mb-4">Sửa quyền</h2>

            {/* Tên quyền */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Tên quyền</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            {/* Chọn quyền */}
            <div className="mb-3">
                <label className="block text-sm font-medium">Chọn quyền</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-500" />
                    <span>Xem</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-500" />
                    <span>Thêm</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-500" />
                    <span>Sửa</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-500" />
                    <span>Xóa</span>
                </label>
                </div>
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
