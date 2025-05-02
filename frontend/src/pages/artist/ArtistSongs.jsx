  import React, { useState, useEffect } from "react";
  import { FaEdit, FaTrash, FaTimes, FaImage, FaVideo } from "react-icons/fa";
  import axios from "axios";
  import { useOutletContext } from "react-router-dom";

  const ArtistSongs = () => {
    const [musicGenres, setMusicGenres] = useState([]);
    const { accountId } = useOutletContext(); 
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);


    // Fetch songs by artist
    useEffect(() => {
      if (accountId) {
        axios
          .get(`http://localhost:8000/api/song/by-artist/${accountId}/`)
          .then((res) => setSongs(res.data.songs || []))
          .catch((err) => console.error("Lỗi khi tải danh sách bài hát:", err));
      }
    }, [accountId]);
    useEffect(() => {
      axios.get("http://localhost:8000/api/music-genres/")
        .then((res) => setMusicGenres(res.data))
        .catch((err) => console.error("Lỗi khi load thể loại:", err));
    }, []);

    useEffect(() => {
      
      if (accountId) {
        axios
          .get(`http://localhost:8000/api/albums/by-account/${accountId}/`)
          .then((res) => {
            
            setAlbums(res.data || []);
            console.log("Kết quả trả về từ API:", res.data); 
          })
          .catch((err) => console.error("Lỗi khi tải danh sách album:", err));
      }
      
    }, [accountId]);

    // Delete modal actions
    const openDeleteModal = (song) => {
      setSelectedSong(song);
      setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
      setSelectedSong(null);
    };

    const handleDeleteSong = () => {
      console.log("ID bài hát: ", selectedSong.id)
      axios
        .delete(`http://localhost:8000/api/song/${selectedSong.id}/`)
        .then(() => {
          setSongs((prev) => prev.filter((s) => s.id !== selectedSong.id));
          closeDeleteModal();
        })
        .catch((err) => console.error("Lỗi khi xóa bài hát:", err));
    };

    // Add/Edit modal actions
    const openAddEditModal = (song = null) => {
      setSelectedSong(song);
      setIsEditModalOpen(true);
      setImageFile(null);
      setVideoFile(null);
    };
    
    useEffect(() => {
      console.log("Selected song:", selectedSong); // log khi selectedSong thay đổi
    }, [selectedSong]);

    const closeAddEditModal = () => {
      setIsEditModalOpen(false);
      setSelectedSong(null);
    };

    const handleSave = async () => {
      try {
        let coverUrl = selectedSong?.cover_image_url || "";
        let coverKey = selectedSong?.cover_image_key || "";
        let audioUrl = selectedSong?.audio_file_url || "";
        let audioKey = selectedSong?.audio_file_key || "";
    
        if (imageFile) {
          const { url, key } = await uploadToS3(imageFile, "image");
          console.log()
          coverUrl = url;
          coverKey = key;
        }
    
        if (videoFile) {
          const { url, key } = await uploadToS3(videoFile, "audio");
          audioUrl = url;
          audioKey = key;
        }
    
        const payload = {
          name: selectedSong?.name || "",
          premium: selectedSong?.premium || false,
          artist_id: accountId,
          music_genre_id: selectedSong?.music_genre_id || null,
          album_id: selectedSong?.album_id || null,
          cover_image_url: coverUrl,
          cover_image_key: coverKey,
          audio_file_url: audioUrl,
          audio_file_key: audioKey,
        };
        console.log("payload nè: ",payload)
        const request = selectedSong?.id
          ? axios.put(`http://localhost:8000/api/song/${selectedSong.id}/`, payload)
          : axios.post("http://localhost:8000/api/song/", payload);
    
        const res = await request;
        if (selectedSong?.id) {
          setSongs((prev) => prev.map((s) => (s.id === selectedSong.id ? res.data : s)));
        } else {
          setSongs((prev) => [...prev, res.data]);
        }
    
        closeAddEditModal();
      } catch (err) {
        console.error("Lỗi khi lưu bài hát:", err);
      }
    };
    
    // Toggle song status
    const toggleStatus = () => {
      if (!selectedSong) return;
      setSelectedSong({ ...selectedSong, isOn: !selectedSong.isOn });
    };

    const uploadToS3 = async (file, type) => {
    try {
      const res = await axios.post("http://localhost:8000/api/s3/presign/", {
        file_name: file.name,
        file_type: file.type,
        
      });
      console.log("hehe",file.name," & ", file.type)
      const { url, key, file_url } = res.data;

      // Upload file trực tiếp lên S3
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      return { url: file_url, key };
    } catch (err) {
      console.error("Upload thất bại:", err);
      return { url: null, key: null };
    }
  };


    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Artist Songs</h1>

        {/* Song Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Ảnh</th>
              <th className="p-3 text-left">Tên bài hát</th>
              <th className="p-3 text-left">Ngày phát hành</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={song.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <img src={song.cover_image_url || "default.jpg"} alt="Cover" className="w-12 h-12" />
                </td>
                <td className="p-3">{song.name}</td>
                <td className="p-3">{song.release_date}</td>
                <td className="p-3">
                  {song.is_approved === 1 ? "Đã kiểm duyệt" : "Chưa kiểm duyệt"}
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openAddEditModal(song)}
                      className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => openDeleteModal(song)}
                      className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Song Button */}
        <button
          onClick={() => openAddEditModal()}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 shadow-lg"
        >
          <span className="text-2xl">+</span>
        </button>

        {/* Delete Modal */}
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
              <h2 className="text-xl font-semibold text-center mb-2">Confirm Deletion</h2>
              <p className="text-gray-700">
                Are you sure you want to delete the song "{selectedSong?.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-5 mt-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSong}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[570px] relative">
              <button
                onClick={closeAddEditModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
              <h2 className="text-xl font-semibold mb-4">Add / Edit Song</h2>

              {/* Name */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Tên bài hát</label>
                <input
                  type="text"
                  value={selectedSong?.name || ""}
                  onChange={(e) => setSelectedSong({ ...selectedSong, name: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Music Genre */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Thể loại nhạc</label>
                <select
                  value={selectedSong?.music_genre_id || ""}
                  onChange={(e) => setSelectedSong({ ...selectedSong, music_genre_id: e.target.value })}
                  className="w-full border rounded p-2"
                >
                  <option value="">-- Chọn thể loại --</option>
                  {musicGenres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Album */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Album</label>
                <select
                  value={selectedSong?.album_id || ""}
                  onChange={(e) => setSelectedSong({ ...selectedSong, album_id: e.target.value })}
                  className="w-full border rounded p-2"
                >
                  <option value="">-- Chọn album --</option>
                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Premium */}
              <div className="mb-3 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSong?.premium || false}
                  onChange={(e) => setSelectedSong({ ...selectedSong, premium: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Premium (Chỉ dành cho tài khoản trả phí)</label>
              </div>

              {/* Cover Image Upload */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Ảnh đại diện</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Audio Upload */}
              <div className="mb-3">
                <label className="block text-sm font-medium">File Bài hát (Audio)</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-center mt-4 gap-3">
                <button
                  onClick={closeAddEditModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  export default ArtistSongs;
