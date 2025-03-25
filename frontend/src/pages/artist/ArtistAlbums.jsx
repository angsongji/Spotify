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
      {/* Tiêu đề và nút thêm album */}
      <h1 className="text-2xl font-bold">Artist Albums</h1>

      {/* Danh sách album */}
      <div className="space-y-4">
        {/* Album 1 */}
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/ChiPu.jpg" alt="Album Cover" className="w-16 h-16" />
              <div>
                <h2 className="text-xl font-semibold">Album One</h2>
                <p className="text-gray-600">2023-01-01</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600">
                <FaEdit onClick={openAddEditModal} className="text-lg" />
              </button>
              <button
                onClick={openDeleteModal}
                className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
              >
                <FaTrash className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Album 2 */}
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/DuongDomic.jpg"
                alt="Album Cover"
                className="w-16 h-16"
              />
              <div>
                <h2 className="text-xl font-semibold">Album Two</h2>
                <p className="text-gray-600">2023-02-15</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openAddEditModal}
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
          </div>
        </div>

        {/* Album 3 */}
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/HTH.jpg" alt="Album Cover" className="w-16 h-16" />
              <div>
                <h2 className="text-xl font-semibold">Album Three</h2>
                <p className="text-gray-600">2023-03-10</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openAddEditModal}
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
          </div>
        </div>
      </div>

      {/* Nút thêm album */}
      <button
        onClick={openAddEditModal}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 shadow-lg hover:shadow-xl"
      >
        <span className="text-2xl">+</span>
      </button>

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
                <label className="block text-sm font-medium">Chọn bài hát</label>
                <select className="w-full border rounded p-2">
                  <option>Bài hát 1</option>
                  <option>Bài hát 2</option>
                  <option>Bài hát 3</option>
                </select>
              </div>

              {/* Ngày Phát Hành
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Ngày Phát Hành
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div> */}

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
