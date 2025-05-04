import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/api/users/${selectedUser.id}/`);
      fetchUsers();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const openNewModal = () => {
    setIsNewModalOpen(true);
  };

  const closeNewModal = () => {
    setIsNewModalOpen(false);
  };

  return (
    <div className="p-5">
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

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Tên người dùng</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Ngày đăng kí</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.create_at}</td>
              <td className="p-3">{user.type === "premium" ? "Premium" : "Thường"}</td>
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openEditModal(user)}
                    className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
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

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <button
              onClick={closeDeleteModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Xác nhận xóa</h2>
            <p className="text-gray-700">
              Bạn có chắc chắn muốn xóa người dùng{" "}
              <strong>{selectedUser.name}</strong> không?
            </p>
            <div className="mt-6 flex justify-center gap-6">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteUser}
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
