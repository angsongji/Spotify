import React, { useEffect, useState } from "react";

const MusicQueue = () => {
  const [queueSongs, setQueueSongs] = useState([]);

  useEffect(() => {
    const storedQueue = sessionStorage.getItem("musicQueue");
    if (storedQueue) {
      const parsedQueue = JSON.parse(storedQueue);
      setQueueSongs(parsedQueue);
      console.log("Danh sách hàng đợi đã nhận:", parsedQueue);
    }

    const handleQueueUpdate = (e) => {
      setQueueSongs(e.detail);
      console.log("Đã cập nhật hàng đợi mới:", e.detail);
    };

    window.addEventListener("queueUpdated", handleQueueUpdate);
    return () => window.removeEventListener("queueUpdated", handleQueueUpdate);
  }, []);

  const removeFromQueue = (id) => {
    const updatedQueue = queueSongs.filter((song) => song.id !== id);
    setQueueSongs(updatedQueue);
    sessionStorage.setItem("musicQueue", JSON.stringify(updatedQueue));

    // Gửi sự kiện cập nhật để đồng bộ với các component khác
    window.dispatchEvent(new CustomEvent("queueUpdated", { detail: updatedQueue }));
  };

  return (
    <div className="w-80 h-full bg-black text-white p-4 border-l border-gray-700 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Hàng đợi</h2>
      <div
        className="flex-1 overflow-y-auto custom-scrollbar"
        style={{ maxHeight: "calc(100vh - 150px)", paddingBottom: "64px" }}
      >
        {queueSongs.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between mb-3 hover:bg-gray-800 rounded-lg p-2 transition-all"
          >
            <div className="flex items-center gap-3">
              <img
                src={song.image}
                alt={song.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromQueue(song.id)}
              className="text-red-500 hover:text-red-700 text-xl font-bold px-2"
              title="Xóa khỏi hàng đợi"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicQueue;
