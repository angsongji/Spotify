import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes, FaImage } from "react-icons/fa"; // Import các icon

const ArtistAlbums = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Hàm mở popup xác nhận xóa
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true); // Mở popup
  };

  // Hàm đóng popup xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Đóng popup
  };

  const handleDeleteAlbum = () => {
    closeDeleteModal();
  };

  //add-edit
  const openAddEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeAddEditModal = (e) => {
    setIsEditModalOpen(false);
  };

  const handleSave = () => {
    closeAddEditModal();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Lấy file đầu tiên
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setImageFile(file);
    } else {
      alert("Chỉ được chọn ảnh!");
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold mb-4">Artist Albums</h1>
        <button
          onClick={openAddEditModal}
          className="px-3 py-2 rounded-md bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 shadow-lg hover:shadow-xl"
        >
          <span className="text-xl">Thêm mới +</span>
        </button>
      </div>
      {/* Search bar */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md-6">
        <div className="flex flex-col mb-4 mr-16">
          <span class="text-xl mb-2">Tìm kiếm</span>
          <input
            id="searchName"
            type="text"
            placeholder="Nhập tên album"
            className="text-xl w-[500px] p-2 border border-gray-300 rounded-md mb-4"
          />
        </div>
        <div className="flex flex-col mb-4 mr-16 ">
          <span class="text-xl mb-2">Ngày bắt đầu</span>
          <input
            id="searchDateStart"
            type="date"
            className="text-xl w-full p-2 border border-gray-300 rounded-md mb-4"
          />
        </div>
        <div className="flex flex-col mb-4 mr-16">
          <span class="text-xl mb-2">Ngày kết thúc</span>
          <input
            id="searchDateEnd"
            type="date"
            className="text-xl w-full p-2 border border-gray-300 rounded-md mb-4"
          />
        </div>
        <div className="flex flex-col mb-4 mr-16">
          <span className="text-xl mb-2">Trạng thái</span>
          <select
            id="statusFilter"
            className="text-xl p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="hd">hoạt động</option>
            <option value="an">ẩn</option>
          </select>
        </div>
        <button className="px-3 py-2 rounded-md bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 shadow-lg hover:shadow-xl">
          <span className="text-xl">Tìm kiếm</span>
        </button>
      </div>
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100 text-gray-600 uppercase text-left">
            <tr>
              <th class="px-4 py-6">Mã</th>
              <th class="px-4 py-6">Tên</th>
              <th class="px-4 py-6">Ngày phát hành</th>
              <th class="px-4 py-6">Trạng thái</th>
              <th class="px-4 py-6">Hành động</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-t">
              <td class="px-4 py-3">#2632</td>
              <td class="flex items-center px-4 py-3">
                <img
                  src="/ChiPu.jpg"
                  alt="Album Cover"
                  class="w-12 h-12 rounded object-cover"
                />
                <span class="px-4">Album 1</span>
              </td>
              <td class="px-4 py-3">12-2-2023</td>
              <td class="px-4 py-3">
                <span className="px-2 py-1 rounded-md bg-green-200 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-4 py-3">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full text-gray flex items-center justify-center hover:bg-gray-300">
                    <FaEdit onClick={openAddEditModal} className="text-lg" />
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="w-10 h-10 rounded-full text-gray flex items-center justify-center hover:bg-gray-300"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
            <tr class="border-t">
              <td class="px-4 py-3">#2632</td>
              <td class="flex items-center px-4 py-3">
                <img
                  src="/ChiPu.jpg"
                  alt="Album Cover"
                  class="w-12 h-12 rounded object-cover"
                />
                <span class="px-4">Album 1</span>
              </td>
              <td class="px-4 py-3">12-2-2023</td>
              <td class="px-4 py-3">
                <span className="px-2 py-1 rounded-md bg-green-200 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-4 py-3">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full text-gray flex items-center justify-center hover:bg-gray-300">
                    <FaEdit onClick={openAddEditModal} className="text-lg" />
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="w-10 h-10 rounded-full text-gray flex items-center justify-center hover:bg-gray-300"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
            <tr class="border-t">
              <td class="px-4 py-3">#2632</td>
              <td class="flex items-center px-4 py-3">
                <img
                  src="/ChiPu.jpg"
                  alt="Album Cover"
                  class="w-12 h-12 rounded object-cover"
                />
                <span class="px-4">Album 1</span>
              </td>
              <td class="px-4 py-3">12-2-2023</td>
              <td class="px-4 py-3">
                <span className="px-2 py-1 rounded-md bg-red-200 text-red-600">
                  Inactive
                </span>
              </td>
              <td class="px-4 py-3">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full text-gray flex items-center justify-center hover:bg-gray-300">
                    <FaEdit onClick={openAddEditModal} className="text-lg" />
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="w-10 h-10 rounded-full text-gray flex items-center justify-center hover:bg-gray-300"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Popup xác nhận xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="flex flex-col bg-white border rounded-lg p-6 w-96">
            <div className="flex justify-end items-center mb-2">
              <button
                onClick={closeDeleteModal}
                className="flex text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Header */}
            <h2 className="text-xl font-semibold text-center mb-2">
              Xác nhận xóa
            </h2>

            {/* Nội dung */}
            <p className="text-gray-700">
              Bạn có chắc chắn muốn xóa album{" "}
              <span className="font-semibold"></span> không? Hành động này không
              thể hoàn tác.
            </p>

            {/* Nút hành động */}
            <div className="flex justify-center gap-5 mt-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteAlbum}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup sửa album */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Header */}
            <div className="flex justify-end mb-4">
              <button
                onClick={closeAddEditModal}
                className="flex text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            <h1 className="flex justify-center font-bold text-2xl mb-4">
              Thêm album
            </h1>
            {/* Form */}
            <form>
              {/* Tên Album */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tên Album</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Nhập tên album"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">
                  Chọn bài hát
                </label>
                <select className="w-full border rounded p-2">
                  <option>Bài hát 1</option>
                  <option>Bài hát 2</option>
                  <option>Bài hát 3</option>
                </select>
              </div>

              {/* Tải file ảnh và file nhạc */}
              <div className="uploadImageAndVideo flex justify-between mb-8 mt-8 ml-10">
                {/* Ảnh bìa */}
                <div className="flex flex-col items-center outline outline-2 outline-dashed outline-gray-500 rounded-lg p-8">
                  <FaImage className="text-gray-500 text-6xl mb-3" />
                  <label
                    htmlFor="image-upload"
                    className="px-4 py-2 bg-gray-300 text-gray rounded-lg hover:bg-blue-300 hover:text-blue-800 cursor-pointer ml-10 mr-10"
                  >
                    Tải ảnh lên
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* file name  */}
              <div className="flex flex-col items-center">
                {imageFile && (
                  <div class="flex outline rounded p-3 w-full mb-4">
                    {" "}
                    <FaImage className="text-gray-500 text-xl mr-4" />
                    <p>{imageFile.name}</p>
                  </div>
                )}
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
};

export default ArtistAlbums;
